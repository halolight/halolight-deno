/**
 * 角色权限管理页面
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

const roles = [
  {
    id: "admin",
    name: "管理员",
    description: "拥有系统的完全访问权限",
    memberCount: 2,
    permissions: ["users:*", "documents:*", "settings:*", "analytics:*"],
    isSystem: true,
  },
  {
    id: "editor",
    name: "编辑",
    description: "可以编辑和发布内容",
    memberCount: 5,
    permissions: ["documents:read", "documents:write", "documents:publish"],
    isSystem: true,
  },
  {
    id: "viewer",
    name: "查看者",
    description: "只能查看内容，无法编辑",
    memberCount: 10,
    permissions: ["documents:read", "analytics:read"],
    isSystem: true,
  },
  {
    id: "custom1",
    name: "内容审核",
    description: "审核和管理用户提交的内容",
    memberCount: 3,
    permissions: ["documents:read", "documents:review", "users:read"],
    isSystem: false,
  },
];

const permissionGroups = [
  {
    name: "用户管理",
    key: "users",
    permissions: [
      { key: "users:read", label: "查看用户" },
      { key: "users:write", label: "编辑用户" },
      { key: "users:delete", label: "删除用户" },
    ],
  },
  {
    name: "文档管理",
    key: "documents",
    permissions: [
      { key: "documents:read", label: "查看文档" },
      { key: "documents:write", label: "编辑文档" },
      { key: "documents:publish", label: "发布文档" },
      { key: "documents:delete", label: "删除文档" },
      { key: "documents:review", label: "审核文档" },
    ],
  },
  {
    name: "数据分析",
    key: "analytics",
    permissions: [
      { key: "analytics:read", label: "查看报表" },
      { key: "analytics:export", label: "导出数据" },
    ],
  },
  {
    name: "系统设置",
    key: "settings",
    permissions: [
      { key: "settings:read", label: "查看设置" },
      { key: "settings:write", label: "修改设置" },
    ],
  },
];

export default function RolesPage() {
  return (
    <>
      <Head>
        <title>角色权限 - HaloLight</title>
        <meta name="description" content="管理角色和权限设置" />
      </Head>
      <Layout title="角色权限" showSidebar>
        <div className="space-y-6">
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
            <a
              href="/settings/teams"
              className="hover:text-gray-700 dark:hover:text-gray-200"
            >
              团队管理
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
            <span className="text-gray-900 dark:text-white">角色权限</span>
          </nav>

          {/* 标题 */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                角色权限
              </h1>
              <p className="mt-1 text-gray-500 dark:text-gray-400">
                管理系统角色和权限配置
              </p>
            </div>
            <Button variant="primary">创建角色</Button>
          </div>

          {/* 角色列表 */}
          <div className="grid gap-4">
            {roles.map((role) => (
              <Card key={role.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                          {role.name}
                        </h3>
                        {role.isSystem && (
                          <Badge variant="secondary" size="sm">系统角色</Badge>
                        )}
                      </div>
                      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        {role.description}
                      </p>
                      <div className="mt-3 flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                        <span className="flex items-center gap-1">
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
                              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                            />
                          </svg>
                          {role.memberCount} 成员
                        </span>
                        <span className="flex items-center gap-1">
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
                              d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                            />
                          </svg>
                          {role.permissions.length} 权限
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        编辑
                      </Button>
                      {!role.isSystem && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-600 hover:text-red-700"
                        >
                          删除
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* 权限说明 */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>权限说明</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {permissionGroups.map((group) => (
                  <div key={group.key}>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                      {group.name}
                    </h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {group.permissions.map((perm) => (
                        <div
                          key={perm.key}
                          className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400"
                        >
                          <code className="text-xs bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded">
                            {perm.key}
                          </code>
                          <span>{perm.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </Layout>
    </>
  );
}
