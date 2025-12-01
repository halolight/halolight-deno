/**
 * 通知中心页面
 */
import { Head } from "$fresh/runtime.ts";
import Layout from "../components/layout/Layout.tsx";
import { Badge, Button, Card, CardContent } from "../components/ui/index.ts";
import { Avatar } from "../components/ui/Avatar.tsx";

const notifications = [
  {
    id: "1",
    type: "mention",
    title: "张三在评论中提到了你",
    description: "在「产品需求文档」中: @你 请看一下这个功能的优先级",
    time: "5分钟前",
    read: false,
    avatar: "张三",
  },
  {
    id: "2",
    type: "comment",
    title: "李四评论了你的文档",
    description: "「技术架构设计」: 这个方案很不错，但是需要考虑一下扩展性",
    time: "30分钟前",
    read: false,
    avatar: "李四",
  },
  {
    id: "3",
    type: "system",
    title: "系统维护通知",
    description:
      "系统将于今晚 22:00-24:00 进行维护升级，届时部分功能可能不可用",
    time: "1小时前",
    read: false,
    avatar: null,
  },
  {
    id: "4",
    type: "task",
    title: "任务截止提醒",
    description: "「首页设计优化」任务将于明天截止，请及时处理",
    time: "2小时前",
    read: true,
    avatar: null,
  },
  {
    id: "5",
    type: "invite",
    title: "王五邀请你加入团队",
    description: "邀请你加入「产品研发组」团队",
    time: "昨天",
    read: true,
    avatar: "王五",
  },
  {
    id: "6",
    type: "update",
    title: "文档更新通知",
    description: "「API接口文档」已更新到 v2.0 版本",
    time: "2天前",
    read: true,
    avatar: null,
  },
];

const getNotificationIcon = (type: string) => {
  switch (type) {
    case "mention":
      return (
        <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
          <svg
            className="h-5 w-5 text-blue-600 dark:text-blue-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
            />
          </svg>
        </div>
      );
    case "comment":
      return (
        <div className="h-10 w-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
          <svg
            className="h-5 w-5 text-green-600 dark:text-green-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
        </div>
      );
    case "system":
      return (
        <div className="h-10 w-10 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center">
          <svg
            className="h-5 w-5 text-yellow-600 dark:text-yellow-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>
      );
    case "task":
      return (
        <div className="h-10 w-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
          <svg
            className="h-5 w-5 text-purple-600 dark:text-purple-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
            />
          </svg>
        </div>
      );
    case "invite":
      return (
        <div className="h-10 w-10 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
          <svg
            className="h-5 w-5 text-indigo-600 dark:text-indigo-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
            />
          </svg>
        </div>
      );
    case "update":
      return (
        <div className="h-10 w-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
          <svg
            className="h-5 w-5 text-gray-600 dark:text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
        </div>
      );
    default:
      return (
        <div className="h-10 w-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
          <svg
            className="h-5 w-5 text-gray-600 dark:text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
            />
          </svg>
        </div>
      );
  }
};

const unreadCount = notifications.filter((n) => !n.read).length;

export default function NotificationsPage() {
  return (
    <>
      <Head>
        <title>通知中心 - HaloLight</title>
        <meta name="description" content="查看和管理您的通知" />
      </Head>
      <Layout title="通知中心" showSidebar>
        <div className="space-y-6">
          {/* 标题和操作 */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                通知中心
                {unreadCount > 0 && (
                  <Badge variant="primary" className="ml-2">
                    {unreadCount} 条未读
                  </Badge>
                )}
              </h1>
              <p className="mt-1 text-gray-500 dark:text-gray-400">
                查看和管理您的所有通知
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                全部标为已读
              </Button>
              <Button variant="ghost" size="sm">
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </Button>
            </div>
          </div>

          {/* 筛选标签 */}
          <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
            <Button variant="primary" size="sm">全部</Button>
            <Button variant="outline" size="sm">未读</Button>
            <Button variant="outline" size="sm">提及</Button>
            <Button variant="outline" size="sm">评论</Button>
            <Button variant="outline" size="sm">系统</Button>
            <Button variant="outline" size="sm">任务</Button>
          </div>

          {/* 通知列表 */}
          <Card>
            <CardContent className="p-0">
              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`
                      flex gap-4 p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 cursor-pointer
                      ${
                      !notification.read
                        ? "bg-blue-50/50 dark:bg-blue-900/10"
                        : ""
                    }
                    `}
                  >
                    {notification.avatar
                      ? <Avatar name={notification.avatar} size="md" />
                      : (
                        getNotificationIcon(notification.type)
                      )}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <p
                          className={`text-sm ${
                            !notification.read ? "font-medium" : ""
                          } text-gray-900 dark:text-white`}
                        >
                          {notification.title}
                        </p>
                        {!notification.read && (
                          <span className="h-2 w-2 rounded-full bg-blue-500 flex-shrink-0 mt-2" />
                        )}
                      </div>
                      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
                        {notification.description}
                      </p>
                      <p className="mt-2 text-xs text-gray-400 dark:text-gray-500">
                        {notification.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* 加载更多 */}
          <div className="mt-6 text-center">
            <Button variant="outline">加载更多</Button>
          </div>
        </div>
      </Layout>
    </>
  );
}
