import { Item } from "@/features/item/dataTypes";
import { useGetMyItems } from "@/features/item/hooks/useGetMyItems";
import { Box, CircularProgress, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import ItemCard from "../item/ItemCard";

const MyItemsTab = () => {
  const { doGetMyItems, isLoading } = useGetMyItems();

  const [items, setItems] = useState<Item[] | undefined>(undefined);

  useEffect(() => {
    if (items !== undefined || isLoading) return;

    const fetchItems = async () => {
      const response = await doGetMyItems();
      if (response?.ok && response.items) {
        setItems(response.items);
      }
    };

    fetchItems();
  }, [doGetMyItems, isLoading, items]);

  return (
    <Box display={"flex"} flexDirection={"column"} gap={"1rem"}>
      <Typography variant="h4">Owned Items</Typography>
      {isLoading ? (
        <CircularProgress />
      ) : (
        items?.map((item) => <ItemCard key={item._id} item={item} />)
      )}
    </Box>
  );
};

export default MyItemsTab;
