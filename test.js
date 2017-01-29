/* eslint-env mocha */
'use strict'

const fs = require('fs')
const assert = require('chai').assert
const del = require('del')
const { writeJson, readJSON } = require('./index')
const filePath = 'test.json'

describe('Accept only valid arguments', () => {
  it('should throw if invalid file extension provided', () => {
    const invalidFile = 'fooochoo.txt'

    assert.throws(() => writeJson(invalidFile, {}))
    assert.throws(() => readJSON(invalidFile))
  })

  it('should throw if invalid object provided for write', () => {
    assert.throws(() => writeJson(filePath, 'foo'))
  })
})

describe('Create a new JSON file', () => {
  it('should create a new JSON file when writing if one does not already exist', () => {
    writeJson(filePath, {})
    assert(fs.existsSync(filePath))
    del(filePath)
  })
})
