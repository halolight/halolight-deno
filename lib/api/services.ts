/**
 * API 服务层
 * 提供各业务模块的 API 接口
 */

import type {
  Activity,
  ApiResponse,
  CalendarEvent,
  Conversation,
  DashboardStats,
  Document,
  FileItem,
  ListData,
  Message,
  Notification,
  Order,
  PaginatedResponse,
  Product,
  RoleCreateRequest,
  RoleDetail,
  RoleUpdateRequest,
  SalesData,
  StorageInfo,
  SystemOverview,
  Team,
  TeamCreateRequest,
  TeamUpdateRequest,
  User,
  UserCreateRequest,
  UserFilterParams,
  UserStatus,
  UserUpdateRequest,
  VisitData,
} from "./types.ts";

import {
  mockActivities,
  mockCalendarEvents,
  mockConversations,
  mockDashboardStats,
  mockDocuments,
  mockFiles,
  mockMessages,
  mockNotifications,
  mockOrders,
  mockProducts,
  mockRoles,
  mockSalesData,
  mockStorageInfo,
  mockSystemOverview,
  mockTasks,
  mockTeams,
  mockTrafficSources,
  mockUsers,
  mockVisitData,
} from "./mock-data.ts";

// ============================================================================
// 工具函数
// ============================================================================

/** 模拟网络延迟 */
const delay = (ms: number = 300) =>
  new Promise((resolve) => setTimeout(resolve, ms));

/** 生成随机 ID */
const generateId = () =>
  Math.random().toString(36).substring(2, 15) +
  Math.random().toString(36).substring(2, 15);

// ============================================================================
// 用户服务
// ============================================================================

export const userService = {
  /** 获取用户列表 */
  getUsers: async (
    params?: UserFilterParams,
  ): Promise<PaginatedResponse<User>> => {
    await delay();
    let users = [...mockUsers];

    // 关键词过滤
    if (params?.keyword) {
      const keyword = params.keyword.toLowerCase();
      users = users.filter(
        (u) =>
          u.name.toLowerCase().includes(keyword) ||
          u.email.toLowerCase().includes(keyword),
      );
    }

    // 状态过滤
    if (params?.status) {
      users = users.filter((u) => u.status === params.status);
    }

    // 角色过滤
    if (params?.roleId) {
      users = users.filter((u) => u.role.id === params.roleId);
    }

    // 分页
    const page = params?.page || 1;
    const pageSize = params?.pageSize || 10;
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    const paginatedUsers = users.slice(start, end);

    return {
      code: 200,
      message: "success",
      data: {
        list: paginatedUsers,
        total: users.length,
        page,
        pageSize,
      },
    };
  },

  /** 获取单个用户 */
  getUser: async (id: string): Promise<ApiResponse<User | undefined>> => {
    await delay();
    const user = mockUsers.find((u) => u.id === id);
    return {
      code: user ? 200 : 404,
      message: user ? "success" : "用户不存在",
      data: user,
    };
  },

  /** 创建用户 */
  createUser: async (
    data: UserCreateRequest,
  ): Promise<ApiResponse<{ id: string; createdAt: string }>> => {
    await delay(500);
    const role = mockRoles.find((r) => r.id === data.roleId);
    if (!role) {
      return {
        code: 400,
        message: "角色不存在",
        data: { id: "", createdAt: "" },
      };
    }

    const newUser: User = {
      id: generateId(),
      name: data.name,
      email: data.email,
      phone: data.phone,
      avatar: data.avatar,
      role,
      status: data.status,
      department: data.department,
      position: data.position,
      bio: data.bio,
      createdAt: new Date().toISOString(),
    };
    mockUsers.push(newUser);

    return {
      code: 200,
      message: "创建成功",
      data: {
        id: newUser.id,
        createdAt: newUser.createdAt,
      },
    };
  },

  /** 更新用户 */
  updateUser: async (
    id: string,
    data: UserUpdateRequest,
  ): Promise<ApiResponse<{ updatedAt: string }>> => {
    await delay(500);
    const index = mockUsers.findIndex((u) => u.id === id);
    if (index === -1) {
      return {
        code: 404,
        message: "用户不存在",
        data: { updatedAt: "" },
      };
    }

    const updatedAt = new Date().toISOString();
    mockUsers[index] = {
      ...mockUsers[index],
      ...data,
      role: data.roleId
        ? mockRoles.find((r) => r.id === data.roleId) || mockUsers[index].role
        : mockUsers[index].role,
    };

    return {
      code: 200,
      message: "更新成功",
      data: { updatedAt },
    };
  },

  /** 删除用户 */
  deleteUser: async (id: string): Promise<ApiResponse<null>> => {
    await delay(500);
    const index = mockUsers.findIndex((u) => u.id === id);
    if (index === -1) {
      return {
        code: 404,
        message: "用户不存在",
        data: null,
      };
    }
    mockUsers.splice(index, 1);
    return {
      code: 200,
      message: "删除成功",
      data: null,
    };
  },

  /** 批量删除用户 */
  batchDeleteUsers: async (ids: string[]): Promise<ApiResponse<null>> => {
    await delay(500);
    ids.forEach((id) => {
      const index = mockUsers.findIndex((u) => u.id === id);
      if (index !== -1) {
        mockUsers.splice(index, 1);
      }
    });
    return {
      code: 200,
      message: "批量删除成功",
      data: null,
    };
  },

  /** 更新用户状态 */
  updateUserStatus: async (
    id: string,
    status: UserStatus,
  ): Promise<ApiResponse<User | null>> => {
    await delay(500);
    const user = mockUsers.find((u) => u.id === id);
    if (!user) {
      return {
        code: 404,
        message: "用户不存在",
        data: null,
      };
    }
    user.status = status;
    return {
      code: 200,
      message: "状态更新成功",
      data: user,
    };
  },
};

// ============================================================================
// 仪表盘服务
// ============================================================================

export const dashboardService = {
  /** 获取统计数据 */
  getStats: async (): Promise<ApiResponse<DashboardStats>> => {
    await delay();
    return {
      code: 200,
      message: "success",
      data: mockDashboardStats,
    };
  },

  /** 获取访问趋势 */
  getVisits: async (): Promise<ApiResponse<VisitData[]>> => {
    await delay();
    return {
      code: 200,
      message: "success",
      data: mockVisitData,
    };
  },

  /** 获取销售趋势 */
  getSales: async (): Promise<ApiResponse<SalesData[]>> => {
    await delay();
    return {
      code: 200,
      message: "success",
      data: mockSalesData,
    };
  },

  /** 获取热门产品 */
  getProducts: async (): Promise<ApiResponse<Product[]>> => {
    await delay();
    return {
      code: 200,
      message: "success",
      data: mockProducts,
    };
  },

  /** 获取最近订单 */
  getOrders: async (): Promise<ApiResponse<Order[]>> => {
    await delay();
    return {
      code: 200,
      message: "success",
      data: mockOrders,
    };
  },

  /** 获取用户活动 */
  getActivities: async (): Promise<ApiResponse<Activity[]>> => {
    await delay();
    return {
      code: 200,
      message: "success",
      data: mockActivities,
    };
  },

  /** 获取系统概览 */
  getOverview: async (): Promise<ApiResponse<SystemOverview>> => {
    await delay();
    return {
      code: 200,
      message: "success",
      data: mockSystemOverview,
    };
  },

  /** 获取流量来源 */
  getTrafficSources: async (): Promise<
    ApiResponse<{ name: string; value: number }[]>
  > => {
    await delay();
    return {
      code: 200,
      message: "success",
      data: mockTrafficSources,
    };
  },

  /** 获取待办任务 */
  getTasks: async (): Promise<
    ApiResponse<{ id: string; title: string; status: string }[]>
  > => {
    await delay();
    return {
      code: 200,
      message: "success",
      data: mockTasks,
    };
  },
};

// ============================================================================
// 通知服务
// ============================================================================

export const notificationService = {
  /** 获取通知列表 */
  getNotifications: async (): Promise<ApiResponse<ListData<Notification>>> => {
    await delay();
    return {
      code: 200,
      message: "success",
      data: {
        list: mockNotifications,
        total: mockNotifications.length,
      },
    };
  },

  /** 标记通知为已读 */
  markAsRead: async (id: string): Promise<ApiResponse<null>> => {
    await delay();
    const notification = mockNotifications.find((n) => n.id === id);
    if (notification) {
      notification.read = true;
    }
    return {
      code: 200,
      message: "success",
      data: null,
    };
  },

  /** 标记所有通知为已读 */
  markAllAsRead: async (): Promise<ApiResponse<null>> => {
    await delay();
    mockNotifications.forEach((n) => (n.read = true));
    return {
      code: 200,
      message: "success",
      data: null,
    };
  },

  /** 删除通知 */
  deleteNotification: async (id: string): Promise<ApiResponse<null>> => {
    await delay();
    const index = mockNotifications.findIndex((n) => n.id === id);
    if (index !== -1) {
      mockNotifications.splice(index, 1);
    }
    return {
      code: 200,
      message: "success",
      data: null,
    };
  },

  /** 获取未读数量 */
  getUnreadCount: async (): Promise<ApiResponse<number>> => {
    await delay(100);
    const count = mockNotifications.filter((n) => !n.read).length;
    return {
      code: 200,
      message: "success",
      data: count,
    };
  },
};

// ============================================================================
// 文档服务
// ============================================================================

export const documentService = {
  /** 获取文档列表 */
  getDocuments: async (
    params?: { folder?: string; keyword?: string },
  ): Promise<ApiResponse<ListData<Document>>> => {
    await delay();
    let documents = [...mockDocuments];

    if (params?.folder) {
      documents = documents.filter((d) => d.folder === params.folder);
    }

    if (params?.keyword) {
      const keyword = params.keyword.toLowerCase();
      documents = documents.filter(
        (d) =>
          d.title?.toLowerCase().includes(keyword) ||
          d.name?.toLowerCase().includes(keyword),
      );
    }

    return {
      code: 200,
      message: "success",
      data: {
        list: documents,
        total: documents.length,
      },
    };
  },

  /** 获取单个文档 */
  getDocument: async (
    id: string,
  ): Promise<ApiResponse<Document | undefined>> => {
    await delay();
    const doc = mockDocuments.find((d) => d.id === id);
    return {
      code: doc ? 200 : 404,
      message: doc ? "success" : "文档不存在",
      data: doc,
    };
  },

  /** 创建文档 */
  createDocument: async (
    data: Partial<Document>,
  ): Promise<ApiResponse<{ id: string }>> => {
    await delay(500);
    const newDoc: Document = {
      id: generateId(),
      title: data.title || "未命名文档",
      type: data.type || "document",
      size: data.size || 0,
      shared: data.shared || false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      ...data,
    };
    mockDocuments.push(newDoc);
    return {
      code: 200,
      message: "创建成功",
      data: { id: newDoc.id },
    };
  },

  /** 删除文档 */
  deleteDocument: async (id: string): Promise<ApiResponse<null>> => {
    await delay(500);
    const index = mockDocuments.findIndex((d) => d.id === id);
    if (index !== -1) {
      mockDocuments.splice(index, 1);
    }
    return {
      code: 200,
      message: "删除成功",
      data: null,
    };
  },
};

// ============================================================================
// 消息服务
// ============================================================================

export const messageService = {
  /** 获取会话列表 */
  getConversations: async (): Promise<ApiResponse<Conversation[]>> => {
    await delay();
    return {
      code: 200,
      message: "success",
      data: mockConversations,
    };
  },

  /** 获取消息列表 */
  getMessages: async (
    conversationId: string,
  ): Promise<ApiResponse<Message[]>> => {
    await delay();
    const messages = mockMessages.filter(
      (m) => m.conversationId === conversationId,
    );
    return {
      code: 200,
      message: "success",
      data: messages,
    };
  },

  /** 发送消息 */
  sendMessage: async (
    conversationId: string,
    content: string,
  ): Promise<ApiResponse<Message>> => {
    await delay(500);
    const newMessage: Message = {
      id: generateId(),
      conversationId,
      sender: {
        id: "1",
        name: "当前用户",
        avatar: "/avatars/1.png",
      },
      type: "text",
      content,
      createdAt: new Date().toISOString(),
      read: true,
    };
    mockMessages.push(newMessage);

    // 更新会话最后消息
    const conversation = mockConversations.find(
      (c) => c.id === conversationId,
    );
    if (conversation) {
      conversation.lastMessage = content;
      conversation.lastMessageTime = newMessage.createdAt;
    }

    return {
      code: 200,
      message: "success",
      data: newMessage,
    };
  },

  /** 标记消息为已读 */
  markAsRead: async (conversationId: string): Promise<ApiResponse<null>> => {
    await delay();
    mockMessages
      .filter((m) => m.conversationId === conversationId)
      .forEach((m) => (m.read = true));

    const conversation = mockConversations.find(
      (c) => c.id === conversationId,
    );
    if (conversation) {
      conversation.unreadCount = 0;
    }

    return {
      code: 200,
      message: "success",
      data: null,
    };
  },
};

// ============================================================================
// 日历服务
// ============================================================================

export const calendarService = {
  /** 获取日历事件 */
  getEvents: async (
    params?: { start?: string; end?: string },
  ): Promise<ApiResponse<CalendarEvent[]>> => {
    await delay();
    let events = [...mockCalendarEvents];

    if (params?.start) {
      events = events.filter(
        (e) => new Date(e.start) >= new Date(params.start!),
      );
    }

    if (params?.end) {
      events = events.filter((e) => new Date(e.end) <= new Date(params.end!));
    }

    return {
      code: 200,
      message: "success",
      data: events,
    };
  },

  /** 创建日历事件 */
  createEvent: async (
    data: Partial<CalendarEvent>,
  ): Promise<ApiResponse<CalendarEvent>> => {
    await delay(500);
    const newEvent: CalendarEvent = {
      id: generateId(),
      title: data.title || "新事件",
      start: data.start || new Date().toISOString(),
      end: data.end || new Date().toISOString(),
      ...data,
    };
    mockCalendarEvents.push(newEvent);
    return {
      code: 200,
      message: "创建成功",
      data: newEvent,
    };
  },

  /** 更新日历事件 */
  updateEvent: async (
    id: string,
    data: Partial<CalendarEvent>,
  ): Promise<ApiResponse<CalendarEvent | undefined>> => {
    await delay(500);
    const index = mockCalendarEvents.findIndex((e) => e.id === id);
    if (index === -1) {
      return {
        code: 404,
        message: "事件不存在",
        data: undefined,
      };
    }
    mockCalendarEvents[index] = { ...mockCalendarEvents[index], ...data };
    return {
      code: 200,
      message: "更新成功",
      data: mockCalendarEvents[index],
    };
  },

  /** 删除日历事件 */
  deleteEvent: async (id: string): Promise<ApiResponse<null>> => {
    await delay(500);
    const index = mockCalendarEvents.findIndex((e) => e.id === id);
    if (index !== -1) {
      mockCalendarEvents.splice(index, 1);
    }
    return {
      code: 200,
      message: "删除成功",
      data: null,
    };
  },
};

// ============================================================================
// 文件服务
// ============================================================================

export const fileService = {
  /** 获取文件列表 */
  getFiles: async (path?: string): Promise<ApiResponse<FileItem[]>> => {
    await delay();
    let files = [...mockFiles];
    if (path) {
      files = files.filter((f) => f.path.startsWith(path));
    }
    return {
      code: 200,
      message: "success",
      data: files,
    };
  },

  /** 获取存储信息 */
  getStorageInfo: async (): Promise<ApiResponse<StorageInfo>> => {
    await delay();
    return {
      code: 200,
      message: "success",
      data: mockStorageInfo,
    };
  },

  /** 创建文件夹 */
  createFolder: async (
    name: string,
    parentPath?: string,
  ): Promise<ApiResponse<FileItem>> => {
    await delay(500);
    const newFolder: FileItem = {
      id: `folder-${generateId()}`,
      name,
      type: "folder",
      size: null,
      items: 0,
      path: parentPath ? `${parentPath}/${name}` : `/${name}`,
      mimeType: "folder",
      thumbnail: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    mockFiles.push(newFolder);
    return {
      code: 200,
      message: "创建成功",
      data: newFolder,
    };
  },

  /** 删除文件/文件夹 */
  deleteFile: async (id: string): Promise<ApiResponse<null>> => {
    await delay(500);
    const index = mockFiles.findIndex((f) => f.id === id);
    if (index !== -1) {
      mockFiles.splice(index, 1);
    }
    return {
      code: 200,
      message: "删除成功",
      data: null,
    };
  },

  /** 重命名文件/文件夹 */
  renameFile: async (
    id: string,
    newName: string,
  ): Promise<ApiResponse<FileItem | undefined>> => {
    await delay(500);
    const file = mockFiles.find((f) => f.id === id);
    if (!file) {
      return {
        code: 404,
        message: "文件不存在",
        data: undefined,
      };
    }
    file.name = newName;
    file.updatedAt = new Date().toISOString();
    return {
      code: 200,
      message: "重命名成功",
      data: file,
    };
  },
};

// ============================================================================
// 团队服务
// ============================================================================

export const teamService = {
  /** 获取团队列表 */
  getTeams: async (): Promise<ApiResponse<Team[]>> => {
    await delay();
    return {
      code: 200,
      message: "success",
      data: mockTeams,
    };
  },

  /** 获取单个团队 */
  getTeam: async (id: string): Promise<ApiResponse<Team | undefined>> => {
    await delay();
    const team = mockTeams.find((t) => t.id === id);
    return {
      code: team ? 200 : 404,
      message: team ? "success" : "团队不存在",
      data: team,
    };
  },

  /** 创建团队 */
  createTeam: async (data: TeamCreateRequest): Promise<ApiResponse<Team>> => {
    await delay(500);
    const newTeam: Team = {
      id: `team-${generateId()}`,
      name: data.name,
      description: data.description,
      memberCount: 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    mockTeams.push(newTeam);
    return {
      code: 200,
      message: "创建成功",
      data: newTeam,
    };
  },

  /** 更新团队 */
  updateTeam: async (
    id: string,
    data: TeamUpdateRequest,
  ): Promise<ApiResponse<Team | undefined>> => {
    await delay(500);
    const index = mockTeams.findIndex((t) => t.id === id);
    if (index === -1) {
      return {
        code: 404,
        message: "团队不存在",
        data: undefined,
      };
    }
    mockTeams[index] = {
      ...mockTeams[index],
      ...data,
      updatedAt: new Date().toISOString(),
    };
    return {
      code: 200,
      message: "更新成功",
      data: mockTeams[index],
    };
  },

  /** 删除团队 */
  deleteTeam: async (id: string): Promise<ApiResponse<null>> => {
    await delay(500);
    const index = mockTeams.findIndex((t) => t.id === id);
    if (index !== -1) {
      mockTeams.splice(index, 1);
    }
    return {
      code: 200,
      message: "删除成功",
      data: null,
    };
  },
};

// ============================================================================
// 角色服务
// ============================================================================

export const roleService = {
  /** 获取角色列表 */
  getRoles: async (): Promise<ApiResponse<RoleDetail[]>> => {
    await delay();
    const rolesWithDetails: RoleDetail[] = mockRoles.map((role) => ({
      ...role,
      userCount: mockUsers.filter((u) => u.role.id === role.id).length,
      createdAt: "2024-01-01T00:00:00Z",
      updatedAt: new Date().toISOString(),
    }));
    return {
      code: 200,
      message: "success",
      data: rolesWithDetails,
    };
  },

  /** 获取单个角色 */
  getRole: async (id: string): Promise<ApiResponse<RoleDetail | undefined>> => {
    await delay();
    const role = mockRoles.find((r) => r.id === id);
    if (!role) {
      return {
        code: 404,
        message: "角色不存在",
        data: undefined,
      };
    }
    return {
      code: 200,
      message: "success",
      data: {
        ...role,
        userCount: mockUsers.filter((u) => u.role.id === role.id).length,
        createdAt: "2024-01-01T00:00:00Z",
        updatedAt: new Date().toISOString(),
      },
    };
  },

  /** 创建角色 */
  createRole: async (
    data: RoleCreateRequest,
  ): Promise<ApiResponse<RoleDetail>> => {
    await delay(500);
    const newRole: RoleDetail = {
      id: generateId(),
      name: data.name,
      label: data.label,
      description: data.description,
      permissions: data.permissions,
      userCount: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    mockRoles.push(newRole);
    return {
      code: 200,
      message: "创建成功",
      data: newRole,
    };
  },

  /** 更新角色 */
  updateRole: async (
    id: string,
    data: RoleUpdateRequest,
  ): Promise<ApiResponse<RoleDetail | undefined>> => {
    await delay(500);
    const index = mockRoles.findIndex((r) => r.id === id);
    if (index === -1) {
      return {
        code: 404,
        message: "角色不存在",
        data: undefined,
      };
    }
    mockRoles[index] = {
      ...mockRoles[index],
      ...data,
    };
    return {
      code: 200,
      message: "更新成功",
      data: {
        ...mockRoles[index],
        userCount: mockUsers.filter((u) => u.role.id === id).length,
        createdAt: "2024-01-01T00:00:00Z",
        updatedAt: new Date().toISOString(),
      },
    };
  },

  /** 删除角色 */
  deleteRole: async (id: string): Promise<ApiResponse<null>> => {
    await delay(500);
    // 检查是否有用户使用此角色
    const usersWithRole = mockUsers.filter((u) => u.role.id === id);
    if (usersWithRole.length > 0) {
      return {
        code: 400,
        message: "该角色下存在用户，无法删除",
        data: null,
      };
    }
    const index = mockRoles.findIndex((r) => r.id === id);
    if (index !== -1) {
      mockRoles.splice(index, 1);
    }
    return {
      code: 200,
      message: "删除成功",
      data: null,
    };
  },
};
