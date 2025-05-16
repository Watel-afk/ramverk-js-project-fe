import { HTTPS_METHODS } from "../request/dataTypes";
import { API_URL } from "../request/endpoints";
import { sendRequest } from "../request/request";
import { CreateItemListingRequest } from "./dataTypes";

export const buyItemListing = async ({
  sessionId,
  itemListingId,
}: {
  sessionId: string;
  itemListingId: string;
}) => {
  return await sendRequest({
    url: API_URL.itemListing.buyItemListings(itemListingId),
    method: HTTPS_METHODS.POST,
    sessionId,
  });
};

export const createItemListing = async ({
  sessionId,
  body,
}: {
  sessionId: string;
  body: CreateItemListingRequest;
}) => {
  return await sendRequest({
    url: API_URL.itemListing.createItemListings(),
    method: HTTPS_METHODS.POST,
    body,
    sessionId,
  });
};

export const getMyItems = async (sessionId: string) => {
  return await sendRequest({
    url: API_URL.item.getMyItems(),
    method: HTTPS_METHODS.GET,
    sessionId,
  });
};

export const getMyListedItems = async (sessionId: string) => {
  return await sendRequest({
    url: API_URL.itemListing.getMyItemListings(),
    method: HTTPS_METHODS.GET,
    sessionId,
  });
};

export const getAvailableListedItems = async (sessionId: string) => {
  return await sendRequest({
    url: API_URL.itemListing.getAvailableItemListings(),
    method: HTTPS_METHODS.GET,
    sessionId,
  });
};

export const removeItemListing = async ({
  sessionId,
  itemListingId,
}: {
  sessionId: string;
  itemListingId: string;
}) => {
  return await sendRequest({
    url: API_URL.itemListing.removeItemListing(itemListingId),
    method: HTTPS_METHODS.POST,
    sessionId,
  });
};
