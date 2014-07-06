/*global define*/
define([], function() {
  'use strict';

  return {
    errorMessages: {
      headerNotFound: 'Missing WWW-Authenticate header.  \
                      Please, make sure CORS headers are correctly sent. \
                      ("Access-Control-Expose-Headers: WWW-Authenticate")'
    },

    /**
     * Endpoints defined in the CPA spec
     */
    endpoints: {
      apRegister: 'register',
      apToken: 'token',
      apAssociate: 'associate',

      // RadioTag spec
      spDiscover: 'tags'
    }
  };
});
