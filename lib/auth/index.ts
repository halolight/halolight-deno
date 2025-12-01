/**
 * 认证模块入口
 * 导出所有认证相关工具函数
 */

export {
  getPasswordStrength,
  getPasswordStrengthColor,
  getPasswordStrengthText,
  getPasswordValidationResults,
  isPasswordValid,
  type PasswordRule,
  passwordRules,
} from "./password-rules.ts";
