import { formatCurrency } from "../../scripts/utils/money.js";

describe("Test Suite: formatCurrency", () => {
  it("should format 2095 as 20.95", () => {
    expect(formatCurrency(2095)).toBe("20.95");
  });

  it("should format 0 as 0.00", () => {
    expect(formatCurrency(0)).toBe("0.00");
  });

  it("should format -1580 as -15.80", () => {
    expect(formatCurrency(-1580)).toBe("-15.80");
  });

  it("should format 1000000 as 10000.00", () => {
    expect(formatCurrency(1000000)).toBe("10000.00");
  });

  it("should format 2000.5 as 20.01", () => {
    expect(formatCurrency(2000.5)).toBe("20.01");
  });

});
