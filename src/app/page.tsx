"use client";

import { PAGES } from "@/utils/pages";
import { Box, Button, Container, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <Container>
      <Typography align="center" variant="h2">
        Welcome!
      </Typography>
      <Typography align="center" variant="body1">
        Here in Retro media you can trade in anything retro. So what are you
        waiting for get started now.
      </Typography>
      <Box
        display={"flex"}
        flexDirection={"row"}
        justifyContent={"center"}
        marginTop={"2rem"}
      >
        <Button variant="contained" onClick={() => router.push(PAGES.MARKET)}>
          Get Started trading
        </Button>
      </Box>
    </Container>
  );
}
