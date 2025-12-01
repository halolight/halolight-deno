/**
 * 文档数据 Hooks
 * 提供文档列表、单个文档查询和文档操作功能
 */

import { useCallback, useEffect, useState } from "preact/hooks";
import { documentService } from "../lib/api/services.ts";
import type {
  Document,
  DocumentType,
  PaginatedResponse,
} from "../lib/api/types.ts";

// ============================================================================
// 类型定义
// ============================================================================

export interface DocumentQueryParams {
  page?: number;
  pageSize?: number;
  type?: string;
  search?: string;
}

export interface DocumentFormData {
  name: string;
  type: DocumentType;
  size?: number;
  path?: string;
  parentId?: string;
  tags?: string[];
}

interface UseDocumentsResult {
  data: PaginatedResponse<Document> | null;
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

interface UseDocumentResult {
  data: Document | null;
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
 * 获取文档列表
 */
export function useDocuments(params?: DocumentQueryParams): UseDocumentsResult {
  const [data, setData] = useState<PaginatedResponse<Document> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchDocuments = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await documentService.getDocuments(params);
      setData(response);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("获取文档列表失败"));
    } finally {
      setLoading(false);
    }
  }, [JSON.stringify(params)]);

  useEffect(() => {
    fetchDocuments();
  }, [fetchDocuments]);

  return { data, loading, error, refetch: fetchDocuments };
}

/**
 * 获取单个文档
 */
export function useDocument(id: string | undefined): UseDocumentResult {
  const [data, setData] = useState<Document | null>(null);
  const [loading, setLoading] = useState(!!id);
  const [error, setError] = useState<Error | null>(null);

  const fetchDocument = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    setError(null);
    try {
      const response = await documentService.getDocument(id);
      setData(response);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("获取文档详情失败"));
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchDocument();
  }, [fetchDocument]);

  return { data, loading, error, refetch: fetchDocument };
}

// ============================================================================
// Mutation Hooks
// ============================================================================

/**
 * 创建文档
 */
export function useCreateDocument(options?: {
  onSuccess?: (data: Document) => void;
  onError?: (error: Error) => void;
}): MutationResult<DocumentFormData> {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const mutate = useCallback(async (formData: DocumentFormData) => {
    setLoading(true);
    setError(null);
    try {
      const result = await documentService.createDocument(formData);
      options?.onSuccess?.(result);
    } catch (err) {
      const error = err instanceof Error ? err : new Error("创建文档失败");
      setError(error);
      options?.onError?.(error);
    } finally {
      setLoading(false);
    }
  }, [options?.onSuccess, options?.onError]);

  return { mutate, loading, error };
}

/**
 * 更新文档
 */
export function useUpdateDocument(options?: {
  onSuccess?: (data: Document) => void;
  onError?: (error: Error) => void;
}): MutationResult<{ id: string; data: Partial<DocumentFormData> }> {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const mutate = useCallback(
    async ({ id, data }: { id: string; data: Partial<DocumentFormData> }) => {
      setLoading(true);
      setError(null);
      try {
        const result = await documentService.updateDocument(id, data);
        options?.onSuccess?.(result);
      } catch (err) {
        const error = err instanceof Error ? err : new Error("更新文档失败");
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
 * 删除文档
 */
export function useDeleteDocument(options?: {
  onSuccess?: (id: string) => void;
  onError?: (error: Error) => void;
}): MutationResult<string> {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const mutate = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      await documentService.deleteDocument(id);
      options?.onSuccess?.(id);
    } catch (err) {
      const error = err instanceof Error ? err : new Error("删除文档失败");
      setError(error);
      options?.onError?.(error);
    } finally {
      setLoading(false);
    }
  }, [options?.onSuccess, options?.onError]);

  return { mutate, loading, error };
}

/**
 * 批量删除文档
 */
export function useBatchDeleteDocuments(options?: {
  onSuccess?: (ids: string[]) => void;
  onError?: (error: Error) => void;
}): MutationResult<string[]> {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const mutate = useCallback(async (ids: string[]) => {
    setLoading(true);
    setError(null);
    try {
      await documentService.batchDeleteDocuments(ids);
      options?.onSuccess?.(ids);
    } catch (err) {
      const error = err instanceof Error ? err : new Error("批量删除文档失败");
      setError(error);
      options?.onError?.(error);
    } finally {
      setLoading(false);
    }
  }, [options?.onSuccess, options?.onError]);

  return { mutate, loading, error };
}
