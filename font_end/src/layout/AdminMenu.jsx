import React, { useEffect, useState } from 'react'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Collapse from '@mui/material/Collapse'
import { Box, Typography, useTheme } from '@mui/material'
import { Link } from 'react-router-dom'
import { colorBaseAdmin, customFont, customListItem } from './menuStyle'
import { AiOutlineDashboard } from 'react-icons/ai'
import { RiBillLine } from 'react-icons/ri'
import { CiMoneyBill } from 'react-icons/ci'
import { GiConverseShoe } from 'react-icons/gi'
import { LiaMoneyCheckAltSolid } from 'react-icons/lia'
import { MdOutlineSell } from 'react-icons/md'
import { IoChevronForwardOutline } from 'react-icons/io5'
import { FiUsers } from 'react-icons/fi'

export default function AdminMenu({ isCloseOpenMenu, isMenuLg }) {
  const theme = useTheme()
  const [isMenuProduct, setIsMenuProduct] = useState(
    localStorage.getItem('isShowProduct') === 'true' ? true : false,
  )
  const [isMenuAccount, setIsMenuAccount] = useState(
    localStorage.getItem('isShowAccountMenu') === 'true' ? true : false,
  )

  const [menuLg, setMenuLg] = useState(isMenuLg)

  const handleClickOpenMenuProduct = () => {
    localStorage.setItem('isShowProduct', !isMenuProduct)
    setIsMenuProduct(!isMenuProduct)
  }
  const handleClickOpenMenuAccount = () => {
    localStorage.setItem('isShowAccountMenu', !isMenuAccount)
    setIsMenuAccount(!isMenuAccount)
  }

  const handleCloseOpenMenu = (isClose) => {
    if (typeof isCloseOpenMenu == 'function') {
      isCloseOpenMenu(isClose)
    }
  }
  useEffect(() => {
    setMenuLg(isMenuLg)
  }, [isMenuLg])

  useEffect(() => {
    localStorage.setItem('isShowProduct', isMenuProduct)
    localStorage.setItem('isShowAccountMenu', isMenuAccount)
  }, [isMenuProduct, isMenuAccount])

  return (
    <List
      onMouseEnter={() => {
        if (!isMenuLg) {
          setMenuLg(true)
        }
      }}
      onMouseLeave={() => {
        if (!isMenuLg) {
          setMenuLg(false)
        }
      }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      sx={{ overflow: 'hidden' }}
      subheader={
        <Typography
          textAlign="center"
          variant="h6"
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'cursive',
            lineHeight: '10vh',
            minHeight: '10vh',
            maxHeight: '10vh',
          }}>
          <Box
            component={'img'}
            sx={{
              filter: theme.palette.mode === 'dark' ? 'grayscale(1) invert(1)' : 'none',
              transition: 'width 0.5s',
              width: menuLg ? '100px' : '50px',
            }}
            src={require('../assets/image/logoweb.png')}
            alt="logo"
          />
        </Typography>
      }>
      <Box
        sx={{
          transition: 'width 0.5s, min-width 0.5s',
          p: 0,
          overflow: 'auto',
          '::-webkit-scrollbar': {
            width: '2px',
          },
          '::-webkit-scrollbar-thumb': {
            background: 'rgba(76,78,100,0.4)',
          },
          maxHeight: '90vh',
          minHeight: '90vh',
          minWidth: menuLg ? '250px' : '70px',
          width: menuLg ? '10vw' : '70px',
        }}>
        <ListItemButton sx={customListItem} onClick={() => handleCloseOpenMenu(false)}>
          <ListItemIcon sx={{ minWidth: '40px' }}>
            <Box
              component={AiOutlineDashboard}
              sx={{ fontSize: '25px', ...colorBaseAdmin.colorText }}
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
          <ListItemIcon sx={{ minWidth: '40px' }}>
            <Box component={RiBillLine} sx={{ fontSize: '25px', ...colorBaseAdmin.colorText }} />
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
        <ListItemButton sx={customListItem} onClick={() => handleCloseOpenMenu(false)}>
          <ListItemIcon sx={{ minWidth: '40px' }}>
            <Box component={CiMoneyBill} sx={{ fontSize: '25px', ...colorBaseAdmin.colorText }} />
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
        <ListItemButton sx={{ ...customListItem, mb: 0 }} onClick={handleClickOpenMenuProduct}>
          <ListItemIcon sx={{ minWidth: '40px' }}>
            <Box
              component={GiConverseShoe}
              sx={{ fontSize: '25px', ...colorBaseAdmin.colorText }}
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
          <Box
            component={IoChevronForwardOutline}
            sx={{
              ...colorBaseAdmin.colorText,
              transition: 'transform 0.5s ease',
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
              <ListItemButton sx={customListItem} onClick={() => handleCloseOpenMenu(false)}>
                <ListItemText
                  sx={{ m: 0, p: 0 }}
                  primaryTypographyProps={{
                    ...customFont,
                    ...colorBaseAdmin.colorText,
                  }}
                  primary="&nbsp;	&bull; &nbsp; &nbsp; Size"
                />
              </ListItemButton>

              <ListItemButton sx={customListItem} onClick={() => handleCloseOpenMenu(false)}>
                <ListItemText
                  sx={{ m: 0, p: 0 }}
                  primaryTypographyProps={{
                    ...customFont,
                    ...colorBaseAdmin.colorText,
                  }}
                  primary="&nbsp;	&bull; &nbsp; &nbsp; Đế giày"
                />
              </ListItemButton>
              <ListItemButton sx={customListItem} onClick={() => handleCloseOpenMenu(false)}>
                <ListItemText
                  sx={{ m: 0, p: 0 }}
                  primaryTypographyProps={{
                    ...customFont,
                    ...colorBaseAdmin.colorText,
                  }}
                  primary="&nbsp;	&bull; &nbsp; &nbsp; Màu sắc"
                />
              </ListItemButton>

              <ListItemButton
                sx={customListItem}
                component={Link}
                to="/admin/category"
                onClick={() => handleCloseOpenMenu(false)}>
                <ListItemText
                  sx={{ m: 0, p: 0 }}
                  primaryTypographyProps={{
                    ...customFont,
                    ...colorBaseAdmin.colorText,
                  }}
                  primary="&nbsp;	&bull; &nbsp; &nbsp; Loại giày"
                />
              </ListItemButton>
              <ListItemButton
                sx={customListItem}
                component={Link}
                to="/admin/material"
                onClick={() => handleCloseOpenMenu(false)}>
                <ListItemText
                  sx={{ m: 0, p: 0 }}
                  primaryTypographyProps={{
                    ...customFont,
                    ...colorBaseAdmin.colorText,
                  }}
                  primary="&nbsp;	&bull; &nbsp; &nbsp; Chất liệu"
                />
              </ListItemButton>

              <ListItemButton
                sx={customListItem}
                component={Link}
                to="/admin/brand"
                onClick={() => handleCloseOpenMenu(false)}>
                <ListItemText
                  sx={{ m: 0, p: 0 }}
                  primaryTypographyProps={{
                    ...customFont,
                    ...colorBaseAdmin.colorText,
                  }}
                  primary="&nbsp;	&bull; &nbsp; &nbsp; Thương hiệu"
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
          <ListItemIcon sx={{ minWidth: '40px' }}>
            <Box
              component={LiaMoneyCheckAltSolid}
              sx={{ fontSize: '25px', ...colorBaseAdmin.colorText }}
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
          <ListItemIcon sx={{ minWidth: '40px' }}>
            <Box component={MdOutlineSell} sx={{ fontSize: '25px', ...colorBaseAdmin.colorText }} />
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
        <ListItemButton sx={{ ...customListItem, mb: 0 }} onClick={handleClickOpenMenuAccount}>
          <ListItemIcon sx={{ minWidth: '40px' }}>
            <Box component={FiUsers} sx={{ fontSize: '25px', ...colorBaseAdmin.colorText }} />
          </ListItemIcon>
          <ListItemText
            sx={{ m: 0, p: 0 }}
            primaryTypographyProps={{
              ...customFont,
              ...colorBaseAdmin.colorText,
            }}
            primary="Tài khoản"
          />
          <Box
            component={IoChevronForwardOutline}
            sx={{
              ...colorBaseAdmin.colorText,
              transition: 'transform 0.5s ease',
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
  )
}
