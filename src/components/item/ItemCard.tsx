import { Item } from "@/features/item/dataTypes";
import { useCreateItemListing } from "@/features/item/hooks/useCreateItemListing";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useCallback, useState } from "react";
import { useSnackbar } from "../snackbar/SnackbarProvider";
import theme from "@/theme/theme";
const BASE_API_URL = process.env.NEXT_PUBLIC_API_URL;

const ItemCard = ({ item }: { item: Item }) => {
  const [openSellDialog, setSellDialogOpen] = useState(false);
  const [itemWasPutOnSale, setItemWasPutOnSale] = useState(false);
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Card sx={{ display: !isMobile ? "flex" : "" }}>
      <CardMedia
        component="img"
        sx={{ width: 200 }}
        image={BASE_API_URL + item.imageLink}
      />
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography component="div" variant="caption">
            Category {item?.category}
          </Typography>
          <Typography component="div" variant="h5">
            {item?.name}
          </Typography>
          <Typography
            variant="body1"
            component="div"
            sx={{ color: "text.secondary" }}
          >
            {item?.description}
          </Typography>

          <Box marginTop={"2rem"}>
            <Typography component="div" variant="body1">
              <strong>Purchased for {item?.purchasedPrice} </strong>
            </Typography>
          </Box>
          <Button
            variant="contained"
            disabled={itemWasPutOnSale || item?.availableItemListing !== null}
            onClick={() => setSellDialogOpen(true)}
          >
            Sell
          </Button>
        </CardContent>
      </Box>
      <SellDialog
        itemToSell={item}
        openSellDialog={openSellDialog}
        setSellDialogOpen={setSellDialogOpen}
        setItemWasPutOnSale={setItemWasPutOnSale}
      />
    </Card>
  );
};

const SellDialog = ({
  itemToSell,
  openSellDialog,
  setSellDialogOpen,
  setItemWasPutOnSale,
}: {
  itemToSell: Item;
  openSellDialog: boolean;
  setSellDialogOpen: (open: boolean) => void;
  setItemWasPutOnSale: (open: boolean) => void;
}) => {
  const [price, setPrice] = useState<number>(0);
  const { addMessage } = useSnackbar();
  const { isLoading, doCreateCreateItemListing } = useCreateItemListing();

  const handleClose = useCallback(() => {
    setSellDialogOpen(false);
  }, [setSellDialogOpen]);

  const sellItem = useCallback(async () => {
    const response = await doCreateCreateItemListing({
      itemId: itemToSell._id,
      price: price,
    });

    if (response?.ok) {
      addMessage("Item was put on the market", "success");
      setItemWasPutOnSale(true);
      handleClose();
    }
  }, [
    addMessage,
    doCreateCreateItemListing,
    handleClose,
    setItemWasPutOnSale,
    itemToSell._id,
    price,
  ]);

  return (
    <Dialog
      open={openSellDialog}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {"Sell item " + itemToSell.name}
      </DialogTitle>
      <DialogContent>
        <TextField
          label="Price"
          type="number"
          onChange={(e) => setPrice(Number(e.target.value))}
          value={price}
          sx={{ marginTop: "1rem", marginBottom: "1rem" }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={sellItem} loading={isLoading}>
          Sell
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ItemCard;
