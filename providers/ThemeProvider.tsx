/**
 * 主题 Provider
 * 提供主题切换功能，支持浅色/深色/跟随系统
 */

import type { ComponentChildren, JSX } from "preact";
import { useEffect } from "preact/hooks";
import { useThemeStore } from "../stores/useThemeStore.ts";

// ============================================================================
// 类型定义
// ============================================================================

export interface ThemeProviderProps {
  children: ComponentChildren;
  defaultTheme?: "light" | "dark" | "system";
  enableSystem?: boolean;
  attribute?: string;
}

// ============================================================================
// 组件实现
// ============================================================================

export function ThemeProvider({
  children,
  defaultTheme = "system",
  enableSystem = true,
  attribute = "class",
}: ThemeProviderProps): JSX.Element {
  const { theme, setTheme } = useThemeStore();

  // 初始化主题
  useEffect(() => {
    if (!theme) {
      setTheme(defaultTheme);
    }
  }, []);

  // 应用主题到 DOM
  useEffect(() => {
    if (typeof document === "undefined") return;

    const root = document.documentElement;
    const systemTheme = globalThis.matchMedia?.("(prefers-color-scheme: dark)")
        .matches
      ? "dark"
      : "light";

    const resolvedTheme = theme === "system" ? systemTheme : theme;

    // 移除旧主题类
    root.classList.remove("light", "dark");

    // 应用新主题
    if (attribute === "class") {
      root.classList.add(resolvedTheme);
    } else {
      root.setAttribute(attribute, resolvedTheme);
    }
  }, [theme, attribute]);

  // 监听系统主题变化
  useEffect(() => {
    if (!enableSystem || typeof globalThis.matchMedia !== "function") return;

    const mediaQuery = globalThis.matchMedia("(prefers-color-scheme: dark)");

    const handleChange = () => {
      if (theme === "system") {
        const root = document.documentElement;
        const newTheme = mediaQuery.matches ? "dark" : "light";

        root.classList.remove("light", "dark");
        if (attribute === "class") {
          root.classList.add(newTheme);
        } else {
          root.setAttribute(attribute, newTheme);
        }
      }
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [theme, enableSystem, attribute]);

  return <>{children}</>;
}

export default ThemeProvider;
