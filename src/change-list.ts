import socket from "./socket";

export const TaskChange = () => {
  const connection = socket.connection();
  if (connection) connection.emit("task-change");
};

export const TimelogChange = () => {
  const connection = socket.connection();
  if (connection) connection.emit("timelog-change");
};
