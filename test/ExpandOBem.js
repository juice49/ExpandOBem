var
	should = require('should'),
	expandobem = require('../index.js');

describe('ExpandOBem', function() {
	
	describe('expandClassAttr', function() {
		it('should expand all BEM-style classes', function() {
			expandobem.expandClassAttr('element1--modifier element2--modifier').should.equal('element1 element1--modifier element2 element2--modifier');
		});
		it('should not affect non BEM-style classes', function() {
			expandobem.expandClassAttr('element1 element2--modifier element3').should.equal('element1 element2 element2--modifier element3');
			expandobem.expandClassAttr('element').should.equal('element');
		});
		it('should not reorder classes', function() {
			expandobem.expandClassAttr('element1 element2 element3').should.equal('element1 element2 element3');
		});
		it('should not reorder modifiers', function() {
			expandobem.expandClassAttr('element--modifier1--modifier2--modifier3').should.equal('element element--modifier1 element--modifier2 element--modifier3');
		});
	});
	
	describe('expandSingleClass', function() {
		it('should return the class unmodified if it is not BEM-style', function() {
			expandobem.expandSingleClass('just-a-normal-class').should.equal('just-a-normal-class');
		});
		it('should return the expanded class if it is BEM-style', function() {
			expandobem.expandSingleClass('block__element--modifier1--modifier2').should.equal('block__element block__element--modifier1 block__element--modifier2');
		});
	});
	
	describe('parseClass', function() {
		it('should return an object', function() {
			expandobem.parseClass('block__element').should.be.type('object');
		});
		it('should extract a block that has modifiers', function() {
			expandobem.parseClass('block--modifier1--modifier2').block.should.equal('block');
		});
		it('should combine the block and element components', function() {
			expandobem.parseClass('block__element').block.should.equal('block__element');
		});
		it('should extract all modifiers as an array', function() {
			expandobem.parseClass('block__element--modifier').modifiers.should.eql(['modifier']);
			expandobem.parseClass('block--modifier').modifiers.should.eql(['modifier']);
			expandobem.parseClass('block__element--modifier1--modifier2').modifiers.should.eql(['modifier1', 'modifier2']);
		});
	});

	describe('isBemClass', function() {
		it('should return true if the supplied class is BEM-style', function() {
			expandobem.isBemClass('block__element').should.be.true;
		});
		it('should return false if the supplied class is not BEM-style', function() {
			expandobem.isBemClass('just-a-normal-class').should.be.false;
		});
	});
	
});