/**
 * 仪表盘数据 Hooks
 * 提供仪表盘统计数据、访问数据、活动数据等
 */

import { useCallback, useEffect, useState } from "preact/hooks";
import { dashboardService } from "../lib/api/services.ts";
import type { Activity, DashboardStats, VisitData } from "../lib/api/types.ts";

// ============================================================================
// 类型定义
// ============================================================================

interface UseQueryResult<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

// ============================================================================
// 仪表盘统计 Hook
// ============================================================================

/**
 * 获取仪表盘统计数据
 */
export function useDashboardStats(): UseQueryResult<DashboardStats> {
  const [data, setData] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchStats = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await dashboardService.getStats();
      setData(response);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("获取统计数据失败"));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  return { data, loading, error, refetch: fetchStats };
}

// ============================================================================
// 访问数据 Hook
// ============================================================================

/**
 * 获取访问趋势数据
 */
export function useDashboardVisits(): UseQueryResult<VisitData[]> {
  const [data, setData] = useState<VisitData[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchVisits = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await dashboardService.getVisits();
      setData(response);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("获取访问数据失败"));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchVisits();
  }, [fetchVisits]);

  return { data, loading, error, refetch: fetchVisits };
}

// ============================================================================
// 活动数据 Hook
// ============================================================================

/**
 * 获取最近活动数据
 */
export function useDashboardActivities(): UseQueryResult<Activity[]> {
  const [data, setData] = useState<Activity[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchActivities = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await dashboardService.getActivities();
      setData(response);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("获取活动数据失败"));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchActivities();
  }, [fetchActivities]);

  return { data, loading, error, refetch: fetchActivities };
}

// ============================================================================
// 组合 Hook
// ============================================================================

/**
 * 获取所有仪表盘数据
 */
export function useDashboardData() {
  const stats = useDashboardStats();
  const visits = useDashboardVisits();
  const activities = useDashboardActivities();

  const loading = stats.loading || visits.loading || activities.loading;
  const error = stats.error || visits.error || activities.error;

  const refetchAll = useCallback(async () => {
    await Promise.all([
      stats.refetch(),
      visits.refetch(),
      activities.refetch(),
    ]);
  }, [stats.refetch, visits.refetch, activities.refetch]);

  return {
    stats: stats.data,
    visits: visits.data,
    activities: activities.data,
    loading,
    error,
    refetch: refetchAll,
  };
}
