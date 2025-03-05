import { Box } from "@mui/material";

const Main = (children: React.ReactNode) => {
  return (
    <Box
      sx={{
        padding: {
          lg: "2rem",
          xl: "2rem",
        },
        paddingTop: "2rem",
        paddingBottom: "2rem",
      }}
    >
      {children}
    </Box>
  );
};

export default Main;
