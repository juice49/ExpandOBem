# ExpandOBem

ExpandOBem is a preprocessing step for HTML that allows you to write BEM-style classes in a shorter, more expressive manner.

ExpandOBem expands abbreviated BEM-style classes, like so:

	<div class='post--featured--recent'></div>

Becomes:

	<div class='post--featured post--recent'></div>
	
The result is cleaner, more readable source HTML and the speedier switching of modifiers.

## Install

	npm install expandobem

## Usage

ExpandOBem exposes three methods for processing HTML:

### Process File

Read a file and transform it.

	expandobem.processFile(path, options)

### Process String

Transform a string.

	expandobem.processString(string, options)

### Process Stream

Transform streaming HTML.
	
	expandobem.processStream(options)

## Options

### syntax.element <i>(default: `__`)</i>
The connecting syntax prefixing a block or element.

### syntax.modifier <i>(default: `--`)</i>
The connecting syntax prefixing a modifier.

## Test

	npm test

## Gulp

Add link to Gulp plugin...

## Todo

- Find a way to integrate with Jade
- Improve docs

## Release notes

### 0.0.1 - 08/04/14
First release