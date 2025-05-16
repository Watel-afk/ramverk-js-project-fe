import { HTTPS_METHODS } from "../request/dataTypes";
import { API_URL } from "../request/endpoints";
import { sendRequest } from "../request/request";
import { AddBalanceRequest, RegisterUserRequest } from "./dataTypes";

export const addBalance = async ({
  sessionId,
  body,
}: {
  sessionId: string;
  body: AddBalanceRequest;
}) => {
  return await sendRequest({
    url: API_URL.user.addBalance(),
    method: HTTPS_METHODS.POST,
    body,
    sessionId,
  });
};

export const getCurrentUser = async (sessionId: string) => {
  return await sendRequest({
    url: API_URL.user.getCurrentUser(),
    method: HTTPS_METHODS.GET,
    sessionId,
  });
};

export const registerUser = async ({ body }: { body: RegisterUserRequest }) => {
  return await sendRequest({
    url: API_URL.user.register(),
    method: HTTPS_METHODS.POST,
    body,
  });
};
