/**
 * DropdownMenu 组件
 * 下拉菜单组件
 */

import type { ComponentChildren, JSX } from "preact";
import { useEffect, useRef, useState } from "preact/hooks";
import { cn } from "../../lib/utils.ts";

// ============================================================================
// 类型定义
// ============================================================================

export interface DropdownMenuItem {
  /** 唯一标识 */
  key: string;
  /** 标签 */
  label: string;
  /** 图标 */
  icon?: ComponentChildren;
  /** 是否禁用 */
  disabled?: boolean;
  /** 是否危险操作 */
  danger?: boolean;
  /** 分割线 */
  divider?: boolean;
  /** 快捷键提示 */
  shortcut?: string;
  /** 子菜单 */
  children?: DropdownMenuItem[];
}

export interface DropdownMenuProps {
  /** 触发元素 */
  trigger: ComponentChildren;
  /** 菜单项 */
  items: DropdownMenuItem[];
  /** 菜单点击回调 */
  onSelect?: (key: string, item: DropdownMenuItem) => void;
  /** 对齐方式 */
  align?: "start" | "center" | "end";
  /** 方向 */
  side?: "top" | "bottom";
  /** 自定义类名 */
  className?: string;
  /** 菜单类名 */
  menuClassName?: string;
}

// ============================================================================
// 组件
// ============================================================================

/**
 * DropdownMenu 下拉菜单组件
 */
export function DropdownMenu({
  trigger,
  items,
  onSelect,
  align = "start",
  side = "bottom",
  className,
  menuClassName,
}: DropdownMenuProps): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // 点击外部关闭
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current && !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const handleItemClick = (item: DropdownMenuItem) => {
    if (item.disabled || item.divider) return;
    onSelect?.(item.key, item);
    setIsOpen(false);
  };

  const alignClasses = {
    start: "left-0",
    center: "left-1/2 -translate-x-1/2",
    end: "right-0",
  };

  const sideClasses = {
    top: "bottom-full mb-1",
    bottom: "top-full mt-1",
  };

  return (
    <div ref={containerRef} className={cn("relative inline-block", className)}>
      {/* Trigger */}
      <div
        onClick={() =>
          setIsOpen(!isOpen)}
        className="cursor-pointer"
        aria-haspopup="menu"
        aria-expanded={isOpen}
      >
        {trigger}
      </div>

      {/* Menu */}
      {isOpen && (
        <div
          className={cn(
            "absolute z-50 min-w-[160px] py-1",
            "bg-white dark:bg-gray-900 rounded-md shadow-lg",
            "border border-gray-200 dark:border-gray-700",
            "animate-fade-in",
            alignClasses[align],
            sideClasses[side],
            menuClassName,
          )}
          role="menu"
        >
          {items.map((item, index) => {
            if (item.divider) {
              return (
                <div
                  key={item.key || `divider-${index}`}
                  className="my-1 h-px bg-gray-200 dark:bg-gray-700"
                  role="separator"
                />
              );
            }

            return (
              <button
                key={item.key}
                type="button"
                onClick={() => handleItemClick(item)}
                disabled={item.disabled}
                className={cn(
                  "flex w-full items-center gap-2 px-3 py-2 text-sm text-left",
                  "transition-colors",
                  item.disabled
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-gray-100 dark:hover:bg-gray-800",
                  item.danger
                    ? "text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                    : "text-gray-700 dark:text-gray-300",
                )}
                role="menuitem"
              >
                {item.icon && (
                  <span className="flex-shrink-0 w-4 h-4">{item.icon}</span>
                )}
                <span className="flex-1">{item.label}</span>
                {item.shortcut && (
                  <span className="ml-auto text-xs text-gray-400 dark:text-gray-500">
                    {item.shortcut}
                  </span>
                )}
                {item.children && (
                  <svg
                    className="w-4 h-4 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ============================================================================
// ContextMenu 右键菜单
// ============================================================================

export interface ContextMenuProps {
  /** 内容区域 */
  children: ComponentChildren;
  /** 菜单项 */
  items: DropdownMenuItem[];
  /** 菜单点击回调 */
  onSelect?: (key: string, item: DropdownMenuItem) => void;
  /** 自定义类名 */
  className?: string;
}

/**
 * ContextMenu 右键菜单组件
 */
export function ContextMenu({
  children,
  items,
  onSelect,
  className,
}: ContextMenuProps): JSX.Element {
  const [position, setPosition] = useState<{ x: number; y: number } | null>(
    null,
  );
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = () => setPosition(null);
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const handleContextMenu = (e: MouseEvent) => {
    e.preventDefault();
    setPosition({ x: e.clientX, y: e.clientY });
  };

  const handleItemClick = (item: DropdownMenuItem) => {
    if (item.disabled || item.divider) return;
    onSelect?.(item.key, item);
    setPosition(null);
  };

  return (
    <div
      ref={containerRef}
      onContextMenu={handleContextMenu}
      className={className}
    >
      {children}
      {position && (
        <div
          className={cn(
            "fixed z-50 min-w-[160px] py-1",
            "bg-white dark:bg-gray-900 rounded-md shadow-lg",
            "border border-gray-200 dark:border-gray-700",
            "animate-fade-in",
          )}
          style={{ left: position.x, top: position.y }}
          role="menu"
        >
          {items.map((item, index) => {
            if (item.divider) {
              return (
                <div
                  key={item.key || `divider-${index}`}
                  className="my-1 h-px bg-gray-200 dark:bg-gray-700"
                  role="separator"
                />
              );
            }

            return (
              <button
                key={item.key}
                type="button"
                onClick={() => handleItemClick(item)}
                disabled={item.disabled}
                className={cn(
                  "flex w-full items-center gap-2 px-3 py-2 text-sm text-left",
                  "transition-colors",
                  item.disabled
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-gray-100 dark:hover:bg-gray-800",
                  item.danger
                    ? "text-red-600 dark:text-red-400"
                    : "text-gray-700 dark:text-gray-300",
                )}
                role="menuitem"
              >
                {item.icon && (
                  <span className="flex-shrink-0 w-4 h-4">{item.icon}</span>
                )}
                <span className="flex-1">{item.label}</span>
                {item.shortcut && (
                  <span className="ml-auto text-xs text-gray-400">
                    {item.shortcut}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default DropdownMenu;
