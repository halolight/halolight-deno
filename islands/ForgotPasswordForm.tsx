/**
 * ForgotPasswordForm Island 组件
 * 忘记密码表单的客户端交互组件
 */

import { IS_BROWSER } from "$fresh/runtime.ts";
import type { JSX } from "preact";
import { useEffect, useState } from "preact/hooks";
import { cn } from "../lib/utils.ts";
import { AuthShell } from "../components/auth/AuthShell.tsx";
import Card, {
  CardContent,
  CardFooter,
  CardHeader,
} from "../components/ui/Card.tsx";
import Input from "../components/ui/Input.tsx";
import Button from "../components/ui/Button.tsx";

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

function ShieldIcon({ className }: { className?: string }) {
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
        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
      />
    </svg>
  );
}

function CheckCircleIcon({ className }: { className?: string }) {
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
        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
}

function ArrowLeftIcon({ className }: { className?: string }) {
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
        d="M10 19l-7-7m0 0l7-7m-7 7h18"
      />
    </svg>
  );
}

// ============================================================================
// 背景配置
// ============================================================================

const forgotBackground = {
  gridSize: 26,
  halos: [
    {
      from: "from-sky-400/30",
      to: "to-cyan-400/30",
      className:
        "absolute -top-36 -left-32 w-96 h-96 rounded-full blur-3xl animate-pulse-slow",
    },
    {
      from: "from-emerald-400/25",
      to: "to-teal-400/25",
      className:
        "absolute top-1/3 -right-24 w-80 h-80 rounded-full blur-3xl animate-pulse-slower",
    },
  ],
};

// ============================================================================
// 组件
// ============================================================================

export default function ForgotPasswordForm(): JSX.Element {
  // 客户端状态 - 避免 SSR 时调用 Zustand
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [localError, setLocalError] = useState("");

  // 客户端初始化 store 订阅
  useEffect(() => {
    if (!IS_BROWSER) return;

    const initStore = async () => {
      const { useAuthStore } = await import("../stores/useAuthStore.ts");

      const unsubscribe = useAuthStore.subscribe((state) => {
        setIsLoading(state.isLoading);
        setError(state.error);
      });

      const state = useAuthStore.getState();
      setIsLoading(state.isLoading);
      setError(state.error);
      useAuthStore.getState().clearError();

      return unsubscribe;
    };

    initStore();
  }, []);

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    setLocalError("");

    if (!email) {
      setLocalError("请输入邮箱地址");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setLocalError("请输入有效的邮箱地址");
      return;
    }

    if (!IS_BROWSER) return;

    try {
      const { useAuthStore } = await import("../stores/useAuthStore.ts");
      await useAuthStore.getState().forgotPassword(email);
      setIsSubmitted(true);
    } catch {
      // 错误已在 store 中处理
    }
  };

  return (
    <AuthShell
      leftGradientClassName="bg-gradient-to-br from-sky-600 via-cyan-600 to-emerald-600"
      backgroundOptions={forgotBackground}
      floatingDots={{ count: 5, colorClassName: "bg-white/25" }}
      left={
        <div className="animate-fade-in-up">
          <div className="flex items-center gap-3 mb-12">
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
            找回密码
          </h1>
          <p className="text-lg text-white/70 max-w-md leading-relaxed mb-12">
            别担心，我们会帮助您重新获得账户访问权限。只需几个简单的步骤即可完成。
          </p>

          <div className="space-y-4">
            {[
              { icon: "📧", text: "输入注册邮箱地址" },
              { icon: "🔗", text: "接收安全重置链接" },
              { icon: "🔐", text: "设置新的安全密码" },
              { icon: "✅", text: "重新登录您的账户" },
            ].map((item, index) => (
              <div
                key={item.text}
                className="flex items-center gap-3 group animate-fade-in-left"
                style={{ animationDelay: `${0.6 + index * 0.1}s` }}
              >
                <div className="shrink-0 w-10 h-10 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
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
          <div className="mb-5 lg:hidden flex items-center justify-between rounded-2xl border bg-white/80 dark:bg-gray-900/80 p-3 shadow-lg backdrop-blur">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                重置密码
              </p>
              <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                找回您的账户
              </p>
            </div>
            <div className="h-10 w-10 rounded-full bg-primary-500/10 text-primary-600 flex items-center justify-center font-bold">
              A
            </div>
          </div>

          <Card className="border border-gray-200/50 dark:border-gray-700/50 shadow-2xl backdrop-blur-xl bg-white/85 dark:bg-gray-900/85 overflow-hidden">
            {!isSubmitted
              ? (
                <>
                  <div className="h-1 bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600" />

                  <CardHeader className="space-y-1 text-center px-4 sm:px-6 pt-7 sm:pt-9 pb-5 sm:pb-6">
                    <div className="mx-auto relative mb-5">
                      <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-2xl">
                        <MailIcon className="h-10 w-10 sm:h-12 sm:w-12 text-white" />
                        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/20 to-transparent animate-pulse" />
                      </div>
                      <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-yellow-400 flex items-center justify-center shadow-lg animate-bounce-slow">
                        <SparklesIcon className="h-4 w-4 text-yellow-900" />
                      </div>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-3">
                      忘记密码？
                    </h3>
                    <p className="text-sm sm:text-base leading-relaxed text-gray-500 dark:text-gray-400">
                      别担心，输入您的邮箱地址
                      <br />
                      我们将发送密码重置链接
                    </p>
                  </CardHeader>

                  <CardContent className="px-4 sm:px-6 pb-7">
                    <form onSubmit={handleSubmit} className="space-y-4">
                      {/* 错误提示 */}
                      {(error || localError) && (
                        <div className="p-3 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-xs sm:text-sm animate-fade-in">
                          {error || localError}
                        </div>
                      )}

                      {/* 邮箱输入 */}
                      <div className="space-y-2">
                        <label className="text-xs font-medium text-gray-500 dark:text-gray-400">
                          邮箱地址
                        </label>
                        <div className="relative group">
                          <MailIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-primary-500 transition-colors z-10" />
                          <Input
                            type="email"
                            placeholder="your@email.com"
                            className="pl-10 h-12 text-sm border-gray-200/50 dark:border-gray-700/50 focus:border-primary-500/50 rounded-xl transition-all"
                            value={email}
                            onChange={(e) =>
                              setEmail((e.target as HTMLInputElement).value)}
                          />
                        </div>
                      </div>

                      {/* 提交按钮 */}
                      <Button
                        type="submit"
                        className="w-full h-12 text-sm font-medium bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                        disabled={isLoading}
                      >
                        {isLoading
                          ? (
                            <>
                              <LoaderIcon className="mr-2 h-4 w-4" />
                              发送中...
                            </>
                          )
                          : (
                            <>
                              发送重置链接
                              <span className="ml-2">→</span>
                            </>
                          )}
                      </Button>

                      {/* 安全提示 */}
                      <div className="flex items-start gap-3 p-3 rounded-xl bg-blue-50/50 dark:bg-blue-950/20 border border-blue-200/50 dark:border-blue-800/50">
                        <ShieldIcon className="h-5 w-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                        <div className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                          <p className="font-medium text-gray-900 dark:text-gray-100 mb-1">
                            安全提示
                          </p>
                          重置链接将在15分钟后过期，请及时查收邮件并完成密码重置。
                        </div>
                      </div>
                    </form>
                  </CardContent>
                </>
              )
              : (
                <>
                  <div className="h-1 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500" />

                  <CardHeader className="space-y-1 text-center px-4 sm:px-6 pt-7 sm:pt-9 pb-5 sm:pb-6">
                    <div className="mx-auto relative mb-5">
                      <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-2xl">
                        <CheckCircleIcon className="h-10 w-10 sm:h-12 sm:w-12 text-white" />
                      </div>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-3">
                      邮件已发送
                    </h3>
                    <p className="text-sm leading-relaxed text-gray-500 dark:text-gray-400">
                      我们已向{" "}
                      <span className="font-semibold text-gray-900 dark:text-gray-100">
                        {email}
                      </span>{" "}
                      发送了密码重置链接
                    </p>
                  </CardHeader>

                  <CardContent className="space-y-4 px-4 sm:px-6 pb-7">
                    <div className="p-4 rounded-xl bg-blue-50/50 dark:bg-blue-950/20 border border-blue-200/50 dark:border-blue-800/50">
                      <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                        📧 请检查您的邮箱并点击链接重置密码
                        <br />
                        📁 如果没有收到，请检查垃圾邮件文件夹
                        <br />
                        ⏰ 链接将在15分钟后过期
                      </p>
                    </div>

                    <Button
                      variant="outline"
                      className="w-full h-11 text-sm border-gray-200/50 dark:border-gray-700/50 hover:border-primary-500/50 hover:bg-primary-500/5 rounded-xl transition-all"
                      onClick={() => {
                        setIsSubmitted(false);
                        setEmail("");
                      }}
                    >
                      重新发送
                    </Button>
                  </CardContent>
                </>
              )}

            <CardFooter className="px-4 sm:px-6 pb-5 sm:pb-7 pt-2">
              <a
                href="/login"
                className="flex items-center justify-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-primary-600 font-medium transition-colors w-full group"
              >
                <ArrowLeftIcon className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                返回登录
              </a>
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

            @keyframes bounce-slow {
              0%, 100% {
                transform: rotate(0deg);
              }
              25% {
                transform: rotate(10deg);
              }
              75% {
                transform: rotate(-10deg);
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

            .animate-bounce-slow {
              animation: bounce-slow 2s ease-in-out infinite;
            }
          `}
          </style>
        </div>
      }
    />
  );
}
