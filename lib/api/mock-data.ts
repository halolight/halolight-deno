/**
 * Mock 数据中心
 * 提供静态 mock 数据供 API 服务使用
 */

import type {
  Activity,
  CalendarEvent,
  ChartData,
  Conversation,
  DashboardStats,
  Document,
  FileItem,
  Message,
  Notification,
  Order,
  Product,
  Role,
  SalesData,
  StorageInfo,
  SystemOverview,
  Team,
  User,
  VisitData,
} from "./types.ts";

// ============================================================================
// 角色数据
// ============================================================================

/** 预定义角色列表 */
export const mockRoles: Role[] = [
  {
    id: "admin",
    name: "admin",
    label: "超级管理员",
    description: "拥有系统所有权限",
    permissions: [
      "dashboard:view",
      "users:view",
      "users:create",
      "users:edit",
      "users:delete",
      "analytics:view",
      "analytics:export",
      "settings:view",
      "settings:edit",
      "documents:view",
      "documents:create",
      "documents:edit",
      "documents:delete",
      "files:view",
      "files:upload",
      "files:delete",
      "messages:view",
      "messages:send",
      "calendar:view",
      "calendar:edit",
      "notifications:view",
      "notifications:manage",
    ],
  },
  {
    id: "manager",
    name: "manager",
    label: "管理员",
    description: "管理日常业务",
    permissions: [
      "dashboard:view",
      "users:view",
      "users:create",
      "users:edit",
      "analytics:view",
      "analytics:export",
      "documents:view",
      "documents:create",
      "documents:edit",
      "files:view",
      "files:upload",
      "messages:view",
      "messages:send",
      "calendar:view",
      "calendar:edit",
      "notifications:view",
    ],
  },
  {
    id: "editor",
    name: "editor",
    label: "编辑",
    description: "内容管理",
    permissions: [
      "dashboard:view",
      "documents:view",
      "documents:create",
      "documents:edit",
      "files:view",
      "files:upload",
      "messages:view",
      "messages:send",
      "calendar:view",
      "notifications:view",
    ],
  },
  {
    id: "viewer",
    name: "viewer",
    label: "访客",
    description: "只读权限",
    permissions: [
      "dashboard:view",
      "documents:view",
      "files:view",
      "messages:view",
      "calendar:view",
      "notifications:view",
    ],
  },
];

// ============================================================================
// 用户数据
// ============================================================================

/** Mock 用户列表 */
export const mockUsers: User[] = [
  {
    id: "1",
    name: "张三",
    email: "zhangsan@halolight.h7ml.cn",
    phone: "138-0000-0001",
    avatar: "/avatars/1.png",
    role: mockRoles[0],
    status: "active",
    department: "技术部",
    position: "技术总监",
    bio: "10年开发经验，专注于前端架构设计",
    createdAt: "2024-01-01T00:00:00Z",
    lastLoginAt: "2024-01-15T10:30:00Z",
  },
  {
    id: "2",
    name: "李四",
    email: "lisi@halolight.h7ml.cn",
    phone: "138-0000-0002",
    avatar: "/avatars/2.png",
    role: mockRoles[1],
    status: "active",
    department: "运营部",
    position: "运营经理",
    createdAt: "2024-01-05T00:00:00Z",
    lastLoginAt: "2024-01-14T15:20:00Z",
  },
  {
    id: "3",
    name: "王五",
    email: "wangwu@halolight.h7ml.cn",
    phone: "138-0000-0003",
    avatar: "/avatars/3.png",
    role: mockRoles[2],
    status: "active",
    department: "内容部",
    position: "内容编辑",
    createdAt: "2024-01-08T00:00:00Z",
    lastLoginAt: "2024-01-13T09:45:00Z",
  },
  {
    id: "4",
    name: "赵六",
    email: "zhaoliu@halolight.h7ml.cn",
    phone: "138-0000-0004",
    avatar: "/avatars/4.png",
    role: mockRoles[3],
    status: "inactive",
    department: "市场部",
    position: "市场专员",
    createdAt: "2024-01-10T00:00:00Z",
  },
  {
    id: "5",
    name: "陈七",
    email: "chenqi@halolight.h7ml.cn",
    phone: "138-0000-0005",
    avatar: "/avatars/5.png",
    role: mockRoles[2],
    status: "suspended",
    department: "内容部",
    position: "高级编辑",
    createdAt: "2024-01-12T00:00:00Z",
  },
];

// ============================================================================
// 通知数据
// ============================================================================

/** Mock 通知列表 */
export const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "user",
    title: "新用户注册",
    content: "用户 张三 刚刚完成注册",
    read: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
    link: "/users",
  },
  {
    id: "2",
    type: "system",
    title: "系统更新",
    content: "系统将于今晚 23:00 进行维护升级",
    read: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
  },
  {
    id: "3",
    type: "task",
    title: "任务完成",
    content: "数据备份任务已完成",
    read: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
  },
  {
    id: "4",
    type: "alert",
    title: "安全警告",
    content: "检测到异常登录尝试",
    read: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
  },
  {
    id: "5",
    type: "user",
    title: "评论回复",
    content: "李四 回复了您的评论",
    read: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
    link: "/messages",
  },
];

// ============================================================================
// 仪表盘数据
// ============================================================================

/** 仪表盘统计数据 */
export const mockDashboardStats: DashboardStats = {
  totalUsers: 12453,
  activeUsers: 8234,
  totalRevenue: 543210,
  totalOrders: 3567,
  conversionRate: 12.5,
  recentOrders: 234,
  pendingTasks: 18,
  userGrowth: 15.2,
  revenueGrowth: 23.8,
  orderGrowth: 8.5,
  rateGrowth: 2.3,
};

/** 图表数据 */
export const mockChartData: ChartData[] = [
  { date: "2024-01-01", value: 4000, category: "访问量" },
  { date: "2024-01-02", value: 3000, category: "访问量" },
  { date: "2024-01-03", value: 5000, category: "访问量" },
  { date: "2024-01-04", value: 2780, category: "访问量" },
  { date: "2024-01-05", value: 1890, category: "访问量" },
  { date: "2024-01-06", value: 2390, category: "访问量" },
  { date: "2024-01-07", value: 3490, category: "访问量" },
];

/** 访问数据 */
export const mockVisitData: VisitData[] = Array.from({ length: 30 }, (_, i) => {
  const date = new Date();
  date.setDate(date.getDate() - (29 - i));
  return {
    date: date.toISOString().split("T")[0],
    visits: Math.floor(Math.random() * 7000) + 1000,
    uniqueVisitors: Math.floor(Math.random() * 4500) + 500,
    pageViews: Math.floor(Math.random() * 17000) + 3000,
  };
});

/** 销售数据 */
export const mockSalesData: SalesData[] = [
  { month: "1月", sales: 125000, profit: 28000 },
  { month: "2月", sales: 98000, profit: 22000 },
  { month: "3月", sales: 156000, profit: 35000 },
  { month: "4月", sales: 132000, profit: 30000 },
  { month: "5月", sales: 178000, profit: 42000 },
  { month: "6月", sales: 145000, profit: 33000 },
  { month: "7月", sales: 189000, profit: 48000 },
  { month: "8月", sales: 167000, profit: 39000 },
  { month: "9月", sales: 198000, profit: 52000 },
  { month: "10月", sales: 156000, profit: 36000 },
  { month: "11月", sales: 212000, profit: 58000 },
  { month: "12月", sales: 234000, profit: 65000 },
];

/** 热门产品 */
export const mockProducts: Product[] = [
  {
    id: "1",
    name: "智能手表 Pro",
    category: "智能穿戴",
    price: 1299,
    sales: 3456,
    stock: 234,
    image: "/products/watch.png",
  },
  {
    id: "2",
    name: "无线耳机 Max",
    category: "音频设备",
    price: 899,
    sales: 2890,
    stock: 567,
    image: "/products/earphone.png",
  },
  {
    id: "3",
    name: "便携充电宝",
    category: "数码配件",
    price: 199,
    sales: 5678,
    stock: 890,
    image: "/products/powerbank.png",
  },
  {
    id: "4",
    name: "机械键盘",
    category: "电脑外设",
    price: 459,
    sales: 1234,
    stock: 345,
    image: "/products/keyboard.png",
  },
  {
    id: "5",
    name: "显示器支架",
    category: "电脑外设",
    price: 289,
    sales: 789,
    stock: 456,
    image: "/products/stand.png",
  },
];

/** 最近订单 */
export const mockOrders: Order[] = [
  {
    id: "1",
    orderNo: "ORD2024010001",
    customer: "张三",
    amount: 2598,
    status: "delivered",
    createdAt: "2024-01-15T10:30:00Z",
  },
  {
    id: "2",
    orderNo: "ORD2024010002",
    customer: "李四",
    amount: 899,
    status: "shipped",
    createdAt: "2024-01-15T09:20:00Z",
  },
  {
    id: "3",
    orderNo: "ORD2024010003",
    customer: "王五",
    amount: 1598,
    status: "processing",
    createdAt: "2024-01-15T08:15:00Z",
  },
  {
    id: "4",
    orderNo: "ORD2024010004",
    customer: "赵六",
    amount: 459,
    status: "pending",
    createdAt: "2024-01-15T07:45:00Z",
  },
  {
    id: "5",
    orderNo: "ORD2024010005",
    customer: "陈七",
    amount: 3297,
    status: "cancelled",
    createdAt: "2024-01-14T16:30:00Z",
  },
];

/** 用户活动 */
export const mockActivities: Activity[] = [
  {
    id: "1",
    user: "张三",
    avatar: "/avatars/1.png",
    action: "登录系统",
    target: "管理后台",
    time: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
  },
  {
    id: "2",
    user: "李四",
    avatar: "/avatars/2.png",
    action: "创建订单",
    target: "ORD2024010006",
    time: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
  },
  {
    id: "3",
    user: "王五",
    avatar: "/avatars/3.png",
    action: "上传文件",
    target: "产品说明书.pdf",
    time: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
  },
  {
    id: "4",
    user: "赵六",
    avatar: "/avatars/4.png",
    action: "发表评论",
    target: "新品发布公告",
    time: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
  },
  {
    id: "5",
    user: "陈七",
    avatar: "/avatars/5.png",
    action: "更新资料",
    target: "个人信息",
    time: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
  },
];

/** 系统概览 */
export const mockSystemOverview: SystemOverview = {
  cpu: 45,
  memory: 62,
  disk: 58,
  network: 35,
  uptime: 864000,
  requests: 58234,
  errors: 23,
  responseTime: 156,
};

// ============================================================================
// 文档数据
// ============================================================================

/** Mock 文档列表 */
export const mockDocuments: Document[] = [
  {
    id: "1",
    title: "项目计划书",
    name: "project-plan.docx",
    type: "document",
    size: 1024 * 500,
    folder: "工作文档",
    createdAt: "2024-01-10T00:00:00Z",
    updatedAt: "2024-01-15T10:30:00Z",
    createdBy: "张三",
    shared: true,
    tags: ["项目", "计划"],
    views: 156,
    author: {
      id: "1",
      name: "张三",
      avatar: "/avatars/1.png",
    },
  },
  {
    id: "2",
    title: "财务报表",
    name: "financial-report.xlsx",
    type: "spreadsheet",
    size: 1024 * 800,
    folder: "财务",
    createdAt: "2024-01-08T00:00:00Z",
    updatedAt: "2024-01-14T15:20:00Z",
    createdBy: "李四",
    shared: false,
    tags: ["财务", "报表"],
    views: 89,
    author: {
      id: "2",
      name: "李四",
      avatar: "/avatars/2.png",
    },
  },
  {
    id: "3",
    title: "产品演示",
    name: "product-demo.pptx",
    type: "presentation",
    size: 1024 * 1200,
    folder: "产品",
    createdAt: "2024-01-05T00:00:00Z",
    updatedAt: "2024-01-13T09:45:00Z",
    createdBy: "王五",
    shared: true,
    tags: ["产品", "演示"],
    views: 234,
    author: {
      id: "3",
      name: "王五",
      avatar: "/avatars/3.png",
    },
  },
  {
    id: "4",
    title: "用户手册",
    name: "user-manual.pdf",
    type: "pdf",
    size: 1024 * 2048,
    folder: "文档",
    createdAt: "2024-01-03T00:00:00Z",
    updatedAt: "2024-01-12T14:00:00Z",
    createdBy: "张三",
    shared: true,
    tags: ["用户", "手册"],
    views: 567,
    author: {
      id: "1",
      name: "张三",
      avatar: "/avatars/1.png",
    },
  },
  {
    id: "5",
    title: "代码规范",
    name: "code-standards.md",
    type: "code",
    size: 1024 * 50,
    folder: "开发",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-10T11:30:00Z",
    createdBy: "张三",
    shared: true,
    tags: ["开发", "规范"],
    views: 345,
    author: {
      id: "1",
      name: "张三",
      avatar: "/avatars/1.png",
    },
  },
];

// ============================================================================
// 消息数据
// ============================================================================

/** Mock 消息列表 */
export const mockMessages: Message[] = [
  {
    id: "1",
    conversationId: "conv-1",
    sender: { id: "2", name: "李四", avatar: "/avatars/2.png" },
    type: "text",
    content: "你好，项目进度如何？",
    createdAt: new Date(Date.now() - 1000 * 60 * 10).toISOString(),
    read: false,
  },
  {
    id: "2",
    conversationId: "conv-1",
    sender: { id: "1", name: "张三", avatar: "/avatars/1.png" },
    type: "text",
    content: "进展顺利，预计本周完成",
    createdAt: new Date(Date.now() - 1000 * 60 * 8).toISOString(),
    read: true,
  },
  {
    id: "3",
    conversationId: "conv-2",
    sender: { id: "3", name: "王五" },
    type: "text",
    content: "文档已经更新完成",
    createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    read: false,
  },
  {
    id: "4",
    conversationId: "conv-3",
    sender: { id: "4", name: "赵六" },
    type: "text",
    content: "会议改到下午3点",
    createdAt: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
    read: true,
  },
];

/** Mock 会话列表 */
export const mockConversations: Conversation[] = [
  {
    id: "conv-1",
    type: "private",
    name: "李四",
    avatar: "/avatars/2.png",
    lastMessage: "进展顺利，预计本周完成",
    lastMessageTime: new Date(Date.now() - 1000 * 60 * 8).toISOString(),
    unreadCount: 1,
    online: true,
    members: [
      { id: "1", name: "张三", avatar: "/avatars/1.png" },
      { id: "2", name: "李四", avatar: "/avatars/2.png" },
    ],
  },
  {
    id: "conv-2",
    type: "private",
    name: "王五",
    avatar: "/avatars/3.png",
    lastMessage: "文档已经更新完成",
    lastMessageTime: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    unreadCount: 1,
    online: false,
    members: [
      { id: "1", name: "张三", avatar: "/avatars/1.png" },
      { id: "3", name: "王五", avatar: "/avatars/3.png" },
    ],
  },
  {
    id: "conv-3",
    type: "group",
    name: "项目组",
    avatar: "/avatars/group.png",
    lastMessage: "会议改到下午3点",
    lastMessageTime: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
    unreadCount: 0,
    online: true,
    members: [
      { id: "1", name: "张三", avatar: "/avatars/1.png" },
      { id: "2", name: "李四", avatar: "/avatars/2.png" },
      { id: "3", name: "王五", avatar: "/avatars/3.png" },
      { id: "4", name: "赵六", avatar: "/avatars/4.png" },
    ],
  },
];

// ============================================================================
// 日历数据
// ============================================================================

/** Mock 日历事件 */
export const mockCalendarEvents: CalendarEvent[] = [
  {
    id: "1",
    title: "项目启动会",
    description: "讨论Q1项目计划",
    start: new Date(Date.now() + 1000 * 60 * 60 * 2).toISOString(),
    end: new Date(Date.now() + 1000 * 60 * 60 * 4).toISOString(),
    type: "meeting",
    color: "#3b82f6",
    location: "会议室A",
    attendees: [
      { id: "1", name: "张三", avatar: "/avatars/1.png", status: "accepted" },
      { id: "2", name: "李四", avatar: "/avatars/2.png", status: "accepted" },
      { id: "3", name: "王五", avatar: "/avatars/3.png", status: "pending" },
    ],
  },
  {
    id: "2",
    title: "代码评审",
    description: "Review PR #123",
    start: new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString(),
    end: new Date(Date.now() + 1000 * 60 * 60 * 26).toISOString(),
    type: "task",
    color: "#10b981",
    attendees: [
      { id: "1", name: "张三", avatar: "/avatars/1.png", status: "accepted" },
      { id: "3", name: "王五", avatar: "/avatars/3.png", status: "accepted" },
    ],
  },
  {
    id: "3",
    title: "产品发布",
    description: "v2.0 正式发布",
    start: new Date(Date.now() + 1000 * 60 * 60 * 48).toISOString(),
    end: new Date(Date.now() + 1000 * 60 * 60 * 48).toISOString(),
    type: "reminder",
    allDay: true,
    color: "#f59e0b",
  },
  {
    id: "4",
    title: "春节假期",
    start: new Date(2024, 1, 10).toISOString(),
    end: new Date(2024, 1, 17).toISOString(),
    type: "holiday",
    allDay: true,
    color: "#ef4444",
  },
];

// ============================================================================
// 文件数据
// ============================================================================

/** Mock 文件列表 */
export const mockFiles: FileItem[] = [
  {
    id: "folder-1",
    name: "工作文档",
    type: "folder",
    size: null,
    items: 12,
    path: "/工作文档",
    mimeType: "folder",
    thumbnail: null,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-15T10:00:00Z",
  },
  {
    id: "folder-2",
    name: "图片素材",
    type: "folder",
    size: null,
    items: 45,
    path: "/图片素材",
    mimeType: "folder",
    thumbnail: null,
    createdAt: "2024-01-02T00:00:00Z",
    updatedAt: "2024-01-14T15:00:00Z",
  },
  {
    id: "file-1",
    name: "产品设计图.png",
    type: "image",
    size: 2048000,
    items: null,
    path: "/产品设计图.png",
    mimeType: "image/png",
    thumbnail: "/thumbnails/design.png",
    createdAt: "2024-01-10T00:00:00Z",
    updatedAt: "2024-01-10T00:00:00Z",
  },
  {
    id: "file-2",
    name: "宣传视频.mp4",
    type: "video",
    size: 52428800,
    items: null,
    path: "/宣传视频.mp4",
    mimeType: "video/mp4",
    thumbnail: "/thumbnails/video.png",
    createdAt: "2024-01-08T00:00:00Z",
    updatedAt: "2024-01-08T00:00:00Z",
  },
  {
    id: "file-3",
    name: "背景音乐.mp3",
    type: "audio",
    size: 5242880,
    items: null,
    path: "/背景音乐.mp3",
    mimeType: "audio/mp3",
    thumbnail: null,
    createdAt: "2024-01-05T00:00:00Z",
    updatedAt: "2024-01-05T00:00:00Z",
  },
  {
    id: "file-4",
    name: "项目资料.zip",
    type: "archive",
    size: 10485760,
    items: null,
    path: "/项目资料.zip",
    mimeType: "application/zip",
    thumbnail: null,
    createdAt: "2024-01-03T00:00:00Z",
    updatedAt: "2024-01-03T00:00:00Z",
  },
];

/** 存储信息 */
export const mockStorageInfo: StorageInfo = {
  used: 5368709120, // 5GB
  total: 10737418240, // 10GB
  breakdown: {
    images: 1073741824, // 1GB
    videos: 2147483648, // 2GB
    audio: 536870912, // 512MB
    documents: 1073741824, // 1GB
    archives: 268435456, // 256MB
    others: 268435456, // 256MB
  },
};

// ============================================================================
// 团队数据
// ============================================================================

/** Mock 团队列表 */
export const mockTeams: Team[] = [
  {
    id: "team-1",
    name: "技术研发部",
    description: "负责产品研发和技术创新",
    avatar: "/teams/tech.png",
    memberCount: 12,
    members: [
      {
        id: "m1",
        userId: "1",
        name: "张三",
        email: "zhangsan@halolight.h7ml.cn",
        avatar: "/avatars/1.png",
        role: "owner",
        joinedAt: "2024-01-01T00:00:00Z",
      },
      {
        id: "m2",
        userId: "3",
        name: "王五",
        email: "wangwu@halolight.h7ml.cn",
        avatar: "/avatars/3.png",
        role: "admin",
        joinedAt: "2024-01-02T00:00:00Z",
      },
    ],
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-15T00:00:00Z",
  },
  {
    id: "team-2",
    name: "市场运营部",
    description: "负责市场推广和用户运营",
    avatar: "/teams/marketing.png",
    memberCount: 8,
    members: [
      {
        id: "m3",
        userId: "2",
        name: "李四",
        email: "lisi@halolight.h7ml.cn",
        avatar: "/avatars/2.png",
        role: "owner",
        joinedAt: "2024-01-01T00:00:00Z",
      },
    ],
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-14T00:00:00Z",
  },
  {
    id: "team-3",
    name: "产品设计部",
    description: "负责产品规划和UI/UX设计",
    avatar: "/teams/design.png",
    memberCount: 6,
    createdAt: "2024-01-02T00:00:00Z",
    updatedAt: "2024-01-13T00:00:00Z",
  },
];

// ============================================================================
// 流量来源数据
// ============================================================================

/** 流量来源 */
export const mockTrafficSources = [
  { name: "直接访问", value: 580 },
  { name: "搜索引擎", value: 420 },
  { name: "社交媒体", value: 280 },
  { name: "邮件营销", value: 120 },
];

// ============================================================================
// 待办任务数据
// ============================================================================

/** 待办任务 */
export const mockTasks = [
  { id: "1", title: "完成项目文档", status: "pending" as const },
  { id: "2", title: "代码审查", status: "in_progress" as const },
  { id: "3", title: "更新依赖版本", status: "done" as const },
  { id: "4", title: "编写单元测试", status: "pending" as const },
  { id: "5", title: "部署生产环境", status: "pending" as const },
];
