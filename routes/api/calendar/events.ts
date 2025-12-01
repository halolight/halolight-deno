/**
 * 日历事件列表 API
 */

import type { Handlers } from "$fresh/server.ts";
import { generateCalendarEvent, uuid } from "../../../lib/mock/data.ts";

// 模拟存储
const events = Array.from({ length: 15 }, () => generateCalendarEvent());

export const handler: Handlers = {
  GET(req) {
    const url = new URL(req.url);
    const start = url.searchParams.get("start");
    const end = url.searchParams.get("end");

    let result = [...events];

    // 时间范围过滤
    if (start || end) {
      result = result.filter((event) => {
        const eventStart = new Date(event.start);
        const eventEnd = new Date(event.end);
        const rangeStart = start ? new Date(start) : null;
        const rangeEnd = end ? new Date(end) : null;

        if (rangeStart && eventEnd < rangeStart) return false;
        if (rangeEnd && eventStart > rangeEnd) return false;
        return true;
      });
    }

    return Response.json({
      code: 200,
      message: "success",
      data: result,
    });
  },

  async POST(req) {
    const body = await req.json();
    const event = {
      ...generateCalendarEvent(uuid()),
      ...body,
    };

    events.push(event);

    return Response.json({
      code: 200,
      message: "创建成功",
      data: event,
    });
  },
};
