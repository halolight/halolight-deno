/**
 * API 服务测试
 */

import { assertEquals, assertExists } from "$std/assert/mod.ts";
import {
  calendarService,
  dashboardService,
  documentService,
  fileService,
  messageService,
  notificationService,
  roleService,
  teamService,
  userService,
} from "../lib/api/services.ts";

// ============================================================================
// 用户服务测试
// ============================================================================

Deno.test("userService.getUsers - 获取用户列表", async () => {
  const response = await userService.getUsers();
  assertEquals(response.code, 200);
  assertExists(response.data);
  assertExists(response.data.list);
  assertEquals(Array.isArray(response.data.list), true);
});

Deno.test("userService.getUsers - 分页参数", async () => {
  const response = await userService.getUsers({ page: 1, pageSize: 5 });
  assertEquals(response.code, 200);
  assertEquals(response.data.page, 1);
  assertEquals(response.data.pageSize, 5);
});

Deno.test("userService.getUser - 获取单个用户", async () => {
  // 先获取用户列表
  const listResponse = await userService.getUsers();
  const firstUser = listResponse.data.list[0];

  if (firstUser) {
    const response = await userService.getUser(firstUser.id);
    assertEquals(response.code, 200);
    assertExists(response.data);
    assertEquals(response.data?.id, firstUser.id);
  }
});

Deno.test("userService.getUser - 获取不存在的用户", async () => {
  const response = await userService.getUser("non-existent-id");
  assertEquals(response.code, 404);
});

// ============================================================================
// 仪表盘服务测试
// ============================================================================

Deno.test("dashboardService.getStats - 获取统计数据", async () => {
  const response = await dashboardService.getStats();
  assertEquals(response.code, 200);
  assertExists(response.data);
  assertExists(response.data.totalUsers);
  assertExists(response.data.totalOrders);
});

Deno.test("dashboardService.getVisits - 获取访问趋势", async () => {
  const response = await dashboardService.getVisits();
  assertEquals(response.code, 200);
  assertExists(response.data);
  assertEquals(Array.isArray(response.data), true);
});

Deno.test("dashboardService.getActivities - 获取活动数据", async () => {
  const response = await dashboardService.getActivities();
  assertEquals(response.code, 200);
  assertExists(response.data);
  assertEquals(Array.isArray(response.data), true);
});

// ============================================================================
// 通知服务测试
// ============================================================================

Deno.test("notificationService.getNotifications - 获取通知列表", async () => {
  const response = await notificationService.getNotifications();
  assertEquals(response.code, 200);
  assertExists(response.data);
  assertExists(response.data.list);
});

Deno.test("notificationService.getUnreadCount - 获取未读数量", async () => {
  const response = await notificationService.getUnreadCount();
  assertEquals(response.code, 200);
  assertEquals(typeof response.data, "number");
});

// ============================================================================
// 文档服务测试
// ============================================================================

Deno.test("documentService.getDocuments - 获取文档列表", async () => {
  const response = await documentService.getDocuments();
  assertEquals(response.code, 200);
  assertExists(response.data);
  assertExists(response.data.list);
});

Deno.test("documentService.createDocument - 创建文档", async () => {
  const response = await documentService.createDocument({
    title: "测试文档",
    type: "document",
  });
  assertEquals(response.code, 200);
  assertExists(response.data);
  assertExists(response.data.id);
});

// ============================================================================
// 日历服务测试
// ============================================================================

Deno.test("calendarService.getEvents - 获取日历事件", async () => {
  const response = await calendarService.getEvents();
  assertEquals(response.code, 200);
  assertExists(response.data);
  assertEquals(Array.isArray(response.data), true);
});

Deno.test("calendarService.createEvent - 创建日历事件", async () => {
  const response = await calendarService.createEvent({
    title: "测试事件",
    start: new Date().toISOString(),
    end: new Date().toISOString(),
  });
  assertEquals(response.code, 200);
  assertExists(response.data);
  assertExists(response.data.id);
});

// ============================================================================
// 文件服务测试
// ============================================================================

Deno.test("fileService.getFiles - 获取文件列表", async () => {
  const response = await fileService.getFiles();
  assertEquals(response.code, 200);
  assertExists(response.data);
  assertEquals(Array.isArray(response.data), true);
});

Deno.test("fileService.getStorageInfo - 获取存储信息", async () => {
  const response = await fileService.getStorageInfo();
  assertEquals(response.code, 200);
  assertExists(response.data);
  assertExists(response.data.used);
  assertExists(response.data.total);
});

// ============================================================================
// 消息服务测试
// ============================================================================

Deno.test("messageService.getConversations - 获取会话列表", async () => {
  const response = await messageService.getConversations();
  assertEquals(response.code, 200);
  assertExists(response.data);
  assertEquals(Array.isArray(response.data), true);
});

// ============================================================================
// 团队服务测试
// ============================================================================

Deno.test("teamService.getTeams - 获取团队列表", async () => {
  const response = await teamService.getTeams();
  assertEquals(response.code, 200);
  assertExists(response.data);
  assertEquals(Array.isArray(response.data), true);
});

// ============================================================================
// 角色服务测试
// ============================================================================

Deno.test("roleService.getRoles - 获取角色列表", async () => {
  const response = await roleService.getRoles();
  assertEquals(response.code, 200);
  assertExists(response.data);
  assertEquals(Array.isArray(response.data), true);
});
