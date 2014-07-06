/*global define*/
define([], function() {
  'use strict';

  return {

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
