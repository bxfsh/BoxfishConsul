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
      
      var sails = sails || {};
      var host = 127.0.0.1;
      var port = 8500;
      
      if (sails.hasOwnProperty('config') && sails.config.hasOwnProperty('consul')) {
        host = sails.config.consul.host;
        port = sails.config.consul.port;
      } else {
        console.warn('BoxfishConsul plugin requires a \'consul\' object in sails.config with \'host\' and \'port\' properties.');
      }

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
