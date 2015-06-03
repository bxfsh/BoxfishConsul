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

      sails.log.debug(new Date(), 'Connecting to Consul on', sails.config.consul.host, ':', sails.config.consul.port);

      this.api = require('consul')({
        host: sails.config.consul.host,
        port: sails.config.consul.port,
      });

      return this;
    },

    /**
     * find services by name
     * @param  {[type]} name [description]
     * @return {[type]}      [description]
     */
    findService: function findService(name) {

      var d = promise.defer();

      this.init();

      this.api.agent.service.list(function(err, services) {

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

      return d;

    }

  };

  module.exports = consulService;

})(module); // jshint ignore:line