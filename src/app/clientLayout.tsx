"use client";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { PAGES, UNPROTECTED_PATHS } from "@/utils/pages";

const ClientLayout = ({
  isLoggedInPromise,
}: {
  isLoggedInPromise: Promise<boolean>;
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const isLoggedIn = async () => {
      setIsLoading(true);
      const isLoggedIn = await isLoggedInPromise;
      setIsLoading(false);
      setIsLoggedIn(isLoggedIn);
    };

    isLoggedIn();
  }, [isLoggedInPromise, pathname, router]);

  useEffect(() => {
    if (isLoading) {
      return;
    }

    if (!isLoggedIn && !UNPROTECTED_PATHS.includes(pathname)) {
      router.push(PAGES.LOGIN);
    }
  }, [isLoading, isLoggedIn, pathname, router]);

  return <></>;
};

export default ClientLayout;
