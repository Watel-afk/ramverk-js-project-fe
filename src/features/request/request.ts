import { ValueOf } from "next/dist/shared/lib/constants";
import { HTTPS_METHODS } from "./dataTypes";

export const sendRequest = async ({
  url,
  method,
  body,
  sessionId,
}: {
  url: string;
  method: ValueOf<typeof HTTPS_METHODS>;
  body?: object | undefined;
  sessionId?: string;
}) => {
  try {
    const response = await fetch(url, {
      method: method,
      body: body ? JSON.stringify(body) : undefined,
      headers: {
        "Content-Type": "application/json",
        sessionId: sessionId != null ? sessionId : "",
      },
    });

    return response;
  } catch {
    return {
      ok: false,
      status: 0,
      json: async () => ({ message: "Server is not reachable" }),
    } as Response;
  }
};
