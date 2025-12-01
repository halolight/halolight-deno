/**
 * RegisterForm Island 组件
 * 注册表单的客户端交互组件
 */

import type { JSX } from "preact";
import { useEffect, useMemo, useState } from "preact/hooks";
import { useAuthStore } from "../stores/useAuthStore.ts";
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

// ============================================================================
// 背景配置
// ============================================================================

const registerBackground = {
  gridSize: 28,
  halos: [
    {
      from: "from-purple-400/30",
      to: "to-pink-400/30",
      className:
        "absolute -top-36 -left-32 w-96 h-96 rounded-full blur-3xl animate-pulse-slow",
    },
    {
      from: "from-fuchsia-400/25",
      to: "to-amber-400/25",
      className:
        "absolute top-1/3 -right-24 w-80 h-80 rounded-full blur-3xl animate-pulse-slower",
    },
    {
      from: "from-indigo-400/20",
      to: "to-cyan-400/20",
      className:
        "absolute -bottom-32 left-1/4 w-96 h-96 rounded-full blur-3xl animate-pulse-slowest",
    },
  ],
};

// ============================================================================
// 组件
// ============================================================================

export default function RegisterForm(): JSX.Element {
  const { register, isLoading, error, clearError } = useAuthStore();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [localError, setLocalError] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const passwordStrength = useMemo(
    () => getPasswordStrength(formData.password),
    [formData.password],
  );

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    setLocalError("");

    if (!formData.name || !formData.email || !formData.password) {
      setLocalError("请填写所有必填字段");
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

    if (!agreedToTerms) {
      setLocalError("请同意服务条款和隐私政策");
      return;
    }

    try {
      await register(formData);
      globalThis.location.href = "/dashboard";
    } catch {
      // 错误已在 store 中处理
    }
  };

  const handleSocialLogin = (provider: string) => {
    console.log(`使用 ${provider} 注册`);
  };

  useEffect(() => {
    clearError();
  }, [clearError]);

  return (
    <AuthShell
      leftGradientClassName="bg-gradient-to-br from-purple-600 via-fuchsia-600 to-indigo-600"
      backgroundOptions={registerBackground}
      floatingDots={{ count: 8, colorClassName: "bg-white/25" }}
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
            创建账户
            <span className="inline-block ml-2 animate-pulse">✨</span>
          </h1>
          <p className="text-lg text-white/70 max-w-md leading-relaxed mb-12">
            加入我们，开始体验强大的后台管理功能，提升您的工作效率。
          </p>

          <div className="space-y-4">
            {[
              { icon: "🎁", text: "完全免费的基础功能" },
              { icon: "📊", text: "实时数据分析和报告" },
              { icon: "👥", text: "团队协作和权限管理" },
              { icon: "💬", text: "7x24 小时技术支持" },
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
        <div className="w-full max-w-md my-1 animate-fade-in-up">
          {/* 移动端头部 */}
          <div className="mb-4 lg:hidden text-center">
            <div className="inline-flex items-center gap-3 mb-3 px-6 py-3 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 shadow-xl">
              <SparklesIcon className="h-6 w-6 text-white" />
              <span className="text-xl font-bold text-white">Admin Pro</span>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              创建账户，开始您的旅程
            </p>
          </div>

          <Card className="border border-gray-200/50 dark:border-gray-700/50 shadow-2xl backdrop-blur-xl bg-white/80 dark:bg-gray-900/80 overflow-hidden">
            <div className="h-1 bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600" />

            <CardHeader className="space-y-1 text-center pb-2 sm:pb-4 pt-3 sm:pt-6">
              <h3 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                创建账户
              </h3>
              <p className="text-xs sm:text-sm mt-2 text-gray-500 dark:text-gray-400">
                填写以下信息完成注册
              </p>
            </CardHeader>

            <CardContent className="space-y-2 sm:space-y-4 px-4 sm:px-6">
              {/* 社交登录按钮 */}
              <div className="grid grid-cols-3 gap-2 sm:gap-3">
                {[
                  { icon: GithubIcon, name: "github", label: "GitHub" },
                  { icon: GoogleIcon, name: "google", label: "Google" },
                  { icon: WechatIcon, name: "wechat", label: "微信" },
                ].map((provider) => (
                  <Button
                    key={provider.name}
                    variant="outline"
                    className="w-full h-11 sm:h-12 border-gray-200/50 dark:border-gray-700/50 hover:border-primary-500/50 hover:bg-primary-500/5 transition-all duration-300 group"
                    onClick={() => handleSocialLogin(provider.name)}
                  >
                    <provider.icon className="h-5 w-5 group-hover:scale-110 transition-transform" />
                  </Button>
                ))}
              </div>

              <div className="relative py-3">
                <Separator />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="bg-white dark:bg-gray-900 px-3 text-xs uppercase text-gray-500 dark:text-gray-400 font-medium">
                    或使用邮箱注册
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

                {/* 姓名输入 */}
                <div className="space-y-2">
                  <label className="text-xs font-medium text-gray-500 dark:text-gray-400">
                    您的姓名
                  </label>
                  <div className="relative group">
                    <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-primary-500 transition-colors z-10" />
                    <Input
                      type="text"
                      placeholder="张三"
                      className="pl-10 h-11 sm:h-12 text-sm border-gray-200/50 dark:border-gray-700/50 focus:border-primary-500/50 rounded-xl transition-all"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          name: (e.target as HTMLInputElement).value,
                        })}
                    />
                  </div>
                </div>

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
                      className="pl-10 h-11 sm:h-12 text-sm border-gray-200/50 dark:border-gray-700/50 focus:border-primary-500/50 rounded-xl transition-all"
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
                <div className="space-y-2">
                  <label className="text-xs font-medium text-gray-500 dark:text-gray-400">
                    设置密码
                  </label>
                  <div className="relative group">
                    <LockIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-primary-500 transition-colors" />
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className="pl-10 pr-10 h-11 sm:h-12 text-sm border-gray-200/50 dark:border-gray-700/50 focus:border-primary-500/50 rounded-xl transition-all"
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

                  {/* 密码强度指示器 */}
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
                    确认密码
                  </label>
                  <div className="relative group">
                    <LockIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-primary-500 transition-colors" />
                    <Input
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className="pl-10 pr-10 h-11 sm:h-12 text-sm border-gray-200/50 dark:border-gray-700/50 focus:border-primary-500/50 rounded-xl transition-all"
                      value={formData.confirmPassword}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          confirmPassword: (e.target as HTMLInputElement).value,
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
                </div>

                {/* 同意条款 */}
                <Checkbox
                  checked={agreedToTerms}
                  onChange={setAgreedToTerms}
                  label={
                    <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                      我已阅读并同意{" "}
                      <a
                        href="/terms"
                        className="text-primary-600 hover:text-primary-500 font-medium"
                      >
                        服务条款
                      </a>{" "}
                      和{" "}
                      <a
                        href="/privacy"
                        className="text-primary-600 hover:text-primary-500 font-medium"
                      >
                        隐私政策
                      </a>
                    </span>
                  }
                />

                {/* 注册按钮 */}
                <Button
                  type="submit"
                  className="w-full h-11 sm:h-12 text-sm font-medium bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                  disabled={isLoading}
                >
                  {isLoading
                    ? (
                      <>
                        <LoaderIcon className="mr-2 h-4 w-4" />
                        注册中...
                      </>
                    )
                    : (
                      <>
                        创建账户
                        <span className="ml-2">→</span>
                      </>
                    )}
                </Button>
              </form>
            </CardContent>

            <CardFooter className="flex flex-col space-y-3 sm:space-y-4 px-4 sm:px-6 pb-4 sm:pb-7 pt-2">
              <Separator />
              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 text-center">
                已有账户？{" "}
                <a
                  href="/login"
                  className="text-primary-600 hover:text-primary-500 font-semibold transition-colors"
                >
                  立即登录
                </a>
              </p>
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
