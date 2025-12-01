/**
 * 单个日历事件 API
 */

import type { Handlers } from "$fresh/server.ts";
import { generateCalendarEvent } from "../../../../lib/mock/data.ts";

export const handler: Handlers = {
  GET(_req, ctx) {
    const { id } = ctx.params;
    const event = generateCalendarEvent(id);

    return Response.json({
      code: 200,
      message: "success",
      data: event,
    });
  },

  async PUT(req, ctx) {
    const { id } = ctx.params;
    const body = await req.json();
    const event = {
      ...generateCalendarEvent(id),
      ...body,
    };

    return Response.json({
      code: 200,
      message: "更新成功",
      data: event,
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
