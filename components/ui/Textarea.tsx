/**
 * Textarea 组件
 * 多行文本输入框
 */

import type { JSX } from "preact";
import { cn } from "../../lib/utils.ts";

// ============================================================================
// 类型定义
// ============================================================================

export interface TextareaProps {
  /** 值 */
  value?: string;
  /** 默认值 */
  defaultValue?: string;
  /** 占位符 */
  placeholder?: string;
  /** 名称 */
  name?: string;
  /** ID */
  id?: string;
  /** 行数 */
  rows?: number;
  /** 是否禁用 */
  disabled?: boolean;
  /** 是否只读 */
  readOnly?: boolean;
  /** 是否必填 */
  required?: boolean;
  /** 最大长度 */
  maxLength?: number;
  /** 最小长度 */
  minLength?: number;
  /** 是否自动调整高度 */
  autoResize?: boolean;
  /** 变化回调 */
  onChange?: (value: string) => void;
  /** 失焦回调 */
  onBlur?: () => void;
  /** 聚焦回调 */
  onFocus?: () => void;
  /** 错误状态 */
  error?: boolean;
  /** 自定义类名 */
  className?: string;
}

// ============================================================================
// 组件
// ============================================================================

/**
 * Textarea 多行文本输入框
 */
export function Textarea({
  value,
  defaultValue,
  placeholder,
  name,
  id,
  rows = 3,
  disabled = false,
  readOnly = false,
  required = false,
  maxLength,
  minLength,
  autoResize = false,
  onChange,
  onBlur,
  onFocus,
  error = false,
  className,
}: TextareaProps): JSX.Element {
  const handleChange = (e: Event) => {
    const target = e.target as HTMLTextAreaElement;
    onChange?.(target.value);

    // 自动调整高度
    if (autoResize) {
      target.style.height = "auto";
      target.style.height = `${target.scrollHeight}px`;
    }
  };

  return (
    <textarea
      id={id}
      name={name}
      value={value}
      defaultValue={defaultValue}
      placeholder={placeholder}
      rows={rows}
      disabled={disabled}
      readOnly={readOnly}
      required={required}
      maxLength={maxLength}
      minLength={minLength}
      onChange={handleChange}
      onBlur={onBlur}
      onFocus={onFocus}
      className={cn(
        "flex min-h-[80px] w-full rounded-md border px-3 py-2 text-sm",
        "bg-white dark:bg-gray-900",
        "border-gray-300 dark:border-gray-600",
        "text-gray-900 dark:text-gray-100",
        "placeholder:text-gray-400 dark:placeholder:text-gray-500",
        "focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent",
        "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-gray-100 dark:disabled:bg-gray-800",
        "resize-y",
        error &&
          "border-red-500 focus:ring-red-500 dark:border-red-400 dark:focus:ring-red-400",
        autoResize && "resize-none overflow-hidden",
        className,
      )}
    />
  );
}

export default Textarea;
