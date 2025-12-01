/**
 * Switch 组件
 * 开关切换组件
 */

import type { JSX } from "preact";
import { cn } from "../../lib/utils.ts";

// ============================================================================
// 类型定义
// ============================================================================

export interface SwitchProps {
  /** 是否开启 */
  checked?: boolean;
  /** 默认状态 */
  defaultChecked?: boolean;
  /** 是否禁用 */
  disabled?: boolean;
  /** 名称 */
  name?: string;
  /** ID */
  id?: string;
  /** 变化回调 */
  onChange?: (checked: boolean) => void;
  /** 尺寸 */
  size?: "sm" | "md" | "lg";
  /** 自定义类名 */
  className?: string;
  /** 标签 */
  label?: string;
  /** 描述 */
  description?: string;
}

// ============================================================================
// 尺寸映射
// ============================================================================

const sizeConfig = {
  sm: {
    track: "h-4 w-7",
    thumb: "h-3 w-3",
    translate: "translate-x-3",
  },
  md: {
    track: "h-5 w-9",
    thumb: "h-4 w-4",
    translate: "translate-x-4",
  },
  lg: {
    track: "h-6 w-11",
    thumb: "h-5 w-5",
    translate: "translate-x-5",
  },
};

// ============================================================================
// 组件
// ============================================================================

/**
 * Switch 开关组件
 */
export function Switch({
  checked,
  defaultChecked,
  disabled = false,
  name,
  id,
  onChange,
  size = "md",
  className,
  label,
  description,
}: SwitchProps): JSX.Element {
  const handleChange = (e: Event) => {
    const target = e.target as HTMLInputElement;
    onChange?.(target.checked);
  };

  const switchId = id || `switch-${name}`;
  const config = sizeConfig[size];

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <label className="relative inline-flex cursor-pointer items-center">
        <input
          type="checkbox"
          id={switchId}
          name={name}
          checked={checked}
          defaultChecked={defaultChecked}
          disabled={disabled}
          onChange={handleChange}
          className="peer sr-only"
        />
        {/* Track */}
        <span
          className={cn(
            "relative inline-flex shrink-0 cursor-pointer items-center rounded-full",
            "bg-gray-200 dark:bg-gray-700",
            "peer-checked:bg-primary-600",
            "peer-focus:ring-2 peer-focus:ring-primary-500 peer-focus:ring-offset-2",
            "peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
            "transition-colors duration-200",
            config.track,
          )}
        >
          {/* Thumb */}
          <span
            className={cn(
              "inline-block rounded-full bg-white shadow-sm",
              "transform transition-transform duration-200",
              "translate-x-0.5 peer-checked:translate-x-0",
              config.thumb,
            )}
            style={{
              transform: checked
                ? `translateX(calc(100% + 2px))`
                : "translateX(2px)",
            }}
          />
        </span>
      </label>
      {(label || description) && (
        <div className="flex flex-col">
          {label && (
            <label
              htmlFor={switchId}
              className={cn(
                "text-sm font-medium text-gray-900 dark:text-gray-100 cursor-pointer",
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

export default Switch;
