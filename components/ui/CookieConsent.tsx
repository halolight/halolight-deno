/**
 * CookieConsent Cookie 同意横幅组件
 * 首次访问时显示，用户选择后记住偏好
 */
import { useEffect, useState } from "preact/hooks";
import { cn } from "../../lib/utils.ts";
import Button from "./Button.tsx";

const COOKIE_CONSENT_KEY = "cookie-consent";

export type CookieConsentValue = "accepted" | "rejected" | null;

interface CookieConsentProps {
  className?: string;
  onAccept?: () => void;
  onReject?: () => void;
}

export function CookieConsent({
  className,
  onAccept,
  onReject,
}: CookieConsentProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (typeof localStorage === "undefined") return;
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = (value: CookieConsentValue) => {
    setIsClosing(true);
    setTimeout(() => {
      if (value && typeof localStorage !== "undefined") {
        localStorage.setItem(COOKIE_CONSENT_KEY, value);
      }
      setIsVisible(false);
      setIsClosing(false);
    }, 200);
  };

  const handleAccept = () => {
    handleClose("accepted");
    onAccept?.();
  };

  const handleReject = () => {
    handleClose("rejected");
    onReject?.();
  };

  const handleDismiss = () => {
    handleClose(null);
  };

  if (!isVisible) return null;

  return (
    <div
      className={cn(
        "fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6",
        "animate-in slide-in-from-bottom-4",
        isClosing && "animate-out slide-out-to-bottom-4 opacity-0",
        className,
      )}
    >
      <div className="mx-auto max-w-4xl">
        <div className="relative rounded-xl border border-gray-200 dark:border-gray-700 bg-white/95 dark:bg-gray-800/95 p-4 shadow-lg backdrop-blur md:p-6">
          {/* 关闭按钮 */}
          <button
            type="button"
            onClick={handleDismiss}
            className="absolute right-2 top-2 h-8 w-8 rounded-md text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center justify-center"
          >
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
            <span className="sr-only">关闭</span>
          </button>

          <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-6">
            {/* 图标 */}
            <div className="hidden shrink-0 md:block">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30">
                <svg
                  className="h-6 w-6 text-blue-600 dark:text-blue-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>

            {/* 内容 */}
            <div className="flex-1 space-y-2 pr-8 md:pr-0">
              <h3 className="flex items-center gap-2 text-base font-semibold text-gray-900 dark:text-white">
                <svg
                  className="h-5 w-5 text-blue-600 dark:text-blue-400 md:hidden"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Cookie 使用说明
              </h3>
              <p className="text-sm leading-relaxed text-gray-500 dark:text-gray-400">
                我们使用 Cookie
                和类似技术来提升您的浏览体验、分析网站流量并提供个性化内容。
                点击"接受全部"即表示您同意我们的{" "}
                <a
                  href="/privacy"
                  className="font-medium text-blue-600 dark:text-blue-400 underline-offset-4 hover:underline"
                >
                  隐私政策
                </a>{" "}
                和{" "}
                <a
                  href="/terms"
                  className="font-medium text-blue-600 dark:text-blue-400 underline-offset-4 hover:underline"
                >
                  服务条款
                </a>
                。
              </p>
            </div>

            {/* 操作按钮 */}
            <div className="flex shrink-0 flex-col gap-2 sm:flex-row md:flex-col lg:flex-row">
              <Button
                variant="outline"
                size="sm"
                onClick={handleReject}
                className="order-2 sm:order-1 md:order-2 lg:order-1"
              >
                仅必要 Cookie
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={handleAccept}
                className="order-1 sm:order-2 md:order-1 lg:order-2"
              >
                接受全部
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/** 获取当前 Cookie 同意状态 */
export function getCookieConsent(): CookieConsentValue {
  if (typeof localStorage === "undefined") return null;
  const value = localStorage.getItem(COOKIE_CONSENT_KEY);
  if (value === "accepted" || value === "rejected") {
    return value;
  }
  return null;
}

/** 重置 Cookie 同意状态 */
export function resetCookieConsent(): void {
  if (typeof localStorage === "undefined") return;
  localStorage.removeItem(COOKIE_CONSENT_KEY);
}

export default CookieConsent;
