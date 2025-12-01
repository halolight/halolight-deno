/**
 * 仪表盘统计数据 API
 */

import type { Handlers } from "$fresh/server.ts";
import { generateDashboardStats } from "../../../lib/mock/data.ts";

export const handler: Handlers = {
  GET(_req) {
    const data = generateDashboardStats();
    return Response.json({
      code: 200,
      message: "success",
      data,
    });
  },
};
