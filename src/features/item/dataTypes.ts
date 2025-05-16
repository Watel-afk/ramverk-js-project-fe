export type CreateItemListingRequest = {
  itemId: string;
  price: number;
};

export type ItemResponse = {
  item: Item;
};

export type ItemListingResponse = {
  itemListing: ItemListing;
};

export type ItemsResponse = {
  items: Item[];
};

export type ItemListingsResponse = {
  itemListings: ItemListing[];
};

export type Item = {
  _id: string;
  name: string;
  description: string;
  category: string;
  ownerId: string;
  type: string;
  imageLink: string;
  publishedYear: string;
  purchasedPrice: string;
  availableItemListing: ItemListing | undefined;
};

export type ItemListing = {
  _id: string;
  sellerId: string;
  itemId: Item;
  price: number;
  status: string;
};
