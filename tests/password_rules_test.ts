/**
 * 密码规则测试
 */

import { assertEquals } from "$std/assert/mod.ts";
import {
  getPasswordStrength,
  getPasswordStrengthColor,
  getPasswordStrengthText,
  isPasswordValid,
  type PasswordRule,
  passwordRules,
} from "../lib/auth/password-rules.ts";

// ============================================================================
// 密码规则测试
// ============================================================================

Deno.test("passwordRules - 返回密码规则列表", () => {
  assertEquals(Array.isArray(passwordRules), true);
  assertEquals(passwordRules.length > 0, true);
  // 每个规则应该有 label, test 属性
  passwordRules.forEach((rule: PasswordRule) => {
    assertEquals(typeof rule.label, "string");
    assertEquals(typeof rule.test, "function");
  });
});

// ============================================================================
// 密码强度检测测试
// ============================================================================

Deno.test("getPasswordStrength - 空密码", () => {
  const result = getPasswordStrength("");
  assertEquals(result, 0);
});

Deno.test("getPasswordStrength - 弱密码", () => {
  const result = getPasswordStrength("123");
  assertEquals(result < 4, true);
});

Deno.test("getPasswordStrength - 中等密码", () => {
  const result = getPasswordStrength("Password1");
  assertEquals(result >= 2, true);
});

Deno.test("getPasswordStrength - 强密码", () => {
  const result = getPasswordStrength("MyStr0ngPassword");
  assertEquals(result >= 3, true);
});

// ============================================================================
// 密码验证测试
// ============================================================================

Deno.test("isPasswordValid - 有效密码", () => {
  const result = isPasswordValid("MyPassword123");
  assertEquals(result, true);
});

Deno.test("isPasswordValid - 太短的密码", () => {
  const result = isPasswordValid("Ab1");
  assertEquals(result, false);
});

Deno.test("isPasswordValid - 没有数字的密码", () => {
  const result = isPasswordValid("MyPassword");
  assertEquals(result, false);
});

Deno.test("isPasswordValid - 没有大写字母的密码", () => {
  const result = isPasswordValid("mypassword123");
  assertEquals(result, false);
});

// ============================================================================
// 密码强度文本测试
// ============================================================================

Deno.test("getPasswordStrengthText - 根据强度返回文本", () => {
  assertEquals(getPasswordStrengthText(0), "非常弱");
  assertEquals(getPasswordStrengthText(1), "弱");
  assertEquals(getPasswordStrengthText(2), "一般");
  assertEquals(getPasswordStrengthText(3), "强");
  assertEquals(getPasswordStrengthText(4), "非常强");
});

// ============================================================================
// 密码强度颜色测试
// ============================================================================

Deno.test("getPasswordStrengthColor - 根据强度返回颜色", () => {
  const colorWeak = getPasswordStrengthColor(1);
  const colorMedium = getPasswordStrengthColor(2);
  const colorStrong = getPasswordStrengthColor(4);

  assertEquals(typeof colorWeak, "string");
  assertEquals(typeof colorMedium, "string");
  assertEquals(typeof colorStrong, "string");
  // 颜色应该不同
  assertEquals(colorWeak !== colorStrong, true);
});
