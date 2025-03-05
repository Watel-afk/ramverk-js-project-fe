import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import useLogin from "@/features/login/hooks/useLogin";
import { PAGES, UNPROTECTED_PATHS } from "@/utils/pages";

const ClientLayout = () => {
  const { isLoading, loggedIn } = useLogin();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (isLoading) {
      return;
    }

    if (!loggedIn && !UNPROTECTED_PATHS.includes(pathname)) {
      router.push(PAGES.LOGIN);
    }
  }, [isLoading, loggedIn, pathname, router]);

  return <></>;
};

export default ClientLayout;
