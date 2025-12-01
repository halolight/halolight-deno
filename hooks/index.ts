// 统一导出所有自定义Hooks

// 通用工具 Hooks
export { useLocalStorage } from "./useLocalStorage.ts";
export { useDebounce, useDebouncedCallback } from "./useDebounce.ts";
export { useFetch } from "./useFetch.ts";
export { useCycleToggle, useToggle } from "./useToggle.ts";
export { useCounter } from "./useCounter.ts";
export { useBreakpoint, useMediaQuery } from "./useMediaQuery.ts";
export { useTheme } from "./useTheme.ts";

// 数据查询 Hooks
export {
  useBatchDeleteUsers,
  useCreateUser,
  useDeleteUser,
  useUpdateUser,
  useUpdateUserStatus,
  useUser,
  useUsers,
} from "./useUsers.ts";

export {
  useBatchDeleteDocuments,
  useCreateDocument,
  useDeleteDocument,
  useDocument,
  useDocuments,
  useUpdateDocument,
} from "./useDocuments.ts";

export {
  useDashboardActivities,
  useDashboardData,
  useDashboardStats,
  useDashboardVisits,
} from "./useDashboardData.ts";

export {
  useDeleteNotification,
  useMarkAllNotificationsAsRead,
  useMarkNotificationAsRead,
  useNotifications,
  useUnreadNotificationCount,
} from "./useNotifications.ts";

export {
  useBatchDeleteCalendarEvents,
  useCalendarEvent,
  useCalendarEvents,
  useCreateCalendarEvent,
  useDeleteCalendarEvent,
  useUpdateCalendarEvent,
} from "./useCalendar.ts";

// 类型导出
export type { UserFormData, UserQueryParams } from "./useUsers.ts";
export type { DocumentFormData, DocumentQueryParams } from "./useDocuments.ts";
export type { NotificationQueryParams } from "./useNotifications.ts";
export type { CalendarEventFormData } from "./useCalendar.ts";
