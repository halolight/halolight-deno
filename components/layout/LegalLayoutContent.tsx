/**
 * LegalLayoutContent 法律页面布局组件
 * 用于隐私政策、服务条款等法律文档页面
 */
import type { ComponentChildren } from "preact";
import { cn } from "../../lib/utils.ts";

interface TableOfContentsItem {
  id: string;
  title: string;
  level?: number;
}

interface LegalLayoutContentProps {
  children: ComponentChildren;
  title: string;
  subtitle?: string;
  lastUpdated?: string;
  version?: string;
  tableOfContents?: TableOfContentsItem[];
  className?: string;
}

export function LegalLayoutContent({
  children,
  title,
  subtitle,
  lastUpdated,
  version,
  tableOfContents,
  className,
}: LegalLayoutContentProps) {
  return (
    <div className={cn("min-h-screen bg-gray-50 dark:bg-gray-900", className)}>
      {/* 头部 */}
      <header className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
        <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
              {title}
            </h1>
            {subtitle && (
              <p className="mt-3 text-lg text-gray-500 dark:text-gray-400">
                {subtitle}
              </p>
            )}
            <div className="mt-4 flex items-center justify-center gap-4 text-sm text-gray-500 dark:text-gray-400">
              {lastUpdated && (
                <span className="flex items-center gap-1">
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
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  最后更新: {lastUpdated}
                </span>
              )}
              {version && (
                <span className="flex items-center gap-1">
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
                      d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                    />
                  </svg>
                  版本 {version}
                </span>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* 主内容 */}
      <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-4 lg:gap-8">
          {/* 目录侧边栏 */}
          {tableOfContents && tableOfContents.length > 0 && (
            <aside className="hidden lg:block">
              <nav className="sticky top-8">
                <h2 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">
                  目录
                </h2>
                <ul className="space-y-2">
                  {tableOfContents.map((item) => (
                    <li key={item.id}>
                      <a
                        href={`#${item.id}`}
                        className={cn(
                          "block text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors",
                          item.level === 2 && "pl-4",
                        )}
                      >
                        {item.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </aside>
          )}

          {/* 内容区 */}
          <div
            className={cn(
              "prose prose-gray dark:prose-invert max-w-none",
              tableOfContents ? "lg:col-span-3" : "lg:col-span-4",
            )}
          >
            <div className="rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-8 shadow-sm">
              {children}
            </div>
          </div>
        </div>

        {/* 底部导航 */}
        <div className="mt-12 flex flex-col items-center justify-center gap-4 border-t border-gray-200 dark:border-gray-800 pt-8">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            如有任何疑问，请联系我们的支持团队
          </p>
          <div className="flex gap-4">
            <a
              href="/contact"
              className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
            >
              联系我们
            </a>
            <a
              href="/help"
              className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
            >
              帮助中心
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}

interface LegalSectionProps {
  id: string;
  title: string;
  children: ComponentChildren;
}

export function LegalSection({ id, title, children }: LegalSectionProps) {
  return (
    <section id={id} className="scroll-mt-8">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
        {title}
      </h2>
      <div className="text-gray-600 dark:text-gray-400 space-y-4">
        {children}
      </div>
    </section>
  );
}

interface LegalListProps {
  items: string[];
  ordered?: boolean;
}

export function LegalList({ items, ordered = false }: LegalListProps) {
  const ListTag = ordered ? "ol" : "ul";
  return (
    <ListTag
      className={cn(
        "space-y-2",
        ordered ? "list-decimal" : "list-disc",
        "pl-6",
      )}
    >
      {items.map((item, index) => (
        <li key={index} className="text-gray-600 dark:text-gray-400">
          {item}
        </li>
      ))}
    </ListTag>
  );
}

export default LegalLayoutContent;
