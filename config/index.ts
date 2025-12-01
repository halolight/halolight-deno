/**
 * 配置模块入口
 * 统一导出所有配置相关内容
 */

// 环境变量配置
export { env, validateEnv } from "./env.ts";

// 路由配置
export * from "./routes.ts";

// TDK 配置
export * from "./tdk.ts";
