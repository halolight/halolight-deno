/**
 * QuickSettings 快速设置面板组件
 * 侧边滑出的设置面板，用于快速调整主题、布局等
 */
import type { ComponentChildren } from "preact";
import { useEffect, useRef, useState } from "preact/hooks";
import { cn } from "../../lib/utils.ts";

interface QuickSettingsProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
}

type ThemeOption = "light" | "dark" | "system";
type SkinOption = "default" | "blue" | "green" | "purple" | "orange";

const themeOptions: {
  value: ThemeOption;
  label: string;
  icon: ComponentChildren;
}[] = [
  {
    value: "light",
    label: "浅色",
    icon: (
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
          d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
        />
      </svg>
    ),
  },
  {
    value: "dark",
    label: "深色",
    icon: (
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
          d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
        />
      </svg>
    ),
  },
  {
    value: "system",
    label: "跟随系统",
    icon: (
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
          d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
      </svg>
    ),
  },
];

const skinOptions: { value: SkinOption; label: string; color: string }[] = [
  { value: "default", label: "默认", color: "bg-blue-500" },
  { value: "blue", label: "蓝色", color: "bg-sky-500" },
  { value: "green", label: "绿色", color: "bg-emerald-500" },
  { value: "purple", label: "紫色", color: "bg-purple-500" },
  { value: "orange", label: "橙色", color: "bg-orange-500" },
];

export function QuickSettings({
  open = false,
  onOpenChange,
  className,
}: QuickSettingsProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const [theme, setTheme] = useState<ThemeOption>("system");
  const [skin, setSkin] = useState<SkinOption>("default");
  const [showSidebar, setShowSidebar] = useState(true);
  const [showFooter, setShowFooter] = useState(true);
  const [showTabBar, setShowTabBar] = useState(false);
  const [compactMode, setCompactMode] = useState(false);

  // 点击外部关闭
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        onOpenChange?.(false);
      }
    };
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open, onOpenChange]);

  // ESC 关闭
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        onOpenChange?.(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, onOpenChange]);

  // 应用主题
  const handleThemeChange = (newTheme: ThemeOption) => {
    setTheme(newTheme);
    if (typeof localStorage !== "undefined") {
      localStorage.setItem("theme", newTheme);
    }
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else if (newTheme === "light") {
      document.documentElement.classList.remove("dark");
    } else {
      // system
      const prefersDark = globalThis.matchMedia?.(
        "(prefers-color-scheme: dark)",
      ).matches;
      document.documentElement.classList.toggle("dark", prefersDark);
    }
  };

  if (!open) return null;

  return (
    <>
      {/* 背景遮罩 */}
      <div className="fixed inset-0 z-40 bg-black/30 animate-in fade-in-0" />

      {/* 设置面板 */}
      <div
        ref={panelRef}
        className={cn(
          "fixed right-0 top-0 z-50 h-full w-80 bg-white dark:bg-gray-900 shadow-2xl",
          "animate-in slide-in-from-right",
          className,
        )}
      >
        {/* 头部 */}
        <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 px-4 py-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            快速设置
          </h2>
          <button
            type="button"
            onClick={() => onOpenChange?.(false)}
            className="p-2 rounded-lg text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <svg
              className="h-5 w-5"
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
          </button>
        </div>

        {/* 内容 */}
        <div className="h-[calc(100%-64px)] overflow-y-auto p-4 space-y-6">
          {/* 主题设置 */}
          <section>
            <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
              主题模式
            </h3>
            <div className="grid grid-cols-3 gap-2">
              {themeOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => handleThemeChange(option.value)}
                  className={cn(
                    "flex flex-col items-center gap-2 rounded-lg border p-3 transition-colors",
                    theme === option.value
                      ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
                      : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600",
                  )}
                >
                  {option.icon}
                  <span className="text-xs font-medium">{option.label}</span>
                </button>
              ))}
            </div>
          </section>

          {/* 主题色 */}
          <section>
            <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
              主题色
            </h3>
            <div className="flex flex-wrap gap-2">
              {skinOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setSkin(option.value)}
                  className={cn(
                    "flex items-center gap-2 rounded-lg border px-3 py-2 transition-colors",
                    skin === option.value
                      ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                      : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600",
                  )}
                >
                  <span className={cn("h-4 w-4 rounded-full", option.color)} />
                  <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                    {option.label}
                  </span>
                </button>
              ))}
            </div>
          </section>

          {/* 布局设置 */}
          <section>
            <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
              布局设置
            </h3>
            <div className="space-y-3">
              <label className="flex items-center justify-between">
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  显示侧边栏
                </span>
                <button
                  type="button"
                  onClick={() => setShowSidebar(!showSidebar)}
                  className={cn(
                    "relative h-6 w-11 rounded-full transition-colors",
                    showSidebar
                      ? "bg-blue-500"
                      : "bg-gray-300 dark:bg-gray-600",
                  )}
                >
                  <span
                    className={cn(
                      "absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white transition-transform",
                      showSidebar && "translate-x-5",
                    )}
                  />
                </button>
              </label>
              <label className="flex items-center justify-between">
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  显示页脚
                </span>
                <button
                  type="button"
                  onClick={() => setShowFooter(!showFooter)}
                  className={cn(
                    "relative h-6 w-11 rounded-full transition-colors",
                    showFooter ? "bg-blue-500" : "bg-gray-300 dark:bg-gray-600",
                  )}
                >
                  <span
                    className={cn(
                      "absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white transition-transform",
                      showFooter && "translate-x-5",
                    )}
                  />
                </button>
              </label>
              <label className="flex items-center justify-between">
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  显示标签栏
                </span>
                <button
                  type="button"
                  onClick={() => setShowTabBar(!showTabBar)}
                  className={cn(
                    "relative h-6 w-11 rounded-full transition-colors",
                    showTabBar ? "bg-blue-500" : "bg-gray-300 dark:bg-gray-600",
                  )}
                >
                  <span
                    className={cn(
                      "absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white transition-transform",
                      showTabBar && "translate-x-5",
                    )}
                  />
                </button>
              </label>
              <label className="flex items-center justify-between">
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  紧凑模式
                </span>
                <button
                  type="button"
                  onClick={() => setCompactMode(!compactMode)}
                  className={cn(
                    "relative h-6 w-11 rounded-full transition-colors",
                    compactMode
                      ? "bg-blue-500"
                      : "bg-gray-300 dark:bg-gray-600",
                  )}
                >
                  <span
                    className={cn(
                      "absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white transition-transform",
                      compactMode && "translate-x-5",
                    )}
                  />
                </button>
              </label>
            </div>
          </section>

          {/* 重置按钮 */}
          <section className="pt-4 border-t border-gray-200 dark:border-gray-800">
            <button
              type="button"
              onClick={() => {
                setTheme("system");
                setSkin("default");
                setShowSidebar(true);
                setShowFooter(true);
                setShowTabBar(false);
                setCompactMode(false);
                handleThemeChange("system");
              }}
              className="w-full rounded-lg border border-gray-300 dark:border-gray-600 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              恢复默认设置
            </button>
          </section>
        </div>
      </div>
    </>
  );
}

export default QuickSettings;
