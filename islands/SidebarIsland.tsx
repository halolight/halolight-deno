/**
 * SidebarIsland - 增强版侧边栏组件 (Island)
 * 支持折叠/展开、权限检查、嵌套菜单
 */
import type { JSX } from "preact";
import { useEffect, useState } from "preact/hooks";
import { cn } from "../lib/utils.ts";

// 菜单项类型
interface MenuItem {
  href: string;
  title: string;
  icon?: string;
  children?: MenuItem[];
  permission?: string;
}

// 默认菜单配置
const MENU_ITEMS: MenuItem[] = [
  { href: "/dashboard", title: "仪表盘", icon: "dashboard" },
  { href: "/analytics", title: "数据分析", icon: "chart" },
  {
    href: "/users",
    title: "用户管理",
    icon: "users",
    permission: "users:read",
  },
  { href: "/documents", title: "文档管理", icon: "document" },
  { href: "/files", title: "文件管理", icon: "folder" },
  { href: "/messages", title: "消息中心", icon: "message" },
  { href: "/calendar", title: "日历", icon: "calendar" },
  { href: "/notifications", title: "通知中心", icon: "bell" },
  {
    href: "/settings",
    title: "设置",
    icon: "settings",
    children: [
      { href: "/settings", title: "基本设置" },
      { href: "/settings/teams", title: "团队管理" },
      {
        href: "/settings/teams/roles",
        title: "角色权限",
        permission: "settings:write",
      },
    ],
  },
];

interface SidebarIslandProps {
  collapsed?: boolean;
  onCollapsedChange?: (collapsed: boolean) => void;
  expandedWidth?: number;
  collapsedWidth?: number;
  mobileOpen?: boolean;
  onMobileClose?: () => void;
}

export default function SidebarIsland({
  collapsed = false,
  onCollapsedChange,
  expandedWidth = 220,
  collapsedWidth = 72,
  mobileOpen = false,
  onMobileClose,
}: SidebarIslandProps) {
  const [pathname, setPathname] = useState("");
  const [openKeys, setOpenKeys] = useState<Set<string>>(new Set());
  const [hoverItem, setHoverItem] = useState<MenuItem | null>(null);
  const [hoverPosition, setHoverPosition] = useState({ top: 0, left: 0 });

  // 获取当前路径
  useEffect(() => {
    if (typeof globalThis !== "undefined" && globalThis.location) {
      setPathname(globalThis.location.pathname);
    }
  }, []);

  // 自动展开当前路径的父菜单
  useEffect(() => {
    const nextOpen = new Set<string>();
    const traverse = (items: MenuItem[]) => {
      items.forEach((item) => {
        const isMatch = pathname === item.href ||
          pathname.startsWith(`${item.href}/`);
        if (item.children?.length) {
          const hasActiveChild = item.children.some(
            (child) =>
              pathname === child.href || pathname.startsWith(`${child.href}/`),
          );
          if (isMatch || hasActiveChild) {
            nextOpen.add(item.href);
          }
          traverse(item.children);
        }
      });
    };
    traverse(MENU_ITEMS);
    setOpenKeys(nextOpen);
  }, [pathname]);

  const toggleOpen = (key: string) => {
    setOpenKeys((prev) => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  };

  const handleNavigate = (href: string) => {
    if (typeof globalThis !== "undefined" && globalThis.location) {
      globalThis.location.href = href;
    }
    onMobileClose?.();
  };

  const handleHover = (item: MenuItem, e: MouseEvent) => {
    if (!collapsed) return;
    const target = e.currentTarget as HTMLElement;
    const rect = target.getBoundingClientRect();
    setHoverItem(item);
    setHoverPosition({ top: rect.top, left: rect.right + 8 });
  };

  const handleHoverEnd = () => {
    setHoverItem(null);
  };

  const width = collapsed ? collapsedWidth : expandedWidth;

  return (
    <>
      {/* 移动端遮罩 */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden animate-in fade-in-0"
          onClick={onMobileClose}
        />
      )}

      {/* 侧边栏 */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-40 h-screen bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col transition-all duration-200 ease-in-out",
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
        )}
        style={{ width: `${width}px` }}
      >
        {/* Logo */}
        <div className="flex h-16 items-center justify-between border-b border-gray-200 dark:border-gray-700 px-4">
          {!collapsed
            ? (
              <a href="/" className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500">
                  <span className="text-sm font-bold text-white">H</span>
                </div>
                <span className="font-semibold text-gray-900 dark:text-white">
                  HaloLight
                </span>
              </a>
            )
            : (
              <a
                href="/"
                className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500 mx-auto"
              >
                <span className="text-sm font-bold text-white">H</span>
              </a>
            )}

          {/* 移动端关闭按钮 */}
          <button
            type="button"
            onClick={onMobileClose}
            className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 lg:hidden"
          >
            <CloseIcon className="w-5 h-5" />
          </button>
        </div>

        {/* 导航菜单 */}
        <nav className="flex-1 overflow-y-auto py-4 px-2">
          <div className="space-y-1">
            {MENU_ITEMS.map((item) => (
              <MenuItemComponent
                key={item.href}
                item={item}
                pathname={pathname}
                collapsed={collapsed}
                openKeys={openKeys}
                toggleOpen={toggleOpen}
                onNavigate={handleNavigate}
                onHover={handleHover}
                onHoverEnd={handleHoverEnd}
              />
            ))}
          </div>
        </nav>

        {/* 折叠按钮 */}
        <div className="border-t border-gray-200 dark:border-gray-700 p-2 hidden lg:block">
          <button
            type="button"
            onClick={() => onCollapsedChange?.(!collapsed)}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <ChevronIcon
              className={cn(
                "w-4 h-4 transition-transform",
                collapsed && "rotate-180",
              )}
            />
            {!collapsed && <span>收起菜单</span>}
          </button>
        </div>
      </aside>

      {/* 折叠状态下的悬浮菜单 */}
      {collapsed && hoverItem && hoverItem.children && (
        <div
          className="fixed z-50 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg animate-in fade-in-0 zoom-in-95"
          style={{
            top: `${hoverPosition.top}px`,
            left: `${hoverPosition.left}px`,
          }}
          onMouseEnter={() => setHoverItem(hoverItem)}
          onMouseLeave={handleHoverEnd}
        >
          <div className="py-2">
            {hoverItem.children.map((child) => (
              <a
                key={child.href}
                href={child.href}
                className={cn(
                  "flex items-center px-4 py-2 text-sm transition-colors",
                  pathname === child.href
                    ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700",
                )}
              >
                {child.title}
              </a>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

// 菜单项组件
interface MenuItemComponentProps {
  item: MenuItem;
  pathname: string;
  collapsed: boolean;
  openKeys: Set<string>;
  toggleOpen: (key: string) => void;
  onNavigate: (href: string) => void;
  onHover: (item: MenuItem, e: MouseEvent) => void;
  onHoverEnd: () => void;
  depth?: number;
}

function MenuItemComponent({
  item,
  pathname,
  collapsed,
  openKeys,
  toggleOpen,
  onNavigate,
  onHover,
  onHoverEnd,
  depth = 0,
}: MenuItemComponentProps) {
  const isActive = pathname === item.href ||
    pathname.startsWith(`${item.href}/`);
  const hasChildren = !!item.children?.length;
  const isOpen = openKeys.has(item.href);

  return (
    <div className="relative">
      <a
        href={item.href}
        onClick={(e) => {
          if (hasChildren && !collapsed) {
            e.preventDefault();
            toggleOpen(item.href);
          } else {
            e.preventDefault();
            onNavigate(item.href);
          }
        }}
        onMouseEnter={(e) => onHover(item, e as unknown as MouseEvent)}
        onMouseLeave={onHoverEnd}
        className={cn(
          "group relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
          "hover:bg-gray-100 dark:hover:bg-gray-700",
          isActive
            ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
            : "text-gray-700 dark:text-gray-300",
        )}
      >
        <MenuIcon name={item.icon} className="h-5 w-5 shrink-0" />

        {!collapsed && (
          <>
            <span className="truncate flex-1">{item.title}</span>
            {hasChildren && (
              <ChevronDownIcon
                className={cn(
                  "w-4 h-4 transition-transform",
                  isOpen && "rotate-180",
                )}
              />
            )}
          </>
        )}

        {/* 激活指示器 */}
        {isActive && (
          <div className="absolute left-0 top-1/2 -translate-y-1/2 h-8 w-1 rounded-r-full bg-blue-500" />
        )}
      </a>

      {/* 子菜单 */}
      {hasChildren && isOpen && !collapsed && (
        <div className="mt-1 ml-4 border-l border-gray-200 dark:border-gray-700 pl-3 space-y-1">
          {item.children!.map((child) => (
            <MenuItemComponent
              key={child.href}
              item={child}
              pathname={pathname}
              collapsed={collapsed}
              openKeys={openKeys}
              toggleOpen={toggleOpen}
              onNavigate={onNavigate}
              onHover={onHover}
              onHoverEnd={onHoverEnd}
              depth={depth + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// 图标组件
function MenuIcon({ name, className }: { name?: string; className?: string }) {
  const icons: Record<string, JSX.Element> = {
    dashboard: (
      <svg
        className={className}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
        />
      </svg>
    ),
    chart: (
      <svg
        className={className}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
        />
      </svg>
    ),
    users: (
      <svg
        className={className}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
        />
      </svg>
    ),
    document: (
      <svg
        className={className}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        />
      </svg>
    ),
    folder: (
      <svg
        className={className}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
        />
      </svg>
    ),
    message: (
      <svg
        className={className}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
        />
      </svg>
    ),
    calendar: (
      <svg
        className={className}
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
    ),
    bell: (
      <svg
        className={className}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
        />
      </svg>
    ),
    settings: (
      <svg
        className={className}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
    ),
  };

  return icons[name || "document"] || icons.document;
}

function CloseIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
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
  );
}

function ChevronIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M15 19l-7-7 7-7"
      />
    </svg>
  );
}

function ChevronDownIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M19 9l-7 7-7-7"
      />
    </svg>
  );
}
