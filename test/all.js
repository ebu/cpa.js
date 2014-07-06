test("The object cpa exists", function() {
  ok(cpa);
});

test("It contains an object device", function() {
  ok(cpa.device);
});

test("The protocol calls are present", function() {
  ok(cpa.device.registerClient);
  ok(cpa.device.requestUserCode);
  ok(cpa.device.requestClientAccessToken);
  ok(cpa.device.requestUserAccessToken);
});
