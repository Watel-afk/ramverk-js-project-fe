import { useState } from "react";
import { ErrorResponse } from "@/features/request/dataTypes";
import { useSnackbar } from "@/components/snackbar/SnackbarProvider";
import { ERROR_MESSAGES } from "@/features/utils/constants";
import { useHeader } from "@/app/headerProvider";
import { useCookies } from "next-client-cookies";
import { SESSION_ID } from "@/features/cookies/constants";
import { createItemListing } from "../requests";
import { CreateItemListingRequest, ItemListingResponse } from "../dataTypes";
import { useRouter } from "next/navigation";
import { PAGES } from "@/utils/pages";

export const useCreateItemListing = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { addErrorMessage } = useSnackbar();
  const { sessionId } = useHeader();
  const cookies = useCookies();
  const router = useRouter();

  const doCreateItemListing = async (body: CreateItemListingRequest) => {
    if (!sessionId) return;

    setIsLoading(true);

    const response = await createItemListing({ body, sessionId });

    let responseObject = undefined;
    let errorResponse = undefined;

    if (response.status === 200) {
      responseObject = (await response.json()) as ItemListingResponse;
    } else if (response.status === 401) {
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
      itemListing: responseObject?.itemListing,
      errorResponse: errorResponse,
      status: response.status,
      ok: response.status === 200,
    };
  };

  return { doCreateCreateItemListing: doCreateItemListing, isLoading };
};
