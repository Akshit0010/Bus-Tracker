import { io } from "socket.io-client";

const SOCKET_URL = "http://localhost:3000";
// Initialize the Socket.IO client
const socket = io(SOCKET_URL);

export default socket;