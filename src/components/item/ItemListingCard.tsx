import { ItemListing } from "@/features/item/dataTypes";
import { useBuyItemListing } from "@/features/item/hooks/useBuyItemListing";
import { User } from "@/features/user/dataTypes";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useCallback, useState } from "react";
import { useSnackbar } from "../snackbar/SnackbarProvider";
import { useRemoveItemListing } from "@/features/item/hooks/useRemoveItemListing";
import theme from "@/theme/theme";
const BASE_API_URL = process.env.NEXT_PUBLIC_API_URL;

const ItemListingCard = ({
  itemListing,
  user,
}: {
  itemListing: ItemListing;
  user?: User;
}) => {
  const { addMessage } = useSnackbar();
  const { isLoading: buyItemListingLoading, doBuyItemListing } =
    useBuyItemListing();
  const { isLoading: removeItemListingLoading, doRemoveItemListing } =
    useRemoveItemListing();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [wasSoldOrRemoved, setWasSoldOrRemoved] = useState(false);

  const buy = useCallback(async () => {
    const response = await doBuyItemListing(itemListing._id);

    if (response?.ok) {
      addMessage("Item was purchased", "success");
      setWasSoldOrRemoved(true);
    }
  }, [doBuyItemListing, itemListing._id, addMessage]);

  const removeItemListing = useCallback(async () => {
    const response = await doRemoveItemListing(itemListing._id);

    if (response?.ok) {
      addMessage("Item listing was removed", "success");
      setWasSoldOrRemoved(true);
    }
  }, [doRemoveItemListing, itemListing._id, addMessage]);

  return (
    <Card sx={{ display: wasSoldOrRemoved ? "none" : !isMobile ? "flex" : "" }}>
      <CardMedia
        component="img"
        sx={{ width: 200 }}
        image={BASE_API_URL + itemListing.itemId.imageLink}
      />
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography component="div" variant="caption">
            Category {itemListing.itemId?.category}
          </Typography>
          <Typography component="div" variant="h5">
            {itemListing.itemId?.name}
          </Typography>
          <Typography
            variant="body1"
            component="div"
            sx={{ color: "text.secondary" }}
          >
            {itemListing.itemId?.description}
          </Typography>

          <Box marginTop={"2rem"}>
            <Typography component="div" variant="body1">
              <strong>Price {itemListing.price} </strong>
            </Typography>
          </Box>
          {itemListing.itemId.ownerId === user?._id ? (
            <Button
              variant="contained"
              onClick={removeItemListing}
              loading={removeItemListingLoading}
            >
              Remove item listing
            </Button>
          ) : (
            <Button
              variant="contained"
              onClick={buy}
              loading={buyItemListingLoading}
            >
              Buy
            </Button>
          )}
        </CardContent>
      </Box>
    </Card>
  );
};

export default ItemListingCard;
