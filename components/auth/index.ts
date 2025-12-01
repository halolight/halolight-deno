/**
 * 认证组件统一导出
 */

export {
  default as LoginButton,
  GitHubLoginButton,
  SimpleLoginButton,
} from "./LoginButton.tsx";
export { default as UserProfile, UserAvatar } from "./UserProfile.tsx";
export {
  default as AuthGuard,
  GuestOnlyGuard,
  InlineAuthGuard,
} from "./AuthGuard.tsx";
export {
  AuthShell,
  type AuthShellProps,
  type BackgroundOptions,
  type FloatingDotsConfig,
  type HaloConfig,
} from "./AuthShell.tsx";
