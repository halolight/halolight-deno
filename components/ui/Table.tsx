/**
 * Table 组件
 * 表格组件
 */

import type { ComponentChildren, JSX } from "preact";
import { cn } from "../../lib/utils.ts";

// ============================================================================
// 类型定义
// ============================================================================

export interface TableColumn<T> {
  /** 列标识 */
  key: string;
  /** 列标题 */
  title: string;
  /** 自定义渲染 */
  render?: (value: unknown, record: T, index: number) => ComponentChildren;
  /** 数据索引 */
  dataIndex?: keyof T;
  /** 列宽度 */
  width?: string | number;
  /** 对齐方式 */
  align?: "left" | "center" | "right";
  /** 是否可排序 */
  sortable?: boolean;
  /** 自定义类名 */
  className?: string;
}

export interface TableProps<T> {
  /** 列配置 */
  columns: TableColumn<T>[];
  /** 数据源 */
  data: T[];
  /** 行唯一标识字段 */
  rowKey?: keyof T | ((record: T) => string);
  /** 是否显示边框 */
  bordered?: boolean;
  /** 是否显示条纹 */
  striped?: boolean;
  /** 是否可悬停高亮 */
  hoverable?: boolean;
  /** 加载状态 */
  loading?: boolean;
  /** 空数据提示 */
  emptyText?: string;
  /** 尺寸 */
  size?: "sm" | "md" | "lg";
  /** 自定义类名 */
  className?: string;
  /** 表头类名 */
  headerClassName?: string;
  /** 行点击回调 */
  onRowClick?: (record: T, index: number) => void;
  /** 排序回调 */
  onSort?: (key: string, order: "asc" | "desc") => void;
}

// ============================================================================
// 尺寸映射
// ============================================================================

const sizeClasses = {
  sm: "text-xs",
  md: "text-sm",
  lg: "text-base",
};

const cellPaddingClasses = {
  sm: "px-3 py-2",
  md: "px-4 py-3",
  lg: "px-6 py-4",
};

// ============================================================================
// 组件
// ============================================================================

/**
 * Table 表格组件
 */
export function Table<T extends Record<string, unknown>>({
  columns,
  data,
  rowKey = "id" as keyof T,
  bordered = false,
  striped = false,
  hoverable = true,
  loading = false,
  emptyText = "暂无数据",
  size = "md",
  className,
  headerClassName,
  onRowClick,
  onSort,
}: TableProps<T>): JSX.Element {
  const getRowKey = (record: T, index: number): string => {
    if (typeof rowKey === "function") {
      return rowKey(record);
    }
    return String(record[rowKey] || index);
  };

  const getCellValue = (record: T, column: TableColumn<T>, index: number) => {
    if (column.render) {
      const value = column.dataIndex ? record[column.dataIndex] : undefined;
      return column.render(value, record, index);
    }
    if (column.dataIndex) {
      return record[column.dataIndex] as ComponentChildren;
    }
    return null;
  };

  return (
    <div className={cn("relative overflow-x-auto", className)}>
      {loading && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/60 dark:bg-gray-900/60">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary-500 border-t-transparent" />
        </div>
      )}

      <table
        className={cn(
          "w-full",
          sizeClasses[size],
          bordered && "border border-gray-200 dark:border-gray-700",
        )}
      >
        {/* 表头 */}
        <thead
          className={cn(
            "bg-gray-50 dark:bg-gray-800/50",
            bordered && "border-b border-gray-200 dark:border-gray-700",
            headerClassName,
          )}
        >
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                scope="col"
                style={{ width: column.width }}
                className={cn(
                  "font-semibold text-gray-700 dark:text-gray-300",
                  cellPaddingClasses[size],
                  column.align === "center" && "text-center",
                  column.align === "right" && "text-right",
                  bordered &&
                    "border-r border-gray-200 dark:border-gray-700 last:border-r-0",
                  column.sortable &&
                    "cursor-pointer select-none hover:bg-gray-100 dark:hover:bg-gray-800",
                  column.className,
                )}
                onClick={() => column.sortable && onSort?.(column.key, "asc")}
              >
                <div className="flex items-center gap-1">
                  {column.title}
                  {column.sortable && (
                    <svg
                      className="h-4 w-4 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
                      />
                    </svg>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>

        {/* 表体 */}
        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
          {data.length === 0
            ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className={cn(
                    "text-center text-gray-500 dark:text-gray-400",
                    cellPaddingClasses[size],
                  )}
                >
                  {emptyText}
                </td>
              </tr>
            )
            : (
              data.map((record, index) => (
                <tr
                  key={getRowKey(record, index)}
                  onClick={() => onRowClick?.(record, index)}
                  className={cn(
                    "bg-white dark:bg-gray-900",
                    striped && index % 2 === 1 &&
                      "bg-gray-50 dark:bg-gray-800/30",
                    hoverable && "hover:bg-gray-50 dark:hover:bg-gray-800/50",
                    onRowClick && "cursor-pointer",
                  )}
                >
                  {columns.map((column) => (
                    <td
                      key={column.key}
                      style={{ width: column.width }}
                      className={cn(
                        "text-gray-900 dark:text-gray-100",
                        cellPaddingClasses[size],
                        column.align === "center" && "text-center",
                        column.align === "right" && "text-right",
                        bordered &&
                          "border-r border-gray-200 dark:border-gray-700 last:border-r-0",
                        column.className,
                      )}
                    >
                      {getCellValue(record, column, index)}
                    </td>
                  ))}
                </tr>
              ))
            )}
        </tbody>
      </table>
    </div>
  );
}

// ============================================================================
// 子组件导出
// ============================================================================

/** 简化的表格容器 */
export function TableContainer({
  children,
  className,
}: {
  children: ComponentChildren;
  className?: string;
}): JSX.Element {
  return (
    <div className={cn("relative overflow-x-auto", className)}>{children}</div>
  );
}

export default Table;
