/**
 * 单个通知 API
 */

import type { Handlers } from "$fresh/server.ts";
import { generateNotification } from "../../../lib/mock/data.ts";

export const handler: Handlers = {
  GET(_req, ctx) {
    const { id } = ctx.params;
    const notification = generateNotification(id);

    return Response.json({
      code: 200,
      message: "success",
      data: notification,
    });
  },

  async PUT(req, ctx) {
    const { id } = ctx.params;
    const body = await req.json();
    const notification = {
      ...generateNotification(id),
      ...body,
    };

    return Response.json({
      code: 200,
      message: "更新成功",
      data: notification,
    });
  },

  DELETE(_req, ctx) {
    const { id } = ctx.params;
    return Response.json({
      code: 200,
      message: "删除成功",
      data: { id },
    });
  },
};
