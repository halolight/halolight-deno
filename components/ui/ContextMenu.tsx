/**
 * ContextMenu 右键菜单组件
 * 右键点击触发的上下文菜单
 */
import type { ComponentChildren } from "preact";
import { useEffect, useRef } from "preact/hooks";
import { cn } from "../../lib/utils.ts";

interface ContextMenuProps {
  children: ComponentChildren;
}

interface ContextMenuTriggerProps {
  children: ComponentChildren;
  className?: string;
  onContextMenu?: (e: MouseEvent, position: { x: number; y: number }) => void;
}

interface ContextMenuContentProps {
  children: ComponentChildren;
  className?: string;
  position?: { x: number; y: number };
  onClose?: () => void;
}

interface ContextMenuItemProps {
  children: ComponentChildren;
  className?: string;
  onSelect?: () => void;
  disabled?: boolean;
  inset?: boolean;
  variant?: "default" | "destructive";
}

interface ContextMenuLabelProps {
  children: ComponentChildren;
  className?: string;
  inset?: boolean;
}

interface ContextMenuSeparatorProps {
  className?: string;
}

interface ContextMenuShortcutProps {
  children: ComponentChildren;
  className?: string;
}

export function ContextMenu({ children }: ContextMenuProps) {
  return <>{children}</>;
}

export function ContextMenuTrigger({
  children,
  className,
  onContextMenu,
}: ContextMenuTriggerProps) {
  const handleContextMenu = (e: MouseEvent) => {
    e.preventDefault();
    onContextMenu?.(e, { x: e.clientX, y: e.clientY });
  };

  return (
    <div
      onContextMenu={handleContextMenu}
      className={className}
    >
      {children}
    </div>
  );
}

export function ContextMenuContent({
  children,
  className,
  position,
  onClose,
}: ContextMenuContentProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        contentRef.current && !contentRef.current.contains(e.target as Node)
      ) {
        onClose?.();
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose?.();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  if (!position) return null;

  return (
    <div
      ref={contentRef}
      style={{
        position: "fixed",
        left: position.x,
        top: position.y,
        zIndex: 50,
      }}
      className={cn(
        "min-w-[8rem] overflow-hidden rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-1 shadow-lg",
        "animate-in fade-in-0 zoom-in-95",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function ContextMenuItem({
  children,
  className,
  onSelect,
  disabled,
  inset,
  variant = "default",
}: ContextMenuItemProps) {
  return (
    <div
      onClick={() => !disabled && onSelect?.()}
      className={cn(
        "relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none",
        "hover:bg-gray-100 dark:hover:bg-gray-700",
        variant === "destructive" &&
          "text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20",
        inset && "pl-8",
        disabled && "pointer-events-none opacity-50",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function ContextMenuCheckboxItem({
  children,
  className,
  checked,
  onCheckedChange,
  disabled,
}: {
  children: ComponentChildren;
  className?: string;
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
}) {
  return (
    <div
      onClick={() => !disabled && onCheckedChange?.(!checked)}
      className={cn(
        "relative flex cursor-pointer select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none",
        "hover:bg-gray-100 dark:hover:bg-gray-700",
        disabled && "pointer-events-none opacity-50",
        className,
      )}
    >
      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        {checked && (
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        )}
      </span>
      {children}
    </div>
  );
}

export function ContextMenuLabel(
  { children, className, inset }: ContextMenuLabelProps,
) {
  return (
    <div
      className={cn(
        "px-2 py-1.5 text-sm font-semibold text-gray-900 dark:text-white",
        inset && "pl-8",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function ContextMenuSeparator({ className }: ContextMenuSeparatorProps) {
  return (
    <div
      className={cn("-mx-1 my-1 h-px bg-gray-200 dark:bg-gray-700", className)}
    />
  );
}

export function ContextMenuShortcut(
  { children, className }: ContextMenuShortcutProps,
) {
  return (
    <span
      className={cn("ml-auto text-xs tracking-widest text-gray-400", className)}
    >
      {children}
    </span>
  );
}

export function ContextMenuGroup(
  { children }: { children: ComponentChildren },
) {
  return <>{children}</>;
}

export function ContextMenuSub({ children }: { children: ComponentChildren }) {
  return <>{children}</>;
}

export function ContextMenuSubTrigger({
  children,
  className,
  inset,
}: {
  children: ComponentChildren;
  className?: string;
  inset?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none",
        "hover:bg-gray-100 dark:hover:bg-gray-700",
        inset && "pl-8",
        className,
      )}
    >
      {children}
      <svg
        className="ml-auto h-4 w-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 5l7 7-7 7"
        />
      </svg>
    </div>
  );
}

export function ContextMenuSubContent({
  children,
  className,
}: {
  children: ComponentChildren;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "min-w-[8rem] overflow-hidden rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-1 shadow-lg",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function ContextMenuRadioGroup(
  { children }: { children: ComponentChildren },
) {
  return <>{children}</>;
}

export function ContextMenuRadioItem({
  children,
  className,
  value,
  checked,
  onSelect,
}: {
  children: ComponentChildren;
  className?: string;
  value: string;
  checked?: boolean;
  onSelect?: (value: string) => void;
}) {
  return (
    <div
      onClick={() => onSelect?.(value)}
      className={cn(
        "relative flex cursor-pointer select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none",
        "hover:bg-gray-100 dark:hover:bg-gray-700",
        className,
      )}
    >
      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        {checked && (
          <svg className="h-2 w-2 fill-current" viewBox="0 0 8 8">
            <circle cx="4" cy="4" r="4" />
          </svg>
        )}
      </span>
      {children}
    </div>
  );
}

export default ContextMenu;
