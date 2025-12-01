/**
 * CommandMenu 命令菜单组件
 * 全局快捷键 Cmd+K 触发的命令面板
 */
import type { ComponentChildren } from "preact";
import { useEffect, useRef, useState } from "preact/hooks";
import { cn } from "../../lib/utils.ts";

interface CommandItem {
  id: string;
  label: string;
  description?: string;
  icon?: ComponentChildren;
  shortcut?: string;
  href?: string;
  action?: () => void;
  group?: string;
}

interface CommandMenuProps {
  items?: CommandItem[];
  placeholder?: string;
  onSelect?: (item: CommandItem) => void;
  className?: string;
}

const defaultItems: CommandItem[] = [
  {
    id: "home",
    label: "首页",
    description: "返回首页",
    icon: (
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
    ),
    href: "/",
    group: "导航",
  },
  {
    id: "dashboard",
    label: "仪表盘",
    description: "查看数据概览",
    icon: (
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
          d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
        />
      </svg>
    ),
    href: "/dashboard",
    shortcut: "⌘D",
    group: "导航",
  },
  {
    id: "profile",
    label: "个人中心",
    description: "管理您的账户",
    icon: (
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
          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
        />
      </svg>
    ),
    href: "/profile",
    group: "导航",
  },
  {
    id: "settings",
    label: "设置",
    description: "系统设置",
    icon: (
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
    href: "/settings",
    shortcut: "⌘,",
    group: "导航",
  },
  {
    id: "theme-light",
    label: "浅色模式",
    description: "切换到浅色主题",
    icon: (
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
          d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
        />
      </svg>
    ),
    action: () => {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    },
    group: "主题",
  },
  {
    id: "theme-dark",
    label: "深色模式",
    description: "切换到深色主题",
    icon: (
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
          d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
        />
      </svg>
    ),
    action: () => {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    },
    group: "主题",
  },
];

export function CommandMenu({
  items = defaultItems,
  placeholder = "搜索命令...",
  onSelect,
  className,
}: CommandMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // 过滤项目
  const filteredItems = items.filter(
    (item) =>
      item.label.toLowerCase().includes(search.toLowerCase()) ||
      item.description?.toLowerCase().includes(search.toLowerCase()),
  );

  // 按组分组
  const groupedItems = filteredItems.reduce((acc, item) => {
    const group = item.group || "其他";
    if (!acc[group]) {
      acc[group] = [];
    }
    acc[group].push(item);
    return acc;
  }, {} as Record<string, CommandItem[]>);

  // 扁平化用于键盘导航
  const flatItems = Object.values(groupedItems).flat();

  // 监听快捷键
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // 聚焦输入框
  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
      setSearch("");
      setSelectedIndex(0);
    }
  }, [isOpen]);

  // 键盘导航
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % flatItems.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) =>
        (prev - 1 + flatItems.length) % flatItems.length
      );
    } else if (e.key === "Enter") {
      e.preventDefault();
      const item = flatItems[selectedIndex];
      if (item) {
        handleSelect(item);
      }
    }
  };

  // 选择项目
  const handleSelect = (item: CommandItem) => {
    if (item.action) {
      item.action();
    } else if (item.href) {
      globalThis.location.href = item.href;
    }
    onSelect?.(item);
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <>
      {/* 背景遮罩 */}
      <div
        className="fixed inset-0 z-50 bg-black/50 animate-in fade-in-0"
        onClick={() => setIsOpen(false)}
      />

      {/* 命令面板 */}
      <div
        className={cn(
          "fixed left-1/2 top-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2",
          "animate-in fade-in-0 zoom-in-95",
          className,
        )}
      >
        <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-2xl">
          {/* 搜索输入 */}
          <div className="flex items-center border-b border-gray-200 dark:border-gray-700 px-4">
            <svg
              className="h-5 w-5 text-gray-400"
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
            <input
              ref={inputRef}
              type="text"
              placeholder={placeholder}
              value={search}
              onInput={(e) => {
                setSearch((e.target as HTMLInputElement).value);
                setSelectedIndex(0);
              }}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent px-4 py-4 text-sm outline-none placeholder:text-gray-400"
            />
            <kbd className="hidden sm:inline-flex items-center gap-1 rounded border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-900 px-2 py-1 text-xs text-gray-500">
              ESC
            </kbd>
          </div>

          {/* 命令列表 */}
          <div ref={listRef} className="max-h-80 overflow-y-auto p-2">
            {flatItems.length === 0
              ? (
                <div className="py-6 text-center text-sm text-gray-500">
                  未找到匹配的命令
                </div>
              )
              : (
                Object.entries(groupedItems).map(([group, groupItems]) => (
                  <div key={group} className="mb-2">
                    <div className="px-2 py-1.5 text-xs font-semibold text-gray-500 dark:text-gray-400">
                      {group}
                    </div>
                    {groupItems.map((item) => {
                      const itemIndex = flatItems.indexOf(item);
                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => handleSelect(item)}
                          onMouseEnter={() =>
                            setSelectedIndex(itemIndex)}
                          className={cn(
                            "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm",
                            "transition-colors",
                            itemIndex === selectedIndex
                              ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
                              : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700",
                          )}
                        >
                          {item.icon && (
                            <span className="text-gray-400">{item.icon}</span>
                          )}
                          <div className="flex-1 min-w-0">
                            <div className="font-medium">{item.label}</div>
                            {item.description && (
                              <div className="truncate text-xs text-gray-500 dark:text-gray-400">
                                {item.description}
                              </div>
                            )}
                          </div>
                          {item.shortcut && (
                            <kbd className="hidden sm:inline-flex items-center rounded border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-900 px-2 py-0.5 text-xs text-gray-500">
                              {item.shortcut}
                            </kbd>
                          )}
                        </button>
                      );
                    })}
                  </div>
                ))
              )}
          </div>

          {/* 底部提示 */}
          <div className="flex items-center justify-between border-t border-gray-200 dark:border-gray-700 px-4 py-2 text-xs text-gray-500">
            <div className="flex items-center gap-2">
              <kbd className="rounded border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-900 px-1.5 py-0.5">
                ↑↓
              </kbd>
              <span>导航</span>
            </div>
            <div className="flex items-center gap-2">
              <kbd className="rounded border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-900 px-1.5 py-0.5">
                ↵
              </kbd>
              <span>选择</span>
            </div>
            <div className="flex items-center gap-2">
              <kbd className="rounded border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-900 px-1.5 py-0.5">
                ⌘K
              </kbd>
              <span>打开/关闭</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CommandMenu;
