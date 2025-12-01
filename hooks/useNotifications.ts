/**
 * 通知数据 Hooks
 * 提供通知列表、未读数量和通知操作功能
 */

import { useCallback, useEffect, useState } from "preact/hooks";
import { notificationService } from "../lib/api/services.ts";
import type { Notification } from "../lib/api/types.ts";

// ============================================================================
// 类型定义
// ============================================================================

export interface NotificationQueryParams {
  page?: number;
  pageSize?: number;
  type?: string;
  read?: boolean;
}

interface UseNotificationsResult {
  data: Notification[] | null;
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

interface UseUnreadCountResult {
  count: number;
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

interface MutationResult<T = void> {
  mutate: T extends void ? () => Promise<void> : (data: T) => Promise<void>;
  loading: boolean;
  error: Error | null;
}

// ============================================================================
// 查询 Hooks
// ============================================================================

/**
 * 获取通知列表
 */
export function useNotifications(
  params?: NotificationQueryParams,
): UseNotificationsResult {
  const [data, setData] = useState<Notification[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchNotifications = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await notificationService.getNotifications();
      setData(response.data.list);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("获取通知列表失败"));
    } finally {
      setLoading(false);
    }
  }, [JSON.stringify(params)]);

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  return { data, loading, error, refetch: fetchNotifications };
}

/**
 * 获取未读通知数量
 */
export function useUnreadNotificationCount(): UseUnreadCountResult {
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchCount = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await notificationService.getUnreadCount();
      setCount(response.data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("获取未读数量失败"));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCount();
    // 定期刷新未读数量
    const interval = setInterval(fetchCount, 30000);
    return () => clearInterval(interval);
  }, [fetchCount]);

  return { count, loading, error, refetch: fetchCount };
}

// ============================================================================
// Mutation Hooks
// ============================================================================

/**
 * 标记通知为已读
 */
export function useMarkNotificationAsRead(options?: {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}): MutationResult<string> {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const mutate = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      await notificationService.markAsRead(id);
      options?.onSuccess?.();
    } catch (err) {
      const error = err instanceof Error ? err : new Error("标记已读失败");
      setError(error);
      options?.onError?.(error);
    } finally {
      setLoading(false);
    }
  }, [options?.onSuccess, options?.onError]);

  return { mutate, loading, error };
}

/**
 * 标记所有通知为已读
 */
export function useMarkAllNotificationsAsRead(options?: {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}): { mutate: () => Promise<void>; loading: boolean; error: Error | null } {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const mutate = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      await notificationService.markAllAsRead();
      options?.onSuccess?.();
    } catch (err) {
      const error = err instanceof Error ? err : new Error("标记全部已读失败");
      setError(error);
      options?.onError?.(error);
    } finally {
      setLoading(false);
    }
  }, [options?.onSuccess, options?.onError]);

  return { mutate, loading, error };
}

/**
 * 删除通知
 */
export function useDeleteNotification(options?: {
  onSuccess?: (id: string) => void;
  onError?: (error: Error) => void;
}): MutationResult<string> {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const mutate = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      await notificationService.deleteNotification(id);
      options?.onSuccess?.(id);
    } catch (err) {
      const error = err instanceof Error ? err : new Error("删除通知失败");
      setError(error);
      options?.onError?.(error);
    } finally {
      setLoading(false);
    }
  }, [options?.onSuccess, options?.onError]);

  return { mutate, loading, error };
}
