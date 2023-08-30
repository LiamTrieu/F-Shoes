import React, { useEffect, useState } from "react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import LineAxisIcon from "@mui/icons-material/LineAxis";
import { Typography } from "@mui/material";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import InventoryIcon from "@mui/icons-material/Inventory";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import LoyaltyIcon from "@mui/icons-material/Loyalty";
import PercentIcon from "@mui/icons-material/Percent";
import { Link } from "react-router-dom";

export default function AdminMenu({ isCloseOpenMenu }) {
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
      sx={{
        p: 0,
        overflow: "auto",
        maxHeight: "100vh",
        height: "100vh",
        minWidth: "260px",
        width: "20vw",
        borderRight: "1px solid #D3D3D3",
      }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <Typography
          textAlign={"center"}
          variant="h6"
          sx={{
            fontFamily: "cursive",
            fontWeight: 900,
            p: 2,
            fontSize: "25px",
            color: "inherit",
          }}>
          F-Shoes
        </Typography>
      }>
      <ListItemButton onClick={() => handleCloseOpenMenu(false)}>
        <ListItemIcon>
          <LineAxisIcon sx={{ color: "black" }} />
        </ListItemIcon>
        <ListItemText primary="Thống kê" />
      </ListItemButton>
      <ListItemButton
        component={Link}
        to="/admin/bill"
        onClick={() => handleCloseOpenMenu(false)}>
        <ListItemIcon>
          <LocalMallIcon sx={{ color: "black" }} />
        </ListItemIcon>
        <ListItemText primary="Quản lý đơn hàng" />
      </ListItemButton>
      <ListItemButton onClick={() => handleCloseOpenMenu(false)}>
        <ListItemIcon>
          <AddShoppingCartIcon sx={{ color: "black" }} />
        </ListItemIcon>
        <ListItemText primary="Bán hàng tại quầy" />
      </ListItemButton>
      <ListItemButton onClick={handleClickOpenMenuProduct}>
        <ListItemIcon>
          <InventoryIcon sx={{ color: "black" }} />
        </ListItemIcon>
        <ListItemText primary="Quản lý sản phẩm" />
        {isMenuProduct ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={isMenuProduct} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton
            component={Link}
            to="/admin/product"
            sx={{ pl: 4 }}
            onClick={() => handleCloseOpenMenu(false)}>
            <ListItemText primary="&nbsp;	&bull; &nbsp; &nbsp; Sản phẩm" />
          </ListItemButton>
          <ListItemButton
            sx={{ pl: 4 }}
            onClick={() => handleCloseOpenMenu(false)}>
            <ListItemText primary="&nbsp;	&bull; &nbsp; &nbsp; Thuộc tính" />
          </ListItemButton>
        </List>
      </Collapse>
      <ListItemButton
        component={Link}
        to="/admin/voucher"
        onClick={() => handleCloseOpenMenu(false)}>
        <ListItemIcon>
          <PercentIcon sx={{ color: "black" }} />
        </ListItemIcon>
        <ListItemText primary="Voucher" />
      </ListItemButton>
      <ListItemButton
        component={Link}
        to="/admin/promotion"
        onClick={() => handleCloseOpenMenu(false)}>
        <ListItemIcon>
          <LoyaltyIcon sx={{ color: "black" }} />
        </ListItemIcon>
        <ListItemText primary="Khuyến mãi" />
      </ListItemButton>
      <ListItemButton onClick={handleClickOpenMenuAccount}>
        <ListItemIcon>
          <PeopleAltIcon sx={{ color: "black" }} />
        </ListItemIcon>
        <ListItemText primary="Tài khoản" />
        {isMenuAccount ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={isMenuAccount} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton
            component={Link}
            to="/admin/staff"
            sx={{ pl: 4 }}
            onClick={() => handleCloseOpenMenu(false)}>
            <ListItemText primary="&nbsp;	&bull; &nbsp; &nbsp; Nhân viên" />
          </ListItemButton>
          <ListItemButton
            component={Link}
            to="/admin/customer"
            sx={{ pl: 4 }}
            onClick={() => handleCloseOpenMenu(false)}>
            <ListItemText primary="&nbsp;	&bull; &nbsp; &nbsp; Khách hàng" />
          </ListItemButton>
        </List>
      </Collapse>
    </List>
  );
}
