import { io, Socket } from "socket.io-client";
import { getAccessToken } from "./auth-token";

let socketInstance: Socket | null = null;

const SOCKET_URL =
  process.env.NEXT_PUBLIC_API_SOCKET_URL ||
  (process.env.NEXT_PUBLIC_API_BASE_URL
    ? new URL(process.env.NEXT_PUBLIC_API_BASE_URL).origin
    : "https://frontend-task-chatapp.onrender.com");

/**
 * Initializes or returns the authenticated Socket.io singleton connection.
 * Passes the JWT token in the handshake auth object as required by the backend.
 */
export function getSocket(authToken?: string): Socket | null {
  const token = authToken || getAccessToken();
  if (!token) {
    if (socketInstance) {
      socketInstance.disconnect();
      socketInstance = null;
    }
    return null;
  }

  if (socketInstance && socketInstance.connected) {
    return socketInstance;
  }

  if (!socketInstance) {
    socketInstance = io(SOCKET_URL, {
      auth: { token },
      transports: ["websocket", "polling"],
      autoConnect: true,
      reconnection: true,
      reconnectionAttempts: 10,
      reconnectionDelay: 1000,
    });
  } else if (!socketInstance.connected) {
    socketInstance.auth = { token };
    socketInstance.connect();
  }

  return socketInstance;
}

/**
 * Disconnects and cleans up the active Socket.io instance.
 */
export function disconnectSocket(): void {
  if (socketInstance) {
    socketInstance.disconnect();
    socketInstance = null;
  }
}

/**
 * Returns whether the socket instance is actively connected.
 */
export function isSocketConnected(): boolean {
  return Boolean(socketInstance?.connected);
}

/**
 * Subscribes to socket connection state changes for React sync stores.
 */
export function subscribeSocketState(callback: () => void): () => void {
  const socket = getSocket();
  if (!socket) return () => {};

  socket.on("connect", callback);
  socket.on("disconnect", callback);

  return () => {
    socket.off("connect", callback);
    socket.off("disconnect", callback);
  };
}
