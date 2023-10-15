import { AppBar, Badge, Box, Button, Drawer, Toolbar, Typography } from '@mui/material'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import './HeadingClient.css'

export default function HeadingClient() {
  const [openDrawer, setOpenDrawer] = useState(false)

  const handleDrawerToggle = () => {
    setOpenDrawer(!openDrawer)
  }

  const BarSelect = () => {
    return (
      <Box mx={3} display={{ md: 'flex' }} className="menu-title">
        <Typography
          display={{ md: 'none', xs: 'block' }}
          variant="h5"
          fontWeight={'900'}
          fontFamily={'monospace'}
          textAlign={'center'}>
          Menu
        </Typography>
        <Typography
          onClick={() => {
            setOpenDrawer(false)
          }}
          component={Link}
          to="/"
          color="inherit"
          className="link-with-underline"
          sx={{
            my: { md: 0, xs: 2 },
            display: 'block',
            fontFamily: 'monospace',
            fontSize: '17px',
            fontWeight: 600,
            textDecoration: 'none',
          }}>
          Trang chủ
        </Typography>
        <Typography
          onClick={() => {
            setOpenDrawer(false)
          }}
          className="link-with-underline"
          sx={{
            marginLeft: { md: 4 },
            fontFamily: 'monospace',
            fontSize: '17px',
            fontWeight: 600,
            textDecoration: 'none',
          }}
          component={Link}
          to="/products"
          color="inherit">
          Sản phẩm
        </Typography>
        <Typography
          onClick={() => {
            setOpenDrawer(false)
          }}
          className="link-with-underline"
          sx={{
            marginLeft: { md: 4 },
            fontFamily: 'monospace',
            fontSize: '17px',
            fontWeight: 600,
            textDecoration: 'none',
          }}
          component={Link}
          to="/products"
          color="inherit">
          Giới thiệu
        </Typography>
        <Typography
          onClick={() => {
            setOpenDrawer(false)
          }}
          className="link-with-underline"
          sx={{
            marginLeft: { md: 4 },
            fontFamily: 'monospace',
            fontSize: '17px',
            fontWeight: 600,
            textDecoration: 'none',
          }}
          component={Link}
          to="/products"
          color="inherit">
          Liên hệ
        </Typography>
      </Box>
    )
  }

  return (
    <AppBar position="sticky" sx={{ backgroundColor: 'white', color: 'black', mb: 2 }}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="menu"
          onClick={handleDrawerToggle}
          edge="start"
          sx={{ display: { sm: 'block', md: 'none' } }} // Chỉ hiển thị icon menu trên màn hình sm
        >
          <MenuIcon />
        </IconButton>
        <Drawer
          PaperProps={{
            style: { minWidth: '200px' },
          }}
          anchor="left"
          open={openDrawer}
          onClose={handleDrawerToggle}>
          <BarSelect />
        </Drawer>
        <Typography variant="h6" component={Link} to="/">
          <Box
            component={'img'}
            sx={{
              p: 6,
              py: 0,
              transition: 'width 0.5s',
              height: '60px',
            }}
            src={require('../../assets/image/logowebnobg.png')}
            alt="logo"
          />
        </Typography>
        <Box sx={{ flexGrow: 1 }}>
          <Box sx={{ display: { md: 'block', xs: 'none' } }}>
            <BarSelect />
          </Box>
        </Box>
        <Button component={Link} to="/cart" color="inherit">
          <Badge badgeContent={4} color="error">
            <ShoppingCartIcon />
          </Badge>
        </Button>
        <Button component={Link} to="/login" color="inherit">
          <AccountCircleIcon sx={{ mr: 1 }} />
          <Typography
            variant="subtitle2"
            sx={{
              textTransform: 'none',
              display: { md: 'block', xs: 'none' },
            }}>
            Đăng nhập
          </Typography>
        </Button>
      </Toolbar>
    </AppBar>
  )
}
