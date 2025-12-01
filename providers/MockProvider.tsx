/**
 * Mock Provider
 * 初始化 Mock 数据拦截
 */

import type { ComponentChildren, JSX } from "preact";
import { useEffect, useState } from "preact/hooks";

// ============================================================================
// 类型定义
// ============================================================================

export interface MockProviderProps {
  children: ComponentChildren;
  /** 是否启用 Mock */
  enabled?: boolean;
}

// ============================================================================
// 组件实现
// ============================================================================

export function MockProvider({
  children,
  enabled = true,
}: MockProviderProps): JSX.Element {
  const [isReady, setIsReady] = useState(!enabled);

  useEffect(() => {
    if (!enabled) {
      setIsReady(true);
      return;
    }

    // Mock 数据初始化
    // 在 Fresh 框架中，Mock 数据通过 API 路由实现
    // 这里只是提供一个初始化钩子
    const initMock = () => {
      try {
        // 可以在这里动态加载 Mock 配置
        // 例如从环境变量读取 Mock 设置
        console.log("[Mock] Mock provider initialized");
      } catch (error) {
        console.error("[Mock] Failed to initialize mock:", error);
      } finally {
        setIsReady(true);
      }
    };

    initMock();
  }, [enabled]);

  if (!isReady) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-sm text-gray-500">初始化中...</p>
      </div>
    );
  }

  return <>{children}</>;
}

export default MockProvider;
