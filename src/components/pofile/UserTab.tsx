"use client";
import { User } from "@/features/user/dataTypes";
import { useAddBalance } from "@/features/user/hooks/useAddBalance";
import { useGetCurrentUser } from "@/features/user/hooks/useGetCurrentUser";
import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";
import { useCallback, useEffect, useState } from "react";

const UserTab = () => {
  const { doGetCurrentUser, isLoading: getCurrentUserIsLoading } =
    useGetCurrentUser();
  const { doAddBalance, isLoading: addBalanceIsLoading } = useAddBalance();
  const [user, setUser] = useState<User | undefined>(undefined);
  const [balance, setBalance] = useState<number>(user?.balance ?? 0);

  useEffect(() => {
    if (user !== undefined || getCurrentUserIsLoading) return;

    const fetchUser = async () => {
      const response = await doGetCurrentUser();
      if (response?.ok && response.user) {
        setUser(response.user);
        setBalance(response.user?.balance);
      }
    };

    fetchUser();
  }, [user, doGetCurrentUser, getCurrentUserIsLoading]);

  const handleAddBalance = useCallback(async () => {
    const response = await doAddBalance({ balanceToAdd: balance });

    if (response?.ok && response.user) {
      setBalance(response.user?.balance);
    }
  }, [balance, doAddBalance]);

  return (
    <Box display={"flex"} flexDirection={"column"} gap={"1rem"}>
      <Typography variant="h4">User Data</Typography>
      {getCurrentUserIsLoading ? (
        <CircularProgress />
      ) : (
        <>
          <TextField label="Username" disabled value={user?.username} />
          <TextField label="Password" disabled value={"*************"} />

          <Box display={"flex"} flexDirection={"row"} gap={"1rem"}>
            <TextField
              label="balance"
              type="number"
              value={balance}
              onChange={(e) => setBalance(Number(e.target.value))}
            />
            <Box
              display={"flex"}
              flexDirection={"column"}
              justifyContent={"center"}
            >
              <Button
                variant="contained"
                onClick={handleAddBalance}
                loading={addBalanceIsLoading}
              >
                Add Balance
              </Button>
            </Box>
          </Box>
        </>
      )}
    </Box>
  );
};

export default UserTab;
