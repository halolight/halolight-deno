/**
 * LayoutManager - 布局管理器 (Island)
 * 管理侧边栏折叠状态、移动端菜单、搜索对话框等
 */
import { useEffect, useState } from "preact/hooks";
import { JSX } from "preact";
import Header from "../components/layout/Header.tsx";
import SidebarIsland from "./SidebarIsland.tsx";
import CommandMenuIsland from "./CommandMenuIsland.tsx";
import { AdminFooter } from "../components/layout/Footer.tsx";

interface LayoutManagerProps {
  children: JSX.Element | JSX.Element[] | string;
  title?: string;
  showSidebar?: boolean;
  showHeader?: boolean;
  showFooter?: boolean;
}

const SIDEBAR_COLLAPSED_KEY = "sidebar-collapsed";
const EXPANDED_WIDTH = 220;
const COLLAPSED_WIDTH = 72;

const LayoutManager = ({
  children,
  title,
  showSidebar = true,
  showHeader = true,
  showFooter = true,
}: LayoutManagerProps) => {
  // 侧边栏状态
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(true);

  // 搜索对话框状态
  const [searchOpen, setSearchOpen] = useState(false);

  // 初始化主题
  useEffect(() => {
    const initTheme = () => {
      const savedTheme = localStorage.getItem("theme-storage");
      if (savedTheme) {
        try {
          const themeData = JSON.parse(savedTheme);
          const theme = themeData.state?.theme || "system";

          let isDark = false;
          if (theme === "system") {
            isDark =
              globalThis.window?.matchMedia("(prefers-color-scheme: dark)")
                .matches || false;
          } else {
            isDark = theme === "dark";
          }

          if (isDark) {
            document.documentElement.classList.add("dark");
          } else {
            document.documentElement.classList.remove("dark");
          }
        } catch (error) {
          console.warn("Failed to parse theme data:", error);
        }
      }
    };

    initTheme();
  }, []);

  // 从 localStorage 恢复侧边栏状态
  useEffect(() => {
    const saved = localStorage.getItem(SIDEBAR_COLLAPSED_KEY);
    if (saved !== null) {
      setSidebarCollapsed(saved === "true");
    }
  }, []);

  // 保存侧边栏状态到 localStorage
  useEffect(() => {
    localStorage.setItem(SIDEBAR_COLLAPSED_KEY, String(sidebarCollapsed));
  }, [sidebarCollapsed]);

  // 检测屏幕尺寸
  useEffect(() => {
    const checkScreenSize = () => {
      const isLarge = globalThis.innerWidth >= 1024;
      setIsLargeScreen(isLarge);

      if (isLarge) {
        setMobileMenuOpen(false);
      }
    };

    checkScreenSize();
    globalThis.addEventListener("resize", checkScreenSize);
    return () => globalThis.removeEventListener("resize", checkScreenSize);
  }, []);

  // 键盘快捷键处理
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd/Ctrl + K 打开搜索
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
      // Cmd/Ctrl + B 切换侧边栏
      if ((e.metaKey || e.ctrlKey) && e.key === "b") {
        e.preventDefault();
        if (isLargeScreen) {
          setSidebarCollapsed(!sidebarCollapsed);
        } else {
          setMobileMenuOpen(!mobileMenuOpen);
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isLargeScreen, sidebarCollapsed, mobileMenuOpen]);

  const handleMenuClick = () => {
    if (isLargeScreen) {
      setSidebarCollapsed(!sidebarCollapsed);
    } else {
      setMobileMenuOpen(!mobileMenuOpen);
    }
  };

  const handleSearchClick = () => {
    setSearchOpen(true);
  };

  const sidebarWidth = showSidebar
    ? (sidebarCollapsed ? COLLAPSED_WIDTH : EXPANDED_WIDTH)
    : 0;

  return (
    <div className="h-screen flex flex-col bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      {/* 搜索对话框 */}
      <CommandMenuIsland open={searchOpen} onOpenChange={setSearchOpen} />

      {/* 侧边栏 */}
      {showSidebar && (
        <SidebarIsland
          collapsed={sidebarCollapsed}
          onCollapsedChange={setSidebarCollapsed}
          mobileOpen={mobileMenuOpen}
          onMobileClose={() => setMobileMenuOpen(false)}
          expandedWidth={EXPANDED_WIDTH}
          collapsedWidth={COLLAPSED_WIDTH}
        />
      )}

      {/* 主内容区域 */}
      <div
        className="flex-1 flex flex-col transition-all duration-200 ease-in-out"
        style={{
          marginLeft: isLargeScreen && showSidebar ? `${sidebarWidth}px` : 0,
        }}
      >
        {/* 头部 */}
        {showHeader && (
          <Header
            title={title}
            showSidebarToggle={showSidebar}
            onSidebarToggle={handleMenuClick}
            onSearchClick={handleSearchClick}
            showSearch
            showNotifications
            showErrors
            showQuickSettings
            showUserMenu
          />
        )}

        {/* 主内容 - 可滚动 */}
        <main className="flex-1 overflow-y-auto flex flex-col">
          <div className="flex-1 py-6 px-4 md:px-6">
            {children}
          </div>
          {/* 页脚 - 在滚动区域内，但始终在内容底部 */}
          {showFooter && <AdminFooter className="mt-auto flex-shrink-0" />}
        </main>
      </div>
    </div>
  );
};

export default LayoutManager;
