/**
 * 文档列表 API
 */

import type { Handlers } from "$fresh/server.ts";
import { generateDocument, uuid } from "../../../lib/mock/data.ts";

export const handler: Handlers = {
  GET(req) {
    const url = new URL(req.url);
    const page = parseInt(url.searchParams.get("page") || "1");
    const pageSize = parseInt(url.searchParams.get("pageSize") || "20");
    const type = url.searchParams.get("type") || "";
    const search = url.searchParams.get("search") || "";

    // 生成文档列表
    let documents = Array.from({ length: 50 }, () => generateDocument());

    // 类型过滤
    if (type) {
      documents = documents.filter((d) => d.type === type);
    }

    // 搜索过滤
    if (search) {
      documents = documents.filter(
        (d) =>
          d.name.includes(search) ||
          d.path.includes(search) ||
          d.tags.some((t) => t.includes(search)),
      );
    }

    // 分页
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    const list = documents.slice(start, end);

    return Response.json({
      code: 200,
      message: "success",
      data: {
        list,
        total: documents.length,
        page,
        pageSize,
      },
    });
  },

  async POST(req) {
    const body = await req.json();
    const document = {
      ...generateDocument(uuid()),
      ...body,
      createdAt: new Date().toISOString(),
    };

    return Response.json({
      code: 200,
      message: "创建成功",
      data: document,
    });
  },
};
