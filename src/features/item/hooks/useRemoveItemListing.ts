import { useState } from "react";
import { ErrorResponse } from "@/features/request/dataTypes";
import { useSnackbar } from "@/components/snackbar/SnackbarProvider";
import { ERROR_MESSAGES } from "@/features/utils/constants";
import { useHeader } from "@/app/headerProvider";
import { useCookies } from "next-client-cookies";
import { SESSION_ID } from "@/features/cookies/constants";
import { removeItemListing } from "../requests";
import { useRouter } from "next/navigation";
import { PAGES } from "@/utils/pages";

export const useRemoveItemListing = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { addErrorMessage } = useSnackbar();
  const { sessionId } = useHeader();
  const cookies = useCookies();
  const router = useRouter();

  const doRemoveItemListing = async (itemListingId: string) => {
    if (!sessionId) return;

    setIsLoading(true);

    const response = await removeItemListing({ sessionId, itemListingId });

    let errorResponse = undefined;

    if (response.status === 401) {
      cookies.remove(SESSION_ID);
      addErrorMessage("Session expired");
      router.replace(PAGES.LOGIN);
      return;
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
      errorResponse: errorResponse,
      status: response.status,
      ok: response.status === 200,
    };
  };

  return { doRemoveItemListing, isLoading };
};
