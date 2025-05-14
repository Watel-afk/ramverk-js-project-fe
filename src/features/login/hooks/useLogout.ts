import { useState } from "react";
import { logout } from "../requests";
import { useHeader } from "@/app/headerProvider";
import { useCookies } from "next-client-cookies";
import { SESSION_ID } from "@/features/cookies/constants";

export const useLogout = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { sessionId } = useHeader();
  const cookies = useCookies();

  const doLogout = async () => {
    if (!sessionId) return;

    setIsLoading(true);

    const response = await logout(sessionId);
    cookies.remove(SESSION_ID);

    setIsLoading(false);

    return {
      status: response.status,
      ok: response.status === 200,
    };
  };

  return { doLogout, isLoading };
};
