var should = require('chai').should();
var assert = require('chai').assert;
var consul = require('../index');
    
describe('BoxfishConsul', function() {

	it('should connect to local consul', function() {
		consul.nodeList(function(nodes) {
			console.log(nodes);
			assert(true, 'nodes found');
		});
	});
	
});