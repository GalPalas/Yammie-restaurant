const util = require("../../../util");

describe("getCurrentDate", () => {
  it("should return the current date", () => {
    const result = util.getCurrentDate();
    expect(result).toBeDefined();
  });
});
