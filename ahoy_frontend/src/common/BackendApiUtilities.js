import axios from "axios";
import Cookies from "universal-cookie";

const BACKEND_PROTOCOL = "http";
const BACKEND_ADDRESS = "192.168.1.165";
const BACKEND_PORT = "8000";

const createBackendUrl = (target) => BACKEND_PROTOCOL + "://" + BACKEND_ADDRESS + ":" + BACKEND_PORT + "/" + target;

const createBackendApi = () => {
  const cookies = new Cookies();
  const csrfCookie = cookies.get("csrftoken");

  return axios.create({
    withCredentials: true,
    xsrfHeaderName: "X-CSRFToken",
    xsrfCookieName: "csrftoken",
    headers: { "X-CSRFToken": csrfCookie },
  });
};

export const postBackend = async (target, data) => {
  const backendApi = createBackendApi();
  return await backendApi.post(createBackendUrl(target), data);
};

export const getBackend = async (target) => {
  const backendApi = createBackendApi();
  return await backendApi.get(createBackendUrl(target));
};
