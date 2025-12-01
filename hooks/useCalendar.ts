/**
 * 日历数据 Hooks
 * 提供日历事件的查询和操作功能
 */

import { useCallback, useEffect, useState } from "preact/hooks";
import { calendarService } from "../lib/api/services.ts";
import type { CalendarEvent, CalendarEventType } from "../lib/api/types.ts";

// ============================================================================
// 类型定义
// ============================================================================

export interface CalendarEventFormData {
  title: string;
  start: string;
  end: string;
  allDay?: boolean;
  description?: string;
  color?: string;
  type?: CalendarEventType;
}

interface UseCalendarEventsResult {
  data: CalendarEvent[] | null;
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

interface UseCalendarEventResult {
  data: CalendarEvent | null;
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

interface MutationResult<T> {
  mutate: (data: T) => Promise<void>;
  loading: boolean;
  error: Error | null;
}

// ============================================================================
// 查询 Hooks
// ============================================================================

/**
 * 获取日历事件列表
 */
export function useCalendarEvents(
  start?: string,
  end?: string,
): UseCalendarEventsResult {
  const [data, setData] = useState<CalendarEvent[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchEvents = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await calendarService.getEvents();
      const events = response.data;
      // 如果有时间范围，过滤事件
      if (start || end) {
        const filtered = events.filter((event: CalendarEvent) => {
          const eventStart = new Date(event.start);
          const eventEnd = new Date(event.end);
          const rangeStart = start ? new Date(start) : null;
          const rangeEnd = end ? new Date(end) : null;

          if (rangeStart && eventEnd < rangeStart) return false;
          if (rangeEnd && eventStart > rangeEnd) return false;
          return true;
        });
        setData(filtered);
      } else {
        setData(events);
      }
    } catch (err) {
      setError(err instanceof Error ? err : new Error("获取日历事件失败"));
    } finally {
      setLoading(false);
    }
  }, [start, end]);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  return { data, loading, error, refetch: fetchEvents };
}

/**
 * 获取单个日历事件
 */
export function useCalendarEvent(
  id: string | undefined,
): UseCalendarEventResult {
  const [data, setData] = useState<CalendarEvent | null>(null);
  const [loading, setLoading] = useState(!!id);
  const [error, setError] = useState<Error | null>(null);

  const fetchEvent = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    setError(null);
    try {
      const response = await calendarService.getEvents();
      const events = response.data;
      const event = events.find((e: CalendarEvent) => e.id === id) || null;
      setData(event);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("获取日历事件失败"));
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchEvent();
  }, [fetchEvent]);

  return { data, loading, error, refetch: fetchEvent };
}

// ============================================================================
// Mutation Hooks
// ============================================================================

/**
 * 创建日历事件
 */
export function useCreateCalendarEvent(options?: {
  onSuccess?: (data: CalendarEvent) => void;
  onError?: (error: Error) => void;
}): MutationResult<CalendarEventFormData> {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const mutate = useCallback(async (formData: CalendarEventFormData) => {
    setLoading(true);
    setError(null);
    try {
      const result = await calendarService.createEvent(formData);
      if (result.data) {
        options?.onSuccess?.(result.data);
      }
    } catch (err) {
      const error = err instanceof Error ? err : new Error("创建日历事件失败");
      setError(error);
      options?.onError?.(error);
    } finally {
      setLoading(false);
    }
  }, [options?.onSuccess, options?.onError]);

  return { mutate, loading, error };
}

/**
 * 更新日历事件
 */
export function useUpdateCalendarEvent(options?: {
  onSuccess?: (data: CalendarEvent) => void;
  onError?: (error: Error) => void;
}): MutationResult<{ id: string; data: Partial<CalendarEventFormData> }> {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const mutate = useCallback(
    async (
      { id, data }: { id: string; data: Partial<CalendarEventFormData> },
    ) => {
      setLoading(true);
      setError(null);
      try {
        const result = await calendarService.updateEvent(id, data);
        if (result.data) {
          options?.onSuccess?.(result.data);
        }
      } catch (err) {
        const error = err instanceof Error
          ? err
          : new Error("更新日历事件失败");
        setError(error);
        options?.onError?.(error);
      } finally {
        setLoading(false);
      }
    },
    [options?.onSuccess, options?.onError],
  );

  return { mutate, loading, error };
}

/**
 * 删除日历事件
 */
export function useDeleteCalendarEvent(options?: {
  onSuccess?: (id: string) => void;
  onError?: (error: Error) => void;
}): MutationResult<string> {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const mutate = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      await calendarService.deleteEvent(id);
      options?.onSuccess?.(id);
    } catch (err) {
      const error = err instanceof Error ? err : new Error("删除日历事件失败");
      setError(error);
      options?.onError?.(error);
    } finally {
      setLoading(false);
    }
  }, [options?.onSuccess, options?.onError]);

  return { mutate, loading, error };
}

/**
 * 批量删除日历事件
 */
export function useBatchDeleteCalendarEvents(options?: {
  onSuccess?: (ids: string[]) => void;
  onError?: (error: Error) => void;
}): MutationResult<string[]> {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const mutate = useCallback(async (ids: string[]) => {
    setLoading(true);
    setError(null);
    try {
      // 批量删除事件（逐个删除）
      await Promise.all(ids.map((id) => calendarService.deleteEvent(id)));
      options?.onSuccess?.(ids);
    } catch (err) {
      const error = err instanceof Error
        ? err
        : new Error("批量删除日历事件失败");
      setError(error);
      options?.onError?.(error);
    } finally {
      setLoading(false);
    }
  }, [options?.onSuccess, options?.onError]);

  return { mutate, loading, error };
}
