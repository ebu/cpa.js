/*global define*/
define('cpa', ['./cpa/definition', 'logger', './cpa/device-flow'], function(definition, Logger, device) {
  'use strict';

  return {
    definition: definition,
    device: device
  };
});
