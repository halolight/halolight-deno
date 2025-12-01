/**
 * TDK (Title, Description, Keywords) 配置中心
 * 用于 SEO 优化和页面元数据管理
 */

import { PERMISSION_RULES, ROUTE_TITLES } from "./routes.ts";

// ============================================================================
// 类型定义
// ============================================================================

/** TDK 条目 */
export interface TdkEntry {
  /** 页面标题 */
  title: string;
  /** 页面描述 */
  description: string;
  /** 页面关键词 */
  keywords: string;
}

// ============================================================================
// 默认配置
// ============================================================================

/** 默认 TDK 配置 */
export const DEFAULT_TDK: TdkEntry = {
  title: "HaloLight Admin",
  description:
    "HaloLight Admin 企业级后台管理系统，为团队提供统一的数据、权限与运营控制中心。",
  keywords: "HaloLight Admin, 后台管理, 仪表盘, 运营, Deno, Fresh",
};

// ============================================================================
// 路由 TDK 映射
// ============================================================================

/** 路由 TDK 配置 */
export const ROUTE_TDK: Record<string, TdkEntry> = {
  "/": {
    title: "仪表盘",
    description:
      "可拖拽、可配置的仪表盘，支持添加/删除/重置部件，配置持久化本地存储。",
    keywords: "仪表盘, dashboard, 报表, HaloLight Admin",
  },
  "/dashboard": {
    title: "仪表盘",
    description:
      "可拖拽、可配置的仪表盘，支持添加/删除/重置部件，配置持久化本地存储。",
    keywords: "仪表盘, dashboard, 报表, HaloLight Admin",
  },
  "/analytics": {
    title: "数据分析",
    description: "深入了解您的网站流量和用户行为。",
    keywords: "数据分析, 报表, 流量指标, HaloLight Admin",
  },
  "/calendar": {
    title: "日程安排",
    description: "管理您的日程和任务。",
    keywords: "日程, 任务, 日历, 行程",
  },
  "/docs": {
    title: "帮助文档",
    description: "查找使用指南、教程和常见问题解答。",
    keywords: "文档, 教程, 常见问题, 指南",
  },
  "/documents": {
    title: "文档管理",
    description: "管理和组织您的所有文档。",
    keywords: "文档管理, 协作, 文件",
  },
  "/files": {
    title: "文件存储",
    description: "管理您的云端文件和文件夹。",
    keywords: "文件存储, 云端, 共享, 管理",
  },
  "/messages": {
    title: "消息中心",
    description: "管理您的消息和通知。",
    keywords: "消息, 通信, 聊天, HaloLight Admin",
  },
  "/notifications": {
    title: "通知中心",
    description: "查看和管理所有系统通知。",
    keywords: "通知, 系统通知, 报警",
  },
  "/profile": {
    title: "个人资料",
    description: "管理您的账户信息和偏好设置。",
    keywords: "个人资料, 账户设置, HaloLight Admin",
  },
  "/settings": {
    title: "系统设置",
    description: "管理您的账户设置和系统偏好。",
    keywords: "设置, 偏好, 系统管理",
  },
  "/settings/teams": {
    title: "团队设置",
    description: "管理团队信息、成员和组织架构。",
    keywords: "团队, 成员管理, 组织架构, HaloLight Admin",
  },
  "/settings/teams/roles": {
    title: "角色管理",
    description: "创建和管理系统角色，配置角色权限。",
    keywords: "角色管理, 权限配置, RBAC, HaloLight Admin",
  },
  "/users": {
    title: "用户管理",
    description: "管理系统用户、角色和权限。",
    keywords: "用户管理, 角色, 权限",
  },
  "/accounts": {
    title: "账号与权限",
    description: "查看可用账号、角色和权限，按需切换身份。",
    keywords: "账号, 权限切换, 角色",
  },
  "/login": {
    title: "登录",
    description: "输入账户凭证以访问 HaloLight Admin 后台。",
    keywords: "登录, 认证, HaloLight Admin",
  },
  "/register": {
    title: "注册",
    description: "创建 HaloLight Admin 账号，开始管理您的业务。",
    keywords: "注册, 创建账号, HaloLight Admin",
  },
  "/forgot-password": {
    title: "找回密码",
    description: "通过邮箱重设您的登录密码。",
    keywords: "找回密码, 重设, 安全",
  },
  "/reset-password": {
    title: "重置密码",
    description: "设置一个新的账户密码以恢复访问。",
    keywords: "重置密码, 找回账号, 安全",
  },
  "/terms": {
    title: "服务条款",
    description: "查看 HaloLight Admin 的服务条款、使用协议与权利义务。",
    keywords: "服务条款, 协议, 法律",
  },
  "/privacy": {
    title: "隐私政策",
    description: "了解我们如何收集、使用、存储和保护您的个人信息。",
    keywords: "隐私, 数据保护, 政策",
  },
  "/about": {
    title: "关于我们",
    description: "了解 HaloLight Admin 的团队、愿景和使命。",
    keywords: "关于, 团队, 公司",
  },
};

// ============================================================================
// 工具函数
// ============================================================================

/**
 * 获取路由的 TDK 配置
 * @param pathname 路由路径
 * @returns TDK 配置
 */
export function getRouteTdk(pathname: string): TdkEntry {
  // 先尝试精确匹配
  if (ROUTE_TDK[pathname]) {
    return ROUTE_TDK[pathname];
  }

  // 再尝试正则匹配
  const permissionRule = PERMISSION_RULES.find((rule) =>
    rule.pattern.test(pathname)
  );
  if (permissionRule) {
    const title = permissionRule.label || ROUTE_TITLES[pathname] ||
      DEFAULT_TDK.title;
    return {
      title,
      description: `查看 ${title} 相关的数据与功能。`,
      keywords: `${title}, HaloLight Admin`,
    };
  }

  return DEFAULT_TDK;
}

/**
 * 生成完整的页面标题
 * @param pageTitle 页面标题
 * @param separator 分隔符，默认 " | "
 * @returns 完整标题
 */
export function getFullTitle(
  pageTitle: string,
  separator: string = " | ",
): string {
  if (!pageTitle || pageTitle === DEFAULT_TDK.title) {
    return DEFAULT_TDK.title;
  }
  return `${pageTitle}${separator}${DEFAULT_TDK.title}`;
}

/**
 * 生成 meta 标签对象
 * @param pathname 路由路径
 * @returns meta 标签数据
 */
export function getMetaTags(pathname: string): {
  title: string;
  description: string;
  keywords: string;
  ogTitle: string;
  ogDescription: string;
} {
  const tdk = getRouteTdk(pathname);
  const fullTitle = getFullTitle(tdk.title);

  return {
    title: fullTitle,
    description: tdk.description,
    keywords: tdk.keywords,
    ogTitle: fullTitle,
    ogDescription: tdk.description,
  };
}
