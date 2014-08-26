describe("The cpa object", function() {
  it("should exist", function() {
    expect(cpa).to.be.ok;
  });

  it("should contain a device object", function() {
    expect(cpa.device).to.be.ok;
  });

  it("should contain protocol calls", function() {
    expect(cpa.device.registerClient).to.be.a("function");
    expect(cpa.device.requestUserCode).to.be.a("function");
    expect(cpa.device.requestClientAccessToken).to.be.a("function");
    expect(cpa.device.requestUserAccessToken).to.be.a("function");
  });
});
