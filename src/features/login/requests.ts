import { HTTPS_METHODS } from "../request/dataTypes";
import { SendRequest } from "../request/request";
import { LoginRequest } from "./datatypes";

export const login = async ({ body }: { body: LoginRequest }) => {
  return await SendRequest({
    url: "/api/authentications/login",
    method: HTTPS_METHODS.POST,
    body,
  });
};

export const logout = async (sessionId: string) => {
  return await SendRequest({
    url: "/api/authentications/logout",
    method: HTTPS_METHODS.POST,
    sessionId: sessionId,
  });
};
