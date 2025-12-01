#!/usr/bin/env -S deno run -A --watch=static/,routes/

import dev from "$fresh/dev.ts";
import config from "./fresh.config.ts";

// 加载环境变量（仅在本地开发时，忽略缺失的 .env 文件）
try {
  const { load } = await import("$std/dotenv/mod.ts");
  await load({ allowEmptyValues: true, export: true });
} catch {
  // 忽略 dotenv 加载错误（生产环境通过系统环境变量配置）
}

await dev(import.meta.url, "./main.ts", config);
