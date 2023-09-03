import React, { useState } from "react";
import {
  Avatar,
  Badge,
  Box,
  Container,
  IconButton,
  SwipeableDrawer,
  Toolbar,
  Tooltip,
  useMediaQuery,
} from "@mui/material";
import AdminMenu from "./AdminMenu";

export default function AdminHeader(props) {
  const [openMenuLg, setOpenMenuLg] = useState(true);
  const [openMenu, setOpenMenu] = useState(false);
  const isMdScreen = useMediaQuery("(min-width: 992px)");

  const showOpenMenu = (open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setOpenMenu(open);
  };

  const handleMenuClose = (isClose) => {
    setOpenMenu(isClose);
  };

  return (
    <Box display="flex" height="100vh">
      {isMdScreen && <AdminMenu isMenuLg={openMenuLg} />}
      <Box flexGrow={1}>
        <Toolbar
          style={{
            minHeight: "10vh",
            boxShadow: "0 1px 2px 0 rgba(0,0,0,.05)",
          }}>
          <IconButton
            onClick={() => {
              if (isMdScreen) setOpenMenuLg(!openMenuLg);
              else setOpenMenu(!openMenu);
            }}
            size="large"
            color="inherit"
            sx={{ mr: 2 }}>
            {/* <FontAwesomeIcon
              // icon={faBarsStaggered}
              rotation={openMenuLg ? 180 : 0}
              size="xs"
            /> */}
          </IconButton>
          <SwipeableDrawer
            onOpen={showOpenMenu(true)}
            open={openMenu}
            onClose={showOpenMenu(false)}>
            {!isMdScreen && openMenu && (
              <AdminMenu isCloseOpenMenu={handleMenuClose} isMenuLg={true} />
            )}
          </SwipeableDrawer>
          <Box flexGrow={1} />
          <Tooltip title="Thông báo">
            <IconButton size="large" color="inherit">
              <Badge badgeContent={4} color="error">
                {/* <NotificationsIcon /> */}
              </Badge>
            </IconButton>
          </Tooltip>
          <Tooltip title="Tài khoản">
            <IconButton size="small" sx={{ ml: 2 }}>
              <Avatar
                src={`https://static.vecteezy.com/system/resources/previews/000/439/863/original/vector-users-icon.jpg`}
                sx={{ width: 32, height: 32 }}
              />
            </IconButton>
          </Tooltip>
        </Toolbar>
        <Box
          style={{ overflow: "auto", minHeight: "90vh" }}
          sx={{ backgroundColor: "#F6F9FC" }}>
          <Container maxWidth="xl" sx={{ mt: 2 }}>
            {props.children}
          </Container>
        </Box>
      </Box>
    </Box>
  );
}
