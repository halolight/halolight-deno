/**
 * 标记所有通知已读 API
 */

import type { Handlers } from "$fresh/server.ts";

export const handler: Handlers = {
  POST(_req) {
    return Response.json({
      code: 200,
      message: "已标记全部已读",
      data: null,
    });
  },
};
