/**
 * AlertDialog 确认对话框组件
 * 用于需要用户确认的危险操作
 */
import type { ComponentChildren } from "preact";
import { useEffect, useRef } from "preact/hooks";
import { cn } from "../../lib/utils.ts";
import Button from "./Button.tsx";

interface AlertDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: ComponentChildren;
}

interface AlertDialogTriggerProps {
  children: ComponentChildren;
  asChild?: boolean;
  onClick?: () => void;
}

interface AlertDialogContentProps {
  children: ComponentChildren;
  className?: string;
}

interface AlertDialogHeaderProps {
  children: ComponentChildren;
  className?: string;
}

interface AlertDialogFooterProps {
  children: ComponentChildren;
  className?: string;
}

interface AlertDialogTitleProps {
  children: ComponentChildren;
  className?: string;
}

interface AlertDialogDescriptionProps {
  children: ComponentChildren;
  className?: string;
}

interface AlertDialogActionProps {
  children: ComponentChildren;
  className?: string;
  onClick?: () => void;
}

interface AlertDialogCancelProps {
  children: ComponentChildren;
  className?: string;
  onClick?: () => void;
}

export function AlertDialog(
  { open, onOpenChange: _onOpenChange, children }: AlertDialogProps,
) {
  return (
    <div data-state={open ? "open" : "closed"}>
      {children}
    </div>
  );
}

export function AlertDialogTrigger(
  { children, onClick }: AlertDialogTriggerProps,
) {
  return (
    <div onClick={onClick} className="inline-block cursor-pointer">
      {children}
    </div>
  );
}

export function AlertDialogContent(
  { children, className }: AlertDialogContentProps,
) {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        // 关闭对话框的逻辑应该由父组件处理
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      {/* 背景遮罩 */}
      <div className="fixed inset-0 z-50 bg-black/50 animate-in fade-in-0" />
      {/* 内容 */}
      <div
        ref={contentRef}
        className={cn(
          "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-white dark:bg-gray-800 p-6 shadow-lg duration-200 rounded-lg",
          "animate-in fade-in-0 zoom-in-95",
          className,
        )}
      >
        {children}
      </div>
    </>
  );
}

export function AlertDialogHeader(
  { children, className }: AlertDialogHeaderProps,
) {
  return (
    <div
      className={cn(
        "flex flex-col space-y-2 text-center sm:text-left",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function AlertDialogFooter(
  { children, className }: AlertDialogFooterProps,
) {
  return (
    <div
      className={cn(
        "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function AlertDialogTitle(
  { children, className }: AlertDialogTitleProps,
) {
  return (
    <h2
      className={cn(
        "text-lg font-semibold text-gray-900 dark:text-white",
        className,
      )}
    >
      {children}
    </h2>
  );
}

export function AlertDialogDescription(
  { children, className }: AlertDialogDescriptionProps,
) {
  return (
    <p className={cn("text-sm text-gray-500 dark:text-gray-400", className)}>
      {children}
    </p>
  );
}

export function AlertDialogAction(
  { children, className, onClick }: AlertDialogActionProps,
) {
  return (
    <Button variant="primary" className={className} onClick={onClick}>
      {children}
    </Button>
  );
}

export function AlertDialogCancel(
  { children, className, onClick }: AlertDialogCancelProps,
) {
  return (
    <Button
      variant="outline"
      className={cn("mt-2 sm:mt-0", className)}
      onClick={onClick}
    >
      {children}
    </Button>
  );
}

export default AlertDialog;
