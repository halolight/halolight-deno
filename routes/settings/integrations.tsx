/**
 * 集成设置页面
 */
import type { JSX } from "preact";
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

interface Integration {
  id: string;
  name: string;
  description: string;
  icon: string;
  connected: boolean;
  category: string;
}

const integrations: Integration[] = [
  {
    id: "github",
    name: "GitHub",
    description: "连接 GitHub 账户，同步代码仓库和提交记录",
    icon: "/icons/github.svg",
    connected: true,
    category: "开发工具",
  },
  {
    id: "slack",
    name: "Slack",
    description: "接收通知和提醒到 Slack 工作区",
    icon: "/icons/slack.svg",
    connected: false,
    category: "通讯协作",
  },
  {
    id: "google",
    name: "Google Workspace",
    description: "同步 Google 日历和文档",
    icon: "/icons/google.svg",
    connected: true,
    category: "生产力工具",
  },
  {
    id: "notion",
    name: "Notion",
    description: "同步 Notion 页面和数据库",
    icon: "/icons/notion.svg",
    connected: false,
    category: "生产力工具",
  },
  {
    id: "jira",
    name: "Jira",
    description: "同步 Jira 项目和问题追踪",
    icon: "/icons/jira.svg",
    connected: false,
    category: "项目管理",
  },
  {
    id: "figma",
    name: "Figma",
    description: "查看和同步 Figma 设计文件",
    icon: "/icons/figma.svg",
    connected: false,
    category: "设计工具",
  },
];

function IntegrationIcon({ name }: { name: string }) {
  const icons: Record<string, JSX.Element> = {
    github: (
      <svg className="h-8 w-8" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
      </svg>
    ),
    slack: (
      <svg className="h-8 w-8" viewBox="0 0 24 24" fill="currentColor">
        <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zM18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312zM15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zM15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z" />
      </svg>
    ),
    google: (
      <svg className="h-8 w-8" viewBox="0 0 24 24">
        <path
          fill="#4285F4"
          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        />
        <path
          fill="#34A853"
          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        />
        <path
          fill="#FBBC05"
          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        />
        <path
          fill="#EA4335"
          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        />
      </svg>
    ),
    default: (
      <svg
        className="h-8 w-8"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z"
        />
      </svg>
    ),
  };
  return icons[name.toLowerCase()] || icons.default;
}

export default function IntegrationsSettingsPage() {
  const categories = [...new Set(integrations.map((i) => i.category))];

  return (
    <>
      <Head>
        <title>集成设置 - HaloLight</title>
        <meta name="description" content="第三方应用和 API 集成" />
      </Head>
      <Layout title="集成设置" showSidebar>
        <div className="space-y-6">
          {/* 面包屑 */}
          <nav className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-6">
            <a
              href="/settings"
              className="hover:text-gray-700 dark:hover:text-gray-200"
            >
              设置
            </a>
            <span>/</span>
            <span className="text-gray-900 dark:text-white">集成设置</span>
          </nav>

          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              集成设置
            </h1>
            <p className="mt-1 text-gray-500 dark:text-gray-400">
              连接第三方应用和服务
            </p>
          </div>

          <div className="space-y-8">
            {categories.map((category) => (
              <div key={category}>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  {category}
                </h2>
                <div className="grid gap-4 md:grid-cols-2">
                  {integrations
                    .filter((i) => i.category === category)
                    .map((integration) => (
                      <Card key={integration.id}>
                        <CardContent className="p-4">
                          <div className="flex items-start gap-4">
                            <div className="flex-shrink-0 text-gray-700 dark:text-gray-300">
                              <IntegrationIcon name={integration.id} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2">
                                <h3 className="font-medium text-gray-900 dark:text-white">
                                  {integration.name}
                                </h3>
                                {integration.connected && (
                                  <Badge variant="success" size="sm">
                                    已连接
                                  </Badge>
                                )}
                              </div>
                              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                {integration.description}
                              </p>
                              <div className="mt-3">
                                {integration.connected
                                  ? (
                                    <Button variant="outline" size="sm">
                                      管理
                                    </Button>
                                  )
                                  : (
                                    <Button variant="primary" size="sm">
                                      连接
                                    </Button>
                                  )}
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </div>
            ))}
          </div>

          {/* API 密钥 */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>API 密钥</CardTitle>
              <CardDescription>管理您的 API 访问密钥</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700">
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    生产环境密钥
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    创建于 2024-01-01
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <code className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-sm">
                    sk-****-****-****-1234
                  </code>
                  <Button variant="ghost" size="sm">
                    复制
                  </Button>
                </div>
              </div>
              <div className="mt-4">
                <Button variant="outline">生成新密钥</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </Layout>
    </>
  );
}
