import { io } from "socket.io-client";

const socket = io({
  query: {
    x: 42
  }
});