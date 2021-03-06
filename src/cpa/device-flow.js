/*global require, module, setTimeout*/
'use strict';

var req = require('../utils/req'),
    cpa = require('./definition'),
    URI = require('URIjs');

/**
 * Creates a URL to an Authorization Provider endpoint.
 *
 * @param {string|URI} baseUrl The Authorization Provider base URL
 * @param {string|URI} endpointPath The URL path of the API endpoint, e.g.,
 *   "/register", "/associate", or "/token".
 * @returns {URI}
 *
 * @private
 */

var createUrl = function(baseUrl, endpointPath) {
  return URI(baseUrl + endpointPath).normalizePath();
};

/** @namespace */

var CPA = {

  /**
   * Callback function for the {@link CPA.registerClient} function.
   *
   * @callback registerClientCallback
   * @param {Error|null} error On success, this value is <code>null</code>;
   *   on error, it is an <code>Error</code> object containing an error message.
   * @param {Object|null} data On success, this value is an object containing
   *   the information described below; on error, this value is
   *   <code>null</code>
   * @param {string} data.client_id A unique identifier issued to the client
   *   by the authorization provider.
   * @param {string} data.client_secret A shared secret value between the client
   *   and authorization provider.
   */

  /**
   * Registers the client with the Authorization Provider.
   *
   * @see EBU Tech 3366, section 8.1.
   *
   * @param {string} authProvider Base URL of the authorization provider.
   * @param {string} clientName Name of this client.
   * @param {string} softwareId Identifier of the software running on this
   *   client.
   * @param {string} softwareVersion Version of the software running on this
   *   client.
   * @param {registerClientCallback} done Callback function.
   */

  registerClient: function(authProvider, clientName, softwareId,
                           softwareVersion, done) {
    /* jshint -W106:start */
    var registrationBody = {
      client_name: clientName,
      software_id: softwareId,
      software_version: softwareVersion
    };
    /* jshint -W106:end */

    var registerUrl = createUrl(authProvider, cpa.endpoints.register);

    req.postJSON(registerUrl, registrationBody)
      .then(
        function(response) {
          if (response.statusCode === 201) {
            // Success
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
   * Callback function for the {@link CPA.requestUserCode} function.
   *
   * @callback requestUserCodeCallback
   * @param {Error|null} error On success, this value is <code>null</code>;
   *   on error, it is an <code>Error</code> object containing an error message.
   * @param {Object|null} data On success, this value is an object containing
   *   the information described below; on error, this value is
   *   <code>null</code>.
   * @param {string} data.device_code The temporary device verification code.
   * @param {string} data.user_code The temporary user verification code,
   *   usually a short string of alphanumeric characters, which the user should
   *   enter after visiting the <code>verification_uri</code>.
   * @param {string} data.verification_uri The URL to be displayed to the user
   *   by the client.
   * @param {string} data.interval The minimum time the client should wait
   *   between making requests to obtain an access token, e.g., by calling
   *   {@link CPA.requestUserAccessToken}, in seconds.
   * @param {number} data.expires_in The length of time the
   *   <code>device_code</code> and <code>user_code</code> are valid,
   *   in seconds.
   */

  /**
   * Requests a user code.
   *
   * @see EBU Tech 3366, section 8.2.
   *
   * @param {string|URI} authProvider Base URL of the authorization provider.
   * @param {string} clientId Id of this client.
   * @param {string} clientSecret Secret of this client.
   * @param {string} domain Domain of the token for which the client is
   *   requesting an association.
   * @param {requestUserCodeCallback} done Callback function.
   */

  requestUserCode: function(authProvider, clientId, clientSecret, domain,
                            done) {
    /* jshint -W106:start */
    var body = {
      client_id: clientId,
      client_secret: clientSecret,
      domain: domain
    };
    /* jshint -W106:end */

    var associateUrl = createUrl(authProvider, cpa.endpoints.associate);

    req.postJSON(associateUrl, body)
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
   * Callback function for the {@link CPA.requestClientAccessToken} function.
   *
   * @callback requestClientAccessTokenCallback
   * @param {Error|null} error On success, this value is <code>null</code>;
   *   on error, it is an <code>Error</code> object containing an error message.
   * @param {Object|null} data On success, this value is an object containing
   *   the information described below; on error, this value is
   *   <code>null</code>.
   * @param {string} data.access_token The access (or bearer) token value.
   * @param {string} data.token_type Contains the value "bearer" to indicate
   *   that this is a bearer token.
   * @param {string} data.domain_name The name of the service provider, suitable
   *   for display on the client device.
   * @param {number} data.expires_in The length of time the access token is
   *   valid, in seconds.
   */

  /**
   * Requests a token for this client (Client Mode).
   *
   * @see EBU Tech 3366, section 8.3.1.1.
   *
   * @param {string|URI} authProvider Base URL of the authorization provider.
   * @param {string} clientId Id of this client.
   * @param {string} clientSecret Secret of this client.
   * @param {string} domain Domain of the requested token.
   * @param {requestClientAccessTokenCallback} done Callback function.
   */

  requestClientAccessToken: function(authProvider, clientId, clientSecret,
                                     domain, done) {
    /* jshint -W106:start */
    var body = {
      grant_type: 'http://tech.ebu.ch/cpa/1.0/client_credentials',
      client_id: clientId,
      client_secret: clientSecret,
      domain: domain
    };
    /* jshint -W106:end */

    var tokenUrl = createUrl(authProvider, cpa.endpoints.token);

    req.postJSON(tokenUrl, body)
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
   * Callback function for the {@link CPA.requestUserAccessToken} function.
   *
   * @callback requestUserAccessTokenCallback
   * @param {Error|null} error On success, this value is <code>null</code>;
   *   on error, it is an <code>Error</code> object containing an error message.
   * @param {Object|null} data On success, this value is an object containing
   *   the information described below; on error, this value is
   *   <code>null</code>.
   * @param {string} data.user_name The name of the end user, suitable for
   *   display on the client device.
   * @param {string} data.access_token The access (or bearer) token value.
   * @param {string} data.token_type Contains the value "bearer" to indicate
   *   that this is a bearer token.
   * @param {string} data.domain_name The name of the service provider, suitable
   *   for display on the client device.
   * @param {number} data.expires_in The length of time the access token is
   *   valid, in seconds.
   */

  /**
   * Requests a token for the user associated with this device (User Mode).
   *
   * @see EBU Tech 3366, section 8.3.1.2.
   *
   * @param {string|URI} authProvider Base URL of the authorization provider.
   * @param {string} clientId Id of this client.
   * @param {string} clientSecret Secret of this client.
   * @param {string} deviceCode The temporary device verification code,
   *   returned from {@link CPA.requestUserCode}.
   * @param {string} domain Domain of the requested token.
   * @param {requestUserAccessTokenCallback} done Callback function.
   */

  requestUserAccessToken: function(authProvider, clientId, clientSecret,
                                   deviceCode, domain, done) {
    /* jshint -W106:start */
    var body = {
      grant_type: 'http://tech.ebu.ch/cpa/1.0/device_code',
      client_id: clientId,
      client_secret: clientSecret,
      device_code: deviceCode,
      domain: domain
    };
    /* jshint -W106:end */

    var tokenUrl = createUrl(authProvider, cpa.endpoints.token);

    req.postJSON(tokenUrl, body)
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
          }
          else {
            // Wrong statusCode
            done(null, response.body);
          }
        },
        function() {
          done(new Error('request failed'), null);
        }
      );
  },

  /**
   * Polls the authorization provider to receive a token for the user associated
   *   with this device (User Mode).
   *
   * @see EBU Tech 3366, section 8.3.1.2.
   *
   * @param {string|URI} authProvider Base URL of the authorization provider.
   * @param {string} clientId Id of this client.
   * @param {string} clientSecret Secret of this client.
   * @param {string} deviceCode The temporary device verification code,
   *   returned from {@link CPA.requestUserCode}.
   * @param {Number} pollInterval The time interval between requests,
   *   in milliseconds
   * @param {string} domain Domain of the requested token.
   * @param {requestUserAccessTokenCallback} done Callback function.
   */

  /* jshint -W072:start */
  pollForUserAccessToken: function(authProvider, clientId, clientSecret,
                                   deviceCode, domain, pollInterval, done) {
  /* jshint -W072:end */
    var self = this;

    function poll() {
      function requestUserCodeCallback(err, token) {
        if (err) {
          done(err);
        }
        else {
          if (token) {
            done(null, token);
          }
          else {
            setTimeout(poll, pollInterval);
          }
        }
      }

      self.requestUserAccessToken(authProvider, clientId,
        clientSecret, deviceCode, domain, requestUserCodeCallback);
    }

    setTimeout(poll, 0);
  }
};

module.exports = CPA;
