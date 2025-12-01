/**
 * 用户管理页面
 */
import { Head } from "$fresh/runtime.ts";
import Layout from "../components/layout/Layout.tsx";
import {
  Badge,
  Button,
  Card,
  CardContent,
  Input,
} from "../components/ui/index.ts";
import { Avatar } from "../components/ui/Avatar.tsx";

const users = [
  {
    id: "1",
    name: "张三",
    email: "zhangsan@example.com",
    role: "管理员",
    status: "active",
    lastActive: "刚刚",
    avatar: null,
  },
  {
    id: "2",
    name: "李四",
    email: "lisi@example.com",
    role: "编辑",
    status: "active",
    lastActive: "5分钟前",
    avatar: null,
  },
  {
    id: "3",
    name: "王五",
    email: "wangwu@example.com",
    role: "查看者",
    status: "inactive",
    lastActive: "2天前",
    avatar: null,
  },
  {
    id: "4",
    name: "赵六",
    email: "zhaoliu@example.com",
    role: "编辑",
    status: "active",
    lastActive: "1小时前",
    avatar: null,
  },
  {
    id: "5",
    name: "孙七",
    email: "sunqi@example.com",
    role: "查看者",
    status: "pending",
    lastActive: "从未",
    avatar: null,
  },
];

export default function UsersPage() {
  return (
    <>
      <Head>
        <title>用户管理 - HaloLight</title>
        <meta name="description" content="管理系统用户" />
      </Head>
      <Layout>
        <div className="max-w-6xl mx-auto py-8 px-4">
          {/* 标题和操作 */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                用户管理
              </h1>
              <p className="mt-1 text-gray-500 dark:text-gray-400">
                共 {users.length} 个用户
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">导出</Button>
              <Button variant="primary">添加用户</Button>
            </div>
          </div>

          {/* 搜索和筛选 */}
          <Card className="mb-6">
            <CardContent className="p-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <Input
                    type="search"
                    placeholder="搜索用户..."
                    className="w-full"
                  />
                </div>
                <div className="flex gap-2">
                  <select className="rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-sm">
                    <option value="">所有角色</option>
                    <option value="admin">管理员</option>
                    <option value="editor">编辑</option>
                    <option value="viewer">查看者</option>
                  </select>
                  <select className="rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-sm">
                    <option value="">所有状态</option>
                    <option value="active">活跃</option>
                    <option value="inactive">不活跃</option>
                    <option value="pending">待激活</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 用户列表 */}
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        用户
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        角色
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        状态
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        最后活跃
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        操作
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {users.map((user) => (
                      <tr
                        key={user.id}
                        className="hover:bg-gray-50 dark:hover:bg-gray-800/50"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-3">
                            <Avatar
                              name={user.name}
                              src={user.avatar}
                              size="sm"
                            />
                            <div>
                              <div className="font-medium text-gray-900 dark:text-white">
                                {user.name}
                              </div>
                              <div className="text-sm text-gray-500 dark:text-gray-400">
                                {user.email}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Badge
                            variant={user.role === "管理员"
                              ? "primary"
                              : "secondary"}
                          >
                            {user.role}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Badge
                            variant={user.status === "active"
                              ? "success"
                              : user.status === "pending"
                              ? "warning"
                              : "secondary"}
                          >
                            {user.status === "active"
                              ? "活跃"
                              : user.status === "pending"
                              ? "待激活"
                              : "不活跃"}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                          {user.lastActive}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          <button
                            type="button"
                            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                          >
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
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* 分页 */}
          <div className="flex items-center justify-between mt-4">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              显示 1-{users.length} 共 {users.length} 条
            </p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" disabled>
                上一页
              </Button>
              <Button variant="outline" size="sm" disabled>
                下一页
              </Button>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
