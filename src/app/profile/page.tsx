"use client";
import { Box, Container, Tab, Tabs, useMediaQuery } from "@mui/material";
import { useState } from "react";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import InventoryIcon from "@mui/icons-material/Inventory";
import ReceiptIcon from "@mui/icons-material/Receipt";
import UserTab from "@/components/profile/UserTab";
import theme from "@/theme/theme";
import MyItemsTab from "@/components/profile/MyItemsTab";
import MyItemListingsTab from "@/components/profile/MyItemListingsTab";

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

export default function Profile() {
  const [value, setValue] = useState(0);
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Container>
      <Box
        sx={{
          flexGrow: 1,
          bgcolor: "background.paper",
          display: "flex",
          height: "90vh",
        }}
      >
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          sx={{
            borderRight: 1,
            borderColor: "divider",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Tab
            label={!isMobile ? "User" : undefined}
            icon={isMobile ? <AccountBoxIcon /> : undefined}
            {...a11yProps(0)}
          />
          <Tab
            label={!isMobile ? "Owned Items" : undefined}
            icon={isMobile ? <InventoryIcon /> : undefined}
            {...a11yProps(1)}
          />
          <Tab
            label={!isMobile ? "Listed Items" : undefined}
            icon={isMobile ? <ReceiptIcon /> : undefined}
            {...a11yProps(2)}
          />
        </Tabs>
        <TabPanel value={value} index={0}>
          <UserTab />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <MyItemsTab />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <MyItemListingsTab />
        </TabPanel>
      </Box>
    </Container>
  );
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}
