/**
 * ResetPasswordForm Island 组件
 * 重置密码表单的客户端交互组件
 */

import { IS_BROWSER } from "$fresh/runtime.ts";
import type { JSX } from "preact";
import { useEffect, useMemo, useState } from "preact/hooks";
import { cn } from "../lib/utils.ts";
import {
  getPasswordStrength,
  passwordRules,
} from "../lib/auth/password-rules.ts";
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

function ShieldCheckIcon({ className }: { className?: string }) {
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

function XIcon({ className }: { className?: string }) {
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
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  );
}

function CheckIcon({ className }: { className?: string }) {
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
        d="M5 13l4 4L19 7"
      />
    </svg>
  );
}

// ============================================================================
// 背景配置
// ============================================================================

const resetBackground = {
  gridSize: 24,
  halos: [
    {
      from: "from-indigo-400/30",
      to: "to-violet-400/30",
      className:
        "absolute -top-36 -left-32 w-96 h-96 rounded-full blur-3xl animate-pulse-slow",
    },
    {
      from: "from-fuchsia-400/25",
      to: "to-pink-400/25",
      className:
        "absolute top-1/3 -right-24 w-80 h-80 rounded-full blur-3xl animate-pulse-slower",
    },
    {
      from: "from-blue-400/20",
      to: "to-cyan-400/20",
      className:
        "absolute -bottom-32 left-1/4 w-96 h-96 rounded-full blur-3xl animate-pulse-slowest",
    },
  ],
};

// ============================================================================
// 组件
// ============================================================================

interface ResetPasswordFormProps {
  token?: string | null;
}

export default function ResetPasswordForm(
  { token }: ResetPasswordFormProps,
): JSX.Element {
  // 客户端状态 - 避免 SSR 时调用 Zustand
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [localError, setLocalError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const passwordStrength = useMemo(
    () => getPasswordStrength(formData.password),
    [formData.password],
  );

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

    if (!token) {
      setLocalError("无效的重置链接");
      return;
    }

    if (!formData.password || !formData.confirmPassword) {
      setLocalError("请填写所有字段");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setLocalError("两次密码输入不一致");
      return;
    }

    if (passwordStrength < 3) {
      setLocalError("密码强度不足");
      return;
    }

    if (!IS_BROWSER) return;

    try {
      const { useAuthStore } = await import("../stores/useAuthStore.ts");
      await useAuthStore.getState().resetPassword(token, formData.password);
      setIsSuccess(true);
    } catch {
      // 错误已在 store 中处理
    }
  };

  // 无效 token 页面
  if (!token) {
    return (
      <AuthShell
        showLeft={false}
        rightPaddingClassName="p-3 sm:p-4 lg:px-10 lg:py-6"
        right={
          <div className="w-full max-w-md animate-fade-in-up">
            <Card className="border border-gray-200/50 dark:border-gray-700/50 shadow-2xl backdrop-blur-xl bg-white/80 dark:bg-gray-900/80 overflow-hidden">
              <div className="h-1 bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500" />

              <CardHeader className="space-y-1 text-center px-4 sm:px-6 pt-7 sm:pt-9 pb-5 sm:pb-6">
                <div className="mx-auto relative mb-5">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center shadow-2xl">
                    <XIcon className="h-10 w-10 sm:h-12 sm:w-12 text-white" />
                  </div>
                </div>

                <h3 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent mb-3">
                  无效链接
                </h3>
                <p className="text-sm leading-relaxed text-gray-500 dark:text-gray-400">
                  密码重置链接无效或已过期
                </p>
              </CardHeader>

              <CardContent className="space-y-4 px-4 sm:px-6 pb-7">
                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 text-center">
                  请重新请求密码重置链接，或联系客服获取帮助。
                </p>
                <div className="flex flex-col gap-3">
                  <Button
                    className="w-full h-12 text-sm font-medium bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                    onClick={() =>
                      globalThis.location.href = "/forgot-password"}
                  >
                    重新发送链接
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full h-12 text-sm border-gray-200/50 dark:border-gray-700/50 hover:border-primary-500/50 hover:bg-primary-500/5 rounded-xl transition-all"
                    onClick={() => globalThis.location.href = "/login"}
                  >
                    返回登录
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        }
      />
    );
  }

  return (
    <AuthShell
      leftGradientClassName="bg-gradient-to-br from-indigo-700 via-violet-700 to-fuchsia-700"
      backgroundOptions={resetBackground}
      floatingDots={{ count: 7, colorClassName: "bg-white/25" }}
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
            重置密码
            <span className="inline-block ml-2 animate-pulse">🔐</span>
          </h1>
          <p className="text-lg text-white/70 max-w-md leading-relaxed mb-12">
            设置一个安全的新密码，保护您的账户安全。请确保密码足够复杂。
          </p>

          <div className="space-y-4">
            {[
              { icon: "🔒", text: "使用至少 8 个字符" },
              { icon: "🔤", text: "混合大小写字母" },
              { icon: "🔢", text: "包含数字和符号" },
              { icon: "🛡️", text: "避免使用个人信息" },
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
          <div className="mb-6 lg:hidden text-center">
            <div className="inline-flex items-center gap-3 mb-3 px-6 py-3 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 shadow-xl">
              <SparklesIcon className="h-6 w-6 text-white" />
              <span className="text-xl font-bold text-white">Admin Pro</span>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              设置您的新密码
            </p>
          </div>

          <Card className="border border-gray-200/50 dark:border-gray-700/50 shadow-2xl backdrop-blur-xl bg-white/80 dark:bg-gray-900/80 overflow-hidden">
            {!isSuccess
              ? (
                <>
                  <div className="h-1 bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600" />

                  <CardHeader className="space-y-1 text-center px-4 sm:px-6 pt-7 sm:pt-9 pb-5 sm:pb-6">
                    <div className="mx-auto relative mb-6">
                      <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-2xl">
                        <ShieldCheckIcon className="h-10 w-10 sm:h-12 sm:w-12 text-white" />
                        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/20 to-transparent animate-pulse" />
                      </div>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-3">
                      设置新密码
                    </h3>
                    <p className="text-sm leading-relaxed text-gray-500 dark:text-gray-400">
                      请设置您的新密码，确保密码足够安全
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

                      {/* 新密码 */}
                      <div className="space-y-2">
                        <label className="text-xs font-medium text-gray-500 dark:text-gray-400">
                          新密码
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

                        {/* 密码强度 */}
                        {formData.password && (
                          <div className="space-y-2">
                            <div className="flex gap-1">
                              {[1, 2, 3, 4].map((level) => (
                                <div
                                  key={level}
                                  className={cn(
                                    "h-1.5 flex-1 rounded-full transition-colors",
                                    passwordStrength >= level
                                      ? passwordStrength <= 1
                                        ? "bg-red-500"
                                        : passwordStrength <= 2
                                        ? "bg-orange-500"
                                        : passwordStrength <= 3
                                        ? "bg-yellow-500"
                                        : "bg-green-500"
                                      : "bg-gray-200 dark:bg-gray-700",
                                  )}
                                />
                              ))}
                            </div>
                            <div className="grid grid-cols-2 gap-1">
                              {passwordRules.map((rule) => (
                                <div
                                  key={rule.label}
                                  className={cn(
                                    "flex items-center gap-1 text-xs",
                                    rule.test(formData.password)
                                      ? "text-green-500"
                                      : "text-gray-400 dark:text-gray-500",
                                  )}
                                >
                                  {rule.test(formData.password)
                                    ? <CheckIcon className="h-3 w-3" />
                                    : <XIcon className="h-3 w-3" />}
                                  {rule.label}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* 确认密码 */}
                      <div className="space-y-2">
                        <label className="text-xs font-medium text-gray-500 dark:text-gray-400">
                          确认新密码
                        </label>
                        <div className="relative group">
                          <LockIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-primary-500 transition-colors" />
                          <Input
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="••••••••"
                            className="pl-10 pr-10 h-12 text-sm border-gray-200/50 dark:border-gray-700/50 focus:border-primary-500/50 rounded-xl transition-all"
                            value={formData.confirmPassword}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                confirmPassword:
                                  (e.target as HTMLInputElement).value,
                              })}
                          />
                          <button
                            type="button"
                            onClick={() =>
                              setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                          >
                            {showConfirmPassword
                              ? <EyeOffIcon className="h-4 w-4" />
                              : <EyeIcon className="h-4 w-4" />}
                          </button>
                        </div>

                        {/* 密码匹配提示 */}
                        {formData.confirmPassword && (
                          <div
                            className={cn(
                              "flex items-center gap-1 text-xs",
                              formData.password === formData.confirmPassword
                                ? "text-green-500"
                                : "text-red-500",
                            )}
                          >
                            {formData.password === formData.confirmPassword
                              ? (
                                <>
                                  <CheckIcon className="h-3 w-3" />
                                  密码匹配
                                </>
                              )
                              : (
                                <>
                                  <XIcon className="h-3 w-3" />
                                  密码不匹配
                                </>
                              )}
                          </div>
                        )}
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
                              重置中...
                            </>
                          )
                          : (
                            <>
                              重置密码
                              <span className="ml-2">→</span>
                            </>
                          )}
                      </Button>
                    </form>
                  </CardContent>
                </>
              )
              : (
                <>
                  <div className="h-1 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500" />

                  <CardHeader className="space-y-1 text-center px-4 sm:px-6 pt-8 sm:pt-10 pb-6">
                    <div className="mx-auto relative mb-6">
                      <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-2xl">
                        <CheckCircleIcon className="h-10 w-10 sm:h-12 sm:w-12 text-white" />
                      </div>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-3">
                      密码重置成功
                    </h3>
                    <p className="text-sm leading-relaxed text-gray-500 dark:text-gray-400">
                      您的密码已成功重置
                    </p>
                  </CardHeader>

                  <CardContent className="space-y-4 px-4 sm:px-6 pb-7">
                    <div className="p-4 rounded-xl bg-green-50/50 dark:bg-green-950/20 border border-green-200/50 dark:border-green-800/50">
                      <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                        ✅ 您的密码已成功更新
                        <br />
                        🔐 现在可以使用新密码登录您的账户
                      </p>
                    </div>

                    <Button
                      className="w-full h-12 text-sm font-medium bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                      onClick={() => globalThis.location.href = "/login"}
                    >
                      前往登录
                      <span className="ml-2">→</span>
                    </Button>
                  </CardContent>
                </>
              )}

            <CardFooter className="px-4 sm:px-6 pb-6 pt-2">
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

            .hover\\:scale-102:hover {
              transform: scale(1.02);
            }
          `}
          </style>
        </div>
      }
    />
  );
}
