/*global define*/
define('req', ['jquery'], function($) {
  'use strict';

  return {
    postJSON: function(url, body, accessToken) {
      return $.ajax({
        type: 'POST',
        url: url,
        data: JSON.stringify(body),
        contentType: 'application/json',
        beforeSend: function(xhr) {
          if (accessToken) {
            xhr.setRequestHeader('Authorization', 'Bearer ' + accessToken);
          }
        }
      });
    },

    postForm: function(url, uriEncodedBody, accessToken) {
      return $.ajax({
        type: 'POST',
        url: url,
        contentType: 'application/x-www-form-urlencoded',
        data: uriEncodedBody,
        beforeSend: function(xhr) {
          if (accessToken) {
            xhr.setRequestHeader('Authorization', 'Bearer ' + accessToken);
          }
        }
      });
    },

    get: function(url, accessToken) {
      return $.ajax({
        type: 'GET',
        url: url,
        beforeSend: function(xhr) {
          if (accessToken) {
            xhr.setRequestHeader('Authorization', 'Bearer ' + accessToken);
          }
        }
      });
    }
  };
});
