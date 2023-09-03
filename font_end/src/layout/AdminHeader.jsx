import React, { useState } from "react";
import {
  Avatar,
  Badge,
  Box,
  Container,
  IconButton,
  SwipeableDrawer,
  ThemeProvider,
  Toolbar,
  Tooltip,
  createTheme,
  useMediaQuery,
} from "@mui/material";
import AdminMenu from "./AdminMenu";
import { AiOutlineMenuFold } from "react-icons/ai";
import { IoMdNotificationsOutline } from "react-icons/io";
import { MdOutlineModeNight, MdOutlineLightMode } from "react-icons/md";
import { colorBaseAdmin } from "./menuStyle";
import chageDarkMode from "../services/common/chageDarkMode";

export default function AdminHeader(props) {
  const [darkMode, setDarkMode] = useState(false);
  const themeMode = createTheme({
    typography: { fontFamily: "Open Sans" },
    palette: {
      mode: darkMode ? "dark" : "light",
      background: {
        default: darkMode ? "#1F263C" : "#FFFFFF",
        paper: darkMode ? "#1F263C" : "#FFFFFF",
      },
      text: {
        primary: darkMode ? "#d2d2e8" : "#333333",
      },
    },
  });
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
    <ThemeProvider theme={themeMode}>
      <Box display="flex" height="100vh" sx={colorBaseAdmin.colorBgNav}>
        {isMdScreen && <AdminMenu isMenuLg={openMenuLg} />}
        <Box flexGrow={1}>
          <Toolbar
            style={{
              minHeight: "10vh",
              boxShadow: "0 1px 2px 0 rgba(0,0,0,.05)",
            }}>
            <IconButton
              color="inherit"
              onClick={() => {
                if (isMdScreen) setOpenMenuLg(!openMenuLg);
                else setOpenMenu(!openMenu);
              }}
              sx={{
                transform: `rotate(${openMenuLg ? 0 : 180}deg)`,
              }}>
              <AiOutlineMenuFold
                style={{ fontSize: "25px", ...colorBaseAdmin.colorText }}
              />
            </IconButton>
            {openMenu && (
              <SwipeableDrawer
                onOpen={showOpenMenu(true)}
                open={openMenu}
                onClose={showOpenMenu(false)}>
                {!isMdScreen && openMenu && (
                  <AdminMenu
                    isCloseOpenMenu={handleMenuClose}
                    isMenuLg={true}
                  />
                )}
              </SwipeableDrawer>
            )}
            <Box flexGrow={1} />
            <Tooltip title={darkMode ? "Chế độ tối" : "Chế độ sáng"}>
              <IconButton
                size="small"
                color="inherit"
                onClick={() => {
                  setDarkMode(!darkMode);
                  chageDarkMode(darkMode);
                }}>
                {darkMode ? (
                  <MdOutlineModeNight
                    style={{ ...colorBaseAdmin.colorText, fontSize: "23px" }}
                  />
                ) : (
                  <MdOutlineLightMode
                    style={{ ...colorBaseAdmin.colorText, fontSize: "23px" }}
                  />
                )}
              </IconButton>
            </Tooltip>
            <Tooltip title="Thông báo">
              <IconButton size="small" color="inherit" sx={{ m: 1.5 }}>
                <Badge variant="dot" invisible={false} color="error">
                  <IoMdNotificationsOutline
                    style={{ ...colorBaseAdmin.colorText, fontSize: "23px" }}
                  />
                </Badge>
              </IconButton>
            </Tooltip>
            <Tooltip title="Tài khoản">
              <IconButton size="small">
                <Avatar
                  src={require("../assets/image/image.png")}
                  sx={{ width: 35, height: 35 }}
                />
              </IconButton>
            </Tooltip>
          </Toolbar>

          <Container
            maxWidth="xl"
            sx={{
              ...colorBaseAdmin.colorBg,
              overflow: "auto",
              minHeight: "90vh",
              pt: 2,
            }}>
            {props.children}
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
