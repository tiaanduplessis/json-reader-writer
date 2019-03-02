const del = require('del')
const { readJSON, writeJson } = require('./index')
const filePath = 'foo.json'
const obj = {
  foo: 1,
  bar: 2,
  baz: 2
}

console.log(writeJson(filePath, obj))
console.log(readJSON(filePath))

del(filePath)
