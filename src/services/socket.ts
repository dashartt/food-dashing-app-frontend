import socketio from "socket.io-client";

// const SOCKET_URL = "http://localhost:3002";
const SOCKET_URL = "https://macacoloucopizzaria.osc-fr1.scalingo.io:3002";

export const socket = socketio(SOCKET_URL);
