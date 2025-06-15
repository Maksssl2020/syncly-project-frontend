import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

let stompClient: Client;

export const connectStomp = (token: string) => {
  stompClient = new Client({
    webSocketFactory: () => new SockJS("http://localhost:8080/ws"),
    connectHeaders: {
      Authorization: `Bearer ${token}`,
    },
    reconnectDelay: 5000,
    debug: (value) => console.log(value),
    onConnect: () => {
      console.log("Połączono ze STOMP");
    },
    onStompError: (frame) => {
      console.log("STOMP Error: ", frame);
    },
  });

  stompClient.activate();
};
