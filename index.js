;(function(module) {

  'use strict';

  var promise = require('promised-io/promise');

  var consulService = {

    /**
     * initialise the consul helper
     * @return {object} returns service
     */
    init(sails) {
      
      'use strict';

      var host = 'localhost';
      var port = 8500;
      
      if (sails.config && sails.config.consul) {
        host = sails.config.consul.host;
        port = sails.config.consul.port;
      } else {
        console.warn('BoxfishConsul service requires a \'consul\' object on sails.config with \'host\' and \'port\' properties');
      }

      // console.log('we are here');
      // console.log('-------');
      // console.log('-------');
      // console.log('-------');
      // console.log('-------');
      // console.log('-------');
      // console.log('-------');
      // console.log('-------');
      // console.log('-------');
      // console.log(host, port);

      this.api = require('consul')({
        host: host,
        port: port
      });

      return this;
    },

    /**
     * get the nodes list
     * @param  {function} cb - callback
     * @return void
     */
    nodeList: function nodeList(cb) {
      'use strict';
      
      this.init();
      this.api.catalog.node.list(function(err, list) {
        if (err) throw err;
        cb(list);
      });
    },

    /**
     * find services by name
     * @param  {string} name
     * @return {promise} returns promise
     */
    findService: function findService(name) {
      'use strict';

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
     * @param {string} name
     * @param {object} options
     * @param {function} cb - callback function
     */
    register: function register(name, options, cb) {
      'use strict';
      
      options.name = name;
       
      this.init().api.agent.check.register(options, cb);
    },
    
    /**
     * Deregister a service  
     * @param {string} name
     * @param {function} cb - callback function
     */
    deregister: function deregister(name, cb) {
      'use strict';
      
      this.init().api.agent.check.deregister(options, cb);
    }

  };

  module.exports = consulService;

})(module); // jshint ignore:line
