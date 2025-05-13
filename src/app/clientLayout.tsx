"use client";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { PAGES, UNPROTECTED_PATHS } from "@/utils/pages";
import { useCookies } from "next-client-cookies";
import { SESSION_ID } from "@/features/cookies/constants";

const ClientLayout = ({ isLoggedInOnLoad }: { isLoggedInOnLoad: boolean }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(isLoggedInOnLoad);
  const cookies = useCookies();

  useEffect(() => {
    const sessionId = cookies.get(SESSION_ID);
    setIsLoggedIn(!!sessionId);
  }, [cookies]);

  useEffect(() => {
    if (!isLoggedIn && !UNPROTECTED_PATHS.includes(pathname)) {
      router.push(PAGES.LOGIN);
    }
  }, [isLoggedIn, pathname, router]);

  return <></>;
};

export default ClientLayout;
