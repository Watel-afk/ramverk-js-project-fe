import getSessionId from "@/features/cookies/getSessionId";
import { useEffect, useState } from "react";

const useLogin = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      setIsLoading(true);

      const sessionId = await getSessionId();
      setLoggedIn(!!sessionId);

      setIsLoading(false);
    };

    checkSession();
  }, []);

  return {
    loggedIn,
    isLoading,
  };
};

export default useLogin;
