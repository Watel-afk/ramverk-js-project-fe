import { useState } from "react";
import { ErrorResponse } from "@/features/request/dataTypes";
import { useSnackbar } from "@/components/snackbar/SnackbarProvider";
import { ERROR_MESSAGES } from "@/features/utils/constants";
import { AddBalance } from "../requests";
import { useHeader } from "@/app/headerProvider";
import { AddBalanceRequest, UserResponse } from "../dataTypes";
import { useCookies } from "next-client-cookies";
import { SESSION_ID } from "@/features/cookies/constants";

export const useAddBalance = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { addErrorMessage } = useSnackbar();
  const { sessionId } = useHeader();
  const cookies = useCookies();

  const doAddBalance = async (body: AddBalanceRequest) => {
    if (!sessionId) return;

    setIsLoading(true);

    const response = await AddBalance({ sessionId, body });

    let responseObject = undefined;
    let errorResponse = undefined;
    if (response.status === 200) {
      responseObject = (await response.json()) as UserResponse;
    } else if (response.status === 500) {
      cookies.remove(SESSION_ID);
      addErrorMessage("Session expired");
    } else {
      try {
        errorResponse = (await response.json()) as ErrorResponse;
        addErrorMessage(errorResponse.message);
      } catch {
        addErrorMessage(ERROR_MESSAGES.UNEXPECTED_ERROR);
      }
    }

    setIsLoading(false);

    return {
      user: responseObject?.user,
      errorResponse: errorResponse,
      status: response.status,
      ok: response.status === 200,
    };
  };

  return { doAddBalance, isLoading };
};
