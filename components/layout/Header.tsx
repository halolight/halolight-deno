/**
 * Header 头部组件
 * 包含 Logo、导航、搜索、通知、用户菜单等
 */
import { JSX } from "preact";
import Button from "../ui/Button.tsx";
import HeaderIsland from "../../islands/HeaderIsland.tsx";

interface HeaderProps {
  title?: string;
  showSidebarToggle?: boolean;
  onSidebarToggle?: () => void;
  onSearchClick?: () => void;
  showSearch?: boolean;
  showNotifications?: boolean;
  showErrors?: boolean;
  showQuickSettings?: boolean;
  showUserMenu?: boolean;
  className?: string;
  children?: JSX.Element | JSX.Element[];
}

const Header = ({
  title = "HaloLight",
  showSidebarToggle = true,
  onSidebarToggle,
  onSearchClick,
  showSearch = true,
  showNotifications = true,
  showErrors = true,
  showQuickSettings = true,
  showUserMenu = true,
  className = "",
  children,
}: HeaderProps) => {
  return (
    <header
      className={`sticky top-0 z-50 flex h-16 items-center justify-between border-b border-gray-200 dark:border-gray-700 bg-white/95 dark:bg-gray-800/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-gray-800/60 px-4 ${className}`}
    >
      {/* 左侧 */}
      <div className="flex items-center gap-4">
        {showSidebarToggle && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onSidebarToggle}
            className="lg:hidden"
            aria-label="切换侧边栏"
          >
            <MenuIcon />
          </Button>
        )}

        <a
          href="/"
          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
          <Logo />
          <h1 className="text-xl font-semibold text-gray-900 dark:text-white hidden sm:block">
            {title}
          </h1>
        </a>
      </div>

      {/* 中间自定义内容 */}
      {children && (
        <div className="flex-1 flex justify-center">
          {children}
        </div>
      )}

      {/* 右侧 - 使用 HeaderIsland 处理所有交互 */}
      <HeaderIsland
        onSearchClick={onSearchClick}
        showSearch={showSearch}
        showNotifications={showNotifications}
        showErrors={showErrors}
        showQuickSettings={showQuickSettings}
        showUserMenu={showUserMenu}
      />
    </header>
  );
};

// Logo组件
const Logo = () => (
  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
    <span className="text-white font-bold text-sm">H</span>
  </div>
);

// 菜单图标组件
const MenuIcon = () => (
  <svg
    className="w-5 h-5"
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
);

export default Header;
