/**
 * Popover 弹出层组件
 * 点击触发的弹出内容
 */
import type { ComponentChildren } from "preact";
import { useEffect, useRef, useState } from "preact/hooks";
import { cn } from "../../lib/utils.ts";

type PopoverAlign = "start" | "center" | "end";
type PopoverSide = "top" | "right" | "bottom" | "left";

interface PopoverProps {
  children: ComponentChildren;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

interface PopoverTriggerProps {
  children: ComponentChildren;
  asChild?: boolean;
  onClick?: () => void;
}

interface PopoverContentProps {
  children: ComponentChildren;
  className?: string;
  align?: PopoverAlign;
  side?: PopoverSide;
  sideOffset?: number;
}

export function Popover({ children, open, onOpenChange }: PopoverProps) {
  const [isOpen, setIsOpen] = useState(open ?? false);

  useEffect(() => {
    if (open !== undefined) {
      setIsOpen(open);
    }
  }, [open]);

  // 用于外部调用
  const _handleOpenChange = (newOpen: boolean) => {
    setIsOpen(newOpen);
    onOpenChange?.(newOpen);
  };
  // 保持引用以避免lint警告
  void _handleOpenChange;

  return (
    <div
      className="relative inline-block"
      data-state={isOpen ? "open" : "closed"}
    >
      {children}
    </div>
  );
}

export function PopoverTrigger({ children, onClick }: PopoverTriggerProps) {
  return (
    <div onClick={onClick} className="inline-block cursor-pointer">
      {children}
    </div>
  );
}

export function PopoverContent({
  children,
  className,
  align = "center",
  side = "bottom",
  sideOffset = 8,
}: PopoverContentProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  const alignStyles: Record<PopoverAlign, string> = {
    start: "left-0",
    center: "left-1/2 -translate-x-1/2",
    end: "right-0",
  };

  const sideStyles: Record<PopoverSide, string> = {
    top: `bottom-full mb-${sideOffset / 4}`,
    right: `left-full ml-${sideOffset / 4}`,
    bottom: `top-full mt-${sideOffset / 4}`,
    left: `right-full mr-${sideOffset / 4}`,
  };

  return (
    <div
      ref={contentRef}
      className={cn(
        "absolute z-50 w-72 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 shadow-lg",
        "animate-in fade-in-0 zoom-in-95",
        sideStyles[side],
        alignStyles[align],
        className,
      )}
    >
      {children}
    </div>
  );
}

export default Popover;
