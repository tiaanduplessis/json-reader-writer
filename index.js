'use strict'

const path = require('path')
const fs = require('graceful-fs')

const isValidExt = (file) => {
  if (path.extname(file) !== '.json') {
    throw new Error('The path provided should end with .json')
  }

  return true
}

const isValidObj = (obj) => {
  const valid = Object.prototype.toString.call(obj) === '[object Object]'
  if (!valid) {
    throw new Error('The object provided is invalid')
  }

  return true
}

/**
 * Write to a JSON file sync
 */
module.exports.writeJSON = function (filename = 'file.json', obj = {}) {
  isValidExt(filename)
  isValidObj(obj)

  try {
    const data = JSON.stringify(obj)
    fs.writeFileSync(filename, data)
    return true
  } catch (e) {
    throw e
  }
}

/**
 * Read from a JSON file sync & parse the JSON
 */
module.exports.readJSON = function (filename = 'file.json') {
  isValidExt(filename)

  if (fs.existsSync(filename)) {
    try {
      const data = fs.readFileSync(filename, 'utf-8').trim() || {}
      return JSON.parse(data)
    } catch (e) {
      throw e
    }
  } else {
    throw new Error('The file does not exist')
  }
}
