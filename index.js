var
	fs = require('fs'),
	stream = require('stream'),
	includes = require('amp-includes'),
	merge = require('merge-deep'),
	trumpet = require('trumpet'),
	options = {
		syntax: {
			element: '__',
			modifier: '--'
		}
	};




module.exports = {
	processFile: processFile,
	processString: processString,
	processStream: processStream,
	expandClassAttr: expandClassAttr,
	expandSingleClass: expandSingleClass,
	parseClass: parseClass,
	isBemClass: isBemClass
};




/**
 * Process File
 *
 * @param {String} Path of the HTML file to process
 */
function processFile(path, userOptions) {
	return fs.createReadStream(path).pipe(processStream(userOptions));
}




/**
 * Process String
 *
 * @param {String} The string of HTML to process
 */
function processString(string, userOptions) {

	var
		inputStream = new stream.Readable(),
		outputStream = processStream(userOptions);

	inputStream.push(string);
	inputStream.push(null);
	inputStream.pipe(outputStream);

	return outputStream;

}




/**
 * Process Stream
 */
function processStream(userOptions) {

	var tr = trumpet();

	options = merge(options, userOptions);

	tr.selectAll('*', function(node) {
		node.getAttribute('class', function(classAttr) {
			node.setAttribute('class', expandClassAttr(classAttr));
		});
	});

	return tr;

}




/**
 * Expand Class Attr
 *
 * Expand any BEM style classes within an entire class attribute. For example:
 * `foo__bar--bat unrelated-class`
 *
 * Becomes:
 * `foo__bar foo__bar--bat unrelated-class`
 *
 * @param {String} The entire class attribute
 * @return {String} The entire class attribute with any BEM-style classes expanded
 */
function expandClassAttr(classAttr) {

	if(!classAttr) return;

	var classes = classAttr.split(' ');

	return classes.map(function(singleClass) {
		return expandSingleClass(singleClass);
	}).join(' ');

}




/**
 * Expand Single Class
 *
 * @param {String} A single class
 * @return {String} A single class, expanded if it is BEM-style
 */
function expandSingleClass(singleClass) {

	if(!isBemClass(singleClass)) return singleClass;

	var
		components = parseClass(singleClass),
		expandedClass = components.block;

	components.modifiers.forEach(function(modifier) {
		expandedClass += ' ' + components.block + '--' + modifier;
	});

	return expandedClass.trim();

}




/**
 * Parse Class
 *
 * Given a single BEM-style class, returns an object containing its block (provided as block__element)
 * and an array of modifiers.
 *
 * @param {String} A single class
 * @return {Object} An object containing the class block and an array of modifiers
 */
function parseClass(singleClass) {
	var components = singleClass.split(options.syntax.modifier);
	return {
		block: components[0],
		modifiers: components.slice(1, components.length)
	};
}




/**
 * Is BEM Class
 *
 * @param {String} A single class
 * @return {Boolean} Whether the given class is BEM-style
 */
function isBemClass(singleClass) {
	return (
		includes(singleClass, options.syntax.element) ||
		includes(singleClass, options.syntax.modifier)
	);
}
