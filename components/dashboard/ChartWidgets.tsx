/**
 * Dashboard Chart Widgets
 * 仪表盘图表小部件组件
 */

import type { JSX } from "preact";
import Card, { CardContent, CardHeader, CardTitle } from "../ui/Card.tsx";
import { Skeleton } from "../ui/Skeleton.tsx";

// ============================================================================
// 类型定义
// ============================================================================

export interface BarChartData {
  month: string;
  sales: number;
  profit: number;
}

export interface PieChartData {
  name: string;
  value: number;
  color?: string;
}

export interface RecentUser {
  name: string;
  email: string;
  avatar?: string;
}

// ============================================================================
// 柱状图组件
// ============================================================================

interface BarChartWidgetProps {
  data: BarChartData[];
  loading?: boolean;
  title?: string;
}

export function BarChartWidget({
  data,
  loading,
  title = "销售趋势",
}: BarChartWidgetProps): JSX.Element {
  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="flex items-center gap-3">
                <Skeleton className="w-12 h-4" />
                <div className="flex-1 flex gap-2">
                  <Skeleton className="flex-1 h-6" />
                  <Skeleton className="flex-1 h-6" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  const maxValue = Math.max(...data.flatMap((d) => [d.sales, d.profit]), 1);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {data.map((item, index) => (
            <div key={index} className="space-y-1">
              <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                <span>{item.month}</span>
                <div className="flex gap-4">
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-sm bg-primary-500" />
                    销售: {item.sales.toLocaleString()}
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-sm bg-secondary-500" />
                    利润: {item.profit.toLocaleString()}
                  </span>
                </div>
              </div>
              <div className="flex gap-1 h-6">
                <div className="flex-1 bg-gray-100 dark:bg-gray-800 rounded overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-primary-500 to-primary-600 rounded transition-all duration-500"
                    style={{ width: `${(item.sales / maxValue) * 100}%` }}
                  />
                </div>
                <div className="flex-1 bg-gray-100 dark:bg-gray-800 rounded overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-secondary-500 to-secondary-600 rounded transition-all duration-500"
                    style={{ width: `${(item.profit / maxValue) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

// ============================================================================
// 饼图组件
// ============================================================================

interface PieChartWidgetProps {
  data: PieChartData[];
  loading?: boolean;
  title?: string;
}

export function PieChartWidget({
  data,
  loading,
  title = "流量来源",
}: PieChartWidgetProps): JSX.Element {
  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center gap-4">
            <Skeleton className="w-48 h-48 rounded-full" />
            <div className="flex flex-wrap justify-center gap-3 w-full">
              {[...Array(4)].map((_, i) => (
                <Skeleton key={i} className="h-4 w-20" />
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  const total = data.reduce((sum, item) => sum + item.value, 0);
  const colors = [
    "#3b82f6",
    "#10b981",
    "#f59e0b",
    "#ef4444",
    "#8b5cf6",
  ];

  // 计算饼图的路径
  let currentAngle = 0;
  const segments = data.map((item, index) => {
    const percentage = (item.value / total) * 100;
    const angle = (item.value / total) * 360;
    const startAngle = currentAngle;
    currentAngle += angle;

    const color = item.color || colors[index % colors.length];

    return {
      ...item,
      percentage,
      startAngle,
      angle,
      color,
    };
  });

  // SVG饼图路径生成
  const createArc = (
    startAngle: number,
    angle: number,
    radius: number,
  ): string => {
    const start = polarToCartesian(100, 100, radius, startAngle);
    const end = polarToCartesian(100, 100, radius, startAngle + angle);
    const largeArcFlag = angle > 180 ? 1 : 0;

    return `M 100 100 L ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${end.x} ${end.y} Z`;
  };

  const polarToCartesian = (
    centerX: number,
    centerY: number,
    radius: number,
    angleInDegrees: number,
  ) => {
    const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180;
    return {
      x: centerX + radius * Math.cos(angleInRadians),
      y: centerY + radius * Math.sin(angleInRadians),
    };
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center gap-4">
          {/* SVG 饼图 */}
          <svg
            viewBox="0 0 200 200"
            className="w-48 h-48"
          >
            {segments.map((segment, index) => (
              <g key={index}>
                <path
                  d={createArc(segment.startAngle, segment.angle, 80)}
                  fill={segment.color}
                  className="transition-all duration-300 hover:opacity-80"
                  stroke="white"
                  strokeWidth="2"
                />
              </g>
            ))}
            {/* 中心圆 */}
            <circle
              cx="100"
              cy="100"
              r="50"
              fill="hsl(var(--background))"
              className="dark:fill-gray-800"
            />
          </svg>

          {/* 图例 */}
          <div className="flex flex-wrap justify-center gap-3 w-full">
            {segments.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <span
                  className="h-2.5 w-2.5 rounded-full flex-shrink-0"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-xs text-gray-600 dark:text-gray-400">
                  {item.name} ({item.percentage.toFixed(1)}%)
                </span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// ============================================================================
// 最近用户组件
// ============================================================================

interface RecentUsersWidgetProps {
  users: RecentUser[];
  loading?: boolean;
  title?: string;
  maxItems?: number;
}

export function RecentUsersWidget({
  users,
  loading,
  title = "最近用户",
  maxItems = 5,
}: RecentUsersWidgetProps): JSX.Element {
  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[...Array(maxItems)].map((_, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-3 w-32" />
                  </div>
                </div>
                <Skeleton className="h-3 w-12" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  const displayUsers = users.slice(0, maxItems);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {displayUsers.length === 0 && (
            <p className="text-center text-sm text-gray-500 dark:text-gray-400 py-4">
              暂无用户数据
            </p>
          )}
          {displayUsers.map((user, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-primary-100 dark:bg-primary-900/20 flex items-center justify-center text-primary-600 dark:text-primary-400 font-medium">
                  {user.avatar
                    ? (
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="h-full w-full rounded-full object-cover"
                      />
                    )
                    : user.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="font-medium text-sm text-gray-900 dark:text-white">
                    {user.name}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {user.email}
                  </p>
                </div>
              </div>
              <span className="text-xs text-gray-400 dark:text-gray-500">
                刚刚
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
