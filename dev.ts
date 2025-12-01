#!/usr/bin/env -S deno run -A --watch=static/,routes/

import dev from "$fresh/dev.ts";
import config from "./fresh.config.ts";

// 加载环境变量，允许空值
import { load } from "$std/dotenv/mod.ts";
await load({ allowEmptyValues: true, export: true });

await dev(import.meta.url, "./main.ts", config);
