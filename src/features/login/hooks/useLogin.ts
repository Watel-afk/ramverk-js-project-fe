import { useState } from "react";
import { LoginRequest, LoginResponse } from "../datatypes";
import { login } from "../requests";
import { ErrorResponse } from "@/features/request/dataTypes";
import { useSnackbar } from "@/components/snackbar/SnackbarProvider";
import { ERROR_MESSAGES } from "@/features/utils/constants";

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { addErrorMessage } = useSnackbar();

  const doLogin = async (body: LoginRequest) => {
    setIsLoading(true);

    const response = await login({ body });

    let loginResponse = undefined;
    let errorResponse = undefined;

    if (response.status === 200) {
      loginResponse = (await response.json()) as LoginResponse;
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
      loginResponse: loginResponse,
      errorResponse: errorResponse,
      status: response.status,
      hasError: response.status !== 200,
    };
  };

  return { doLogin, isLoading };
};
