const BASE_API_URL = process.env.NEXT_PUBLIC_API_URL;

export const API_URL = {
  authentication: {
    login: () => getUrl("/authentications/login"),
    logout: () => getUrl("/authentications/logout"),
  },
  item: {
    createItem: () => getUrl("/items/create-item"),
    getItem: (id: string) => getUrl("items/{:id}/get-item", id),
    getItems: () => getUrl("/items/get-items"),
    getMyItems: () => getUrl("/items/get-my-items"),
  },
  itemListing: {
    buyItemListings: (id: string) =>
      getUrl("/item-listings/{:id}/buy-item-listing", id),
    createItemListings: () => getUrl("/item-listings/create-item-listing"),
    getAvailableItemListings: () =>
      getUrl("/item-listings/get-available-item-listings"),
    getMyItemListings: () => getUrl("/item-listings/get-my-item-listings"),
  },
  user: {
    addBalance: () => getUrl("/users/add-balance"),
    changePassword: () => getUrl("/users/change-password"),
    getCurrentUser: () => getUrl("/users/get-current-user"),
    getUsers: () => getUrl("/users/get-users"),
    register: () => getUrl("/users/create-user"),
  },
};

function getUrl(path: string, id?: string): string {
  if (id) {
    path = path.replace("{:id}", id);
  }
  return `${BASE_API_URL}${path}`;
}
