/**
 * 消息中心页面
 */
import { Head } from "$fresh/runtime.ts";
import Layout from "../components/layout/Layout.tsx";
import { Badge, Button, Input } from "../components/ui/index.ts";
import { Avatar } from "../components/ui/Avatar.tsx";

const conversations = [
  {
    id: "1",
    name: "产品团队",
    type: "group",
    avatar: null,
    lastMessage: "张三: 新版本已经部署完成，请大家测试一下",
    time: "刚刚",
    unread: 3,
    online: true,
  },
  {
    id: "2",
    name: "李四",
    type: "direct",
    avatar: null,
    lastMessage: "好的，我明天上午来处理这个问题",
    time: "10分钟前",
    unread: 1,
    online: true,
  },
  {
    id: "3",
    name: "设计讨论组",
    type: "group",
    avatar: null,
    lastMessage: "王五: 新的UI设计稿已上传，请查收",
    time: "1小时前",
    unread: 0,
    online: false,
  },
  {
    id: "4",
    name: "赵六",
    type: "direct",
    avatar: null,
    lastMessage: "收到，我看一下",
    time: "昨天",
    unread: 0,
    online: false,
  },
  {
    id: "5",
    name: "技术支持",
    type: "group",
    avatar: null,
    lastMessage: "系统通知: 服务器维护已完成",
    time: "3天前",
    unread: 0,
    online: false,
  },
];

const messages = [
  {
    id: "1",
    sender: "张三",
    content: "大家好，新版本已经部署完成了",
    time: "14:30",
    isSelf: false,
  },
  {
    id: "2",
    sender: "李四",
    content: "收到，我先测试一下核心功能",
    time: "14:32",
    isSelf: false,
  },
  {
    id: "3",
    sender: "我",
    content: "好的，我负责测试用户模块",
    time: "14:35",
    isSelf: true,
  },
  {
    id: "4",
    sender: "张三",
    content: "如果发现问题请及时反馈，我这边随时可以修复",
    time: "14:36",
    isSelf: false,
  },
  {
    id: "5",
    sender: "王五",
    content: "UI 显示有点问题，截图发群里了",
    time: "14:40",
    isSelf: false,
  },
  {
    id: "6",
    sender: "张三",
    content: "好的，我看看是什么问题",
    time: "14:41",
    isSelf: false,
  },
];

export default function MessagesPage() {
  return (
    <>
      <Head>
        <title>消息中心 - HaloLight</title>
        <meta name="description" content="查看和管理您的消息" />
      </Head>
      <Layout title="消息中心" showSidebar>
        <div className="h-[calc(100vh-12rem)]">
          <div className="flex h-full">
            {/* 会话列表 */}
            <div className="w-80 border-r border-gray-200 dark:border-gray-800 flex flex-col">
              {/* 搜索栏 */}
              <div className="p-4 border-b border-gray-200 dark:border-gray-800">
                <Input
                  type="search"
                  placeholder="搜索消息..."
                  className="w-full"
                />
              </div>

              {/* 会话列表 */}
              <div className="flex-1 overflow-y-auto">
                {conversations.map((conv) => (
                  <div
                    key={conv.id}
                    className={`
                      flex items-center gap-3 p-4 cursor-pointer
                      hover:bg-gray-50 dark:hover:bg-gray-800/50
                      ${conv.id === "1" ? "bg-blue-50 dark:bg-blue-900/20" : ""}
                    `}
                  >
                    <div className="relative">
                      <Avatar name={conv.name} size="md" />
                      {conv.online && (
                        <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-white dark:border-gray-900" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-gray-900 dark:text-white truncate">
                          {conv.name}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {conv.time}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                        {conv.lastMessage}
                      </p>
                    </div>
                    {conv.unread > 0 && (
                      <Badge
                        variant="primary"
                        size="sm"
                        className="rounded-full"
                      >
                        {conv.unread}
                      </Badge>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* 聊天区域 */}
            <div className="flex-1 flex flex-col">
              {/* 聊天头部 */}
              <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
                <div className="flex items-center gap-3">
                  <Avatar name="产品团队" size="md" />
                  <div>
                    <h2 className="font-medium text-gray-900 dark:text-white">
                      产品团队
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      5 位成员 · 3 人在线
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
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
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
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
                        d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                      />
                    </svg>
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
                        d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                      />
                    </svg>
                  </Button>
                </div>
              </div>

              {/* 消息列表 */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex gap-3 ${
                      msg.isSelf ? "flex-row-reverse" : ""
                    }`}
                  >
                    {!msg.isSelf && <Avatar name={msg.sender} size="sm" />}
                    <div
                      className={`
                        max-w-md px-4 py-2 rounded-2xl
                        ${
                        msg.isSelf
                          ? "bg-blue-500 text-white rounded-br-sm"
                          : "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-bl-sm"
                      }
                      `}
                    >
                      {!msg.isSelf && (
                        <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                          {msg.sender}
                        </p>
                      )}
                      <p className="text-sm">{msg.content}</p>
                      <p
                        className={`text-xs mt-1 ${
                          msg.isSelf ? "text-blue-200" : "text-gray-400"
                        }`}
                      >
                        {msg.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* 输入区域 */}
              <div className="p-4 border-t border-gray-200 dark:border-gray-800">
                <div className="flex items-end gap-2">
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
                        d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                      />
                    </svg>
                  </Button>
                  <div className="flex-1">
                    <textarea
                      placeholder="输入消息..."
                      rows={1}
                      className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-2 text-sm resize-none focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
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
                        d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </Button>
                  <Button variant="primary" size="sm">
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
                        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                      />
                    </svg>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
