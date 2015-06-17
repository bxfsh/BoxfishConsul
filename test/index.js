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

	it('should get the list of services', function() {
		consul.init().api.agent.service.list(function(err, services) {
			if (err) throw err;
			console.log(services);
		});
	});

	it('should get the list of services', function() {
		consul.init().api.catalog.service.list(function(err, services) {
			if (err) throw err;
			console.log(services);
		});
	});

	it('should get the list of services', function() {
		consul.findService('consul').then(function(services) {
			console.log(services);
		}, assert);
	});
	
});