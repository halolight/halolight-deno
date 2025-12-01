/**
 * StatsCard 统计卡片组件
 * 用于展示关键业务指标
 */

import type { ComponentChildren, JSX } from "preact";
import { cn } from "../../lib/utils.ts";

// ============================================================================
// 类型定义
// ============================================================================

export interface StatsCardProps {
  /** 标题 */
  title: string;
  /** 数值 */
  value: string | number;
  /** 变化百分比 */
  change?: number;
  /** 变化描述 */
  changeLabel?: string;
  /** 图标 */
  icon?: ComponentChildren;
  /** 是否加载中 */
  loading?: boolean;
  /** 自定义类名 */
  className?: string;
}

// ============================================================================
// 图标组件
// ============================================================================

function TrendingUpIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
      />
    </svg>
  );
}

function TrendingDownIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"
      />
    </svg>
  );
}

// ============================================================================
// 组件
// ============================================================================

export function StatsCard({
  title,
  value,
  change,
  changeLabel = "较上期",
  icon,
  loading = false,
  className,
}: StatsCardProps): JSX.Element {
  const isPositive = change !== undefined && change >= 0;
  const changeText = change !== undefined
    ? `${isPositive ? "+" : ""}${change}%`
    : null;

  if (loading) {
    return (
      <div
        className={cn(
          "p-6 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700",
          className,
        )}
      >
        <div className="animate-pulse">
          <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded mb-3" />
          <div className="h-8 w-32 bg-gray-200 dark:bg-gray-700 rounded mb-2" />
          <div className="h-3 w-20 bg-gray-200 dark:bg-gray-700 rounded" />
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "p-6 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700",
        "hover:shadow-md transition-shadow",
        className,
      )}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
            {title}
          </p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {value}
          </p>
          {changeText && (
            <div className="flex items-center mt-2 text-sm">
              {isPositive
                ? <TrendingUpIcon className="h-4 w-4 text-green-500 mr-1" />
                : <TrendingDownIcon className="h-4 w-4 text-red-500 mr-1" />}
              <span className={isPositive ? "text-green-500" : "text-red-500"}>
                {changeText}
              </span>
              <span className="text-gray-400 dark:text-gray-500 ml-1">
                {changeLabel}
              </span>
            </div>
          )}
        </div>
        {icon && (
          <div className="p-3 rounded-lg bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400">
            {icon}
          </div>
        )}
      </div>
    </div>
  );
}

// ============================================================================
// 统计卡片组
// ============================================================================

export interface StatsGridProps {
  children: ComponentChildren;
  columns?: 2 | 3 | 4;
  className?: string;
}

export function StatsGrid({
  children,
  columns = 4,
  className,
}: StatsGridProps): JSX.Element {
  const gridCols = {
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
  };

  return (
    <div className={cn("grid gap-4", gridCols[columns], className)}>
      {children}
    </div>
  );
}

export default StatsCard;
