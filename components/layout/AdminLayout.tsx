/**
 * AdminLayout 管理后台布局组件
 * 包含侧边栏、顶部导航、面包屑等
 */
import type { ComponentChildren } from "preact";
import { cn } from "../../lib/utils.ts";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface AdminLayoutProps {
  children: ComponentChildren;
  title?: string;
  description?: string;
  breadcrumbs?: BreadcrumbItem[];
  actions?: ComponentChildren;
  className?: string;
  sidebarOpen?: boolean;
  onSidebarToggle?: () => void;
}

export function AdminLayout({
  children,
  title,
  description,
  breadcrumbs,
  actions,
  className,
  sidebarOpen: _sidebarOpen = true,
  onSidebarToggle,
}: AdminLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* 顶部导航栏 */}
      <header className="sticky top-0 z-40 flex h-16 items-center gap-4 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-4 lg:px-6">
        {/* 侧边栏切换按钮 */}
        <button
          type="button"
          onClick={onSidebarToggle}
          className="lg:hidden p-2 rounded-md text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        {/* 面包屑导航 */}
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav className="hidden md:flex items-center space-x-2 text-sm">
            <a
              href="/dashboard"
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
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
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
            </a>
            {breadcrumbs.map((item, index) => (
              <span key={index} className="flex items-center">
                <svg
                  className="h-4 w-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
                {item.href
                  ? (
                    <a
                      href={item.href}
                      className="ml-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                    >
                      {item.label}
                    </a>
                  )
                  : (
                    <span className="ml-2 text-gray-900 dark:text-white font-medium">
                      {item.label}
                    </span>
                  )}
              </span>
            ))}
          </nav>
        )}

        {/* 右侧操作区 */}
        <div className="ml-auto flex items-center gap-4">
          {actions}
        </div>
      </header>

      {/* 主内容区 */}
      <main className={cn("flex-1 p-4 lg:p-6", className)}>
        {/* 页面标题区 */}
        {(title || description) && (
          <div className="mb-6">
            {title && (
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                {title}
              </h1>
            )}
            {description && (
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                {description}
              </p>
            )}
          </div>
        )}

        {/* 页面内容 */}
        {children}
      </main>
    </div>
  );
}

interface AdminPageHeaderProps {
  title: string;
  description?: string;
  actions?: ComponentChildren;
  className?: string;
}

export function AdminPageHeader({
  title,
  description,
  actions,
  className,
}: AdminPageHeaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4 md:flex-row md:items-center md:justify-between",
        className,
      )}
    >
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          {title}
        </h1>
        {description && (
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {description}
          </p>
        )}
      </div>
      {actions && (
        <div className="flex items-center gap-2">
          {actions}
        </div>
      )}
    </div>
  );
}

interface AdminCardProps {
  children: ComponentChildren;
  className?: string;
  title?: string;
  description?: string;
  actions?: ComponentChildren;
}

export function AdminCard({
  children,
  className,
  title,
  description,
  actions,
}: AdminCardProps) {
  return (
    <div
      className={cn(
        "rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900",
        className,
      )}
    >
      {(title || description || actions) && (
        <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 px-6 py-4">
          <div>
            {title && (
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {title}
              </h3>
            )}
            {description && (
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                {description}
              </p>
            )}
          </div>
          {actions && (
            <div className="flex items-center gap-2">
              {actions}
            </div>
          )}
        </div>
      )}
      <div className="p-6">{children}</div>
    </div>
  );
}

export default AdminLayout;
