/* eslint-env mocha */
'use strict'

const fs = require('fs')
const os = require('os')
const path = require('path')
const assert = require('chai').assert
const { writeJSON, readJSON } = require('./index')
let directory
let filePath

beforeEach(() => {
  directory = fs.mkdtempSync(path.join(os.tmpdir(), 'json-reader-writer-'))
  filePath = path.join(directory, 'test.json')
})

afterEach(() => {
  fs.readdirSync(directory).forEach(filename => {
    fs.unlinkSync(path.join(directory, filename))
  })
  fs.rmdirSync(directory)
})

describe('Accept only valid arguments', () => {
  it('should throw if invalid file extension provided', () => {
    const invalidFile = path.join(directory, 'fooochoo.txt')

    assert.throws(() => writeJSON(invalidFile, {}, 2), 'The path provided should end with .json')
    assert.throws(() => readJSON(invalidFile), 'The path provided should end with .json')
    assert.isFalse(fs.existsSync(invalidFile))
  })

  it('should throw if invalid object provided for write', () => {
    assert.throws(() => writeJSON(filePath, 'foo', 2), 'The object provided is invalid')
    assert.isFalse(fs.existsSync(filePath))
  })
})

describe('Write a JSON file', () => {
  const obj = { foo: 1, bar: { baz: [true, 'value'] } }

  it('should create a new JSON file and return true', () => {
    assert.isTrue(writeJSON(filePath, obj))
    assert.isTrue(fs.existsSync(filePath))
    assert.deepEqual(readJSON(filePath), obj)
  })

  it('should keep compact output when space is omitted', () => {
    writeJSON(filePath, obj)
    assert.strictEqual(fs.readFileSync(filePath, 'utf8'), '{"foo":1,"bar":{"baz":[true,"value"]}}')
  })

  it('should keep the default empty object', () => {
    assert.isTrue(writeJSON(filePath))
    assert.strictEqual(fs.readFileSync(filePath, 'utf8'), '{}')
  })

  it('should indent nested objects and arrays with spaces', () => {
    assert.isTrue(writeJSON(filePath, obj, 2))
    assert.strictEqual(fs.readFileSync(filePath, 'utf8'), [
      '{',
      '  "foo": 1,',
      '  "bar": {',
      '    "baz": [',
      '      true,',
      '      "value"',
      '    ]',
      '  }',
      '}'
    ].join('\n'))
    assert.deepEqual(readJSON(filePath), obj)
  })

  it('should indent with a string', () => {
    writeJSON(filePath, { foo: { bar: 1 } }, '\t')
    assert.strictEqual(fs.readFileSync(filePath, 'utf8'), '{\n\t"foo": {\n\t\t"bar": 1\n\t}\n}')
    assert.deepEqual(readJSON(filePath), { foo: { bar: 1 } })
  })

  ;[undefined, null, 0, -1, 1.5, 10, 20, '', '            '].forEach(space => {
    it(`should follow JSON.stringify for space = ${JSON.stringify(space)}`, () => {
      writeJSON(filePath, obj, space)
      assert.strictEqual(fs.readFileSync(filePath, 'utf8'), JSON.stringify(obj, null, space))
      assert.deepEqual(readJSON(filePath), obj)
    })
  })

  it('should overwrite an existing file with the selected formatting', () => {
    writeJSON(filePath, obj, 2)
    writeJSON(filePath, { updated: true })
    assert.strictEqual(fs.readFileSync(filePath, 'utf8'), '{"updated":true}')
  })

  it('should propagate serialization errors without creating a file', () => {
    const circular = {}
    circular.self = circular

    assert.throws(() => writeJSON(filePath, circular, 2), TypeError)
    assert.isFalse(fs.existsSync(filePath))
  })

  it('should propagate file system errors', () => {
    const missingDirectory = path.join(directory, 'missing', 'file.json')
    assert.throws(() => writeJSON(missingDirectory, obj, 2), /ENOENT/)
  })
})
