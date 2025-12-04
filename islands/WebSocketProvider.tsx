/**
 * WebSocket Provider Island
 * 提供 WebSocket 实时通知功能
 */

import type { ComponentChildren, JSX } from "preact";
import { createContext } from "preact";
import { useContext, useEffect, useRef, useState } from "preact/hooks";
import type { Notification } from "../lib/api/types.ts";

// ============================================================================
// 类型定义
// ============================================================================

/** WebSocket 连接状态 */
type ConnectionStatus = "connecting" | "connected" | "disconnected" | "error";

/** WebSocket 上下文类型 */
interface WebSocketContextType {
  status: ConnectionStatus;
  lastMessage: Notification | null;
  sendMessage: (message: unknown) => void;
  reconnect: () => void;
}

// ============================================================================
// Context 创建
// ============================================================================

const WebSocketContext = createContext<WebSocketContextType | null>(null);

// ============================================================================
// Mock WebSocket 实现
// ============================================================================

/**
 * Mock WebSocket 类
 * 模拟 WebSocket 实时通知功能
 */
class MockWebSocket {
  private callbacks: {
    onOpen?: () => void;
    onMessage?: (data: Notification) => void;
    onClose?: () => void;
    onError?: (error: Error) => void;
  } = {};
  private interval: number | null = null;
  private isConnected = false;

  /**
   * 连接 WebSocket
   */
  connect() {
    // 模拟连接延迟
    setTimeout(() => {
      this.isConnected = true;
      this.callbacks.onOpen?.();
      this.startMockMessages();
    }, 1000);
  }

  /**
   * 开始发送模拟消息
   */
  private startMockMessages() {
    // 随机发送模拟通知
    this.interval = setInterval(() => {
      if (!this.isConnected) return;

      // 20% 概率发送新通知
      if (Math.random() < 0.2) {
        const mockNotifications: Notification[] = [
          {
            id: `ws-${Date.now()}`,
            type: "user",
            title: "新用户注册",
            content: `用户 ${
              ["张三", "李四", "王五", "赵六"][Math.floor(Math.random() * 4)]
            } 刚刚完成注册`,
            read: false,
            createdAt: new Date().toISOString(),
            link: "/users",
          },
          {
            id: `ws-${Date.now()}`,
            type: "system",
            title: "系统通知",
            content: "数据备份已完成",
            read: false,
            createdAt: new Date().toISOString(),
          },
          {
            id: `ws-${Date.now()}`,
            type: "task",
            title: "任务更新",
            content: "您有一个新任务待处理",
            read: false,
            createdAt: new Date().toISOString(),
            link: "/tasks",
          },
          {
            id: `ws-${Date.now()}`,
            type: "alert",
            title: "安全提醒",
            content: "检测到异常登录尝试",
            read: false,
            createdAt: new Date().toISOString(),
          },
        ];

        const randomNotification = mockNotifications[
          Math.floor(Math.random() * mockNotifications.length)
        ];
        this.callbacks.onMessage?.(randomNotification);
      }
    }, 10000) as unknown as number; // 每10秒检查一次
  }

  /**
   * 注册打开回调
   */
  onOpen(callback: () => void) {
    this.callbacks.onOpen = callback;
  }

  /**
   * 注册消息回调
   */
  onMessage(callback: (data: Notification) => void) {
    this.callbacks.onMessage = callback;
  }

  /**
   * 注册关闭回调
   */
  onClose(callback: () => void) {
    this.callbacks.onClose = callback;
  }

  /**
   * 注册错误回调
   */
  onError(callback: (error: Error) => void) {
    this.callbacks.onError = callback;
  }

  /**
   * 发送消息
   */
  send(data: unknown) {
    console.log("WebSocket send:", data);
  }

  /**
   * 关闭连接
   */
  close() {
    this.isConnected = false;
    if (this.interval !== null) {
      clearInterval(this.interval);
      this.interval = null;
    }
    this.callbacks.onClose?.();
  }
}

// ============================================================================
// Provider 组件
// ============================================================================

interface WebSocketProviderProps {
  children: ComponentChildren;
  /** 是否自动连接 */
  autoConnect?: boolean;
  /** 通知回调 */
  onNotification?: (notification: Notification) => void;
}

export function WebSocketProvider({
  children,
  autoConnect = true,
  onNotification,
}: WebSocketProviderProps): JSX.Element {
  const [status, setStatus] = useState<ConnectionStatus>("disconnected");
  const [lastMessage, setLastMessage] = useState<Notification | null>(null);
  const wsRef = useRef<MockWebSocket | null>(null);

  /**
   * 连接 WebSocket
   */
  const connect = () => {
    if (wsRef.current) {
      wsRef.current.close();
    }

    setStatus("connecting");
    const ws = new MockWebSocket();
    wsRef.current = ws;

    ws.onOpen(() => {
      setStatus("connected");
      console.log("WebSocket connected");
    });

    ws.onMessage((notification) => {
      setLastMessage(notification);
      onNotification?.(notification);
      console.log("WebSocket message received:", notification);
    });

    ws.onClose(() => {
      setStatus("disconnected");
      console.log("WebSocket disconnected");
    });

    ws.onError(() => {
      setStatus("error");
      console.error("WebSocket error");
    });

    ws.connect();
  };

  /**
   * 发送消息
   */
  const sendMessage = (message: unknown) => {
    wsRef.current?.send(message);
  };

  /**
   * 重新连接
   */
  const reconnect = () => {
    connect();
  };

  // 自动连接
  useEffect(() => {
    if (autoConnect) {
      connect();
    }

    return () => {
      wsRef.current?.close();
    };
  }, [autoConnect]);

  return (
    <WebSocketContext.Provider
      value={{ status, lastMessage, sendMessage, reconnect }}
    >
      {children}
    </WebSocketContext.Provider>
  );
}

// ============================================================================
// Hooks
// ============================================================================

/**
 * 使用 WebSocket
 */
export function useWebSocket(): WebSocketContextType {
  const context = useContext(WebSocketContext);
  if (!context) {
    throw new Error("useWebSocket must be used within WebSocketProvider");
  }
  return context;
}

/**
 * 使用实时通知
 */
export function useRealtimeNotifications(
  onNotification?: (notification: Notification) => void,
) {
  const { lastMessage, status } = useWebSocket();

  useEffect(() => {
    if (lastMessage && onNotification) {
      onNotification(lastMessage);
    }
  }, [lastMessage, onNotification]);

  return { status, lastMessage };
}

// ============================================================================
// 导出
// ============================================================================

export default WebSocketProvider;
