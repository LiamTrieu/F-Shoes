import React, { useEffect, useState } from "react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import {
  chageImage,
  colorBaseAdmin,
  customFont,
  customListItem,
} from "./menuStyle";
import { AiOutlineDashboard } from "react-icons/ai";
import { RiBillLine } from "react-icons/ri";
import { CiMoneyBill } from "react-icons/ci";
import { GiConverseShoe } from "react-icons/gi";
import { LiaMoneyCheckAltSolid } from "react-icons/lia";
import { MdOutlineSell } from "react-icons/md";
import { IoChevronForwardOutline } from "react-icons/io5";
import { FiUsers } from "react-icons/fi";

export default function AdminMenu({ isCloseOpenMenu, isMenuLg }) {
  const [isMenuProduct, setIsMenuProduct] = useState(
    localStorage.getItem("isShowProduct") === "true" ? true : false
  );
  const [isMenuAccount, setIsMenuAccount] = useState(
    localStorage.getItem("isShowAccountMenu") === "true" ? true : false
  );

  const [menuLg, setMenuLg] = useState(isMenuLg);

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
  useEffect(() => {
    setMenuLg(isMenuLg);
  }, [isMenuLg]);

  useEffect(() => {
    localStorage.setItem("isShowProduct", isMenuProduct);
    localStorage.setItem("isShowAccountMenu", isMenuAccount);
  }, [isMenuProduct, isMenuAccount]);

  return (
    <List
      onMouseEnter={() => {
        if (!isMenuLg) {
          setMenuLg(true);
        }
      }}
      onMouseLeave={() => {
        if (!isMenuLg) {
          setMenuLg(false);
        }
      }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      sx={{ overflow: "hidden" }}
      subheader={
        <Typography
          textAlign="center"
          variant="h6"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "cursive",
            fontWeight: 900,
            lineHeight: "10vh",
            minHeight: "10vh",
            maxHeight: "10vh",
          }}>
          <img
            style={{
              transition: "width 0.5s",
              width: menuLg ? "100px" : "50px",
            }}
            src={chageImage.src}
            alt="logo"
          />
        </Typography>
      }>
      <Box
        sx={{
          transition: "width 0.5s, min-width 0.5s",
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
          minWidth: menuLg ? "250px" : "70px",
          width: menuLg ? "10vw" : "70px",
        }}>
        <ListItemButton
          sx={customListItem}
          onClick={() => handleCloseOpenMenu(false)}>
          <ListItemIcon sx={{ minWidth: "40px" }}>
            <AiOutlineDashboard
              style={{ fontSize: "25px", ...colorBaseAdmin.colorText }}
            />
          </ListItemIcon>
          <ListItemText
            sx={{ m: 0, p: 0 }}
            primaryTypographyProps={{
              ...customFont,
              ...colorBaseAdmin.colorText,
            }}
            primary="Thống kê"
          />
        </ListItemButton>
        <ListItemButton
          sx={customListItem}
          component={Link}
          to="/admin/bill"
          onClick={() => handleCloseOpenMenu(false)}>
          <ListItemIcon sx={{ minWidth: "40px" }}>
            <RiBillLine
              style={{ fontSize: "25px", ...colorBaseAdmin.colorText }}
            />
          </ListItemIcon>
          <ListItemText
            sx={{ m: 0, p: 0 }}
            primaryTypographyProps={{
              ...customFont,
              ...colorBaseAdmin.colorText,
            }}
            primary="Quản lý đơn hàng"
          />
        </ListItemButton>
        <ListItemButton
          sx={customListItem}
          onClick={() => handleCloseOpenMenu(false)}>
          <ListItemIcon sx={{ minWidth: "40px" }}>
            <CiMoneyBill
              style={{ fontSize: "25px", ...colorBaseAdmin.colorText }}
            />
          </ListItemIcon>
          <ListItemText
            sx={{ m: 0, p: 0 }}
            primaryTypographyProps={{
              ...customFont,
              ...colorBaseAdmin.colorText,
            }}
            primary="Bán hàng tại quầy"
          />
        </ListItemButton>
        <ListItemButton
          sx={{ ...customListItem, mb: 0 }}
          onClick={handleClickOpenMenuProduct}>
          <ListItemIcon sx={{ minWidth: "40px" }}>
            <GiConverseShoe
              style={{ fontSize: "25px", ...colorBaseAdmin.colorText }}
            />
          </ListItemIcon>
          <ListItemText
            sx={{ m: 0, p: 0 }}
            primaryTypographyProps={{
              ...customFont,
              ...colorBaseAdmin.colorText,
            }}
            primary="Quản lý sản phẩm"
          />
          <IoChevronForwardOutline
            style={{
              ...colorBaseAdmin.colorText,
              transition: "transform 0.5s ease",
              transform: `rotate(${isMenuProduct ? 0 : 90}deg)`,
            }}
          />
        </ListItemButton>
        {menuLg && (
          <Collapse in={isMenuProduct} timeout={500}>
            <List component="div" disablePadding>
              <ListItemButton
                sx={customListItem}
                component={Link}
                to="/admin/product"
                onClick={() => handleCloseOpenMenu(false)}>
                <ListItemText
                  sx={{ m: 0, p: 0 }}
                  primaryTypographyProps={{
                    ...customFont,
                    ...colorBaseAdmin.colorText,
                  }}
                  primary="&nbsp;	&bull; &nbsp; &nbsp; Sản phẩm"
                />
              </ListItemButton>
              <ListItemButton
                sx={customListItem}
                onClick={() => handleCloseOpenMenu(false)}>
                <ListItemText
                  sx={{ m: 0, p: 0 }}
                  primaryTypographyProps={{
                    ...customFont,
                    ...colorBaseAdmin.colorText,
                  }}
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
            <LiaMoneyCheckAltSolid
              style={{ fontSize: "25px", ...colorBaseAdmin.colorText }}
            />
          </ListItemIcon>
          <ListItemText
            sx={{ m: 0, p: 0 }}
            primaryTypographyProps={{
              ...customFont,
              ...colorBaseAdmin.colorText,
            }}
            primary="Voucher"
          />
        </ListItemButton>
        <ListItemButton
          sx={customListItem}
          component={Link}
          to="/admin/promotion"
          onClick={() => handleCloseOpenMenu(false)}>
          <ListItemIcon sx={{ minWidth: "40px" }}>
            <MdOutlineSell
              style={{ fontSize: "25px", ...colorBaseAdmin.colorText }}
            />
          </ListItemIcon>
          <ListItemText
            sx={{ m: 0, p: 0 }}
            primaryTypographyProps={{
              ...customFont,
              ...colorBaseAdmin.colorText,
            }}
            primary="Khuyến mãi"
          />
        </ListItemButton>
        <ListItemButton
          sx={{ ...customListItem, mb: 0 }}
          onClick={handleClickOpenMenuAccount}>
          <ListItemIcon sx={{ minWidth: "40px" }}>
            <FiUsers
              style={{ fontSize: "25px", ...colorBaseAdmin.colorText }}
            />
          </ListItemIcon>
          <ListItemText
            sx={{ m: 0, p: 0 }}
            primaryTypographyProps={{
              ...customFont,
              ...colorBaseAdmin.colorText,
            }}
            primary="Tài khoản"
          />
          <IoChevronForwardOutline
            style={{
              ...colorBaseAdmin.colorText,
              transition: "transform 0.5s ease",
              transform: `rotate(${isMenuAccount ? 0 : 90}deg)`,
            }}
          />
        </ListItemButton>
        {menuLg && (
          <Collapse in={isMenuAccount} timeout={500}>
            <List component="div" disablePadding>
              <ListItemButton
                sx={customListItem}
                component={Link}
                to="/admin/staff"
                onClick={() => handleCloseOpenMenu(false)}>
                <ListItemText
                  sx={{ m: 0, p: 0 }}
                  primaryTypographyProps={{
                    ...customFont,
                    ...colorBaseAdmin.colorText,
                  }}
                  primary="&nbsp;	&bull; &nbsp; &nbsp; Nhân viên"
                />
              </ListItemButton>
              <ListItemButton
                sx={{ ...customListItem, pb: 0 }}
                component={Link}
                to="/admin/customer"
                onClick={() => handleCloseOpenMenu(false)}>
                <ListItemText
                  sx={{ m: 0, p: 0 }}
                  primaryTypographyProps={{
                    ...customFont,
                    ...colorBaseAdmin.colorText,
                  }}
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
