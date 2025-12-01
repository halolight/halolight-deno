/**
 * 应用级 Provider 组合
 *
 * Provider 层级说明（从外到内）：
 * 1. ThemeProvider - 主题管理，最外层以确保所有组件可访问主题
 * 2. MockProvider - Mock 数据拦截，在实际请求之前处理
 * 3. AuthProvider - 认证状态管理
 * 4. ErrorProvider - 错误收集与展示，最内层以捕获所有错误
 */

import type { ComponentChildren, JSX } from "preact";
import { ThemeProvider } from "./ThemeProvider.tsx";
import { MockProvider } from "./MockProvider.tsx";
import { AuthProvider } from "./AuthProvider.tsx";
import { ErrorProvider } from "./ErrorProvider.tsx";

// ============================================================================
// 类型定义
// ============================================================================

export interface AppProvidersProps {
  children: ComponentChildren;
  /** 当前路径，用于认证路由判断 */
  pathname?: string;
  /** 是否启用 Mock */
  enableMock?: boolean;
  /** 默认主题 */
  defaultTheme?: "light" | "dark" | "system";
}

// ============================================================================
// 组件实现
// ============================================================================

export function AppProviders({
  children,
  pathname,
  enableMock = true,
  defaultTheme = "system",
}: AppProvidersProps): JSX.Element {
  return (
    <ThemeProvider defaultTheme={defaultTheme} enableSystem>
      <MockProvider enabled={enableMock}>
        <AuthProvider pathname={pathname}>
          <ErrorProvider>
            {children}
          </ErrorProvider>
        </AuthProvider>
      </MockProvider>
    </ThemeProvider>
  );
}

// ============================================================================
// Provider 组合辅助函数
// ============================================================================

type ProviderConfig<P = Record<string, unknown>> = [
  (props: P & { children: ComponentChildren }) => JSX.Element,
  Omit<P, "children">,
];

/**
 * 创建 Provider 组合的辅助函数
 * 用于动态组合多个 Provider
 *
 * @example
 * ```tsx
 * const providers: ProviderConfig[] = [
 *   [ThemeProvider, { defaultTheme: "system" }],
 *   [AuthProvider, {}],
 *   [ErrorProvider, {}],
 * ];
 *
 * const CombinedProvider = composeProviders(providers);
 * ```
 */
export function composeProviders(
  providers: ProviderConfig[],
): (props: { children: ComponentChildren }) => JSX.Element {
  return function ComposedProvider({ children }) {
    return providers.reduceRight(
      (acc, [Provider, props]) => <Provider {...props}>{acc}</Provider>,
      children as JSX.Element,
    );
  };
}

export default AppProviders;
