/**
 * 未读通知数量 API
 */

import type { Handlers } from "$fresh/server.ts";
import { randomInt } from "../../../lib/mock/data.ts";

export const handler: Handlers = {
  GET(_req) {
    return Response.json({
      code: 200,
      message: "success",
      data: randomInt(0, 15),
    });
  },
};
