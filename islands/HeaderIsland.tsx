/**
 * HeaderIsland - 增强版头部组件 (Island)
 * 包含搜索、通知、错误收集、快速设置、用户菜单
 */
import { IS_BROWSER } from "$fresh/runtime.ts";
import { useEffect, useRef, useState } from "preact/hooks";

interface HeaderIslandProps {
  onMenuClick?: () => void;
  onSearchClick?: () => void;
  showSearch?: boolean;
  showNotifications?: boolean;
  showErrors?: boolean;
  showQuickSettings?: boolean;
  showUserMenu?: boolean;
}

// 模拟通知数据
const mockNotifications = [
  {
    id: "1",
    title: "新用户注册",
    content: "用户 张三 刚刚完成注册",
    time: "刚刚",
  },
  {
    id: "2",
    title: "系统更新",
    content: "系统将于今晚 23:00 进行维护",
    time: "1小时前",
  },
  {
    id: "3",
    title: "任务完成",
    content: "数据备份任务已完成",
    time: "2小时前",
  },
];

// 错误类型定义
interface ErrorItem {
  id: string;
  message: string;
  detail?: string;
  timestamp: number;
  source: string;
}

// 用户类型定义
interface User {
  name?: string;
  username?: string;
  email?: string;
}

export default function HeaderIsland({
  onMenuClick: _onMenuClick,
  onSearchClick,
  showSearch = true,
  showNotifications = true,
  showErrors = true,
  showQuickSettings = true,
  showUserMenu = true,
}: HeaderIslandProps) {
  // 客户端状态 - 避免 SSR 时调用 Zustand
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errors, setErrors] = useState<ErrorItem[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

  // 客户端初始化 store 数据
  useEffect(() => {
    if (!IS_BROWSER) return;

    // 动态导入 store 避免 SSR 问题
    const initStores = async () => {
      const { useAuthStore } = await import("../stores/useAuthStore.ts");
      const { useErrorStore } = await import("../stores/useErrorStore.ts");

      // 订阅 auth store
      const authUnsubscribe = useAuthStore.subscribe((state) => {
        setUser(state.user);
        setIsAuthenticated(state.isAuthenticated);
      });

      // 订阅 error store
      const errorUnsubscribe = useErrorStore.subscribe((state) => {
        setErrors(state.errors);
        setUnreadCount(state.unreadCount);
      });

      // 初始化当前状态
      const authState = useAuthStore.getState();
      setUser(authState.user);
      setIsAuthenticated(authState.isAuthenticated);

      const errorState = useErrorStore.getState();
      setErrors(errorState.errors);
      setUnreadCount(errorState.unreadCount);

      return () => {
        authUnsubscribe();
        errorUnsubscribe();
      };
    };

    initStores();
  }, []);

  // Store 操作函数
  const handleLogout = async () => {
    if (!IS_BROWSER) return;
    const { useAuthStore } = await import("../stores/useAuthStore.ts");
    await useAuthStore.getState().logout();
    globalThis.location.href = "/login";
  };

  const handleMarkAllRead = async () => {
    if (!IS_BROWSER) return;
    const { useErrorStore } = await import("../stores/useErrorStore.ts");
    useErrorStore.getState().markAllRead();
  };

  const handleClearErrors = async () => {
    if (!IS_BROWSER) return;
    const { useErrorStore } = await import("../stores/useErrorStore.ts");
    useErrorStore.getState().markAllRead();
    useErrorStore.getState().clear();
  };

  const [notificationOpen, setNotificationOpen] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const notificationRef = useRef<HTMLDivElement>(null);
  const errorRef = useRef<HTMLDivElement>(null);
  const settingsRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  // 点击外部关闭
  useEffect(() => {
    if (!IS_BROWSER) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(e.target as Node)
      ) {
        setNotificationOpen(false);
      }
      if (errorRef.current && !errorRef.current.contains(e.target as Node)) {
        setErrorOpen(false);
      }
      if (
        settingsRef.current && !settingsRef.current.contains(e.target as Node)
      ) {
        setSettingsOpen(false);
      }
      if (
        userMenuRef.current && !userMenuRef.current.contains(e.target as Node)
      ) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 键盘快捷键
  useEffect(() => {
    if (!IS_BROWSER) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        onSearchClick?.();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onSearchClick]);

  return (
    <div className="flex items-center gap-2">
      {/* 搜索按钮 (桌面端) */}
      {showSearch && (
        <button
          type="button"
          onClick={onSearchClick}
          className="hidden sm:flex items-center gap-2 w-64 px-3 py-2 text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-gray-300 dark:hover:border-gray-600 transition-colors"
        >
          <SearchIcon className="h-4 w-4" />
          <span>搜索...</span>
          <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-white dark:bg-gray-700 px-1.5 font-mono text-[10px] font-medium text-gray-500 dark:text-gray-400">
            <span className="text-xs">⌘</span>K
          </kbd>
        </button>
      )}

      {/* 搜索按钮 (移动端) */}
      {showSearch && (
        <button
          type="button"
          onClick={onSearchClick}
          className="sm:hidden p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
        >
          <SearchIcon className="h-5 w-5" />
        </button>
      )}

      {/* 通知 */}
      {showNotifications && (
        <div ref={notificationRef} className="relative">
          <button
            type="button"
            onClick={() => setNotificationOpen(!notificationOpen)}
            className="relative p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
          >
            <BellIcon className="h-5 w-5" />
            <span className="absolute -right-1 -top-1 h-5 w-5 flex items-center justify-center rounded-full bg-red-500 text-white text-xs font-medium">
              3
            </span>
          </button>

          {notificationOpen && (
            <div className="absolute right-0 top-full mt-2 w-80 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50 animate-in fade-in-0 zoom-in-95">
              <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                <span className="font-medium text-gray-900 dark:text-white">
                  通知
                </span>
                <a
                  href="/notifications"
                  className="text-xs text-blue-500 hover:text-blue-600"
                >
                  查看全部
                </a>
              </div>
              <div className="max-h-80 overflow-y-auto">
                {mockNotifications.map((notification) => (
                  <a
                    key={notification.id}
                    href="/notifications"
                    className="flex flex-col gap-1 px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                  >
                    <p className="font-medium text-sm text-gray-900 dark:text-white">
                      {notification.title}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {notification.content}
                    </p>
                    <p className="text-xs text-gray-400 dark:text-gray-500">
                      {notification.time}
                    </p>
                  </a>
                ))}
              </div>
              <div className="border-t border-gray-200 dark:border-gray-700">
                <a
                  href="/notifications"
                  className="block px-4 py-3 text-sm text-center text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                >
                  查看所有通知
                </a>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 错误收集 */}
      {showErrors && (
        <div ref={errorRef} className="relative">
          <button
            type="button"
            onClick={() => setErrorOpen(!errorOpen)}
            className="relative p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
          >
            <AlertIcon className="h-5 w-5" />
            {unreadCount > 0 && (
              <span className="absolute -right-1 -top-1 h-5 min-w-5 px-1 flex items-center justify-center rounded-full bg-orange-500 text-white text-[10px] font-medium">
                {unreadCount > 99 ? "99+" : unreadCount}
              </span>
            )}
          </button>

          {errorOpen && (
            <div className="absolute right-0 top-full mt-2 w-80 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50 animate-in fade-in-0 zoom-in-95">
              <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                <span className="font-medium text-gray-900 dark:text-white">
                  错误收集
                </span>
                <button
                  type="button"
                  onClick={handleClearErrors}
                  className="text-xs text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  清空
                </button>
              </div>
              <div className="max-h-72 overflow-y-auto">
                {errors.length === 0
                  ? (
                    <div className="py-6 text-sm text-center text-gray-500 dark:text-gray-400">
                      暂无错误
                    </div>
                  )
                  : (
                    errors.map((err) => (
                      <div
                        key={err.id}
                        className="px-4 py-3 border-b border-gray-100 dark:border-gray-700/50 last:border-b-0"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1 min-w-0">
                            <p className="text-xs text-gray-400 dark:text-gray-500">
                              {new Date(err.timestamp).toLocaleTimeString()}
                            </p>
                            <p className="text-sm font-medium text-gray-900 dark:text-white mt-0.5 line-clamp-2">
                              {err.message}
                            </p>
                            {err.detail && (
                              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 line-clamp-2">
                                {err.detail}
                              </p>
                            )}
                          </div>
                          <span className="flex-shrink-0 px-2 py-0.5 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded">
                            {err.source}
                          </span>
                        </div>
                      </div>
                    ))
                  )}
              </div>
              <div className="border-t border-gray-200 dark:border-gray-700">
                <button
                  type="button"
                  onClick={handleMarkAllRead}
                  className="w-full px-4 py-3 text-sm text-blue-500 hover:text-blue-600 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                >
                  标记已读
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 快速设置 */}
      {showQuickSettings && (
        <div ref={settingsRef} className="relative">
          <button
            type="button"
            onClick={() => setSettingsOpen(!settingsOpen)}
            className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
          >
            <SettingsIcon className="h-5 w-5" />
          </button>

          {settingsOpen && (
            <div className="absolute right-0 top-full mt-2 w-72 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50 animate-in fade-in-0 zoom-in-95">
              <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                <span className="font-medium text-gray-900 dark:text-white">
                  快速设置
                </span>
              </div>
              <div className="p-4 space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                    主题模式
                  </label>
                  <div className="flex gap-2">
                    {["light", "dark", "system"].map((theme) => (
                      <button
                        key={theme}
                        type="button"
                        className="flex-1 px-3 py-2 text-xs rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-colors"
                      >
                        {theme === "light"
                          ? "浅色"
                          : theme === "dark"
                          ? "深色"
                          : "系统"}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 用户菜单 */}
      {showUserMenu && isAuthenticated && (
        <div ref={userMenuRef} className="relative">
          <button
            type="button"
            onClick={() =>
              setUserMenuOpen(!userMenuOpen)}
            className="flex items-center justify-center h-9 w-9 rounded-full bg-blue-500 text-white font-medium text-sm hover:bg-blue-600 transition-colors"
          >
            {user?.name?.charAt(0) || user?.username?.charAt(0) || "A"}
          </button>

          {userMenuOpen && (
            <div className="absolute right-0 top-full mt-2 w-56 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50 animate-in fade-in-0 zoom-in-95">
              <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                <p className="font-medium text-sm text-gray-900 dark:text-white">
                  {user?.name || user?.username || "管理员"}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {user?.email || "admin@halolight.h7ml.cn"}
                </p>
              </div>
              <div className="py-1">
                <a
                  href="/profile"
                  className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <UserIcon className="h-4 w-4" />
                  个人资料
                </a>
                <a
                  href="/settings"
                  className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <SettingsIcon className="h-4 w-4" />
                  账户设置
                </a>
                <a
                  href="https://halolight.docs.h7ml.cn/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <HelpIcon className="h-4 w-4" />
                  帮助文档
                </a>
              </div>
              <div className="border-t border-gray-200 dark:border-gray-700 py-1">
                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <LogoutIcon className="h-4 w-4" />
                  退出登录
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 未登录时显示登录按钮 */}
      {showUserMenu && !isAuthenticated && (
        <a
          href="/login"
          className="px-4 py-2 text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 rounded-lg transition-colors"
        >
          登录
        </a>
      )}
    </div>
  );
}

// 图标组件
function SearchIcon({ className }: { className?: string }) {
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
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
      />
    </svg>
  );
}

function BellIcon({ className }: { className?: string }) {
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
        d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
      />
    </svg>
  );
}

function AlertIcon({ className }: { className?: string }) {
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
        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
      />
    </svg>
  );
}

function SettingsIcon({ className }: { className?: string }) {
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
        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
      />
    </svg>
  );
}

function UserIcon({ className }: { className?: string }) {
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
        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
      />
    </svg>
  );
}

function HelpIcon({ className }: { className?: string }) {
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
        d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
}

function LogoutIcon({ className }: { className?: string }) {
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
        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
      />
    </svg>
  );
}
