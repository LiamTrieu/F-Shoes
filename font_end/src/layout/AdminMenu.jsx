import React, { useEffect, useState } from "react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import LineAxisIcon from "@mui/icons-material/LineAxis";
import { Box, Typography } from "@mui/material";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import InventoryIcon from "@mui/icons-material/Inventory";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import LoyaltyIcon from "@mui/icons-material/Loyalty";
import { Link } from "react-router-dom";
import { colorText, customFont, customListItem } from "./menuStyle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRectangleAd } from "@fortawesome/free-solid-svg-icons";

export default function AdminMenu({ isCloseOpenMenu, isMenuLg }) {
  const [isMenuProduct, setIsMenuProduct] = useState(
    localStorage.getItem("isShowProduct") === "true" ? true : false
  );
  const [isMenuAccount, setIsMenuAccount] = useState(
    localStorage.getItem("isShowAccountMenu") === "true" ? true : false
  );
  useEffect(() => {
    localStorage.setItem("isShowProduct", isMenuProduct);
    localStorage.setItem("isShowAccountMenu", isMenuAccount);
  }, [isMenuProduct, isMenuAccount]);
  const handleClickOpenMenuProduct = () => {
    localStorage.setItem("isShowProduct", !isMenuProduct);
    setIsMenuProduct(!isMenuProduct);
  };
  const handleClickOpenMenuAccount = () => {
    localStorage.setItem("isShowAccountMenu", !isMenuAccount);
    setIsMenuAccount(!isMenuAccount);
  };

  const handleCloseOpenMenu = (isClose) => {
    if (typeof isCloseOpenMenu == "function") {
      isCloseOpenMenu(isClose);
    }
  };
  return (
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      sx={{ overflow: "hidden" }}
      subheader={
        <Typography
          textAlign={"center"}
          variant="h6"
          sx={{
            transition: "font-size 0.5s",
            fontFamily: "cursive",
            fontWeight: 900,
            lineHeight: "10vh",
            minHeight: "10vh",
            fontSize: isMenuLg ? "30px" : "10px",
            color: colorText.color,
          }}>
          F-Shoes
        </Typography>
      }>
      <Box
        sx={{
          transition: "width 0.5s",
          p: 0,
          overflow: "auto",
          "::-webkit-scrollbar": {
            width: "2px",
          },
          "::-webkit-scrollbar-thumb": {
            background: "rgba(76,78,100,0.4)",
          },

          maxHeight: "90vh",
          height: "100vh",
          minWidth: isMenuLg ? "250px" : "0px",
          width: isMenuLg ? "10vw" : "73px",
        }}>
        <ListItemButton
          sx={customListItem}
          onClick={() => handleCloseOpenMenu(false)}>
          <ListItemIcon sx={{ minWidth: "40px" }}>
            <LineAxisIcon sx={colorText} />
          </ListItemIcon>
          <ListItemText
            primaryTypographyProps={customFont}
            primary={isMenuLg ? "Thống kê" : ""}
          />
        </ListItemButton>
        <ListItemButton
          sx={customListItem}
          component={Link}
          to="/admin/bill"
          onClick={() => handleCloseOpenMenu(false)}>
          <ListItemIcon sx={{ minWidth: "40px" }}>
            <LocalMallIcon sx={colorText} />
          </ListItemIcon>
          <ListItemText
            primaryTypographyProps={customFont}
            primary={isMenuLg ? "Quản lý đơn hàng" : ""}
          />
        </ListItemButton>
        <ListItemButton
          sx={customListItem}
          onClick={() => handleCloseOpenMenu(false)}>
          <ListItemIcon sx={{ minWidth: "40px" }}>
            <AddShoppingCartIcon sx={colorText} />
          </ListItemIcon>
          <ListItemText
            primaryTypographyProps={customFont}
            primary={isMenuLg ? "Bán hàng tại quầy" : ""}
          />
        </ListItemButton>
        <ListItemButton
          sx={customListItem}
          onClick={handleClickOpenMenuProduct}>
          <ListItemIcon sx={{ minWidth: "40px" }}>
            <InventoryIcon sx={colorText} />
          </ListItemIcon>
          <ListItemText
            primaryTypographyProps={customFont}
            primary={isMenuLg ? "Quản lý sản phẩm" : ""}
          />
          {isMenuLg && (
            <Box
              sx={{
                transition: "transform 0.5s ease", // Sử dụng ease để làm cho animation mượt mà hơn
                transform: `rotate(${isMenuProduct ? 0 : 90}deg)`,
              }}>
              <NavigateNextIcon />
            </Box>
          )}
        </ListItemButton>
        {isMenuLg && (
          <Collapse in={isMenuProduct} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton
                sx={customListItem}
                component={Link}
                to="/admin/product"
                onClick={() => handleCloseOpenMenu(false)}>
                <ListItemText
                  primaryTypographyProps={customFont}
                  primary="&nbsp;	&bull; &nbsp; &nbsp; Sản phẩm"
                />
              </ListItemButton>
              <ListItemButton
                sx={customListItem}
                onClick={() => handleCloseOpenMenu(false)}>
                <ListItemText
                  primaryTypographyProps={customFont}
                  primary="&nbsp;	&bull; &nbsp; &nbsp; Thuộc tính"
                />
              </ListItemButton>
            </List>
          </Collapse>
        )}
        <ListItemButton
          sx={customListItem}
          component={Link}
          to="/admin/voucher"
          onClick={() => handleCloseOpenMenu(false)}>
          <ListItemIcon sx={{ minWidth: "40px" }}>
            <FontAwesomeIcon icon={faRectangleAd} size="lg" color="#171717" />
          </ListItemIcon>
          <ListItemText
            primaryTypographyProps={customFont}
            primary={isMenuLg ? "Voucher" : ""}
          />
        </ListItemButton>
        <ListItemButton
          sx={customListItem}
          component={Link}
          to="/admin/promotion"
          onClick={() => handleCloseOpenMenu(false)}>
          <ListItemIcon sx={{ minWidth: "40px" }}>
            <LoyaltyIcon sx={colorText} />
          </ListItemIcon>
          <ListItemText
            primaryTypographyProps={customFont}
            primary={isMenuLg ? "Khuyến mãi" : ""}
          />
        </ListItemButton>
        <ListItemButton
          sx={customListItem}
          onClick={handleClickOpenMenuAccount}>
          <ListItemIcon sx={{ minWidth: "40px" }}>
            <PeopleAltIcon sx={colorText} />
          </ListItemIcon>
          <ListItemText
            primaryTypographyProps={customFont}
            primary={isMenuLg ? "Tài khoản" : ""}
          />
          {isMenuLg && (
            <Box
              sx={{
                transition: "transform 0.5s ease", // Sử dụng ease để làm cho animation mượt mà hơn
                transform: `rotate(${isMenuAccount ? 0 : 90}deg)`,
              }}>
              <NavigateNextIcon />
            </Box>
          )}
        </ListItemButton>
        {isMenuLg && (
          <Collapse in={isMenuAccount} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton
                sx={customListItem}
                component={Link}
                to="/admin/staff"
                onClick={() => handleCloseOpenMenu(false)}>
                <ListItemText
                  primaryTypographyProps={customFont}
                  primary="&nbsp;	&bull; &nbsp; &nbsp; Nhân viên"
                />
              </ListItemButton>
              <ListItemButton
                sx={customListItem}
                component={Link}
                to="/admin/customer"
                onClick={() => handleCloseOpenMenu(false)}>
                <ListItemText
                  primaryTypographyProps={customFont}
                  primary="&nbsp;	&bull; &nbsp; &nbsp; Khách hàng"
                />
              </ListItemButton>
            </List>
          </Collapse>
        )}
      </Box>
    </List>
  );
}
