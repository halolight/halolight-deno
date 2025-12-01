/**
 * 用户数据 Hooks
 * 提供用户列表、单个用户查询和用户操作功能
 */

import { useCallback, useEffect, useState } from "preact/hooks";
import { userService } from "../lib/api/services.ts";
import type {
  User,
  UserCreateRequest,
  UserFilterParams,
  UserStatus,
} from "../lib/api/types.ts";

// ============================================================================
// 类型定义
// ============================================================================

export type UserQueryParams = UserFilterParams;

export type UserFormData = UserCreateRequest;

interface UseUsersResult {
  data: User[] | null;
  total: number;
  page: number;
  pageSize: number;
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

interface UseUserResult {
  data: User | null;
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

interface MutationResult<T> {
  mutate: (data: T) => Promise<void>;
  loading: boolean;
  error: Error | null;
}

// ============================================================================
// 查询 Hooks
// ============================================================================

/**
 * 获取用户列表
 */
export function useUsers(params?: UserQueryParams): UseUsersResult {
  const [data, setData] = useState<User[] | null>(null);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await userService.getUsers(params);
      setData(response.data.list);
      setTotal(response.data.total);
      setPage(response.data.page);
      setPageSize(response.data.pageSize);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("获取用户列表失败"));
    } finally {
      setLoading(false);
    }
  }, [JSON.stringify(params)]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return { data, total, page, pageSize, loading, error, refetch: fetchUsers };
}

/**
 * 获取单个用户
 */
export function useUser(id: string | undefined): UseUserResult {
  const [data, setData] = useState<User | null>(null);
  const [loading, setLoading] = useState(!!id);
  const [error, setError] = useState<Error | null>(null);

  const fetchUser = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    setError(null);
    try {
      const response = await userService.getUser(id);
      setData(response.data || null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("获取用户详情失败"));
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return { data, loading, error, refetch: fetchUser };
}

// ============================================================================
// Mutation Hooks
// ============================================================================

/**
 * 创建用户
 */
export function useCreateUser(options?: {
  onSuccess?: (data: { id: string; createdAt: string }) => void;
  onError?: (error: Error) => void;
}): MutationResult<UserFormData> {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const mutate = useCallback(async (formData: UserFormData) => {
    setLoading(true);
    setError(null);
    try {
      const result = await userService.createUser(formData);
      if (result.data) {
        options?.onSuccess?.(result.data);
      }
    } catch (err) {
      const error = err instanceof Error ? err : new Error("创建用户失败");
      setError(error);
      options?.onError?.(error);
    } finally {
      setLoading(false);
    }
  }, [options?.onSuccess, options?.onError]);

  return { mutate, loading, error };
}

/**
 * 更新用户
 */
export function useUpdateUser(options?: {
  onSuccess?: (data: { updatedAt: string }) => void;
  onError?: (error: Error) => void;
}): MutationResult<{ id: string; data: Partial<UserFormData> }> {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const mutate = useCallback(
    async ({ id, data }: { id: string; data: Partial<UserFormData> }) => {
      setLoading(true);
      setError(null);
      try {
        const result = await userService.updateUser(id, data);
        if (result.data) {
          options?.onSuccess?.(result.data);
        }
      } catch (err) {
        const error = err instanceof Error ? err : new Error("更新用户失败");
        setError(error);
        options?.onError?.(error);
      } finally {
        setLoading(false);
      }
    },
    [options?.onSuccess, options?.onError],
  );

  return { mutate, loading, error };
}

/**
 * 删除用户
 */
export function useDeleteUser(options?: {
  onSuccess?: (id: string) => void;
  onError?: (error: Error) => void;
}): MutationResult<string> {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const mutate = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      await userService.deleteUser(id);
      options?.onSuccess?.(id);
    } catch (err) {
      const error = err instanceof Error ? err : new Error("删除用户失败");
      setError(error);
      options?.onError?.(error);
    } finally {
      setLoading(false);
    }
  }, [options?.onSuccess, options?.onError]);

  return { mutate, loading, error };
}

/**
 * 批量删除用户
 */
export function useBatchDeleteUsers(options?: {
  onSuccess?: (ids: string[]) => void;
  onError?: (error: Error) => void;
}): MutationResult<string[]> {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const mutate = useCallback(async (ids: string[]) => {
    setLoading(true);
    setError(null);
    try {
      await userService.batchDeleteUsers(ids);
      options?.onSuccess?.(ids);
    } catch (err) {
      const error = err instanceof Error ? err : new Error("批量删除用户失败");
      setError(error);
      options?.onError?.(error);
    } finally {
      setLoading(false);
    }
  }, [options?.onSuccess, options?.onError]);

  return { mutate, loading, error };
}

/**
 * 更新用户状态
 */
export function useUpdateUserStatus(options?: {
  onSuccess?: (data: User | null) => void;
  onError?: (error: Error) => void;
}): MutationResult<{ id: string; status: UserStatus }> {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const mutate = useCallback(
    async ({ id, status }: { id: string; status: UserStatus }) => {
      setLoading(true);
      setError(null);
      try {
        const result = await userService.updateUserStatus(id, status);
        options?.onSuccess?.(result.data);
      } catch (err) {
        const error = err instanceof Error
          ? err
          : new Error("更新用户状态失败");
        setError(error);
        options?.onError?.(error);
      } finally {
        setLoading(false);
      }
    },
    [options?.onSuccess, options?.onError],
  );

  return { mutate, loading, error };
}
