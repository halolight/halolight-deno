/**
 * RecentActivity 最近活动组件
 * 展示最近的系统活动
 */

import type { JSX } from "preact";
import { cn } from "../../lib/utils.ts";
import type { Activity } from "../../lib/api/types.ts";

// ============================================================================
// 类型定义
// ============================================================================

export interface RecentActivityProps {
  /** 活动列表 */
  activities: Activity[];
  /** 是否加载中 */
  loading?: boolean;
  /** 最大显示数量 */
  maxItems?: number;
  /** 自定义类名 */
  className?: string;
}

// ============================================================================
// 图标映射
// ============================================================================

function getActivityIcon(type: string): JSX.Element {
  const iconClass = "h-4 w-4";

  switch (type) {
    case "user_login":
      return (
        <svg
          className={iconClass}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
          />
        </svg>
      );
    case "document_created":
      return (
        <svg
          className={iconClass}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      );
    case "order_completed":
      return (
        <svg
          className={iconClass}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      );
    case "message_received":
      return (
        <svg
          className={iconClass}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
          />
        </svg>
      );
    default:
      return (
        <svg
          className={iconClass}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      );
  }
}

function getActivityColor(type: string): string {
  switch (type) {
    case "user_login":
      return "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400";
    case "document_created":
      return "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400";
    case "order_completed":
      return "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400";
    case "message_received":
      return "bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400";
    default:
      return "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400";
  }
}

// ============================================================================
// 组件
// ============================================================================

export function RecentActivity({
  activities,
  loading = false,
  maxItems = 5,
  className,
}: RecentActivityProps): JSX.Element {
  if (loading) {
    return (
      <div className={cn("space-y-4", className)}>
        {[...Array(maxItems)].map((_, i) => (
          <div key={i} className="flex items-start gap-3 animate-pulse">
            <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700" />
            <div className="flex-1 space-y-2">
              <div className="h-4 w-3/4 bg-gray-200 dark:bg-gray-700 rounded" />
              <div className="h-3 w-1/2 bg-gray-200 dark:bg-gray-700 rounded" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  const displayActivities = activities.slice(0, maxItems);

  if (displayActivities.length === 0) {
    return (
      <div
        className={cn(
          "text-center py-8 text-gray-500 dark:text-gray-400",
          className,
        )}
      >
        暂无活动记录
      </div>
    );
  }

  return (
    <div className={cn("space-y-4", className)}>
      {displayActivities.map((activity) => (
        <div key={activity.id} className="flex items-start gap-3">
          <div
            className={cn(
              "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0",
              getActivityColor(activity.type || ""),
            )}
          >
            {getActivityIcon(activity.type || "")}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm text-gray-900 dark:text-white">
              <span className="font-medium">{activity.user}</span>{" "}
              <span className="text-gray-600 dark:text-gray-400">
                {activity.action}
              </span>
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-500 mt-0.5">
              {activity.time}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default RecentActivity;
