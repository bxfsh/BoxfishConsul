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

      var host = typeof sails === 'undefined' ? '127.0.0.1' : sails.config.consul.host;
      var port = typeof sails === 'undefined' ? 8500 : sails.config.consul.port;

      console.log(new Date(), 'Connecting to Consul on', host, ':', port);

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

      this.init();

      // gets the node list
      this.nodeList(function(nodes) {

        // gets the services for the first node returned
        self.api.catalog.node.services(nodes[0].Node, function(err, data) {

          if (err) throw err;

          var services = data.Services;

          if (!services) {
            d.reject('consul not up');
            return;
          }

          var arr = Object.keys(services).map(function (key) {
            return services[key];
          }).filter(function(item) {
            return (item.Service.toLowerCase() === name.toLowerCase()) ? item : null;
          });

          if (arr.length === 0) {
            d.reject('No service found.');
          } else d.resolve(arr[0]);

        });

      });

      // this.api.agent.service.list(function(err, services) {

      //   if (!services) {
      //     d.reject('consul not up');
      //     return;
      //   }

      //   var arr = Object.keys(services).map(function (key) {
      //     return services[key];
      //   }).filter(function(item) {
      //     return (item.Service.toLowerCase() === name.toLowerCase()) ? item : null;
      //   });

      //   if (arr.length === 0) {
      //     d.reject('No service found.');
      //   } else d.resolve(arr[0]);

      // });

      return d;

    }

  };

  module.exports = consulService;

})(module); // jshint ignore:line