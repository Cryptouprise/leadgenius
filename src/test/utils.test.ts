import { describe, it, expect } from "vitest";
import {
  formatNumber,
  formatCurrency,
  formatPercentage,
  truncate,
  getInitials,
  isEmpty,
  generateId,
  isValidEmail,
  isValidPhone,
} from "@/lib/utils";

describe("Utility Functions", () => {
  describe("formatNumber", () => {
    it("formats numbers with commas", () => {
      expect(formatNumber(1000)).toBe("1,000");
      expect(formatNumber(1000000)).toBe("1,000,000");
      expect(formatNumber(123)).toBe("123");
    });
  });

  describe("formatCurrency", () => {
    it("formats currency correctly", () => {
      expect(formatCurrency(1000)).toBe("$1,000.00");
      expect(formatCurrency(99.99)).toBe("$99.99");
    });
  });

  describe("formatPercentage", () => {
    it("formats percentages correctly", () => {
      expect(formatPercentage(25.5)).toBe("25.5%");
      expect(formatPercentage(100, 0)).toBe("100%");
      expect(formatPercentage(33.333, 2)).toBe("33.33%");
    });
  });

  describe("truncate", () => {
    it("truncates long text", () => {
      expect(truncate("Hello World", 5)).toBe("He...");
      expect(truncate("Short", 10)).toBe("Short");
    });
  });

  describe("getInitials", () => {
    it("generates initials from names", () => {
      expect(getInitials("John Doe")).toBe("JD");
      expect(getInitials("Jane Mary Smith")).toBe("JM");
      expect(getInitials("Alice")).toBe("A");
    });
  });

  describe("isEmpty", () => {
    it("checks if values are empty", () => {
      expect(isEmpty(null)).toBe(true);
      expect(isEmpty(undefined)).toBe(true);
      expect(isEmpty("")).toBe(true);
      expect(isEmpty("  ")).toBe(true);
      expect(isEmpty([])).toBe(true);
      expect(isEmpty({})).toBe(true);
      expect(isEmpty("hello")).toBe(false);
      expect(isEmpty([1])).toBe(false);
      expect(isEmpty({ a: 1 })).toBe(false);
    });
  });

  describe("generateId", () => {
    it("generates unique IDs", () => {
      const id1 = generateId();
      const id2 = generateId();
      expect(id1).not.toBe(id2);
      expect(id1).toMatch(/^[a-z0-9]+-[a-z0-9]+$/);
    });

    it("generates IDs with prefix", () => {
      const id = generateId("lead");
      expect(id).toMatch(/^lead-[a-z0-9]+-[a-z0-9]+$/);
    });
  });

  describe("isValidEmail", () => {
    it("validates email addresses", () => {
      expect(isValidEmail("test@example.com")).toBe(true);
      expect(isValidEmail("user.name@domain.co.uk")).toBe(true);
      expect(isValidEmail("invalid@")).toBe(false);
      expect(isValidEmail("@example.com")).toBe(false);
      expect(isValidEmail("notanemail")).toBe(false);
    });
  });

  describe("isValidPhone", () => {
    it("validates phone numbers", () => {
      expect(isValidPhone("1234567890")).toBe(true);
      expect(isValidPhone("123-456-7890")).toBe(true);
      expect(isValidPhone("(123) 456-7890")).toBe(true);
      expect(isValidPhone("+11234567890")).toBe(true);
      expect(isValidPhone("123")).toBe(false);
    });
  });
});
