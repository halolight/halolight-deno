/**
 * LoginForm Island 组件
 * 登录表单的客户端交互组件
 */

import { IS_BROWSER } from "$fresh/runtime.ts";
import type { JSX } from "preact";
import { useCallback, useEffect, useState } from "preact/hooks";
import { cn } from "../lib/utils.ts";
import { AuthShell } from "../components/auth/AuthShell.tsx";
import Card, {
  CardContent,
  CardFooter,
  CardHeader,
} from "../components/ui/Card.tsx";
import Input from "../components/ui/Input.tsx";
import Button from "../components/ui/Button.tsx";
import { Separator } from "../components/ui/Separator.tsx";
import { Checkbox } from "../components/ui/Checkbox.tsx";

// ============================================================================
// 图标组件
// ============================================================================

function SparklesIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
      />
    </svg>
  );
}

function MailIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
      />
    </svg>
  );
}

function LockIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
      />
    </svg>
  );
}

function EyeIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
      />
    </svg>
  );
}

function EyeOffIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
      />
    </svg>
  );
}

function LoaderIcon({ className }: { className?: string }) {
  return (
    <svg
      className={cn("animate-spin", className)}
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
}

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path
        fillRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
    </svg>
  );
}

function WechatIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 01.213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 00.167-.054l1.903-1.114a.864.864 0 01.717-.098 10.16 10.16 0 002.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 5.853-1.838-.576-3.583-4.196-6.348-8.596-6.348zM5.785 5.991c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 01-1.162 1.178A1.17 1.17 0 014.623 7.17c0-.651.52-1.18 1.162-1.18zm5.813 0c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 01-1.162 1.178 1.17 1.17 0 01-1.162-1.178c0-.651.52-1.18 1.162-1.18zm5.34 2.867c-1.797-.052-3.746.512-5.28 1.786-1.72 1.428-2.687 3.72-1.78 6.22.942 2.453 3.666 4.229 6.884 4.229.826 0 1.622-.12 2.361-.336a.722.722 0 01.598.082l1.584.926a.272.272 0 00.139.045c.133 0 .241-.108.241-.243 0-.06-.024-.118-.039-.176l-.326-1.231a.49.49 0 01.177-.554C23.016 18.138 24 16.373 24 14.438c0-3.229-3.082-5.58-7.062-5.58zm-2.656 2.587c.535 0 .969.44.969.982a.976.976 0 01-.969.983.976.976 0 01-.969-.983c0-.542.434-.982.97-.982zm4.844 0c.535 0 .969.44.969.982a.976.976 0 01-.969.983.976.976 0 01-.969-.983c0-.542.434-.982.969-.982z" />
    </svg>
  );
}

function UserIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
      />
    </svg>
  );
}

// ============================================================================
// 配置
// ============================================================================

interface LoginFormProps {
  demoEmail?: string;
  demoPassword?: string;
  showDemoHint?: boolean;
}

// ============================================================================
// 组件
// ============================================================================

export default function LoginForm({
  demoEmail = "",
  demoPassword = "",
  showDemoHint = false,
}: LoginFormProps): JSX.Element {
  // 客户端状态 - 避免 SSR 时调用 Zustand
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [localError, setLocalError] = useState("");

  // 客户端初始化 store 订阅
  useEffect(() => {
    if (!IS_BROWSER) return;

    const initStore = async () => {
      const { useAuthStore } = await import("../stores/useAuthStore.ts");

      // 订阅 store 状态变化
      const unsubscribe = useAuthStore.subscribe((state) => {
        setIsLoading(state.isLoading);
        setError(state.error);
      });

      // 初始化当前状态
      const state = useAuthStore.getState();
      setIsLoading(state.isLoading);
      setError(state.error);

      // 清除错误
      useAuthStore.getState().clearError();

      return unsubscribe;
    };

    initStore();
  }, []);

  const fillDemoCredentials = useCallback(() => {
    if (demoEmail && demoPassword) {
      setFormData((prev) => ({
        ...prev,
        email: demoEmail,
        password: demoPassword,
      }));
    }
  }, [demoEmail, demoPassword]);

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    setLocalError("");

    if (!formData.email || !formData.password) {
      setLocalError("请填写邮箱和密码");
      return;
    }

    if (!IS_BROWSER) return;

    try {
      const { useAuthStore } = await import("../stores/useAuthStore.ts");
      await useAuthStore.getState().login(formData);
      // 登录成功后跳转
      globalThis.location.href = "/dashboard";
    } catch {
      // 错误已在 store 中处理
    }
  };

  const handleSocialLogin = (provider: string) => {
    console.log(`使用 ${provider} 登录`);
  };

  return (
    <AuthShell
      rightPaddingClassName="p-3 sm:p-4 lg:px-10 lg:py-6"
      left={
        <div className="animate-fade-in-up">
          <div className="flex items-center gap-3 mb-12 hover:scale-102 transition-transform">
            <div className="relative h-14 w-14 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center shadow-2xl">
              <SparklesIcon className="h-7 w-7" />
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/20 to-transparent" />
            </div>
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Admin Pro</h2>
              <p className="text-xs text-white/60">企业级管理系统</p>
            </div>
          </div>

          <h1 className="text-5xl xl:text-6xl font-bold mb-6 leading-tight">
            欢迎回来
            <span className="inline-block ml-2 animate-pulse-opacity">👋</span>
          </h1>
          <p className="text-lg text-white/70 max-w-md leading-relaxed mb-12">
            登录您的账户，开始管理您的业务数据和团队协作，体验高效的工作流程。
          </p>

          <div className="space-y-4">
            {[
              { icon: "🚀", text: "快速部署，即刻启动" },
              { icon: "📊", text: "实时数据分析与可视化" },
              { icon: "🔒", text: "企业级安全保障" },
              { icon: "⚡", text: "极致性能体验" },
            ].map((item, index) => (
              <div
                key={item.text}
                className="flex items-center gap-3 group animate-fade-in-left"
                style={{ animationDelay: `${0.6 + index * 0.1}s` }}
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <span className="text-white/90">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      }
      right={
        <div className="w-full max-w-md animate-fade-in-up">
          {/* 移动端头部 */}
          <div className="mb-5 lg:hidden text-center">
            <div className="inline-flex items-center gap-3 mb-3 px-6 py-3 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 shadow-xl">
              <SparklesIcon className="h-6 w-6 text-white" />
              <span className="text-xl font-bold text-white">Admin Pro</span>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              欢迎回来，请登录您的账户
            </p>
          </div>

          <Card className="border border-gray-200/50 dark:border-gray-700/50 shadow-2xl backdrop-blur-xl bg-white/80 dark:bg-gray-900/80 overflow-hidden">
            <div className="h-1 bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600" />

            <CardHeader className="space-y-1 text-center pb-3 sm:pb-5 pt-4 sm:pt-7">
              <div className="animate-fade-in-scale stagger-4">
                <h3 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  登录账户
                </h3>
                <p className="text-xs sm:text-sm mt-2 text-gray-500 dark:text-gray-400">
                  输入您的邮箱和密码登录
                </p>
              </div>
            </CardHeader>

            <CardContent className="space-y-3 sm:space-y-4 px-4 sm:px-6">
              {/* 社交登录按钮 */}
              <div className="grid grid-cols-3 gap-2 sm:gap-3">
                {[
                  {
                    icon: GithubIcon,
                    name: "github",
                    label: "GitHub",
                    delay: "5",
                  },
                  {
                    icon: GoogleIcon,
                    name: "google",
                    label: "Google",
                    delay: "6",
                  },
                  {
                    icon: WechatIcon,
                    name: "wechat",
                    label: "微信",
                    delay: "7",
                  },
                ].map((provider) => (
                  <div
                    key={provider.name}
                    className={`animate-slide-in-up stagger-${provider.delay}`}
                  >
                    <Button
                      variant="outline"
                      className="w-full h-11 sm:h-12 border-gray-200/50 dark:border-gray-700/50 hover:border-primary-500/50 hover:bg-primary-500/5 transition-all duration-300 group"
                      onClick={() => handleSocialLogin(provider.name)}
                    >
                      <provider.icon className="h-5 w-5 group-hover:scale-110 transition-transform" />
                    </Button>
                  </div>
                ))}
              </div>

              <div className="relative py-3">
                <Separator />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="bg-white dark:bg-gray-900 px-3 text-xs uppercase text-gray-500 dark:text-gray-400 font-medium">
                    或使用邮箱登录
                  </span>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
                {/* 错误提示 */}
                {(error || localError) && (
                  <div className="p-3 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-xs sm:text-sm animate-fade-in">
                    {error || localError}
                  </div>
                )}

                {/* 邮箱输入 */}
                <div className="space-y-2 animate-slide-in-up stagger-6">
                  <label className="text-xs font-medium text-gray-500 dark:text-gray-400">
                    邮箱地址
                  </label>
                  <div className="relative group">
                    <MailIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-primary-500 transition-colors z-10" />
                    <Input
                      type="email"
                      placeholder="your@email.com"
                      className="pl-10 h-12 text-sm border-gray-200/50 dark:border-gray-700/50 focus:border-primary-500/50 rounded-xl transition-all"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          email: (e.target as HTMLInputElement).value,
                        })}
                    />
                  </div>
                </div>

                {/* 密码输入 */}
                <div className="space-y-2 animate-slide-in-up stagger-7">
                  <label className="text-xs font-medium text-gray-500 dark:text-gray-400">
                    密码
                  </label>
                  <div className="relative group">
                    <LockIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-primary-500 transition-colors" />
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className="pl-10 pr-10 h-12 text-sm border-gray-200/50 dark:border-gray-700/50 focus:border-primary-500/50 rounded-xl transition-all"
                      value={formData.password}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          password: (e.target as HTMLInputElement).value,
                        })}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                    >
                      {showPassword
                        ? <EyeOffIcon className="h-4 w-4" />
                        : <EyeIcon className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                {/* 记住我 & 忘记密码 */}
                <div className="flex items-center justify-between text-xs sm:text-sm animate-slide-in-up stagger-8">
                  <Checkbox
                    checked={formData.remember}
                    onChange={(checked) =>
                      setFormData({ ...formData, remember: checked })}
                    label="记住我"
                  />
                  <a
                    href="/forgot-password"
                    className="text-primary-600 hover:text-primary-500 font-medium transition-colors"
                  >
                    忘记密码？
                  </a>
                </div>

                {/* 测试账号按钮 */}
                {demoEmail && demoPassword && (
                  <div className="flex items-center gap-2 py-2 animate-slide-in-up stagger-9">
                    <div className="flex-1 h-px bg-gray-200/50 dark:bg-gray-700/50" />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={fillDemoCredentials}
                      className="h-7 px-3 text-xs text-gray-500 hover:text-primary-600 hover:bg-primary-500/5 rounded-lg"
                    >
                      <UserIcon className="h-3 w-3 mr-1.5" />
                      测试账号
                    </Button>
                    <div className="flex-1 h-px bg-gray-200/50 dark:bg-gray-700/50" />
                  </div>
                )}

                {/* 登录按钮 */}
                <div className="animate-slide-in-up stagger-10">
                  <Button
                    type="submit"
                    className="w-full h-12 text-sm font-medium bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                    disabled={isLoading}
                  >
                    {isLoading
                      ? (
                        <>
                          <LoaderIcon className="mr-2 h-4 w-4" />
                          登录中...
                        </>
                      )
                      : (
                        <>
                          登录
                          <span className="ml-2 animate-arrow-slide">→</span>
                        </>
                      )}
                  </Button>
                </div>
              </form>
            </CardContent>

            <CardFooter className="flex flex-col space-y-3 sm:space-y-4 px-4 sm:px-6 pb-5 sm:pb-8 pt-2">
              <Separator />
              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 text-center">
                还没有账户？{" "}
                <a
                  href="/register"
                  className="text-primary-600 hover:text-primary-500 font-semibold transition-colors"
                >
                  立即注册
                </a>
              </p>
              <p className="text-xs sm:text-sm text-gray-400 dark:text-gray-500 text-center leading-relaxed">
                阅读我们的{" "}
                <a
                  href="/terms"
                  className="text-primary-600 hover:text-primary-500 font-semibold transition-colors"
                >
                  服务条款
                </a>{" "}
                和{" "}
                <a
                  href="/privacy"
                  className="text-primary-600 hover:text-primary-500 font-semibold transition-colors"
                >
                  隐私政策
                </a>{" "}
                了解更多信息。
              </p>
              {showDemoHint && (
                <p className="text-xs text-gray-400 dark:text-gray-500 text-center leading-relaxed">
                  测试账号请点击上方"测试账号"按钮自动填充
                </p>
              )}
            </CardFooter>
          </Card>

          {/* 自定义动画样式 */}
          <style>
            {`
            @keyframes fade-in-up {
              from {
                opacity: 0;
                transform: translateY(40px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }

            @keyframes fade-in-left {
              from {
                opacity: 0;
                transform: translateX(-20px);
              }
              to {
                opacity: 1;
                transform: translateX(0);
              }
            }

            @keyframes fade-in {
              from {
                opacity: 0;
                transform: scale(0.95);
              }
              to {
                opacity: 1;
                transform: scale(1);
              }
            }

            @keyframes fade-in-scale {
              from {
                opacity: 0;
                transform: scale(0.8);
              }
              to {
                opacity: 1;
                transform: scale(1);
              }
            }

            @keyframes slide-in-up {
              from {
                opacity: 0;
                transform: translateY(20px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }

            @keyframes pulse-opacity {
              0%, 100% {
                opacity: 1;
              }
              50% {
                opacity: 0.5;
              }
            }

            @keyframes arrow-slide {
              0%, 100% {
                transform: translateX(0);
              }
              50% {
                transform: translateX(4px);
              }
            }

            .animate-fade-in-up {
              animation: fade-in-up 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards;
            }

            .animate-fade-in-left {
              animation: fade-in-left 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards;
              opacity: 0;
            }

            .animate-fade-in {
              animation: fade-in 0.3s ease-out forwards;
            }

            .animate-fade-in-scale {
              animation: fade-in-scale 0.4s cubic-bezier(0.22, 1, 0.36, 1) forwards;
              opacity: 0;
            }

            .animate-slide-in-up {
              animation: slide-in-up 0.5s cubic-bezier(0.22, 1, 0.36, 1) forwards;
              opacity: 0;
            }

            .animate-pulse-opacity {
              animation: pulse-opacity 2s ease-in-out infinite;
            }

            .animate-arrow-slide {
              display: inline-block;
              animation: arrow-slide 1.5s ease-in-out infinite;
            }

            .hover\\:scale-102:hover {
              transform: scale(1.02);
            }

            .stagger-1 { animation-delay: 0.1s; }
            .stagger-2 { animation-delay: 0.2s; }
            .stagger-3 { animation-delay: 0.3s; }
            .stagger-4 { animation-delay: 0.4s; }
            .stagger-5 { animation-delay: 0.5s; }
            .stagger-6 { animation-delay: 0.6s; }
            .stagger-7 { animation-delay: 0.7s; }
            .stagger-8 { animation-delay: 0.8s; }
            .stagger-9 { animation-delay: 0.9s; }
            .stagger-10 { animation-delay: 1.0s; }
          `}
          </style>
        </div>
      }
    />
  );
}
