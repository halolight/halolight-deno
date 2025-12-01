/**
 * 密码规则验证
 * 提供密码强度检测和验证规则
 */

// ============================================================================
// 密码规则定义
// ============================================================================

export interface PasswordRule {
  /** 规则标签 */
  label: string;
  /** 验证函数 */
  test: (password: string) => boolean;
}

/**
 * 密码验证规则列表
 */
export const passwordRules: PasswordRule[] = [
  { label: "至少 8 个字符", test: (p: string) => p.length >= 8 },
  { label: "包含大写字母", test: (p: string) => /[A-Z]/.test(p) },
  { label: "包含小写字母", test: (p: string) => /[a-z]/.test(p) },
  { label: "包含数字", test: (p: string) => /[0-9]/.test(p) },
];

// ============================================================================
// 密码强度计算
// ============================================================================

/**
 * 获取密码强度等级
 * @param password 密码字符串
 * @returns 强度等级 0-4，数字越大强度越高
 */
export function getPasswordStrength(password: string): number {
  return passwordRules.filter((rule) => rule.test(password)).length;
}

/**
 * 获取密码强度文本描述
 * @param strength 强度等级
 * @returns 强度描述文本
 */
export function getPasswordStrengthText(strength: number): string {
  switch (strength) {
    case 0:
      return "非常弱";
    case 1:
      return "弱";
    case 2:
      return "一般";
    case 3:
      return "强";
    case 4:
      return "非常强";
    default:
      return "未知";
  }
}

/**
 * 获取密码强度对应的颜色类名
 * @param strength 强度等级
 * @returns Tailwind CSS 颜色类名
 */
export function getPasswordStrengthColor(strength: number): string {
  switch (strength) {
    case 0:
    case 1:
      return "bg-red-500";
    case 2:
      return "bg-orange-500";
    case 3:
      return "bg-yellow-500";
    case 4:
      return "bg-green-500";
    default:
      return "bg-gray-300";
  }
}

/**
 * 验证密码是否满足所有规则
 * @param password 密码字符串
 * @returns 是否满足所有规则
 */
export function isPasswordValid(password: string): boolean {
  return passwordRules.every((rule) => rule.test(password));
}

/**
 * 获取密码验证结果详情
 * @param password 密码字符串
 * @returns 每条规则的验证结果
 */
export function getPasswordValidationResults(
  password: string,
): Array<{ rule: PasswordRule; passed: boolean }> {
  return passwordRules.map((rule) => ({
    rule,
    passed: rule.test(password),
  }));
}
