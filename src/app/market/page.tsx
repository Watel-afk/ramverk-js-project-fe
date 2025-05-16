"use client";
import ItemListingCard from "@/components/item/ItemListingCard";
import { ItemListing } from "@/features/item/dataTypes";
import { useGetAvailableListedItems } from "@/features/item/hooks/useGetAvailableItemListings";
import { User } from "@/features/user/dataTypes";
import { useGetCurrentUser } from "@/features/user/hooks/useGetCurrentUser";
import { Box, CircularProgress, Container, Typography } from "@mui/material";
import { useEffect, useState } from "react";

export default function Market() {
  const { doGetAvailableListedItems, isLoading } = useGetAvailableListedItems();
  const { doGetCurrentUser, isLoading: getCurrentUserIsLoading } =
    useGetCurrentUser();

  const [itemListings, setItemListings] = useState<ItemListing[] | undefined>(
    undefined
  );
  const [user, setUser] = useState<User | undefined>(undefined);

  useEffect(() => {
    if (itemListings !== undefined || isLoading) return;

    const fetchItemListings = async () => {
      const response = await doGetAvailableListedItems();
      if (response?.ok && response.itemListings) {
        setItemListings(response.itemListings);
      }
    };

    fetchItemListings();
  }, [doGetAvailableListedItems, isLoading, itemListings]);

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
    <Container>
      <Box display={"flex"} flexDirection={"column"} gap={"1rem"}>
        <Typography variant="h4">Market</Typography>
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
    </Container>
  );
}
