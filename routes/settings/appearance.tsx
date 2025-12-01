/**
 * 外观设置页面
 */
import { Head } from "$fresh/runtime.ts";
import Layout from "../../components/layout/Layout.tsx";
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/index.ts";

const themes = [
  { id: "light", label: "浅色", icon: "sun" },
  { id: "dark", label: "深色", icon: "moon" },
  { id: "system", label: "跟随系统", icon: "system" },
];

const colors = [
  { id: "blue", label: "蓝色", class: "bg-blue-500" },
  { id: "green", label: "绿色", class: "bg-green-500" },
  { id: "purple", label: "紫色", class: "bg-purple-500" },
  { id: "orange", label: "橙色", class: "bg-orange-500" },
  { id: "red", label: "红色", class: "bg-red-500" },
  { id: "pink", label: "粉色", class: "bg-pink-500" },
];

const languages = [
  { id: "zh-CN", label: "简体中文" },
  { id: "zh-TW", label: "繁體中文" },
  { id: "en-US", label: "English" },
  { id: "ja-JP", label: "日本語" },
];

function ThemeIcon({ type }: { type: string }) {
  if (type === "sun") {
    return (
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
          d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
        />
      </svg>
    );
  }
  if (type === "moon") {
    return (
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
          d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
        />
      </svg>
    );
  }
  return (
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
        d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
      />
    </svg>
  );
}

export default function AppearanceSettingsPage() {
  return (
    <>
      <Head>
        <title>外观设置 - HaloLight</title>
        <meta name="description" content="主题、语言和界面偏好" />
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
            <span className="text-gray-900 dark:text-white">外观设置</span>
          </nav>

          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              外观设置
            </h1>
            <p className="mt-1 text-gray-500 dark:text-gray-400">
              自定义您的界面外观和偏好
            </p>
          </div>

          <div className="space-y-6">
            {/* 主题模式 */}
            <Card>
              <CardHeader>
                <CardTitle>主题模式</CardTitle>
                <CardDescription>选择您喜欢的显示模式</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4">
                  {themes.map((theme) => (
                    <button
                      key={theme.id}
                      type="button"
                      className={`flex flex-col items-center gap-2 rounded-lg border p-4 transition-colors ${
                        theme.id === "system"
                          ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                          : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                      }`}
                    >
                      <ThemeIcon type={theme.icon} />
                      <span className="text-sm font-medium">{theme.label}</span>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* 主题色 */}
            <Card>
              <CardHeader>
                <CardTitle>主题色</CardTitle>
                <CardDescription>选择您喜欢的主题颜色</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-3">
                  {colors.map((color) => (
                    <button
                      key={color.id}
                      type="button"
                      className={`flex items-center gap-2 rounded-lg border px-4 py-2 transition-colors ${
                        color.id === "blue"
                          ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                          : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                      }`}
                    >
                      <span className={`h-4 w-4 rounded-full ${color.class}`} />
                      <span className="text-sm font-medium">{color.label}</span>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* 语言设置 */}
            <Card>
              <CardHeader>
                <CardTitle>语言</CardTitle>
                <CardDescription>选择界面显示语言</CardDescription>
              </CardHeader>
              <CardContent>
                <select className="w-full max-w-xs rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-2 text-sm">
                  {languages.map((lang) => (
                    <option key={lang.id} value={lang.id}>
                      {lang.label}
                    </option>
                  ))}
                </select>
              </CardContent>
            </Card>

            {/* 布局设置 */}
            <Card>
              <CardHeader>
                <CardTitle>布局设置</CardTitle>
                <CardDescription>自定义界面布局</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <label className="flex items-center justify-between">
                    <div>
                      <span className="font-medium text-gray-900 dark:text-white">
                        固定侧边栏
                      </span>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        侧边栏始终保持展开状态
                      </p>
                    </div>
                    <div className="relative h-6 w-11 rounded-full bg-blue-500 transition-colors">
                      <span className="absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white translate-x-5 transition-transform" />
                    </div>
                  </label>
                  <label className="flex items-center justify-between">
                    <div>
                      <span className="font-medium text-gray-900 dark:text-white">
                        显示页脚
                      </span>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        在页面底部显示页脚信息
                      </p>
                    </div>
                    <div className="relative h-6 w-11 rounded-full bg-blue-500 transition-colors">
                      <span className="absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white translate-x-5 transition-transform" />
                    </div>
                  </label>
                  <label className="flex items-center justify-between">
                    <div>
                      <span className="font-medium text-gray-900 dark:text-white">
                        紧凑模式
                      </span>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        减小界面元素间距
                      </p>
                    </div>
                    <div className="relative h-6 w-11 rounded-full bg-gray-300 dark:bg-gray-600 transition-colors">
                      <span className="absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white transition-transform" />
                    </div>
                  </label>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-6 flex justify-end gap-3">
            <Button variant="outline">重置</Button>
            <Button variant="primary">保存设置</Button>
          </div>
        </div>
      </Layout>
    </>
  );
}
