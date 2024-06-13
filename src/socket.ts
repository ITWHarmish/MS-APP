import { Server } from "socket.io";

let connection: Socket | null = null;

class Socket {
  private socket: any;

  constructor() {
    this.socket = null;
  }

  connect(server) {
    const socketIO = new Server(server, {
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

  emit(event: string, data?: undefined) {
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

export default {
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
