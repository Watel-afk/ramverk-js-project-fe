"use client";
import { Box, TextField, Typography } from "@mui/material";
// import { useState } from "react";

export default function Login() {
  // const [password, setPassword] = useState();

  return (
    <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
      <Typography variant="h1">Big fish trade</Typography>
      <form>
        <TextField label="Username" variant="outlined" type="text" />
        <TextField label="Password" variant="outlined" type="password" />
      </form>
    </Box>
  );
}
