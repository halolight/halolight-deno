/**
 * 活动数据 API
 */

import type { Handlers } from "$fresh/server.ts";
import { generateActivity } from "../../../lib/mock/data.ts";

export const handler: Handlers = {
  GET(_req) {
    const activities = Array.from({ length: 20 }, () => generateActivity());
    return Response.json({
      code: 200,
      message: "success",
      data: activities,
    });
  },
};
