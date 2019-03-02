<h1 align="center">📘 json-reader-writer ✍️</h1>
<div align="center">
  <strong>Read or write to a JSON file synchronously</strong>
</div>
<br>
<div align="center">
    <a href="https://npmjs.org/package/json-reader-writer">
      <img src="https://img.shields.io/npm/v/json-reader-writer.svg?style=flat-square" alt="NPM version" />
    </a>
    <a href="https://npmjs.org/package/json-reader-writer">
    <img src="https://img.shields.io/npm/dm/json-reader-writer.svg?style=flat-square" alt="Downloads" />
    </a>
    <a href="https://github.com/feross/standard">
      <img src="https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square" alt="Standard" />
    </a>
    <a href="https://travis-ci.org/tiaanduplessis/json-reader-writer">
      <img src="https://img.shields.io/travis/tiaanduplessis/json-reader-writer/master.svg?style=flat-square" alt="Travis build" />
    </a>
    <a href="https://github.com/RichardLitt/standard-readme)">
      <img src="https://img.shields.io/badge/standard--readme-OK-green.svg?style=flat-square" alt="Standard Readme" />
    </a>
    <a href="https://badge.fury.io/gh/tiaanduplessis%2Fjson-reader-writer">
      <img src="https://badge.fury.io/gh/tiaanduplessis%2Fjson-reader-writer.svg?style=flat-square" alt="GitHub version" />
   </a>
</div>
<br>

<h2>Table of Contents</h2>
<details>
  <summary>Table of Contents</summary>
  <li><a href="#install">Install</a></li>
  <li><a href="#usage">Usage</a></li>
  <li><a href="#api">API</a></li>
  <li><a href="#contribute">Contribute</a></li>
  <li><a href="#license">License</a></li>
</details>

## Install

```sh
$ npm install --save json-reader-writer
```

```sh
$ yarn add json-reader-writer
```

## Usage

```js
const {readJSON, writeJson} = require('json-reader-writer')
const filePath = 'foo.json'
const obj = {
  foo: 1,
  bar: 2,
  baz: 2
}

console.log(writeJson(filePath, obj)) // true if successful
console.log(readJSON(filePath)) // { foo: 1, bar: 2, baz: 2 }

```

## API

### readJSON(filename)

Takes the filename of the JSON file you want to read from as argument. Defaults to `file.json` if  no `filename` provided.

### writeJSON(filename, objectToWrite)

Takes the filename of the JSON file you want to write to and the valid object you want to write as arguments.


## Contribute

Contributions are welcome. Please open up an issue or create PR if you would like to help out.

Note: If editing the README, please conform to the [standard-readme](https://github.com/RichardLitt/standard-readme) specification.

## License

Licensed under the MIT License.