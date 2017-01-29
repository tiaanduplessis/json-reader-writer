/* eslint-env mocha */
'use strict'

const fs = require('fs')
const assert = require('chai').assert
const del = require('del')
const { writeJSON, readJSON } = require('./index')
const filePath = 'test.json'

describe('Accept only valid arguments', () => {
  it('should throw if invalid file extension provided', () => {
    const invalidFile = 'fooochoo.txt'

    assert.throws(() => writeJSON(invalidFile, {}))
    assert.throws(() => readJSON(invalidFile))
  })

  it('should throw if invalid object provided for write', () => {
    assert.throws(() => writeJSON(filePath, 'foo'))
  })
})

describe('Create a new JSON file', () => {
  it('should create a new JSON file when writing if one does not already exist', () => {
    writeJSON(filePath, {})
    assert(fs.existsSync(filePath))
    del(filePath)
  })
})
