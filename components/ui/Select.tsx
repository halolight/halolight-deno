/**
 * Select 组件
 * 下拉选择框
 */

import type { JSX } from "preact";
import { useEffect, useRef, useState } from "preact/hooks";
import { cn } from "../../lib/utils.ts";

// ============================================================================
// 类型定义
// ============================================================================

export interface SelectOption {
  /** 值 */
  value: string;
  /** 显示标签 */
  label: string;
  /** 是否禁用 */
  disabled?: boolean;
  /** 描述 */
  description?: string;
}

export interface SelectProps {
  /** 选项列表 */
  options: SelectOption[];
  /** 当前值 */
  value?: string;
  /** 默认值 */
  defaultValue?: string;
  /** 占位符 */
  placeholder?: string;
  /** 名称 */
  name?: string;
  /** ID */
  id?: string;
  /** 是否禁用 */
  disabled?: boolean;
  /** 是否必填 */
  required?: boolean;
  /** 变化回调 */
  onChange?: (value: string) => void;
  /** 错误状态 */
  error?: boolean;
  /** 自定义类名 */
  className?: string;
  /** 尺寸 */
  size?: "sm" | "md" | "lg";
}

// ============================================================================
// 尺寸映射
// ============================================================================

const sizeClasses = {
  sm: "h-8 text-sm px-2",
  md: "h-10 text-sm px-3",
  lg: "h-12 text-base px-4",
};

// ============================================================================
// 组件
// ============================================================================

/**
 * Select 下拉选择框
 */
export function Select({
  options,
  value,
  defaultValue,
  placeholder = "请选择",
  name,
  id,
  disabled = false,
  required = false,
  onChange,
  error = false,
  className,
  size = "md",
}: SelectProps): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(
    value || defaultValue || "",
  );
  const containerRef = useRef<HTMLDivElement>(null);

  // 同步外部 value
  useEffect(() => {
    if (value !== undefined) {
      setSelectedValue(value);
    }
  }, [value]);

  // 点击外部关闭
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current && !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (optionValue: string) => {
    setSelectedValue(optionValue);
    setIsOpen(false);
    onChange?.(optionValue);
  };

  const selectedOption = options.find((opt) => opt.value === selectedValue);

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      {/* 隐藏的原生 select 用于表单提交 */}
      <select
        name={name}
        id={id}
        value={selectedValue}
        required={required}
        disabled={disabled}
        onChange={(e) => handleSelect((e.target as HTMLSelectElement).value)}
        className="sr-only"
        tabIndex={-1}
      >
        <option value="">{placeholder}</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} disabled={opt.disabled}>
            {opt.label}
          </option>
        ))}
      </select>

      {/* 自定义触发器 */}
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={cn(
          "flex w-full items-center justify-between rounded-md border",
          "bg-white dark:bg-gray-900",
          "border-gray-300 dark:border-gray-600",
          "text-gray-900 dark:text-gray-100",
          "focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent",
          "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-gray-100 dark:disabled:bg-gray-800",
          sizeClasses[size],
          error &&
            "border-red-500 focus:ring-red-500 dark:border-red-400 dark:focus:ring-red-400",
          isOpen && "ring-2 ring-primary-500 border-transparent",
        )}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span
          className={cn(!selectedOption && "text-gray-400 dark:text-gray-500")}
        >
          {selectedOption?.label || placeholder}
        </span>
        <svg
          className={cn(
            "h-4 w-4 text-gray-400 transition-transform",
            isOpen && "rotate-180",
          )}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* 下拉菜单 */}
      {isOpen && (
        <div
          className={cn(
            "absolute z-50 mt-1 w-full rounded-md border",
            "bg-white dark:bg-gray-900",
            "border-gray-200 dark:border-gray-700",
            "shadow-lg",
            "max-h-60 overflow-auto",
          )}
          role="listbox"
        >
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => !option.disabled && handleSelect(option.value)}
              disabled={option.disabled}
              className={cn(
                "flex w-full items-center px-3 py-2 text-sm text-left",
                "hover:bg-gray-100 dark:hover:bg-gray-800",
                option.value === selectedValue &&
                  "bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400",
                option.disabled && "opacity-50 cursor-not-allowed",
              )}
              role="option"
              aria-selected={option.value === selectedValue}
            >
              <div className="flex flex-col">
                <span>{option.label}</span>
                {option.description && (
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {option.description}
                  </span>
                )}
              </div>
              {option.value === selectedValue && (
                <svg
                  className="ml-auto h-4 w-4 text-primary-600 dark:text-primary-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default Select;
