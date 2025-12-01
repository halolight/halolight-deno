/**
 * Command 命令面板组件
 * 用于搜索和执行命令
 */
import type { ComponentChildren } from "preact";
import { useEffect, useRef } from "preact/hooks";
import { cn } from "../../lib/utils.ts";

interface CommandProps {
  children: ComponentChildren;
  className?: string;
}

interface CommandDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: ComponentChildren;
  title?: string;
  description?: string;
}

interface CommandInputProps {
  placeholder?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  className?: string;
}

interface CommandListProps {
  children: ComponentChildren;
  className?: string;
}

interface CommandEmptyProps {
  children?: ComponentChildren;
}

interface CommandGroupProps {
  children: ComponentChildren;
  heading?: string;
  className?: string;
}

interface CommandItemProps {
  children: ComponentChildren;
  className?: string;
  onSelect?: () => void;
  disabled?: boolean;
}

interface CommandSeparatorProps {
  className?: string;
}

interface CommandShortcutProps {
  children: ComponentChildren;
  className?: string;
}

export function Command({ children, className }: CommandProps) {
  return (
    <div
      className={cn(
        "flex h-full w-full flex-col overflow-hidden rounded-md bg-white dark:bg-gray-800",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function CommandDialog({
  open,
  onOpenChange,
  children,
  title: _title = "命令面板",
  description: _description = "搜索命令...",
}: CommandDialogProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        onOpenChange?.(!open);
      }
      if (e.key === "Escape" && open) {
        onOpenChange?.(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, onOpenChange]);

  if (!open) return null;

  return (
    <>
      {/* 背景遮罩 */}
      <div
        className="fixed inset-0 z-50 bg-black/50 animate-in fade-in-0"
        onClick={() => onOpenChange?.(false)}
      />
      {/* 内容 */}
      <div className="fixed left-[50%] top-[50%] z-50 w-full max-w-lg translate-x-[-50%] translate-y-[-50%] animate-in fade-in-0 zoom-in-95">
        <Command className="border border-gray-200 dark:border-gray-700 shadow-lg">
          {children}
        </Command>
      </div>
    </>
  );
}

export function CommandInput({
  placeholder = "搜索...",
  value,
  onValueChange,
  className,
}: CommandInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className="flex items-center border-b border-gray-200 dark:border-gray-700 px-3">
      <svg
        className="mr-2 h-4 w-4 shrink-0 opacity-50"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
      <input
        ref={inputRef}
        type="text"
        placeholder={placeholder}
        value={value}
        onInput={(e) => onValueChange?.((e.target as HTMLInputElement).value)}
        className={cn(
          "flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-gray-400 disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
      />
    </div>
  );
}

export function CommandList({ children, className }: CommandListProps) {
  return (
    <div
      className={cn(
        "max-h-[300px] overflow-y-auto overflow-x-hidden",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function CommandEmpty({ children = "未找到结果" }: CommandEmptyProps) {
  return (
    <div className="py-6 text-center text-sm text-gray-500 dark:text-gray-400">
      {children}
    </div>
  );
}

export function CommandGroup(
  { children, heading, className }: CommandGroupProps,
) {
  return (
    <div className={cn("overflow-hidden p-1", className)}>
      {heading && (
        <div className="px-2 py-1.5 text-xs font-medium text-gray-500 dark:text-gray-400">
          {heading}
        </div>
      )}
      {children}
    </div>
  );
}

export function CommandItem({
  children,
  className,
  onSelect,
  disabled,
}: CommandItemProps) {
  return (
    <div
      onClick={() => !disabled && onSelect?.()}
      className={cn(
        "relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none",
        "hover:bg-gray-100 dark:hover:bg-gray-700",
        disabled && "pointer-events-none opacity-50",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function CommandSeparator({ className }: CommandSeparatorProps) {
  return (
    <div className={cn("-mx-1 h-px bg-gray-200 dark:bg-gray-700", className)} />
  );
}

export function CommandShortcut({ children, className }: CommandShortcutProps) {
  return (
    <span
      className={cn("ml-auto text-xs tracking-widest text-gray-400", className)}
    >
      {children}
    </span>
  );
}

export default Command;
