"use client";
import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useCallback, useEffect, useState } from "react";
import Link from "../link/Link";
import { PAGES as RouterPages } from "@/utils/pages";
import { useRouter } from "next/navigation";
import { AccountCircle } from "@mui/icons-material";
import { useLogout } from "@/features/login/hooks/useLogout";
import { useGetCurrentUser } from "@/features/user/hooks/useGetCurrentUser";
import { User } from "@/features/user/dataTypes";

const PAGES = [{ displayName: "Market", address: RouterPages.MARKET }];
const PROFILE = [
  { displayName: "Profile", address: RouterPages.PROFILE },
  { displayName: "Logout", address: RouterPages.LOGIN },
];

const Navbar = () => {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const router = useRouter();
  const { doLogout } = useLogout();
  const { doGetCurrentUser, isLoading } = useGetCurrentUser();
  const [user, setUser] = useState<User | undefined>(undefined);

  useEffect(() => {
    if (user !== undefined || isLoading) return;

    const fetchUser = async () => {
      const response = await doGetCurrentUser();
      if (response?.ok && response.user) {
        setUser(response.user);
      }
    };

    fetchUser();
  }, [user, doGetCurrentUser, isLoading]);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = useCallback(() => {
    setAnchorElNav(null);
  }, []);

  const handleCloseUserMenu = useCallback(() => {
    setAnchorElUser(null);
  }, []);

  const navigate = useCallback(
    (address: string) => {
      handleCloseNavMenu();
      router.push(address);
    },
    [router, handleCloseNavMenu]
  );

  const handleLogout = useCallback(async () => {
    await doLogout();
    router.replace(RouterPages.LOGIN);
  }, [doLogout, router]);

  return (
    <AppBar position="absolute">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Link
            href={RouterPages.HOME}
            sx={{ textDecoration: "none", color: "text.primary" }}
          >
            <Typography
              variant="h6"
              noWrap
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
              }}
            >
              Retro Media
            </Typography>
          </Link>
          <MobilNavigationMenu
            anchorElNav={anchorElNav}
            handleCloseNavMenu={handleCloseNavMenu}
            setAnchorElNav={setAnchorElNav}
          />
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {PAGES.map((page) => (
              <Button
                key={page.displayName}
                onClick={() => navigate(page.address)}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page.displayName}
              </Button>
            ))}
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton
                onClick={handleOpenUserMenu}
                sx={{
                  p: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: "5px",
                  padding: "1rem",
                }}
              >
                <Box display={"flex"} flexDirection={"row"} gap={"5px"}>
                  <AccountCircle />
                  <Typography>{user?.username}</Typography>
                </Box>
                <Typography variant="caption">{user?.balance} $</Typography>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {PROFILE.map((profile) => (
                <MenuItem
                  key={profile.displayName}
                  onClick={() => {
                    if (profile.displayName === "Logout") {
                      handleLogout();
                    } else {
                      navigate(profile.address);
                    }
                  }}
                >
                  <Typography sx={{ textAlign: "center" }}>
                    {profile.displayName}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

const MobilNavigationMenu = ({
  setAnchorElNav,
  handleCloseNavMenu,
  anchorElNav,
}: {
  setAnchorElNav: (target: null | HTMLElement) => void;
  handleCloseNavMenu: () => void;
  anchorElNav: HTMLElement | null;
}) => {
  const router = useRouter();

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const navigate = useCallback(
    (address: string) => {
      handleCloseNavMenu();
      router.push(address);
    },
    [router, handleCloseNavMenu]
  );

  return (
    <>
      <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
        <IconButton
          size="large"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleOpenNavMenu}
          color="inherit"
        >
          <MenuIcon />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorElNav}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          open={Boolean(anchorElNav)}
          onClose={handleCloseNavMenu}
          sx={{ display: { xs: "block", md: "none" } }}
        >
          {PAGES.map((page) => (
            <MenuItem
              key={page.displayName}
              onClick={() => navigate(page.address)}
            >
              <Typography sx={{ textAlign: "center" }}>
                {page.displayName}
              </Typography>
            </MenuItem>
          ))}
        </Menu>
      </Box>
      <Link
        href={RouterPages.HOME}
        sx={{
          textDecoration: "none",
          color: "text.primary",
          flexGrow: 1,
          display: { xs: "flex", md: "none" },
          mr: 2,
        }}
      >
        <Typography
          variant="h5"
          noWrap
          sx={{
            mr: 2,
            display: { xs: "flex", md: "none" },
            flexGrow: 1,
          }}
        >
          Retro Media
        </Typography>
      </Link>
    </>
  );
};

export default Navbar;
