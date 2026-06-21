import { formatPrice, formatDate, generateSlug } from "@/lib/utils";

describe("formatPrice", () => {
  it("formats price in Indian Rupee format", () => {
    expect(formatPrice(2500)).toBe("₹2,500");
  });

  it("handles zero", () => {
    expect(formatPrice(0)).toBe("₹0");
  });

  it("handles large numbers", () => {
    expect(formatPrice(150000)).toBe("₹1,50,000");
  });
});

describe("formatDate", () => {
  it("formats a date in en-IN short format", () => {
    const date = new Date("2025-06-15");
    expect(formatDate(date)).toBe("15 Jun 2025");
  });

  it("handles different months", () => {
    expect(formatDate(new Date("2025-01-01"))).toBe("1 Jan 2025");
    expect(formatDate(new Date("2025-12-25"))).toBe("25 Dec 2025");
  });
});

describe("generateSlug", () => {
  it("converts title to kebab case", () => {
    expect(generateSlug("Premium Cab Service")).toBe("premium-cab-service");
  });

  it("removes special characters", () => {
    expect(generateSlug("Pune to Mumbai! Cab @ Service")).toBe(
      "pune-to-mumbai-cab-service",
    );
  });

  it("trims leading and trailing hyphens", () => {
    expect(generateSlug("--hello-world--")).toBe("hello-world");
  });

  it("handles empty string", () => {
    expect(generateSlug("")).toBe("");
  });
});
