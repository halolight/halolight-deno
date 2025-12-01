/**
 * Sheet 侧边抽屉组件
 * 从屏幕边缘滑出的面板
 */
import type { ComponentChildren } from "preact";
import { useEffect } from "preact/hooks";
import { cn } from "../../lib/utils.ts";

type SheetSide = "top" | "right" | "bottom" | "left";

interface SheetProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: ComponentChildren;
}

interface SheetContentProps {
  children: ComponentChildren;
  className?: string;
  side?: SheetSide;
  showCloseButton?: boolean;
  onClose?: () => void;
}

interface SheetHeaderProps {
  children: ComponentChildren;
  className?: string;
}

interface SheetFooterProps {
  children: ComponentChildren;
  className?: string;
}

interface SheetTitleProps {
  children: ComponentChildren;
  className?: string;
}

interface SheetDescriptionProps {
  children: ComponentChildren;
  className?: string;
}

const sideStyles: Record<SheetSide, string> = {
  top: "inset-x-0 top-0 border-b animate-slide-in-from-top",
  right:
    "inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm animate-slide-in-from-right",
  bottom: "inset-x-0 bottom-0 border-t animate-slide-in-from-bottom",
  left:
    "inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm animate-slide-in-from-left",
};

export function Sheet(
  { open, onOpenChange: _onOpenChange, children }: SheetProps,
) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  return <>{children}</>;
}

export function SheetContent({
  children,
  className,
  side = "right",
  showCloseButton = true,
  onClose,
}: SheetContentProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && onClose) {
        onClose();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <>
      {/* 背景遮罩 */}
      <div
        className="fixed inset-0 z-50 bg-black/50 animate-in fade-in-0"
        onClick={onClose}
      />
      {/* 内容 */}
      <div
        className={cn(
          "fixed z-50 gap-4 bg-white dark:bg-gray-800 p-6 shadow-lg transition ease-in-out",
          sideStyles[side],
          className,
        )}
      >
        {showCloseButton && (
          <button
            type="button"
            onClick={onClose}
            className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-white transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
          >
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
            <span className="sr-only">关闭</span>
          </button>
        )}
        {children}
      </div>
    </>
  );
}

export function SheetHeader({ children, className }: SheetHeaderProps) {
  return (
    <div className={cn("flex flex-col space-y-2", className)}>
      {children}
    </div>
  );
}

export function SheetFooter({ children, className }: SheetFooterProps) {
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

export function SheetTitle({ children, className }: SheetTitleProps) {
  return (
    <h3
      className={cn(
        "text-lg font-semibold text-gray-900 dark:text-white",
        className,
      )}
    >
      {children}
    </h3>
  );
}

export function SheetDescription(
  { children, className }: SheetDescriptionProps,
) {
  return (
    <p className={cn("text-sm text-gray-500 dark:text-gray-400", className)}>
      {children}
    </p>
  );
}

export function SheetTrigger(
  { children, onClick }: { children: ComponentChildren; onClick?: () => void },
) {
  return (
    <div onClick={onClick} className="inline-block cursor-pointer">
      {children}
    </div>
  );
}

export function SheetClose(
  { children, onClick }: { children: ComponentChildren; onClick?: () => void },
) {
  return (
    <div onClick={onClick} className="inline-block cursor-pointer">
      {children}
    </div>
  );
}

export default Sheet;
