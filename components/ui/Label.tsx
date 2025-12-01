/**
 * Label 组件
 * 表单标签组件
 */

import type { ComponentChildren, JSX } from "preact";
import { cn } from "../../lib/utils.ts";

// ============================================================================
// 类型定义
// ============================================================================

export interface LabelProps {
  /** 内容 */
  children: ComponentChildren;
  /** 关联的表单元素 ID */
  htmlFor?: string;
  /** 是否必填 */
  required?: boolean;
  /** 是否禁用 */
  disabled?: boolean;
  /** 自定义类名 */
  className?: string;
}

// ============================================================================
// 组件
// ============================================================================

/**
 * Label 标签组件
 */
export function Label({
  children,
  htmlFor,
  required = false,
  disabled = false,
  className,
}: LabelProps): JSX.Element {
  return (
    <label
      htmlFor={htmlFor}
      className={cn(
        "flex items-center gap-2 text-sm leading-none font-medium select-none",
        disabled && "opacity-50 cursor-not-allowed",
        className,
      )}
    >
      {children}
      {required && (
        <span className="text-red-500" aria-hidden="true">
          *
        </span>
      )}
    </label>
  );
}

export default Label;
