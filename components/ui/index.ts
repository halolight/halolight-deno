/**
 * UI 组件库入口
 * 统一导出所有 UI 组件
 */

// 基础组件
export {
  type AlertProps,
  type AlertVariant,
  default as Alert,
} from "./Alert.tsx";
export {
  AvatarGroup,
  type AvatarGroupProps,
  type AvatarProps,
  default as Avatar,
} from "./Avatar.tsx";
export {
  type BadgeProps,
  type BadgeVariant,
  default as Badge,
  StatusBadge,
  type StatusBadgeProps,
} from "./Badge.tsx";
export {
  type ButtonProps,
  type ButtonSize,
  type ButtonVariant,
  default as Button,
} from "./Button.tsx";
export {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  type CardProps,
  CardTitle,
  default as Card,
} from "./Card.tsx";
export {
  CheckboxGroup,
  type CheckboxGroupProps,
  type CheckboxProps,
  default as Checkbox,
} from "./Checkbox.tsx";
export {
  AlertDialog,
  type AlertDialogProps,
  default as Dialog,
  type DialogProps,
} from "./Dialog.tsx";
export {
  ContextMenu,
  type ContextMenuProps,
  default as DropdownMenu,
  type DropdownMenuItem,
  type DropdownMenuProps,
} from "./DropdownMenu.tsx";
export { default as Input, type InputProps } from "./Input.tsx";
export { default as Label, type LabelProps } from "./Label.tsx";
export { default as Modal, type ModalProps } from "./Modal.tsx";
export { default as ScrollArea, type ScrollAreaProps } from "./ScrollArea.tsx";
export {
  default as Select,
  type SelectOption,
  type SelectProps,
} from "./Select.tsx";
export { default as Separator, type SeparatorProps } from "./Separator.tsx";
export {
  default as Skeleton,
  SkeletonAvatar,
  SkeletonCard,
  SkeletonList,
  type SkeletonProps,
  SkeletonTable,
  SkeletonText,
} from "./Skeleton.tsx";
export { default as Switch, type SwitchProps } from "./Switch.tsx";
export {
  default as Table,
  type TableColumn,
  TableContainer,
  type TableProps,
} from "./Table.tsx";
export { default as Tabs, type TabItem, type TabsProps } from "./Tabs.tsx";
export { default as Textarea, type TextareaProps } from "./Textarea.tsx";
export {
  default as Tooltip,
  type TooltipPlacement,
  type TooltipProps,
} from "./Tooltip.tsx";

// 新增组件
export {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  default as AlertDialogRoot,
} from "./AlertDialog.tsx";

export {
  default as Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./Sheet.tsx";

export {
  default as Popover,
  PopoverContent,
  PopoverTrigger,
} from "./Popover.tsx";

export {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
  default as Command,
} from "./Command.tsx";

export {
  BackToTop,
  BackToTopSimple,
  default as BackToTopDefault,
} from "./BackToTop.tsx";

export {
  type CookieConsentValue,
  default as CookieConsent,
  getCookieConsent,
  resetCookieConsent,
} from "./CookieConsent.tsx";

export {
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
  default as ContextMenuRoot,
} from "./ContextMenu.tsx";

export { default as InputClear } from "./InputClear.tsx";
