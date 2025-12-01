/**
 * 环境变量配置
 * 统一管理所有环境变量，提供类型安全的访问方式
 */

// 安全获取 Deno.env
function safeGetEnv(key: string): string | undefined {
  try {
    if (
      typeof Deno !== "undefined" && Deno.env &&
      typeof Deno.env.get === "function"
    ) {
      return Deno.env.get(key);
    }
  } catch {
    // 客户端环境，Deno.env 不可用
  }
  return undefined;
}

// 获取环境变量，支持默认值
function getEnv(key: string, defaultValue = ""): string {
  return safeGetEnv(key) ?? defaultValue;
}

// 获取布尔类型环境变量
function getBoolEnv(key: string, defaultValue = false): boolean {
  const value = safeGetEnv(key);
  if (value === undefined) return defaultValue;
  return value === "true" || value === "1";
}

// 获取数字类型环境变量
function getNumEnv(key: string, defaultValue = 0): number {
  const value = safeGetEnv(key);
  if (value === undefined) return defaultValue;
  const num = parseInt(value, 10);
  return isNaN(num) ? defaultValue : num;
}

/**
 * 环境变量配置对象
 */
export const env = {
  // 基础配置
  apiUrl: getEnv("API_URL", "/api"),
  useMock: getBoolEnv("USE_MOCK", true),
  appBaseUrl: getEnv("APP_BASE_URL", "http://localhost:8000"),

  // 演示账号配置
  demoEmail: getEnv("DEMO_EMAIL", "admin@halolight.h7ml.cn"),
  demoPassword: getEnv("DEMO_PASSWORD", "123456"),
  showDemoHint: getBoolEnv("SHOW_DEMO_HINT", true),

  // 应用信息
  appTitle: getEnv("APP_TITLE", "HaloLight Admin"),
  brandName: getEnv("BRAND_NAME", "HaloLight"),

  // GitHub OAuth
  githubClientId: getEnv("GITHUB_CLIENT_ID", ""),
  githubClientSecret: getEnv("GITHUB_CLIENT_SECRET", ""),

  // 安全配置
  jwtSecret: getEnv("JWT_SECRET", "default-jwt-secret-change-in-production"),
  sessionExpireTime: getNumEnv("SESSION_EXPIRE_TIME", 86400),

  // 环境
  isDev: getEnv("DENO_ENV", "development") === "development",
  isProd: getEnv("DENO_ENV", "development") === "production",

  // 可选配置
  databaseUrl: getEnv("DATABASE_URL", ""),
  redisUrl: getEnv("REDIS_URL", ""),

  // 统计分析
  gaId: getEnv("GA_ID", ""),
  laId: getEnv("LA_ID", ""),

  // 错误追踪
  sentryDsn: getEnv("SENTRY_DSN", ""),
} as const;

/**
 * 验证必需的环境变量（生产环境）
 */
export function validateEnv(): void {
  if (env.isProd) {
    const required = [
      "JWT_SECRET",
      "GITHUB_CLIENT_ID",
      "GITHUB_CLIENT_SECRET",
    ];

    const missing = required.filter((key) => !safeGetEnv(key));

    if (missing.length > 0) {
      console.warn(
        `[WARNING] Missing required environment variables: ${
          missing.join(", ")
        }`,
      );
    }
  }
}

export default env;
