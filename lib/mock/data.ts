/**
 * Mock 数据生成工具
 * 用于生成各类模拟数据
 */

// ============================================================================
// 工具函数
// ============================================================================

/** 生成随机整数 */
export function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/** 生成随机浮点数 */
export function randomFloat(min: number, max: number, decimals = 2): number {
  const value = Math.random() * (max - min) + min;
  return Number(value.toFixed(decimals));
}

/** 生成 UUID */
export function uuid(): string {
  return crypto.randomUUID();
}

/** 从数组中随机选择 */
export function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

/** 生成随机日期字符串 */
export function randomDate(daysAgo = 30): string {
  const date = new Date();
  date.setDate(date.getDate() - randomInt(0, daysAgo));
  return date.toISOString().split("T")[0];
}

/** 生成随机时间字符串 */
export function randomDateTime(daysAgo = 30): string {
  const date = new Date();
  date.setDate(date.getDate() - randomInt(0, daysAgo));
  date.setHours(randomInt(0, 23), randomInt(0, 59), randomInt(0, 59));
  return date.toISOString().replace("T", " ").substring(0, 19);
}

/** 生成随机颜色 */
export function randomColor(): string {
  const colors = [
    "#3B82F6",
    "#10B981",
    "#F59E0B",
    "#EF4444",
    "#8B5CF6",
    "#EC4899",
    "#06B6D4",
    "#84CC16",
    "#F97316",
    "#6366F1",
  ];
  return pick(colors);
}

// ============================================================================
// 中文随机数据
// ============================================================================

const lastNames = [
  "张",
  "王",
  "李",
  "赵",
  "刘",
  "陈",
  "杨",
  "黄",
  "周",
  "吴",
  "徐",
  "孙",
  "马",
  "朱",
  "胡",
];
const firstNames = [
  "伟",
  "芳",
  "娜",
  "敏",
  "静",
  "丽",
  "强",
  "磊",
  "洋",
  "艳",
  "勇",
  "军",
  "杰",
  "娟",
  "涛",
];

export function randomCName(): string {
  return pick(lastNames) + pick(firstNames) +
    (Math.random() > 0.5 ? pick(firstNames) : "");
}

export function randomEmail(): string {
  const domains = [
    "gmail.com",
    "qq.com",
    "163.com",
    "outlook.com",
    "yahoo.com",
  ];
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  let name = "";
  for (let i = 0; i < randomInt(6, 12); i++) {
    name += chars[randomInt(0, chars.length - 1)];
  }
  return `${name}@${pick(domains)}`;
}

export function randomPhone(): string {
  const prefixes = ["13", "15", "17", "18", "19"];
  let phone = pick(prefixes);
  for (let i = 0; i < 9; i++) {
    phone += randomInt(0, 9);
  }
  return phone;
}

export function randomTitle(minLen = 3, maxLen = 8): string {
  const words = [
    "数据",
    "分析",
    "报告",
    "项目",
    "计划",
    "方案",
    "系统",
    "管理",
    "开发",
    "测试",
    "文档",
    "设计",
  ];
  let result = "";
  const len = randomInt(minLen, maxLen);
  while (result.length < len) {
    result += pick(words);
  }
  return result.substring(0, len);
}

export function randomDepartment(): string {
  const depts = [
    "技术部",
    "产品部",
    "运营部",
    "市场部",
    "销售部",
    "财务部",
    "人事部",
    "行政部",
  ];
  return pick(depts);
}

export function randomPosition(): string {
  const positions = [
    "工程师",
    "经理",
    "总监",
    "专员",
    "主管",
    "助理",
    "顾问",
    "分析师",
  ];
  return pick(positions);
}

// ============================================================================
// 角色数据
// ============================================================================

export const roles = [
  { id: "admin", name: "admin", label: "超级管理员", permissions: ["*"] },
  {
    id: "editor",
    name: "editor",
    label: "编辑员",
    permissions: ["dashboard:view", "users:view", "documents:*"],
  },
  {
    id: "viewer",
    name: "viewer",
    label: "访客",
    permissions: ["dashboard:view"],
  },
];

// ============================================================================
// 数据生成器
// ============================================================================

/** 生成用户数据 */
export function generateUser(id?: string) {
  return {
    id: id || uuid(),
    name: randomCName(),
    email: randomEmail(),
    phone: randomPhone(),
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${
      randomInt(1, 1000)
    }`,
    role: pick(roles),
    status: pick(["active", "inactive", "suspended"]) as
      | "active"
      | "inactive"
      | "suspended",
    department: randomDepartment(),
    position: randomPosition(),
    createdAt: randomDateTime(365),
    lastLoginAt: randomDateTime(30),
  };
}

/** 生成文档数据 */
export function generateDocument(id?: string) {
  const types = [
    "folder",
    "document",
    "spreadsheet",
    "presentation",
    "image",
    "video",
    "audio",
    "archive",
    "other",
  ] as const;
  return {
    id: id || uuid(),
    name: randomTitle(4, 12) +
      pick([".pdf", ".docx", ".xlsx", ".pptx", ".png", ".mp4", ""]),
    type: pick(types),
    size: randomInt(1024, 10485760),
    path: `/documents/${randomInt(1, 100)}`,
    createdBy: randomCName(),
    createdAt: randomDateTime(180),
    updatedAt: randomDateTime(30),
    tags: [randomTitle(2, 4), randomTitle(2, 4)],
  };
}

/** 生成通知数据 */
export function generateNotification(id?: string) {
  const types = ["info", "success", "warning", "error"] as const;
  const titles = [
    "系统更新通知",
    "安全警告",
    "新消息提醒",
    "任务完成",
    "审批请求",
    "账户变更",
    "订单状态更新",
    "活动提醒",
  ];
  return {
    id: id || uuid(),
    title: pick(titles),
    content: randomTitle(10, 30),
    type: pick(types),
    read: Math.random() > 0.3,
    createdAt: randomDateTime(7),
  };
}

/** 生成日历事件数据 */
export function generateCalendarEvent(id?: string) {
  const types = ["meeting", "reminder", "task", "event"] as const;
  const colors = ["#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6"];
  const titles = [
    "团队会议",
    "项目评审",
    "客户拜访",
    "培训课程",
    "产品发布",
    "周报汇总",
    "代码审查",
    "需求讨论",
  ];

  const start = new Date();
  start.setDate(start.getDate() + randomInt(-7, 14));
  start.setHours(randomInt(9, 17), 0, 0, 0);

  const end = new Date(start);
  end.setHours(start.getHours() + randomInt(1, 3));

  return {
    id: id || uuid(),
    title: pick(titles),
    start: start.toISOString(),
    end: end.toISOString(),
    allDay: Math.random() > 0.8,
    description: randomTitle(10, 30),
    color: pick(colors),
    type: pick(types),
  };
}

/** 生成仪表盘统计数据 */
export function generateDashboardStats() {
  return {
    totalUsers: randomInt(1000, 50000),
    totalRevenue: randomInt(100000, 9999999),
    totalOrders: randomInt(500, 10000),
    conversionRate: randomFloat(1, 10),
    userGrowth: randomFloat(-5, 20),
    revenueGrowth: randomFloat(-10, 30),
    orderGrowth: randomFloat(-5, 25),
    rateGrowth: randomFloat(-2, 5),
  };
}

/** 生成访问趋势数据 */
export function generateVisitData(days = 30) {
  const data = [];
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    data.push({
      date: date.toISOString().split("T")[0],
      visits: randomInt(1000, 8000),
      uniqueVisitors: randomInt(500, 5000),
      pageViews: randomInt(3000, 20000),
    });
  }
  return data;
}

/** 生成活动数据 */
export function generateActivity(id?: string) {
  const types = [
    "user_login",
    "document_created",
    "order_completed",
    "message_received",
  ] as const;
  const actions = [
    "登录系统",
    "创建文档",
    "完成订单",
    "发送消息",
    "更新资料",
    "上传文件",
  ];

  return {
    id: id || uuid(),
    user: randomCName(),
    type: pick(types),
    action: pick(actions),
    time: randomDateTime(7),
  };
}
