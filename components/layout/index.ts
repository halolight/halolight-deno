/**
 * 布局组件库入口
 * 统一导出所有布局组件
 */

// 核心布局
export { default as Layout } from "./Layout.tsx";
export { default as Header } from "./Header.tsx";
export { default as Sidebar } from "./Sidebar.tsx";

// 管理布局
export {
  AdminCard,
  AdminLayout,
  AdminPageHeader,
  default as AdminLayoutDefault,
} from "./AdminLayout.tsx";

// 页脚
export { AdminFooter, default as Footer, FooterSimple } from "./Footer.tsx";

// 命令菜单
export { default as CommandMenu } from "./CommandMenu.tsx";

// 法律页面布局
export {
  default as LegalLayoutContent,
  LegalList,
  LegalSection,
} from "./LegalLayoutContent.tsx";

// 加载遮罩
export {
  default as PendingOverlay,
  LoadingDots,
  LoadingSpinner,
} from "./PendingOverlay.tsx";

// 快速设置
export { default as QuickSettings } from "./QuickSettings.tsx";

// 标签栏
export { default as TabBar } from "./TabBar.tsx";
