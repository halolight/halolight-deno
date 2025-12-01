/**
 * Sidebar 侧边栏组件
 * 服务端组件壳，实际交互逻辑在 SidebarIsland 中
 */
import SidebarIsland from "../../islands/SidebarIsland.tsx";

interface SidebarProps {
  collapsed?: boolean;
  onCollapsedChange?: (collapsed: boolean) => void;
  mobileOpen?: boolean;
  onMobileClose?: () => void;
  expandedWidth?: number;
  collapsedWidth?: number;
}

const Sidebar = ({
  collapsed = false,
  onCollapsedChange,
  mobileOpen = false,
  onMobileClose,
  expandedWidth = 220,
  collapsedWidth = 72,
}: SidebarProps) => {
  return (
    <SidebarIsland
      collapsed={collapsed}
      onCollapsedChange={onCollapsedChange}
      mobileOpen={mobileOpen}
      onMobileClose={onMobileClose}
      expandedWidth={expandedWidth}
      collapsedWidth={collapsedWidth}
    />
  );
};

export default Sidebar;
