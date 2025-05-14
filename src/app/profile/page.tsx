import { Box, Container, Tabs } from "@mui/material";

export default function Profile() {
  return (
    <Container>
      <Box
        sx={{
          flexGrow: 1,
          bgcolor: "background.paper",
          display: "flex",
          height: 224,
        }}
      >
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          sx={{ borderRight: 1, borderColor: "divider" }}
        ></Tabs>
      </Box>
    </Container>
  );
}
