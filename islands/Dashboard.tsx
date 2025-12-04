/**
 * Dashboard Island 组件
 * 仪表盘主页面的客户端交互组件
 */

import type { JSX } from "preact";
import { useEffect, useState } from "preact/hooks";
import { cn } from "../lib/utils.ts";
import { dashboardService, userService } from "../lib/api/services.ts";
import type {
  Activity,
  DashboardStats,
  SalesData,
  User,
  VisitData,
} from "../lib/api/types.ts";
import Card, {
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/Card.tsx";
import Button from "../components/ui/Button.tsx";
import { Skeleton } from "../components/ui/Skeleton.tsx";
import {
  BarChartWidget,
  PieChartWidget,
  RecentUsersWidget,
} from "../components/dashboard/ChartWidgets.tsx";

// ============================================================================
// 图标组件
// ============================================================================

function UsersIcon({ className }: { className?: string }) {
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
        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
      />
    </svg>
  );
}

function CurrencyIcon({ className }: { className?: string }) {
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
        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
}

function ShoppingCartIcon({ className }: { className?: string }) {
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
        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
      />
    </svg>
  );
}

function ChartIcon({ className }: { className?: string }) {
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
        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
      />
    </svg>
  );
}

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

function RefreshIcon({ className }: { className?: string }) {
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
        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
      />
    </svg>
  );
}

// ============================================================================
// 统计卡片组件
// ============================================================================

interface StatCardProps {
  title: string;
  value: string | number;
  change?: number;
  icon: JSX.Element;
  loading?: boolean;
}

function StatCard({ title, value, change, icon, loading }: StatCardProps) {
  if (loading) {
    return (
      <Card className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1 space-y-3">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-8 w-24" />
            <Skeleton className="h-3 w-16" />
          </div>
          <Skeleton className="h-12 w-12 rounded-lg" />
        </div>
      </Card>
    );
  }

  const isPositive = change !== undefined && change >= 0;
  const changeText = change !== undefined
    ? `${isPositive ? "+" : ""}${change}%`
    : null;

  return (
    <Card className="p-6 hover:shadow-md transition-shadow">
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
                较上期
              </span>
            </div>
          )}
        </div>
        <div className="p-3 rounded-lg bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400">
          {icon}
        </div>
      </div>
    </Card>
  );
}

// ============================================================================
// 简单图表组件（纯 CSS）
// ============================================================================

interface SimpleChartProps {
  data: { label: string; value: number }[];
  loading?: boolean;
  title: string;
}

function SimpleBarChart({ data, loading, title }: SimpleChartProps) {
  const maxValue = Math.max(...data.map((d) => d.value), 1);

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
                <Skeleton className="flex-1 h-6" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {data.map((item, index) => (
            <div key={index} className="flex items-center gap-3">
              <span className="w-12 text-xs text-gray-500 dark:text-gray-400 text-right">
                {item.label}
              </span>
              <div className="flex-1 h-6 bg-gray-100 dark:bg-gray-800 rounded overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-primary-500 to-primary-600 rounded transition-all duration-500"
                  style={{ width: `${(item.value / maxValue) * 100}%` }}
                />
              </div>
              <span className="w-16 text-xs font-medium text-gray-700 dark:text-gray-300">
                {item.value.toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

// ============================================================================
// 活动列表组件
// ============================================================================

interface ActivityListProps {
  activities: Activity[];
  loading?: boolean;
}

function ActivityList({ activities, loading }: ActivityListProps) {
  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">最近活动</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-start gap-3">
                <Skeleton className="h-8 w-8 rounded-full" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-3 w-1/2" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">最近活动</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.slice(0, 5).map((activity) => (
            <div key={activity.id} className="flex items-start gap-3">
              <div
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-medium",
                  activity.type === "user_login" &&
                    "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
                  activity.type === "document_created" &&
                    "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400",
                  activity.type === "order_completed" &&
                    "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400",
                  !["user_login", "document_created", "order_completed"]
                    .includes(activity.type || "") &&
                    "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400",
                )}
              >
                {activity.user.charAt(0).toUpperCase()}
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
      </CardContent>
    </Card>
  );
}

// ============================================================================
// 主组件
// ============================================================================

export default function Dashboard(): JSX.Element {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [visits, setVisits] = useState<VisitData[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [salesData, setSalesData] = useState<SalesData[]>([]);
  const [trafficSources, setTrafficSources] = useState<
    { name: string; value: number }[]
  >([]);
  const [recentUsers, setRecentUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = async () => {
    try {
      const [
        statsRes,
        visitsRes,
        activitiesRes,
        salesRes,
        trafficRes,
        usersRes,
      ] = await Promise.all([
        dashboardService.getStats(),
        dashboardService.getVisits(),
        dashboardService.getActivities(),
        dashboardService.getSales(),
        dashboardService.getTrafficSources(),
        userService.getUsers({ page: 1, pageSize: 5 }),
      ]);

      // 从 ApiResponse 中提取 data 字段
      if (statsRes.code === 200 && statsRes.data) {
        setStats(statsRes.data);
      }
      if (visitsRes.code === 200 && visitsRes.data) {
        setVisits(visitsRes.data);
      }
      if (activitiesRes.code === 200 && activitiesRes.data) {
        setActivities(activitiesRes.data);
      }
      if (salesRes.code === 200 && salesRes.data) {
        setSalesData(salesRes.data);
      }
      if (trafficRes.code === 200 && trafficRes.data) {
        setTrafficSources(trafficRes.data);
      }
      if (usersRes.code === 200 && usersRes.data?.list) {
        setRecentUsers(usersRes.data.list);
      }
    } catch (error) {
      console.error("Failed to fetch dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchData();
    setRefreshing(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // 将访问数据转换为图表格式
  const chartData = visits.map((v) => ({
    label: v.date,
    value: v.visits,
  }));

  return (
    <div className="space-y-6">
      {/* 顶部操作栏 */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          仪表盘
        </h1>
        <Button
          variant="outline"
          size="sm"
          onClick={handleRefresh}
          disabled={refreshing}
        >
          <RefreshIcon
            className={cn("h-4 w-4 mr-2", refreshing && "animate-spin")}
          />
          {refreshing ? "刷新中..." : "刷新"}
        </Button>
      </div>

      {/* 统计卡片 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="总用户"
          value={stats?.totalUsers?.toLocaleString() ?? "-"}
          change={stats?.userGrowth}
          icon={<UsersIcon className="h-6 w-6" />}
          loading={loading}
        />
        <StatCard
          title="总收入"
          value={stats?.totalRevenue
            ? `¥${stats.totalRevenue.toLocaleString()}`
            : "-"}
          change={stats?.revenueGrowth}
          icon={<CurrencyIcon className="h-6 w-6" />}
          loading={loading}
        />
        <StatCard
          title="总订单"
          value={stats?.totalOrders?.toLocaleString() ?? "-"}
          change={stats?.orderGrowth}
          icon={<ShoppingCartIcon className="h-6 w-6" />}
          loading={loading}
        />
        <StatCard
          title="转化率"
          value={stats?.conversionRate ? `${stats.conversionRate}%` : "-"}
          change={stats?.rateGrowth}
          icon={<ChartIcon className="h-6 w-6" />}
          loading={loading}
        />
      </div>

      {/* 图表和活动 - 第一行 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SimpleBarChart
          title="访问趋势"
          data={chartData.slice(-7)}
          loading={loading}
        />
        <ActivityList
          activities={activities}
          loading={loading}
        />
      </div>

      {/* 图表和活动 - 第二行 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <BarChartWidget
          data={salesData.slice(-6)}
          loading={loading}
          title="销售趋势"
        />
        <PieChartWidget
          data={trafficSources}
          loading={loading}
          title="流量来源"
        />
        <RecentUsersWidget
          users={recentUsers.map((u) => ({
            name: u.name,
            email: u.email,
            avatar: u.avatar,
          }))}
          loading={loading}
          title="最近用户"
          maxItems={5}
        />
      </div>

      {/* 快捷操作 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">快捷操作</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
            {[
              { label: "添加用户", href: "/users", icon: "👤" },
              { label: "新建文档", href: "/documents", icon: "📄" },
              { label: "发送通知", href: "/notifications", icon: "🔔" },
              { label: "数据分析", href: "/analytics", icon: "📊" },
              { label: "日程安排", href: "/calendar", icon: "📅" },
              { label: "系统设置", href: "/settings", icon: "⚙️" },
            ].map((action) => (
              <a
                key={action.label}
                href={action.href}
                className={cn(
                  "flex flex-col items-center justify-center gap-2 p-4",
                  "rounded-lg border border-gray-200 dark:border-gray-700",
                  "hover:bg-gray-50 dark:hover:bg-gray-800",
                  "hover:border-primary-500 dark:hover:border-primary-500",
                  "transition-all",
                )}
              >
                <span className="text-2xl">{action.icon}</span>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {action.label}
                </span>
              </a>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
