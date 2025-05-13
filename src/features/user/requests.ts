import { HTTPS_METHODS } from "../request/dataTypes";
import { SendRequest } from "../request/request";
import { RegisterUserRequest } from "./dataTypes";

export const registerNewUser = async ({
  body,
}: {
  body: RegisterUserRequest;
}) => {
  return await SendRequest({
    url: "/api/user/register",
    method: HTTPS_METHODS.POST,
    body,
  });
};
