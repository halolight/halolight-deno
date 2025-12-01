/**
 * 单个用户 API
 */

import type { Handlers } from "$fresh/server.ts";
import { generateUser } from "../../../lib/mock/data.ts";

export const handler: Handlers = {
  GET(_req, ctx) {
    const { id } = ctx.params;
    const user = generateUser(id);

    return Response.json({
      code: 200,
      message: "success",
      data: user,
    });
  },

  async PUT(req, ctx) {
    const { id } = ctx.params;
    const body = await req.json();
    const user = {
      ...generateUser(id),
      ...body,
      updatedAt: new Date().toISOString(),
    };

    return Response.json({
      code: 200,
      message: "更新成功",
      data: user,
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
