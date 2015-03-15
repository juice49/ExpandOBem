# ExpandOBem

![Travis CI](https://travis-ci.org/juice49/ExpandOBem.svg?branch=master)

[![NPM](https://nodei.co/npm/expandobem.png?compact=true)](https://nodei.co/npm/expandobem/)

ExpandOBem is a preprocessing step for HTML that allows you to write BEM-style classes in a shorter, more expressive manner.

ExpandOBem expands abbreviated BEM-style classes, like so:

`<div class='post--featured--recent'></div>`

Becomes:

`<div class='post post--featured post--recent'></div>`

The result is cleaner, more readable source HTML and the speedier switching of modifiers.

## Install

`npm install expandobem`

## Usage

### CLI

Install globally to use the CLI. ExpandOBem accepts an input file, or can use stdin. It'll either write to a file you specify or pipe to stdout.

`expandobem input.html -o 'output.html'`

#### Options

````
--element, -e   Element syntax
--modifier, -m  Modifier syntax
--outfile, -o   Write the ExpandOBem output to this file.
                If unspecified, ExpandOBem pipes to stdout.
--help, -h      Show help
````

### API

ExpandOBem exposes three methods for processing HTML:

#### Process File

Read a file and transform it.

`expandobem.processFile(path, options)``

#### Process String

Transform a string.

`expandobem.processString(string, options)``

#### Process Stream

Transform streaming HTML.

`expandobem.processStream(options)``

## Options

### syntax.element <i>(default: `__`)</i>
The connecting syntax prefixing a block or element.

### syntax.modifier <i>(default: `--`)</i>
The connecting syntax prefixing a modifier.

## Test

`npm test`

## Gulp

You can use ExpandOBem directly in a Gulp pipeline using the [vinyl-transform](https://github.com/hughsk/vinyl-transform) plugin and ExpandOBem's `processStream` function.

````
var gulp = require('gulp');
var transform = require('vinyl-transform');
var expandobem = require('expandobem');

gulp.src([ '*.html' ])
	.pipe(transform(expandobem.processStream))
	.pipe(gulp.dest('./build'));
````

## License

[MIT](http://opensource.org/licenses/MIT)
