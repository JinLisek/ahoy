import axios from "axios";
import Cookies from "universal-cookie";

const BACKEND_ADDRESS = "192.168.1.165";
const BACKEND_PORT = "8000";

const createBackendUrl = (protocol, target) => protocol + "://" + BACKEND_ADDRESS + ":" + BACKEND_PORT + "/" + target;

const createBackendApi = () => {
  const cookies = new Cookies();
  const csrfCookie = cookies.get("csrftoken");

  return axios.create({
    withCredentials: true,
    headers: { "X-CSRFToken": csrfCookie },
  });
};

const onSocketOpen = (event) => {
  console.info("WebSocket was opened by server");
};

const onSocketClose = (event) => {
  console.warn("WebSocket was closed by server");
};

export const postBackend = async (target, data) => {
  const backendApi = createBackendApi();
  return await backendApi.post(createBackendUrl("http", target), data);
};

export const getBackend = async (target) => {
  const backendApi = createBackendApi();
  return await backendApi.get(createBackendUrl("http", target));
};

export const createWebSocket = (target, onMsg) => {
  const socket = new WebSocket(createBackendUrl("ws", target));
  socket.addEventListener("open", onSocketOpen);
  socket.onmessage = onMsg;
  socket.onclose = onSocketClose;
  return socket;
};
