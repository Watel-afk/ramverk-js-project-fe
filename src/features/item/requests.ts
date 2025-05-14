import { HTTPS_METHODS } from "../request/dataTypes";
import { API_URL } from "../request/endpoints";
import { SendRequest } from "../request/request";
import { CreateItemListingRequest } from "./dataTypes";

export const BuyItemListing = async ({
  sessionId,
  itemListingId,
}: {
  sessionId: string;
  itemListingId: string;
}) => {
  return await SendRequest({
    url: API_URL.itemListing.buyItemListings(itemListingId),
    method: HTTPS_METHODS.POST,
    sessionId,
  });
};

export const CreateItemListing = async ({
  sessionId,
  body,
}: {
  sessionId: string;
  body: CreateItemListingRequest;
}) => {
  return await SendRequest({
    url: API_URL.itemListing.createItemListings(),
    method: HTTPS_METHODS.POST,
    body,
    sessionId,
  });
};

export const GetMyItems = async (sessionId: string) => {
  return await SendRequest({
    url: API_URL.item.getMyItems(),
    method: HTTPS_METHODS.GET,
    sessionId,
  });
};

export const GetMyListedItems = async (sessionId: string) => {
  return await SendRequest({
    url: API_URL.itemListing.getMyItemListings(),
    method: HTTPS_METHODS.GET,
    sessionId,
  });
};
