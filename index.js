;(function(module) {

  'use strict';

  var promise    = require('promised-io/promise');

  /**
   * EpgController
   *
   *  Initialise the boxfish consul and returns the api
   *  docs: https://www.npmjs.com/package/consul
   *
   * @description :: Server-side logic for managing Epgs
   * @help        :: See http://links.sailsjs.org/docs/controllers
   */
  var consulService = {

    /**
     * initialise the consul helper
     * @return {[type]} [description]
     */
    init: function index() {
      
      'use strict';

      var host = typeof (sails === 'undefined' && sails.config === 'undefined') ? '127.0.0.1' : sails.config.consul.host;
      var port = typeof (sails === 'undefined' && sails.config === 'undefined') ? 8500 : sails.config.consul.port;

      this.api = require('consul')({
        host: host,
        port: port
      });

      return this;
    },

    /**
     * get the nodes list
     * @param  {Function} cb [description]
     * @return {[type]}      [description]
     */
    nodeList: function nodeList(cb) {
      this.init();
      this.api.catalog.node.list(function(err, list) {
        if (err) throw err;
        cb(list);
      });
    },

    /**
     * find services by name
     * @param  {[type]} name [description]
     * @return {[type]}      [description]
     */
    findService: function findService(name) {

      var d = promise.defer();
      var self = this;

      this.init().api.catalog.service.nodes(name, function(err, result) {
        if (err) d.reject(err);
        else d.resolve(result[0]);
      });

      return d;

    },
    
    /**
     * Register a new service  
     */
    register: function register(name, options, cb) {
      options.name = name;
       
      this.init().api.agent.check.register(options, cb);
    },
    
    /**
     * deregister a service  
     */
    deregister: function deregister(name, cb) {
      this.init().api.agent.check.deregister(options, cb);
    }

  };

  module.exports = consulService;

})(module); // jshint ignore:line
