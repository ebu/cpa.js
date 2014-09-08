/*global require, module*/
'use strict';

var req = require('../utils/req'),
    cpa = require('./definition');

module.exports = {

  /**
   * Register the client with the Authentication Provider
   *
   * @param authProvider Base url of the authorization provider
   * @param clientName Name of this client
   * @param softwareId Identifier of the software running on this client
   * @param softwareVersion Version of the software running on this client
   * @param done function(err, clientId, clientSecret) {}
   */
  registerClient: function(authProvider, clientName, softwareId, softwareVersion, done) {
    /* jshint -W106:start */
    var registrationBody = {
      client_name: clientName,
      software_id: softwareId,
      software_version: softwareVersion
    };
    /* jshint -W106:end */

    req.postJSON(authProvider + cpa.endpoints.apRegister, registrationBody)
      .then(
        function(response) {
          if (response.statusCode === 201) {
            // Success
            done(null, response.body.client_id, response.body.client_secret);
          } else {
            // Wrong status code
            done(new Error('wrong status code'), null, null);
          }
        },
        function() {
          // Request failed
          done(new Error('request failed'), null, null);
        }
      );
  },

  /**
   * Request a user code
   *
   * @param authProvider Base url of the authorization provider
   * @param clientId Id of this client
   * @param clientSecret Secret of this client
   * @param domain Domain of the token for which the client is requesting an association
   * @param done Callback done(err)
   */
  requestUserCode: function(authProvider, clientId, clientSecret, domain, done) {
    /* jshint -W106:start */
    var body = {
      client_id: clientId,
      client_secret: clientSecret,
      domain: domain
    };
    /* jshint -W106:end */

    req.postJSON(authProvider + cpa.endpoints.apAssociate, body)
      .then(
        function(response) {
          if (response.statusCode === 200) {
            done(null, response.body);
          } else {
            // Wrong status code
            done(new Error('wrong status code'));
          }
        },
        function() {
          // Request failed
          done(new Error('request failed'));
        }
      );
  },

  /**
   * Request a token for this client (Client Mode)
   *
   * @param authProvider Base url of the authorization provider
   * @param clientId Id of this client
   * @param clientSecret Secret of this client
   * @param domain Domain of the requested token
   * @param done
   */
  requestClientAccessToken: function(authProvider, clientId, clientSecret, domain, done) {
    /* jshint -W106:start */
    var body = {
      grant_type: 'http://tech.ebu.ch/cpa/1.0/client_credentials',
      client_id: clientId,
      client_secret: clientSecret,
      domain: domain
    };
    /* jshint -W106:end */

    req.postJSON(authProvider + cpa.endpoints.apToken, body)
      .then(
        function(response) {
          done(null, response.body);
        },
        function() {
          done(new Error('request failed'));
        }
      );
  },

  /**
   * Request a token for the user associated with this device.
   * The association is represented by the device_code (User Mode)
   *
   * @param authProvider Base url of the authorization provider
   * @param clientId     Id of this client
   * @param clientSecret Secret of this client
   * @param deviceCode   Code returned by the authorization provider in order
   *                     to check if the user_code has been validated
   * @param domain       Domain of the requested token
   * @param done
   */
  requestUserAccessToken: function(authProvider, clientId, clientSecret, deviceCode, domain, done) {
    /* jshint -W106:start */
    var body = {
      grant_type: 'http://tech.ebu.ch/cpa/1.0/device_code',
      client_id: clientId,
      client_secret: clientSecret,
      device_code: deviceCode,
      domain: domain
    };
    /* jshint -W106:end */

    req.postJSON(authProvider + cpa.endpoints.apToken, body)
      .then(
        function(response) {
          var statusCode = response.statusCode;
          if (statusCode === 202) {
            // Authorization pending
            done(null, null);
          }
          else if (statusCode === 200) {
            // Ok
            done(null, response.body);
          } else {
            // Wrong statusCode
            done(null, response.body);
          }
        },
        function() {
          done(new Error('request failed'), null);
        }
      );
  }
};
