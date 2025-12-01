/**
 * API 模块入口
 * 统一导出所有 API 相关内容
 */

// 类型定义
export * from "./types.ts";

// Mock 数据
export * from "./mock-data.ts";

// API 客户端
export { apiClient, authApi, roleApi } from "./client.ts";
export type { AccountWithToken, CurrentUserResponse } from "./client.ts";

// API 服务
export {
  calendarService,
  dashboardService,
  documentService,
  fileService,
  messageService,
  notificationService,
  roleService,
  teamService,
  userService,
} from "./services.ts";
