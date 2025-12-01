/**
 * 日历页面
 */
import { Head } from "$fresh/runtime.ts";
import Layout from "../components/layout/Layout.tsx";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/index.ts";

const currentDate = new Date();
const currentMonth = currentDate.getMonth();
const currentYear = currentDate.getFullYear();

const events = [
  {
    id: "1",
    title: "团队周会",
    date: new Date(currentYear, currentMonth, 15),
    time: "10:00 - 11:00",
    type: "meeting",
    color: "bg-blue-500",
  },
  {
    id: "2",
    title: "项目评审",
    date: new Date(currentYear, currentMonth, 18),
    time: "14:00 - 16:00",
    type: "review",
    color: "bg-purple-500",
  },
  {
    id: "3",
    title: "产品发布",
    date: new Date(currentYear, currentMonth, 22),
    time: "全天",
    type: "milestone",
    color: "bg-green-500",
  },
  {
    id: "4",
    title: "客户演示",
    date: new Date(currentYear, currentMonth, 25),
    time: "15:00 - 16:30",
    type: "demo",
    color: "bg-orange-500",
  },
];

const upcomingEvents = events.filter((e) => e.date >= currentDate).slice(0, 5);

// 生成日历数据
function generateCalendarDays(year: number, month: number) {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startingDay = firstDay.getDay();

  const days = [];

  // 上个月的天数
  const prevMonthLastDay = new Date(year, month, 0).getDate();
  for (let i = startingDay - 1; i >= 0; i--) {
    days.push({
      day: prevMonthLastDay - i,
      isCurrentMonth: false,
      date: new Date(year, month - 1, prevMonthLastDay - i),
    });
  }

  // 当前月的天数
  for (let i = 1; i <= daysInMonth; i++) {
    days.push({
      day: i,
      isCurrentMonth: true,
      date: new Date(year, month, i),
    });
  }

  // 下个月的天数
  const remainingDays = 42 - days.length;
  for (let i = 1; i <= remainingDays; i++) {
    days.push({
      day: i,
      isCurrentMonth: false,
      date: new Date(year, month + 1, i),
    });
  }

  return days;
}

const calendarDays = generateCalendarDays(currentYear, currentMonth);
const monthNames = [
  "一月",
  "二月",
  "三月",
  "四月",
  "五月",
  "六月",
  "七月",
  "八月",
  "九月",
  "十月",
  "十一月",
  "十二月",
];
const weekDays = ["日", "一", "二", "三", "四", "五", "六"];

export default function CalendarPage() {
  return (
    <>
      <Head>
        <title>日历 - HaloLight</title>
        <meta name="description" content="查看日程安排" />
      </Head>
      <Layout title="日历" showSidebar>
        <div className="space-y-6">
          {/* 标题和操作 */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                日历
              </h1>
              <p className="mt-1 text-gray-500 dark:text-gray-400">
                管理您的日程安排
              </p>
            </div>
            <Button variant="primary">
              <svg
                className="h-4 w-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              添加事件
            </Button>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {/* 日历 */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>
                    {monthNames[currentMonth]} {String(currentYear)}
                  </CardTitle>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <svg
                        className="h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 19l-7-7 7-7"
                        />
                      </svg>
                    </Button>
                    <Button variant="outline" size="sm">
                      今天
                    </Button>
                    <Button variant="outline" size="sm">
                      <svg
                        className="h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {/* 星期标题 */}
                <div className="grid grid-cols-7 mb-2">
                  {weekDays.map((day) => (
                    <div
                      key={day}
                      className="py-2 text-center text-sm font-medium text-gray-500 dark:text-gray-400"
                    >
                      {day}
                    </div>
                  ))}
                </div>

                {/* 日期格子 */}
                <div className="grid grid-cols-7 gap-px bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden">
                  {calendarDays.map((day, index) => {
                    const isToday = day.isCurrentMonth &&
                      day.day === currentDate.getDate();
                    const dayEvents = events.filter(
                      (e) =>
                        e.date.getDate() === day.day &&
                        e.date.getMonth() === (day.isCurrentMonth
                            ? currentMonth
                            : day.date.getMonth()) &&
                        day.isCurrentMonth,
                    );

                    return (
                      <div
                        key={index}
                        className={`
                          min-h-24 p-2 bg-white dark:bg-gray-900
                          ${
                          !day.isCurrentMonth
                            ? "bg-gray-50 dark:bg-gray-800/50"
                            : ""
                        }
                        `}
                      >
                        <span
                          className={`
                            inline-flex h-7 w-7 items-center justify-center rounded-full text-sm
                            ${
                            isToday
                              ? "bg-blue-500 text-white font-bold"
                              : day.isCurrentMonth
                              ? "text-gray-900 dark:text-white"
                              : "text-gray-400 dark:text-gray-500"
                          }
                          `}
                        >
                          {day.day}
                        </span>
                        <div className="mt-1 space-y-1">
                          {dayEvents.slice(0, 2).map((event) => (
                            <div
                              key={event.id}
                              className={`${event.color} text-white text-xs px-1.5 py-0.5 rounded truncate`}
                            >
                              {event.title}
                            </div>
                          ))}
                          {dayEvents.length > 2 && (
                            <div className="text-xs text-gray-500 dark:text-gray-400 px-1">
                              +{dayEvents.length - 2} 更多
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* 即将到来的事件 */}
            <Card>
              <CardHeader>
                <CardTitle>即将到来</CardTitle>
              </CardHeader>
              <CardContent>
                {upcomingEvents.length > 0
                  ? (
                    <div className="space-y-4">
                      {upcomingEvents.map((event) => (
                        <div
                          key={event.id}
                          className="flex gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50"
                        >
                          <div className={`w-1 rounded-full ${event.color}`} />
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-gray-900 dark:text-white truncate">
                              {event.title}
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              {event.date.toLocaleDateString("zh-CN", {
                                month: "short",
                                day: "numeric",
                              })}
                              {" · "}
                              {event.time}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )
                  : (
                    <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                      <svg
                        className="mx-auto h-12 w-12 text-gray-300 dark:text-gray-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      <p className="mt-2">暂无即将到来的事件</p>
                    </div>
                  )}
              </CardContent>
            </Card>
          </div>
        </div>
      </Layout>
    </>
  );
}
