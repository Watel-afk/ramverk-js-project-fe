import { HTTPS_METHODS } from "../request/dataTypes";
import { API_URL } from "../request/endpoints";
import { sendRequest } from "../request/request";
import { LoginRequest } from "./datatypes";

export const login = async ({ body }: { body: LoginRequest }) => {
  return await sendRequest({
    url: API_URL.authentication.login(),
    method: HTTPS_METHODS.POST,
    body,
  });
};

export const logout = async (sessionId: string) => {
  return await sendRequest({
    url: API_URL.authentication.logout(),
    method: HTTPS_METHODS.POST,
    sessionId: sessionId,
  });
};
