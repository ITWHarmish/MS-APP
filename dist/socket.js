"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_1 = require("socket.io");
let connection = null;
class Socket {
    constructor() {
        this.socket = null;
    }
    connect(server) {
        const socketIO = new socket_io_1.Server(server, {
            cors: {
                origin: [process.env.CLIENT_URL, "http://ms-app.local"],
                methods: ["GET", "POST"],
                credentials: true,
            },
        });
        socketIO.on("connection", (socket) => {
            this.socket = socket;
        });
    }
    emit(event, data) {
        this.socket.emit(event, data);
    }
    static init(server) {
        if (!connection) {
            connection = new Socket();
            connection.connect(server);
        }
    }
    static getConnection() {
        return connection;
    }
}
exports.default = {
    connect: Socket.init,
    connection: Socket.getConnection,
};
// import { Server } from "socket.io";
// export let socket = null;
// export const SocketConnect = (http) => {
//   const io = new Server(http, {
//     cors: {
//       origin: process.env.CLIENT_URL,
//       methods: ["GET", "POST"],
//       credentials: true,
//     },
//   });
//   io.on("connection", (socket: any) => {
//     console.log("a user connected");
//     socket = socket;
//   });
// };
