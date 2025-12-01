/**
 * 通知列表 API
 */

import type { Handlers } from "$fresh/server.ts";
import { generateNotification, uuid } from "../../../lib/mock/data.ts";

// 模拟存储
const notifications = Array.from({ length: 20 }, () => generateNotification());

export const handler: Handlers = {
  GET(req) {
    const url = new URL(req.url);
    const type = url.searchParams.get("type") || "";
    const read = url.searchParams.get("read");

    let result = [...notifications];

    // 类型过滤
    if (type) {
      result = result.filter((n) => n.type === type);
    }

    // 已读过滤
    if (read !== null) {
      const isRead = read === "true";
      result = result.filter((n) => n.read === isRead);
    }

    return Response.json({
      code: 200,
      message: "success",
      data: result,
    });
  },

  async POST(req) {
    const body = await req.json();
    const notification = {
      ...generateNotification(uuid()),
      ...body,
      read: false,
      createdAt: new Date().toISOString(),
    };

    notifications.unshift(notification);

    return Response.json({
      code: 200,
      message: "创建成功",
      data: notification,
    });
  },
};
