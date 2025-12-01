/**
 * Checkbox 组件
 * 复选框组件
 */

import type { JSX } from "preact";
import { cn } from "../../lib/utils.ts";

// ============================================================================
// 类型定义
// ============================================================================

export interface CheckboxProps {
  /** 是否选中 */
  checked?: boolean;
  /** 默认选中状态 */
  defaultChecked?: boolean;
  /** 是否禁用 */
  disabled?: boolean;
  /** 名称 */
  name?: string;
  /** 值 */
  value?: string;
  /** ID */
  id?: string;
  /** 变化回调 */
  onChange?: (checked: boolean) => void;
  /** 自定义类名 */
  className?: string;
  /** 标签 */
  label?: string;
  /** 描述 */
  description?: string;
  /** 不确定状态 */
  indeterminate?: boolean;
}

// ============================================================================
// 组件
// ============================================================================

/**
 * Checkbox 复选框组件
 */
export function Checkbox({
  checked,
  defaultChecked,
  disabled = false,
  name,
  value,
  id,
  onChange,
  className,
  label,
  description,
  indeterminate = false,
}: CheckboxProps): JSX.Element {
  const handleChange = (e: Event) => {
    const target = e.target as HTMLInputElement;
    onChange?.(target.checked);
  };

  const checkboxId = id || `checkbox-${name}-${value}`;

  return (
    <div className={cn("flex items-start gap-2", className)}>
      <div className="relative flex items-center">
        <input
          type="checkbox"
          id={checkboxId}
          name={name}
          value={value}
          checked={checked}
          defaultChecked={defaultChecked}
          disabled={disabled}
          onChange={handleChange}
          ref={(el) => {
            if (el) {
              el.indeterminate = indeterminate;
            }
          }}
          className={cn(
            "peer h-4 w-4 shrink-0 rounded border border-gray-300 dark:border-gray-600",
            "bg-white dark:bg-gray-800",
            "text-primary-600 focus:ring-primary-500 focus:ring-2 focus:ring-offset-2",
            "disabled:cursor-not-allowed disabled:opacity-50",
            "transition-colors",
          )}
        />
        {/* 选中状态图标 */}
        <svg
          className={cn(
            "absolute left-0 top-0 h-4 w-4 pointer-events-none text-white",
            "opacity-0 peer-checked:opacity-100",
            "transition-opacity",
          )}
          viewBox="0 0 16 16"
          fill="currentColor"
        >
          <path d="M12.207 4.793a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L6.5 9.086l4.293-4.293a1 1 0 011.414 0z" />
        </svg>
        {/* 不确定状态图标 */}
        {indeterminate && (
          <svg
            className="absolute left-0 top-0 h-4 w-4 pointer-events-none text-white"
            viewBox="0 0 16 16"
            fill="currentColor"
          >
            <path d="M4 8a1 1 0 011-1h6a1 1 0 110 2H5a1 1 0 01-1-1z" />
          </svg>
        )}
      </div>
      {(label || description) && (
        <div className="flex flex-col">
          {label && (
            <label
              htmlFor={checkboxId}
              className={cn(
                "text-sm font-medium text-gray-900 dark:text-gray-100",
                disabled && "opacity-50 cursor-not-allowed",
              )}
            >
              {label}
            </label>
          )}
          {description && (
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {description}
            </span>
          )}
        </div>
      )}
    </div>
  );
}

// ============================================================================
// CheckboxGroup 组件
// ============================================================================

export interface CheckboxGroupProps {
  /** 选项 */
  options: Array<{
    value: string;
    label: string;
    description?: string;
    disabled?: boolean;
  }>;
  /** 选中的值 */
  value?: string[];
  /** 默认选中的值 */
  defaultValue?: string[];
  /** 名称 */
  name?: string;
  /** 变化回调 */
  onChange?: (values: string[]) => void;
  /** 是否禁用 */
  disabled?: boolean;
  /** 方向 */
  direction?: "horizontal" | "vertical";
  /** 自定义类名 */
  className?: string;
}

/**
 * CheckboxGroup 复选框组
 */
export function CheckboxGroup({
  options,
  value,
  defaultValue,
  name,
  onChange,
  disabled = false,
  direction = "vertical",
  className,
}: CheckboxGroupProps): JSX.Element {
  const handleChange = (optionValue: string, checked: boolean) => {
    const currentValues = value || defaultValue || [];
    const newValues = checked
      ? [...currentValues, optionValue]
      : currentValues.filter((v) => v !== optionValue);
    onChange?.(newValues);
  };

  const currentValues = value || defaultValue || [];

  return (
    <div
      className={cn(
        "flex gap-4",
        direction === "vertical" ? "flex-col" : "flex-row flex-wrap",
        className,
      )}
      role="group"
    >
      {options.map((option) => (
        <Checkbox
          key={option.value}
          name={name}
          value={option.value}
          label={option.label}
          description={option.description}
          checked={currentValues.includes(option.value)}
          disabled={disabled || option.disabled}
          onChange={(checked) => handleChange(option.value, checked)}
        />
      ))}
    </div>
  );
}

export default Checkbox;
