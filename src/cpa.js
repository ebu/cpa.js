/*global define*/
define('cpa', ['./cpa/definition', './cpa/device-flow'],
  function(definition, device) {
  'use strict';

  return {
    definition: definition,
    device: device
  };
});
