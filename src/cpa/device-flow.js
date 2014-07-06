/*global define*/
define(['request', './definition'], function(req, cpa) {
  'use strict';

  return {
    /**
     * Register the client with the Authentication Provider
     *
     * done: function(err, status_code, body) {}
     */
    registerClient: function(APBaseUrl, clientName, softwareId, softwareVersion, done) {
      /* jshint -W106:start */
      var registrationBody = {
        client_name: clientName,
        software_id: softwareId,
        software_version: softwareVersion
      };
      /* jshint -W106:end */

      req.postJSON(APBaseUrl + cpa.endpoints.apRegister, registrationBody)
        .success(function(data, textStatus, jqXHR) {
          if (jqXHR.status === 201) {
            // Success
            done(null, data.client_id, data.client_secret);
          } else {
            // Wrong status code
            done(new Error({message: 'wrong status code', 'jqXHR': jqXHR}), jqXHR.status, textStatus);
          }
        })
        .fail(function(jqXHR, textStatus) {
          // Request failed
          done(new Error({message: 'request failed', 'jqXHR': jqXHR}), jqXHR.status, textStatus);
        });
    },

    /**
     *
     * @param APBaseUrl
     * @param clientId
     * @param clientSecret
     * @param domain
     * @param done
     */
    requestUserCode: function(APBaseUrl, clientId, clientSecret, domain, done) {
      /* jshint -W106:start */
      var body = {
        client_id: clientId,
        client_secret: clientSecret,
        domain: domain
      };
      /* jshint -W106:end */

      req.postJSON(APBaseUrl + cpa.endpoints.apAssociate, body)
        .success(function(data, textStatus, jqXHR) {
          if (jqXHR.status === 200) {
            done(null, data);
          } else {
            // Wrong status code
            done({message: 'wrong status code', 'jqXHR': jqXHR});
          }
        })
        .fail(function(jqXHR, textStatus) {
          // Request failed
          done({ message: 'request failed', 'jqXHR': jqXHR, 'textStatus': textStatus });
        });
    },

    /**
     *
     * @param APBaseUrl
     * @param clientId
     * @param clientSecret
     * @param domain
     * @param done
     */
    requestClientAccessToken: function(APBaseUrl, clientId, clientSecret, domain, done) {
      /* jshint -W106:start */
      var body = {
        grant_type: 'http://tech.ebu.ch/cpa/1.0/client_credentials',
        client_id: clientId,
        client_secret: clientSecret,
        domain: domain
      };
      /* jshint -W106:end */

      req.postJSON(APBaseUrl + cpa.endpoints.apToken, body)
        .success(function(data) {
          done(null, data);
        })
        .fail(function(jqXHR, textStatus) {
          done(new Error({ message: 'request failed', 'jqXHR': jqXHR, 'textStatus': textStatus }));
        });
    },

    /**
     *
     * @param APBaseUrl
     * @param clientId
     * @param clientSecret
     * @param deviceCode
     * @param domain
     * @param done
     */
    requestUserAccessToken: function(APBaseUrl, clientId, clientSecret, deviceCode, domain, done) {
      /* jshint -W106:start */
      var body = {
        grant_type: 'http://tech.ebu.ch/cpa/1.0/device_code',
        client_id: clientId,
        client_secret: clientSecret,
        device_code: deviceCode,
        domain: domain
      };
      /* jshint -W106:end */

      req.postJSON(APBaseUrl + cpa.endpoints.apToken, body)
        .success(function(data, textStatus, jqXHR) {
          var statusCode = jqXHR.status;
          if (statusCode === 202) {
            // Authorization pending
            done(null, null);
          }
          else if (statusCode === 200) {
            // Ok
            done(null, data);
          } else {
            // Wrong statusCode
            done(null, data);
          }
        })
        .fail(function(jqXHR, textStatus) {
          done(new Error({message: 'request failed', 'jqXHR': jqXHR, 'textStatus': textStatus }), null);
        });
    }
  };
});
