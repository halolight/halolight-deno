/**
 * 通知设置页面
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

interface NotificationSetting {
  id: string;
  title: string;
  description: string;
  email: boolean;
  push: boolean;
  sms: boolean;
}

const notificationSettings: NotificationSetting[] = [
  {
    id: "security",
    title: "安全提醒",
    description: "登录异常、密码变更等安全相关通知",
    email: true,
    push: true,
    sms: true,
  },
  {
    id: "updates",
    title: "系统更新",
    description: "新功能、维护通知等系统更新",
    email: true,
    push: true,
    sms: false,
  },
  {
    id: "marketing",
    title: "营销推广",
    description: "产品推荐、优惠活动等营销信息",
    email: false,
    push: false,
    sms: false,
  },
  {
    id: "team",
    title: "团队动态",
    description: "成员加入、任务分配等团队相关通知",
    email: true,
    push: true,
    sms: false,
  },
  {
    id: "reminders",
    title: "任务提醒",
    description: "待办事项、日程提醒等",
    email: true,
    push: true,
    sms: false,
  },
];

function ToggleSwitch({ checked }: { checked: boolean }) {
  return (
    <div
      className={`relative h-6 w-11 rounded-full transition-colors ${
        checked ? "bg-blue-500" : "bg-gray-300 dark:bg-gray-600"
      }`}
    >
      <div
        className={`absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white transition-transform ${
          checked ? "translate-x-5" : ""
        }`}
      />
    </div>
  );
}

export default function NotificationsSettingsPage() {
  return (
    <>
      <Head>
        <title>通知设置 - HaloLight</title>
        <meta name="description" content="配置通知偏好和提醒方式" />
      </Head>
      <Layout title="通知设置" showSidebar>
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
            <span className="text-gray-900 dark:text-white">通知设置</span>
          </nav>

          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              通知设置
            </h1>
            <p className="mt-1 text-gray-500 dark:text-gray-400">
              配置通知偏好和提醒方式
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>通知渠道</CardTitle>
              <CardDescription>选择您希望接收通知的方式</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                      <th className="py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
                        通知类型
                      </th>
                      <th className="py-3 text-center text-sm font-medium text-gray-500 dark:text-gray-400">
                        邮件
                      </th>
                      <th className="py-3 text-center text-sm font-medium text-gray-500 dark:text-gray-400">
                        推送
                      </th>
                      <th className="py-3 text-center text-sm font-medium text-gray-500 dark:text-gray-400">
                        短信
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {notificationSettings.map((setting) => (
                      <tr key={setting.id}>
                        <td className="py-4">
                          <div className="font-medium text-gray-900 dark:text-white">
                            {setting.title}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {setting.description}
                          </div>
                        </td>
                        <td className="py-4 text-center">
                          <div className="flex justify-center">
                            <ToggleSwitch checked={setting.email} />
                          </div>
                        </td>
                        <td className="py-4 text-center">
                          <div className="flex justify-center">
                            <ToggleSwitch checked={setting.push} />
                          </div>
                        </td>
                        <td className="py-4 text-center">
                          <div className="flex justify-center">
                            <ToggleSwitch checked={setting.sms} />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <div className="mt-6 flex justify-end gap-3">
            <Button variant="outline">取消</Button>
            <Button variant="primary">保存设置</Button>
          </div>
        </div>
      </Layout>
    </>
  );
}
