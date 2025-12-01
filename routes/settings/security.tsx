/**
 * 安全设置页面
 */
import { Head } from "$fresh/runtime.ts";
import Layout from "../../components/layout/Layout.tsx";
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/index.ts";

const loginHistory = [
  {
    id: "1",
    device: "Chrome on MacOS",
    location: "北京, 中国",
    ip: "192.168.1.1",
    time: "2024-01-15 14:32:00",
    current: true,
  },
  {
    id: "2",
    device: "Safari on iPhone",
    location: "上海, 中国",
    ip: "192.168.1.2",
    time: "2024-01-14 09:15:00",
    current: false,
  },
  {
    id: "3",
    device: "Firefox on Windows",
    location: "广州, 中国",
    ip: "192.168.1.3",
    time: "2024-01-12 18:45:00",
    current: false,
  },
];

export default function SecuritySettingsPage() {
  return (
    <>
      <Head>
        <title>安全设置 - HaloLight</title>
        <meta name="description" content="密码、两步验证和登录记录" />
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
            <span>/</span>
            <span className="text-gray-900 dark:text-white">安全设置</span>
          </nav>

          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              安全设置
            </h1>
            <p className="mt-1 text-gray-500 dark:text-gray-400">
              管理您的账户安全设置
            </p>
          </div>

          <div className="space-y-6">
            {/* 密码设置 */}
            <Card>
              <CardHeader>
                <CardTitle>密码</CardTitle>
                <CardDescription>
                  上次修改于 30 天前
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    建议定期更换密码以确保账户安全
                  </p>
                  <Button variant="outline">修改密码</Button>
                </div>
              </CardContent>
            </Card>

            {/* 两步验证 */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>两步验证</CardTitle>
                    <CardDescription>
                      为您的账户添加额外的安全保护
                    </CardDescription>
                  </div>
                  <Badge variant="secondary">未启用</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    启用两步验证后，登录时需要输入验证码
                  </p>
                  <Button variant="primary">启用</Button>
                </div>
              </CardContent>
            </Card>

            {/* 登录记录 */}
            <Card>
              <CardHeader>
                <CardTitle>登录记录</CardTitle>
                <CardDescription>
                  查看您的账户登录历史
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {loginHistory.map((login) => (
                    <div
                      key={login.id}
                      className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-800 last:border-0"
                    >
                      <div className="flex items-start gap-4">
                        <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800">
                          <svg
                            className="h-5 w-5 text-gray-500 dark:text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                            />
                          </svg>
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-gray-900 dark:text-white">
                              {login.device}
                            </span>
                            {login.current && (
                              <Badge variant="success" size="sm">
                                当前设备
                              </Badge>
                            )}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {login.location} · {login.ip}
                          </div>
                          <div className="text-xs text-gray-400 dark:text-gray-500">
                            {login.time}
                          </div>
                        </div>
                      </div>
                      {!login.current && (
                        <Button variant="ghost" size="sm">
                          注销
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* 危险操作区域 */}
            <Card className="border-red-200 dark:border-red-900">
              <CardHeader>
                <CardTitle className="text-red-600 dark:text-red-400">
                  危险操作
                </CardTitle>
                <CardDescription>
                  以下操作不可逆，请谨慎执行
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      删除账户
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      永久删除您的账户和所有数据
                    </p>
                  </div>
                  <Button variant="danger">删除账户</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </Layout>
    </>
  );
}
