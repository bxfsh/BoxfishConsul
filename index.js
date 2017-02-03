require('colors');
const boxfishConsul = require('./src/index.js')

module.exports = function (sails) {

  return {

    /**
     * Intialise the hook
     */
    initialize: function(cb) {

      sails.log.info('[Sails-Hook-BoxfishConsul] Initialising'.green);
      boxfishConsul.init(sails);
      return cb();
      
    },

    /**
     * Configure the hook
     */
    configure: function() {


    },

    routes: {
      after: { },
      before: { }
    }

  }

};
