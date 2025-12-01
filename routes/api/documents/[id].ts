/**
 * 单个文档 API
 */

import type { Handlers } from "$fresh/server.ts";
import { generateDocument } from "../../../lib/mock/data.ts";

export const handler: Handlers = {
  GET(_req, ctx) {
    const { id } = ctx.params;
    const document = generateDocument(id);

    return Response.json({
      code: 200,
      message: "success",
      data: document,
    });
  },

  async PUT(req, ctx) {
    const { id } = ctx.params;
    const body = await req.json();
    const document = {
      ...generateDocument(id),
      ...body,
      updatedAt: new Date().toISOString(),
    };

    return Response.json({
      code: 200,
      message: "更新成功",
      data: document,
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
