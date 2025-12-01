/**
 * 访问趋势数据 API
 */

import type { Handlers } from "$fresh/server.ts";
import { generateVisitData } from "../../../lib/mock/data.ts";

export const handler: Handlers = {
  GET(_req) {
    const data = generateVisitData(30);
    return Response.json({
      code: 200,
      message: "success",
      data,
    });
  },
};
