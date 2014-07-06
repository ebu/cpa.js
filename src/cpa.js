/*global define*/
define('cpa', ['cpa-definition', 'logger', './device-flow'], function(definition, Logger, device) {
  'use strict';

  return {


    /**
     * This method parses the WWW-Authenticate header of the Service Provider
     * response.
     * @param challenge is the value of the WWW-Authenticate header.
     * @returns An object containing the Authorization Provider URI and the available
     * modes
     */
    parseWwwAuthenticate: function(challenge) {
      var regex = /(?:(\w*)\=\"(.*?))*\"/g;
      var match = [], data = {};
      while ((match = regex.exec(challenge)) !== null) {
        data[match[1]] = match[2];
      }

      var modesArray = data.modes.split(',');
      var modes = {
        client:  (modesArray.indexOf('client') !== -1),
        user:    (modesArray.indexOf('user') !== -1),
        anonymous: false
      };

      return { apBaseUrl: data.uri+'/', modes: modes };
    },

    /**
     *  Discover the responsible AP and the available modes for a domain
     *  Application Specific
     */
//
//    getServiceInfos: function(domain, done) {
//      var callback = function(jqXHR) {
//        var challenge = jqXHR.getResponseHeader('WWW-Authenticate');
//        if (!challenge) {
//          done(new Error(errorMessages.headerNotFound));
//          return;
//        }
//
//        var spInfos = parseWwwAuthenticate(challenge);
//        done(null, spInfos.apBaseUrl, spInfos.modes);
//      };
//
//      var found = false;
//
//      return requestHelper.get(domain + cpa.endpoints.spDiscover)
//        .done(function(body, textStatus, jqXHR) {
//          callback(jqXHR);
//        })
//        .fail(function(jqXHR, textStatus, err) {
//          callback(jqXHR);
//        });
//
//
//  //    done(new Error('Unable to find available modes for domain : ' + domain));
//    },
    definition: definition,
    device: device
  };
});
