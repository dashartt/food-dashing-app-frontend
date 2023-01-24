import socketio from "socket.io-client";

const SOCKET_URL = "https://macacoloucopizzaria-backend.vercel.app";

export const socket = socketio(SOCKET_URL, {
  autoConnect: false,
});
