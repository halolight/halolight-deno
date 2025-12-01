/**
 * TabBar 标签栏组件
 * 多标签页导航，支持标签关闭、拖拽排序等
 */
import type { ComponentChildren } from "preact";
import { useEffect, useRef, useState } from "preact/hooks";
import { cn } from "../../lib/utils.ts";

interface Tab {
  id: string;
  title: string;
  path: string;
  icon?: ComponentChildren;
  closable?: boolean;
  pinned?: boolean;
}

interface TabBarProps {
  tabs: Tab[];
  activeTabId?: string;
  onTabChange?: (tabId: string) => void;
  onTabClose?: (tabId: string) => void;
  onTabsReorder?: (tabs: Tab[]) => void;
  className?: string;
  showAddButton?: boolean;
  onAddTab?: () => void;
}

export function TabBar({
  tabs,
  activeTabId,
  onTabChange,
  onTabClose,
  onTabsReorder: _onTabsReorder,
  className,
  showAddButton = false,
  onAddTab,
}: TabBarProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeftScroll, setShowLeftScroll] = useState(false);
  const [showRightScroll, setShowRightScroll] = useState(false);

  // 检查是否需要滚动按钮
  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setShowLeftScroll(scrollLeft > 0);
      setShowRightScroll(scrollLeft + clientWidth < scrollWidth);
    }
  };

  useEffect(() => {
    checkScroll();
    globalThis.addEventListener("resize", checkScroll);
    return () => globalThis.removeEventListener("resize", checkScroll);
  }, [tabs]);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 200;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
      setTimeout(checkScroll, 300);
    }
  };

  const handleClose = (e: MouseEvent, tabId: string) => {
    e.stopPropagation();
    onTabClose?.(tabId);
  };

  const handleContextMenu = (e: MouseEvent, _tab: Tab) => {
    e.preventDefault();
    // 可以在这里添加右键菜单逻辑
  };

  if (tabs.length === 0) return null;

  return (
    <div
      className={cn(
        "flex items-center border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900",
        className,
      )}
    >
      {/* 左滚动按钮 */}
      {showLeftScroll && (
        <button
          type="button"
          onClick={() => scroll("left")}
          className="flex-shrink-0 p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
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
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
      )}

      {/* 标签列表 */}
      <div
        ref={scrollRef}
        className="flex-1 flex items-center overflow-x-auto scrollbar-hide"
        onScroll={checkScroll}
      >
        {tabs.map((tab) => {
          const isActive = tab.id === activeTabId;
          return (
            <div
              key={tab.id}
              onClick={() => onTabChange?.(tab.id)}
              onContextMenu={(e) => handleContextMenu(e, tab)}
              className={cn(
                "group flex items-center gap-2 px-4 py-2 cursor-pointer border-b-2 -mb-px",
                "transition-colors min-w-0",
                isActive
                  ? "border-blue-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                  : "border-transparent hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400",
                tab.pinned && "bg-blue-50 dark:bg-blue-900/10",
              )}
            >
              {/* 固定图标 */}
              {tab.pinned && (
                <svg
                  className="h-3 w-3 text-blue-500 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M16 4v8l3 3v2h-6v5l-1 1-1-1v-5H5v-2l3-3V4c0-1.1.9-2 2-2h4c1.1 0 2 .9 2 2z" />
                </svg>
              )}

              {/* 图标 */}
              {tab.icon && <span className="flex-shrink-0">{tab.icon}</span>}

              {/* 标题 */}
              <span className="truncate text-sm font-medium max-w-32">
                {tab.title}
              </span>

              {/* 关闭按钮 */}
              {tab.closable !== false && !tab.pinned && (
                <button
                  type="button"
                  onClick={(e) => handleClose(e, tab.id)}
                  className={cn(
                    "flex-shrink-0 p-0.5 rounded hover:bg-gray-200 dark:hover:bg-gray-700",
                    "opacity-0 group-hover:opacity-100 transition-opacity",
                    isActive && "opacity-100",
                  )}
                >
                  <svg
                    className="h-3 w-3"
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
                </button>
              )}
            </div>
          );
        })}
      </div>

      {/* 右滚动按钮 */}
      {showRightScroll && (
        <button
          type="button"
          onClick={() => scroll("right")}
          className="flex-shrink-0 p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
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
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      )}

      {/* 添加标签按钮 */}
      {showAddButton && (
        <button
          type="button"
          onClick={onAddTab}
          className="flex-shrink-0 p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 border-l border-gray-200 dark:border-gray-800"
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
              d="M12 4v16m8-8H4"
            />
          </svg>
        </button>
      )}

      {/* 更多操作 */}
      <div className="flex-shrink-0 border-l border-gray-200 dark:border-gray-800">
        <TabBarMenu
          onCloseAll={() => {
            tabs.filter((t) => t.closable !== false && !t.pinned).forEach((t) =>
              onTabClose?.(t.id)
            );
          }}
          onCloseOthers={() => {
            tabs.filter((t) =>
              t.id !== activeTabId && t.closable !== false && !t.pinned
            ).forEach((t) => onTabClose?.(t.id));
          }}
        />
      </div>
    </div>
  );
}

interface TabBarMenuProps {
  onCloseAll: () => void;
  onCloseOthers: () => void;
}

function TabBarMenu({ onCloseAll, onCloseOthers }: TabBarMenuProps) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  return (
    <div className="relative" ref={menuRef}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
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
            d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
          />
        </svg>
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-1 w-40 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-lg z-10">
          <button
            type="button"
            onClick={() => {
              onCloseOthers();
              setOpen(false);
            }}
            className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            关闭其他标签
          </button>
          <button
            type="button"
            onClick={() => {
              onCloseAll();
              setOpen(false);
            }}
            className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            关闭所有标签
          </button>
        </div>
      )}
    </div>
  );
}

export default TabBar;
