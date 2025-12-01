/**
 * BackToTop 返回顶部组件
 * 滚动一定距离后显示，点击返回顶部
 */
import { useEffect, useState } from "preact/hooks";
import { cn } from "../../lib/utils.ts";

interface BackToTopProps {
  /** 显示阈值（滚动距离，默认 300px） */
  threshold?: number;
  /** 滚动动画持续时间（毫秒，默认 500） */
  duration?: number;
  /** 自定义类名 */
  className?: string;
  /** 是否显示百分比 */
  showProgress?: boolean;
  /** 按钮位置 */
  position?: "bottom-right" | "bottom-left" | "bottom-center";
}

export function BackToTop({
  threshold = 300,
  duration = 500,
  className,
  showProgress = true,
  position = "bottom-right",
}: BackToTopProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollPercent, setScrollPercent] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = globalThis.scrollY ||
        document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight -
        globalThis.innerHeight;
      const percent = scrollHeight > 0
        ? Math.min(Math.round((scrollTop / scrollHeight) * 100), 100)
        : 0;

      setScrollPercent(percent);
      setIsVisible(scrollTop > threshold);
    };

    handleScroll();
    globalThis.addEventListener("scroll", handleScroll, { passive: true });
    return () => globalThis.removeEventListener("scroll", handleScroll);
  }, [threshold]);

  const scrollToTop = () => {
    const startPosition = globalThis.scrollY;
    const startTime = performance.now();

    const easeOutCubic = (t: number): number => {
      return 1 - Math.pow(1 - t, 3);
    };

    const animateScroll = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progressRatio = Math.min(elapsed / duration, 1);
      const easeProgress = easeOutCubic(progressRatio);
      const newScrollTop = startPosition * (1 - easeProgress);

      globalThis.scrollTo(0, newScrollTop);

      if (progressRatio < 1) {
        requestAnimationFrame(animateScroll);
      }
    };

    requestAnimationFrame(animateScroll);
  };

  const positionStyles = {
    "bottom-right": "right-4 sm:right-6",
    "bottom-left": "left-4 sm:left-6",
    "bottom-center": "left-1/2 -translate-x-1/2",
  };

  if (!isVisible) return null;

  return (
    <button
      type="button"
      onClick={scrollToTop}
      className={cn(
        "fixed bottom-20 z-50",
        "group flex items-center justify-center",
        "rounded-full border border-gray-200 dark:border-gray-700 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm",
        "shadow-lg hover:shadow-xl",
        "hover:border-blue-500/60 hover:bg-blue-50 dark:hover:bg-blue-900/20",
        "transition-all duration-200",
        "focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-2",
        positionStyles[position],
        showProgress
          ? "h-12 w-12 sm:h-14 sm:w-14"
          : "h-10 w-10 sm:h-12 sm:w-12",
        "animate-in fade-in-0 zoom-in-95",
        className,
      )}
      aria-label={`返回顶部 (${scrollPercent}%)`}
    >
      {/* 进度环 */}
      {showProgress && (
        <svg
          className="absolute inset-0 h-full w-full -rotate-90"
          viewBox="0 0 100 100"
        >
          {/* 背景圆环 */}
          <circle
            cx="50"
            cy="50"
            r="46"
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
            className="text-gray-200 dark:text-gray-700"
          />
          {/* 进度圆环 */}
          <circle
            cx="50"
            cy="50"
            r="46"
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
            className="text-blue-500"
            style={{
              strokeDasharray: "289.027",
              strokeDashoffset: 289.027 * (1 - scrollPercent / 100),
              transition: "stroke-dashoffset 0.3s ease-out",
            }}
          />
        </svg>
      )}

      {/* 内容区域 */}
      <div className="relative flex flex-col items-center justify-center">
        {showProgress
          ? (
            <>
              <span className="text-[10px] sm:text-xs font-semibold text-gray-900 dark:text-white tabular-nums">
                {scrollPercent}%
              </span>
              <svg
                className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-gray-400 group-hover:text-blue-500 transition-colors"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 10l7-7m0 0l7 7m-7-7v18"
                />
              </svg>
            </>
          )
          : (
            <svg
              className="h-5 w-5 text-gray-400 group-hover:text-blue-500 transition-colors"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 10l7-7m0 0l7 7m-7-7v18"
              />
            </svg>
          )}
      </div>
    </button>
  );
}

export function BackToTopSimple(props: Omit<BackToTopProps, "showProgress">) {
  return <BackToTop {...props} showProgress={false} />;
}

export default BackToTop;
