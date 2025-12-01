/**
 * Avatar 组件
 * 用于显示用户头像，支持图片和文字回退
 */

import type { JSX } from "preact";
import { cn } from "../../lib/utils.ts";

// ============================================================================
// 类型定义
// ============================================================================

export interface AvatarProps {
  /** 头像图片 URL */
  src?: string | null;
  /** 替代文本 */
  alt?: string;
  /** 用户名（用于生成回退文字） */
  name?: string;
  /** 回退显示的文字（通常是用户名首字母） */
  fallback?: string;
  /** 尺寸 */
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  /** 自定义类名 */
  className?: string;
  /** 点击事件 */
  onClick?: () => void;
}

// ============================================================================
// 尺寸映射
// ============================================================================

const sizeClasses = {
  xs: "w-6 h-6 text-xs",
  sm: "w-8 h-8 text-sm",
  md: "w-10 h-10 text-base",
  lg: "w-12 h-12 text-lg",
  xl: "w-16 h-16 text-xl",
};

// ============================================================================
// 组件
// ============================================================================

/**
 * Avatar 头像组件
 */
export function Avatar({
  src,
  alt = "",
  name,
  fallback,
  size = "md",
  className,
  onClick,
}: AvatarProps): JSX.Element {
  const handleImageError = (e: Event) => {
    const target = e.target as HTMLImageElement;
    target.style.display = "none";
    const fallbackEl = target.nextElementSibling;
    if (fallbackEl) {
      (fallbackEl as HTMLElement).style.display = "flex";
    }
  };

  // 生成回退文字：优先使用 fallback，其次 name 首字母，再次 alt 首字母
  const fallbackText = fallback ||
    name?.charAt(0)?.toUpperCase() ||
    alt?.charAt(0)?.toUpperCase() ||
    "?";

  return (
    <div
      className={cn(
        "relative flex shrink-0 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800",
        sizeClasses[size],
        onClick && "cursor-pointer hover:opacity-80 transition-opacity",
        className,
      )}
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {src
        ? (
          <>
            <img
              src={src}
              alt={alt || name}
              className="aspect-square h-full w-full object-cover"
              onError={handleImageError}
            />
            <div
              className="absolute inset-0 flex items-center justify-center bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 font-medium"
              style={{ display: "none" }}
            >
              {fallbackText}
            </div>
          </>
        )
        : (
          <div className="flex h-full w-full items-center justify-center bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 font-medium">
            {fallbackText}
          </div>
        )}
    </div>
  );
}

/**
 * AvatarGroup 头像组
 */
export interface AvatarGroupProps {
  /** 头像列表 */
  avatars: Array<{ src?: string; alt?: string; fallback?: string }>;
  /** 最大显示数量 */
  max?: number;
  /** 尺寸 */
  size?: AvatarProps["size"];
  /** 自定义类名 */
  className?: string;
}

export function AvatarGroup({
  avatars,
  max = 4,
  size = "md",
  className,
}: AvatarGroupProps): JSX.Element {
  const displayAvatars = avatars.slice(0, max);
  const remainingCount = avatars.length - max;

  return (
    <div className={cn("flex -space-x-2", className)}>
      {displayAvatars.map((avatar, index) => (
        <Avatar
          key={index}
          src={avatar.src}
          alt={avatar.alt}
          fallback={avatar.fallback}
          size={size}
          className="ring-2 ring-white dark:ring-gray-900"
        />
      ))}
      {remainingCount > 0 && (
        <div
          className={cn(
            "flex items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 font-medium ring-2 ring-white dark:ring-gray-900",
            sizeClasses[size],
          )}
        >
          +{remainingCount}
        </div>
      )}
    </div>
  );
}

export default Avatar;
