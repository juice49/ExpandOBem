#! /usr/bin/env node
'use srict';

var
	fs = require('fs'),
	yargs = require('yargs'),
	expandobem = require('./'),
	options = { syntax: {} },
	args,
	file,
	output;

args = yargs
	.usage('Usage: $0 [file] {OPTIONS}')
	.describe('element', 'Element syntax')
	.alias('element', 'e')
	.describe('modifier', 'Modifier syntax')
	.alias('modifier', 'm')
	.describe('outfile', 'Write the ExpandOBem output to this file.\nIf unspecified, ExpandOBem pipes to stdout.')
	.alias('outfile', 'o')
	.help('help')
	.alias('help', 'h')
	.argv;

file = args._[0];

output = args.outfile ?
	fs.createWriteStream(args.outfile) :
	process.stdout;

if(args.element) {
	options.syntax.element = args.element;
}

if(args.modifier) {
	options.syntax.modifier = args.modifier;
}

if(file) {
	return expandobem
		.processFile(file, options)
		.pipe(output);
}

process.stdin
	.pipe(expandobem.processStream(options))
	.pipe(output);
