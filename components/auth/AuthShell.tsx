/**
 * AuthShell 组件
 * 认证页面的布局外壳，提供左右分栏布局
 * 左侧为装饰区域，右侧为表单区域
 */

import type { ComponentChildren, JSX } from "preact";
import { cn } from "../../lib/utils.ts";

// ============================================================================
// 类型定义
// ============================================================================

export interface HaloConfig {
  /** 自定义类名 */
  className?: string;
  /** 渐变起始颜色 */
  from: string;
  /** 渐变结束颜色 */
  to: string;
}

export interface BackgroundOptions {
  /** 网格大小 */
  gridSize?: number;
  /** 光晕配置 */
  halos?: HaloConfig[];
}

export interface FloatingDotsConfig {
  /** 点数量 */
  count?: number;
  /** 颜色类名 */
  colorClassName?: string;
}

export interface AuthShellProps {
  /** 左侧内容 */
  left?: ComponentChildren;
  /** 右侧内容 */
  right: ComponentChildren;
  /** 是否展示左侧装饰区 */
  showLeft?: boolean;
  /** 左侧渐变背景类名 */
  leftGradientClassName?: string;
  /** 背景配置 */
  backgroundOptions?: BackgroundOptions;
  /** 浮动点配置 */
  floatingDots?: FloatingDotsConfig;
  /** 右侧区域的 padding 类 */
  rightPaddingClassName?: string;
  /** 自定义类名 */
  className?: string;
}

// ============================================================================
// 默认配置
// ============================================================================

const defaultHalos: HaloConfig[] = [
  {
    from: "from-blue-400/30",
    to: "to-cyan-400/30",
    className:
      "absolute -top-40 -left-40 w-96 h-96 rounded-full blur-3xl animate-pulse-slow",
  },
  {
    from: "from-indigo-400/30",
    to: "to-purple-400/30",
    className:
      "absolute top-1/3 -right-32 w-80 h-80 rounded-full blur-3xl animate-pulse-slower",
  },
  {
    from: "from-violet-400/20",
    to: "to-pink-400/20",
    className:
      "absolute -bottom-32 left-1/4 w-96 h-96 rounded-full blur-3xl animate-pulse-slowest",
  },
];

const defaultBackground: BackgroundOptions = {
  gridSize: 24,
  halos: defaultHalos,
};

const defaultFloatingDots: FloatingDotsConfig = {
  count: 6,
  colorClassName: "bg-white/20",
};

// ============================================================================
// 组件
// ============================================================================

/**
 * AuthShell 认证页面布局组件
 */
export function AuthShell({
  left,
  right,
  showLeft = true,
  leftGradientClassName =
    "bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-700",
  backgroundOptions = defaultBackground,
  floatingDots = defaultFloatingDots,
  rightPaddingClassName = "px-3 sm:px-5 lg:px-10 py-2 sm:py-3 lg:py-6",
  className,
}: AuthShellProps): JSX.Element {
  const gridSize = backgroundOptions.gridSize ?? defaultBackground.gridSize;
  const halos = backgroundOptions.halos ?? defaultHalos;
  const dotCount = floatingDots.count ?? defaultFloatingDots.count!;
  const dotColor = floatingDots.colorClassName ??
    defaultFloatingDots.colorClassName;

  return (
    <div className="relative min-h-screen lg:h-dvh overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* 网格背景 */}
      <div
        className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)]"
        style={{ backgroundSize: `${gridSize}px ${gridSize}px` }}
      />

      {/* 光晕效果 */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {halos.map((halo, idx) => (
          <div
            key={idx}
            className={cn(
              "bg-gradient-to-br",
              halo.from,
              halo.to,
              halo.className,
            )}
          />
        ))}
      </div>

      {/* 主内容区 */}
      <div
        className={cn(
          "relative flex min-h-screen lg:h-full flex-col lg:flex-row",
          className,
        )}
      >
        {/* 左侧装饰区 */}
        {showLeft && (
          <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden animate-slide-in-left">
            {/* 渐变背景 */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-700" />
            <div className={cn("absolute inset-0", leftGradientClassName)} />

            {/* 网格覆盖 */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:32px_32px]" />

            {/* 鼠标跟踪渐变效果（简化版，使用固定渐变） */}
            <div className="absolute inset-0 bg-[radial-gradient(600px_circle_at_50%_50%,rgba(255,255,255,0.1),transparent_40%)]" />

            {/* 左侧内容 */}
            <div className="relative z-10 flex flex-col justify-center px-12 xl:px-16 text-white">
              {left}
            </div>

            {/* 浮动点 */}
            {[...Array(dotCount)].map((_, i) => (
              <div
                key={i}
                className={cn(
                  "absolute w-2 h-2 rounded-full animate-float",
                  dotColor,
                )}
                style={{
                  left: `${20 + i * 15}%`,
                  top: `${30 + (i % 3) * 20}%`,
                  animationDelay: `${i * 0.5}s`,
                }}
              />
            ))}
          </div>
        )}

        {/* 右侧表单区 */}
        <div
          className={cn(
            "flex-1 flex items-center justify-center",
            rightPaddingClassName,
          )}
        >
          {right}
        </div>
      </div>

      {/* 自定义动画样式 */}
      <style>
        {`
        @keyframes slide-in-left {
          from {
            transform: translateX(-100px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0);
            opacity: 0.2;
          }
          50% {
            transform: translateY(-20px);
            opacity: 0.5;
          }
        }

        @keyframes pulse-slow {
          0%, 100% {
            transform: scale(1);
            opacity: 0.3;
          }
          50% {
            transform: scale(1.2);
            opacity: 0.5;
          }
        }

        @keyframes pulse-slower {
          0%, 100% {
            transform: scale(1.2);
            opacity: 0.4;
          }
          50% {
            transform: scale(1);
            opacity: 0.6;
          }
        }

        @keyframes pulse-slowest {
          0%, 100% {
            transform: scale(1);
            opacity: 0.3;
          }
          50% {
            transform: scale(1.3);
            opacity: 0.5;
          }
        }

        .animate-slide-in-left {
          animation: slide-in-left 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-pulse-slow {
          animation: pulse-slow 8s ease-in-out infinite;
        }

        .animate-pulse-slower {
          animation: pulse-slower 10s ease-in-out infinite;
        }

        .animate-pulse-slowest {
          animation: pulse-slowest 12s ease-in-out infinite;
        }
      `}
      </style>
    </div>
  );
}

export default AuthShell;
