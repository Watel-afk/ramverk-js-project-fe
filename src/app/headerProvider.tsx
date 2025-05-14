"use client";
import Navbar from "@/components/navbar/Navbar";
import { SESSION_ID } from "@/features/cookies/constants";
import { PAGES, UNPROTECTED_PATHS } from "@/utils/pages";
import { Box } from "@mui/material";
import { useCookies } from "next-client-cookies";
import { usePathname, useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

type HeaderContextType = {
  isLoggedIn: boolean;
  sessionId?: string | null;
};

const HeaderContext = createContext<HeaderContextType | undefined>(undefined);

export const HeaderProvider = ({
  children,
  isLoggedInOnLoad,
}: {
  children: React.ReactNode;
  isLoggedInOnLoad: boolean;
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const cookies = useCookies();
  const [isLoggedIn, setIsLoggedIn] = useState(isLoggedInOnLoad);
  const [sessionId, setSessionId] = useState<string | undefined>();

  useEffect(() => {
    const cookieSessionId = cookies.get(SESSION_ID);
    const loggedIn = !!cookieSessionId;

    setSessionId(cookieSessionId);
    setIsLoggedIn(loggedIn);

    if (!loggedIn && !UNPROTECTED_PATHS.includes(pathname)) {
      router.push(PAGES.LOGIN);
    }
  }, [pathname, router, cookies]);

  return (
    <HeaderContext.Provider value={{ isLoggedIn, sessionId }}>
      {isLoggedIn && pathname !== PAGES.LOGIN && <Navbar />}
      <Box paddingTop={"6rem"}>
        {isLoggedIn || pathname === PAGES.LOGIN ? children : null}
      </Box>
    </HeaderContext.Provider>
  );
};

export const useHeader = () => {
  const context = useContext(HeaderContext);
  if (!context)
    throw new Error("HeaderContext must be used within an HeaderProvider");
  return context;
};
