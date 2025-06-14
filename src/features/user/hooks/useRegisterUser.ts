import { useState } from "react";
import { ErrorResponse } from "@/features/request/dataTypes";
import { useSnackbar } from "@/components/snackbar/SnackbarProvider";
import { ERROR_MESSAGES } from "@/features/utils/constants";
import { RegisterUserRequest } from "../dataTypes";
import { registerUser } from "../requests";
import { useCookies } from "next-client-cookies";
import { useRouter } from "next/navigation";
import { SESSION_ID } from "@/features/cookies/constants";
import { PAGES } from "@/utils/pages";

export const useRegisterUser = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { addErrorMessage } = useSnackbar();
  const cookies = useCookies();
  const router = useRouter();

  const doRegisterUser = async (body: RegisterUserRequest) => {
    setIsLoading(true);

    const response = await registerUser({ body });

    let errorResponse = undefined;

    if (response.status === 401) {
      cookies.remove(SESSION_ID);
      addErrorMessage("Session expired");
      router.push(PAGES.LOGIN);
      return;
    } else if (response.status !== 200) {
      try {
        errorResponse = (await response.json()) as ErrorResponse;
        addErrorMessage(errorResponse.message);
      } catch {
        addErrorMessage(ERROR_MESSAGES.UNEXPECTED_ERROR);
      }
    }

    setIsLoading(false);

    return {
      errorResponse: errorResponse,
      status: response.status,
      ok: response.status === 200,
    };
  };

  return { doRegisterUser, isLoading };
};
