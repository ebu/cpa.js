/*global require*/
require.config({
  baseUrl: 'src',
  paths: {
    'jquery':      'lib/jquery/dist/jquery.min',
    'logger':      'lib/js-logger/src/logger.min'
  },
  shim: {
  }
});

require(['cpa']);
