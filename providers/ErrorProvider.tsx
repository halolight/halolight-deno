/**
 * 错误 Provider
 * 全局错误捕获和收集
 */

import type { ComponentChildren, JSX } from "preact";
import { useEffect } from "preact/hooks";
import { useErrorStore } from "../stores/useErrorStore.ts";

// ============================================================================
// 类型定义
// ============================================================================

export interface ErrorProviderProps {
  children: ComponentChildren;
}

// ============================================================================
// 组件实现
// ============================================================================

export function ErrorProvider({ children }: ErrorProviderProps): JSX.Element {
  const addError = useErrorStore((state) => state.addError);

  useEffect(() => {
    if (typeof globalThis === "undefined") return;

    const handleError = (event: ErrorEvent) => {
      addError({
        message: event.message || "未知错误",
        detail: event.error?.stack || event.error?.toString(),
        source: "error",
      });
    };

    const handleRejection = (event: PromiseRejectionEvent) => {
      const reason = event.reason;
      addError({
        message: reason?.message || String(reason) ||
          "Unhandled Promise rejection",
        detail: reason?.stack || undefined,
        source: "promise",
      });
    };

    globalThis.addEventListener("error", handleError);
    globalThis.addEventListener("unhandledrejection", handleRejection);

    return () => {
      globalThis.removeEventListener("error", handleError);
      globalThis.removeEventListener("unhandledrejection", handleRejection);
    };
  }, [addError]);

  return <>{children}</>;
}

export default ErrorProvider;
