/*global require*/
require.config({
  baseUrl: 'src',
  paths: {
    'jquery':      'lib/jquery/dist/jquery.min',
    'logger':      'lib/js-logger/src/logger.min',
    'require':     'lib/require.js/build/require.min',
    'request':     'utils/req'
  }
});

require(['cpa']);
