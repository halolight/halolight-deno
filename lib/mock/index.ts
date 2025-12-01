/**
 * Mock 数据模块入口
 * 导出所有 Mock 数据生成工具
 */

export {
  generateActivity,
  generateCalendarEvent,
  generateDashboardStats,
  generateDocument,
  generateNotification,
  // 数据生成器
  generateUser,
  generateVisitData,
  pick,
  // 中文随机数据
  randomCName,
  randomColor,
  randomDate,
  randomDateTime,
  randomDepartment,
  randomEmail,
  randomFloat,
  // 工具函数
  randomInt,
  randomPhone,
  randomPosition,
  randomTitle,
  // 角色数据
  roles,
  uuid,
} from "./data.ts";
