import { ItemListing } from "@/features/item/dataTypes";
import { Box, CircularProgress, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useGetMyListedItems } from "@/features/item/hooks/useGetMyListedItems";
import ItemListingCard from "../item/ItemListingCard";
import { useGetCurrentUser } from "@/features/user/hooks/useGetCurrentUser";
import { User } from "@/features/user/dataTypes";

const MyItemListingsTab = () => {
  const { doGetMyListedItems, isLoading } = useGetMyListedItems();
  const { doGetCurrentUser, isLoading: getCurrentUserIsLoading } =
    useGetCurrentUser();

  const [itemListings, setItemListings] = useState<ItemListing[] | undefined>(
    undefined
  );
  const [user, setUser] = useState<User | undefined>(undefined);

  useEffect(() => {
    if (itemListings !== undefined || isLoading) return;

    const fetchItemListings = async () => {
      const response = await doGetMyListedItems();
      if (response?.ok && response.itemListings) {
        setItemListings(response.itemListings);
      }
    };

    fetchItemListings();
  }, [doGetMyListedItems, isLoading, itemListings]);

  useEffect(() => {
    if (user !== undefined || getCurrentUserIsLoading) return;

    const fetchUser = async () => {
      const response = await doGetCurrentUser();
      if (response?.ok && response.user) {
        setUser(response.user);
      }
    };

    fetchUser();
  }, [user, doGetCurrentUser, getCurrentUserIsLoading]);

  return (
    <Box display={"flex"} flexDirection={"column"} gap={"1rem"}>
      <Typography variant="h4">My item listings</Typography>
      {isLoading || getCurrentUserIsLoading ? (
        <CircularProgress />
      ) : (
        itemListings?.map((itemListings) => (
          <ItemListingCard
            key={itemListings._id}
            itemListing={itemListings}
            user={user}
          />
        ))
      )}
    </Box>
  );
};

export default MyItemListingsTab;
