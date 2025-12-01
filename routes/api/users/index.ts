/**
 * 用户列表 API
 */

import type { Handlers } from "$fresh/server.ts";
import { generateUser, uuid } from "../../../lib/mock/data.ts";

export const handler: Handlers = {
  GET(req) {
    const url = new URL(req.url);
    const page = parseInt(url.searchParams.get("page") || "1");
    const pageSize = parseInt(url.searchParams.get("pageSize") || "20");
    const search = url.searchParams.get("search") || "";

    // 生成用户列表
    let users = Array.from({ length: 50 }, () => generateUser());

    // 搜索过滤
    if (search) {
      users = users.filter(
        (u) =>
          u.name.includes(search) ||
          u.email.includes(search) ||
          u.department.includes(search),
      );
    }

    // 分页
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    const list = users.slice(start, end);

    return Response.json({
      code: 200,
      message: "success",
      data: {
        list,
        total: users.length,
        page,
        pageSize,
      },
    });
  },

  async POST(req) {
    const body = await req.json();
    const user = {
      ...generateUser(uuid()),
      ...body,
      createdAt: new Date().toISOString(),
    };

    return Response.json({
      code: 200,
      message: "创建成功",
      data: user,
    });
  },
};
