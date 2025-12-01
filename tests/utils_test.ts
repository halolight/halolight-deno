/**
 * 工具函数测试
 */

import { assertEquals, assertNotEquals } from "$std/assert/mod.ts";
import { cn, delay, formatDate, formatNumber, truncate } from "../lib/utils.ts";

// ============================================================================
// cn (className 合并函数) 测试
// ============================================================================

Deno.test("cn - 合并单个类名", () => {
  assertEquals(cn("foo"), "foo");
});

Deno.test("cn - 合并多个类名", () => {
  assertEquals(cn("foo", "bar"), "foo bar");
});

Deno.test("cn - 过滤 falsy 值", () => {
  assertEquals(cn("foo", false && "bar", "baz"), "foo baz");
  assertEquals(cn("foo", null, "bar"), "foo bar");
  assertEquals(cn("foo", undefined, "bar"), "foo bar");
});

Deno.test("cn - 条件类名", () => {
  const isActive = true;
  assertEquals(cn("base", isActive && "active"), "base active");

  const isDisabled = false;
  assertEquals(cn("base", isDisabled && "disabled"), "base");
});

// ============================================================================
// formatNumber 测试
// ============================================================================

Deno.test("formatNumber - 基本数字格式化", () => {
  assertEquals(formatNumber(1234), "1,234");
  assertEquals(formatNumber(1234567), "1,234,567");
});

Deno.test("formatNumber - 小数", () => {
  assertEquals(formatNumber(1234.56), "1,234.56");
});

Deno.test("formatNumber - 负数", () => {
  assertEquals(formatNumber(-1234), "-1,234");
});

Deno.test("formatNumber - 零", () => {
  assertEquals(formatNumber(0), "0");
});

// ============================================================================
// truncate 测试
// ============================================================================

Deno.test("truncate - 短于限制的字符串不截断", () => {
  assertEquals(truncate("hello", 10), "hello");
});

Deno.test("truncate - 长于限制的字符串截断并添加省略号", () => {
  assertEquals(truncate("hello world", 5), "hello...");
});

Deno.test("truncate - 空字符串", () => {
  assertEquals(truncate("", 10), "");
});

// ============================================================================
// formatDate 测试
// ============================================================================

Deno.test("formatDate - 格式化日期字符串", () => {
  const date = new Date("2024-01-15T10:30:00Z");
  const result = formatDate(date);
  // 结果应该包含日期部分
  assertEquals(typeof result, "string");
  assertNotEquals(result.length, 0);
});

// ============================================================================
// delay 测试
// ============================================================================

Deno.test("delay - 异步延迟函数", async () => {
  const start = Date.now();
  await delay(50);
  const elapsed = Date.now() - start;
  // 允许一些误差
  assertEquals(elapsed >= 40, true);
});
