import socketio from "socket.io-client";

const SOCKET_URL = "http://localhost:3002";

export const socket = socketio(SOCKET_URL);
