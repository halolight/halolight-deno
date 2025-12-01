/**
 * 团队管理页面
 */
import { Head } from "$fresh/runtime.ts";
import Layout from "../../../components/layout/Layout.tsx";
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/index.ts";
import { Avatar } from "../../../components/ui/Avatar.tsx";

const teamMembers = [
  {
    id: "1",
    name: "张三",
    email: "zhangsan@example.com",
    role: "管理员",
    avatar: null,
    status: "active",
    joinedAt: "2024-01-15",
  },
  {
    id: "2",
    name: "李四",
    email: "lisi@example.com",
    role: "编辑",
    avatar: null,
    status: "active",
    joinedAt: "2024-02-20",
  },
  {
    id: "3",
    name: "王五",
    email: "wangwu@example.com",
    role: "查看者",
    avatar: null,
    status: "pending",
    joinedAt: "2024-03-10",
  },
];

export default function TeamsPage() {
  return (
    <>
      <Head>
        <title>团队管理 - HaloLight</title>
        <meta name="description" content="管理您的团队成员和权限" />
      </Head>
      <Layout>
        <div className="max-w-4xl mx-auto py-8 px-4">
          {/* 面包屑 */}
          <nav className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-6">
            <a
              href="/settings"
              className="hover:text-gray-700 dark:hover:text-gray-200"
            >
              设置
            </a>
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
            <span className="text-gray-900 dark:text-white">团队管理</span>
          </nav>

          {/* 标题 */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                团队管理
              </h1>
              <p className="mt-1 text-gray-500 dark:text-gray-400">
                管理团队成员和角色权限
              </p>
            </div>
            <div className="flex gap-2">
              <a href="/settings/teams/roles">
                <Button variant="outline">管理角色</Button>
              </a>
              <Button variant="primary">邀请成员</Button>
            </div>
          </div>

          {/* 团队成员列表 */}
          <Card>
            <CardHeader>
              <CardTitle>团队成员</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                {teamMembers.map((member) => (
                  <div
                    key={member.id}
                    className="flex items-center justify-between py-4 first:pt-0 last:pb-0"
                  >
                    <div className="flex items-center gap-4">
                      <Avatar
                        name={member.name}
                        src={member.avatar}
                        size="md"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-gray-900 dark:text-white">
                            {member.name}
                          </span>
                          {member.status === "pending" && (
                            <Badge variant="warning" size="sm">待确认</Badge>
                          )}
                        </div>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {member.email}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <Badge
                        variant={member.role === "管理员"
                          ? "primary"
                          : "secondary"}
                      >
                        {member.role}
                      </Badge>
                      <button
                        type="button"
                        className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
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
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* 待处理邀请 */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>待处理邀请</CardTitle>
            </CardHeader>
            <CardContent>
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
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <p className="mt-2">暂无待处理的邀请</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </Layout>
    </>
  );
}
