import {
  AppBar,
  Avatar,
  Badge,
  Box,
  Button,
  Drawer,
  ListItemIcon,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from '@mui/material'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import './HeadingClient.css'
import { useDispatch, useSelector } from 'react-redux'
import { GetCart, setCart, setCartLogout } from '../../services/slices/cartSlice'
import { useEffect } from 'react'
import authenticationAPi from '../../api/authentication/authenticationAPi'
import { getCookie, removeCookie } from '../../services/cookie'
import confirmSatus from '../../components/comfirmSwal'
import { GetUser, removeUser } from '../../services/slices/userSlice'
import clientCartApi from '../../api/client/clientCartApi'
import { Logout } from '@mui/icons-material'

export default function HeadingClient() {
  const [openDrawer, setOpenDrawer] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null)
  const [openMenuProfile, setOpenMenuProfile] = useState(false)
  const handleClick = (event) => {
    anchorEl === null ? setAnchorEl(event.currentTarget) : setAnchorEl(null)
    openMenuProfile === false ? setOpenMenuProfile(true) : setOpenMenuProfile(false)
  }

  const handleDrawerToggle = () => {
    setOpenDrawer(!openDrawer)
  }
  useEffect(() => {
    if (getCookie('ClientToken')) {
      dispatch(setCart([]))
      clientCartApi.get().then(
        (result) => {
          if (result.data.success) {
            dispatch(
              setCart(
                result.data.data.map((cart) => {
                  return { ...cart, image: cart.image.split(',') }
                }),
              ),
            )
          }
        },
        () => {},
      )
    }
  }, [])

  const amountProduct = useSelector(GetCart).length

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
          to="/about-us"
          color="inherit">
          Loại Giầy
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
          to="/news"
          color="inherit">
          Tin tức
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
          to="/contact"
          color="inherit">
          Liên hệ
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
          to="/tracking"
          color="inherit">
          Tra cứu
        </Typography>
      </Box>
    )
  }
  const user = useSelector(GetUser)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  function handleAccount() {
    const title = 'Xác nhận đăng xuất tài khoản?'
    if (user) {
      confirmSatus(title, '').then((result) => {
        if (result.isConfirmed) {
          removeCookie('ClientToken')
          dispatch(setCartLogout([]))
          dispatch(removeUser())
        }
      })
    } else {
      navigate('/login')
    }
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
          <Badge badgeContent={amountProduct} color="error">
            <ShoppingCartIcon />
          </Badge>
        </Button>
        <IconButton
          sx={{ borderRadius: '0px' }}
          onClick={(event) => handleClick(event)}
          color="inherit">
          <Avatar src={user && user.avatar} sx={{ width: 35, height: 35, mr: 1 }} />
          <Menu
            anchorEl={anchorEl}
            open={openMenuProfile}
            slotProps={{
              paper: {
                elevation: 0,
                sx: {
                  overflow: 'visible',
                  filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                  mt: 1.5,
                  '& .MuiAvatar-root': {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  '&:before': {
                    content: '""',
                    display: 'block',
                    position: 'absolute',
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: 'background.paper',
                    transform: 'translateY(-50%) rotate(45deg)',
                    zIndex: 0,
                  },
                },
              },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}>
            {user ? (
              <>
                <Link to={`/profile/user`} style={{ textDecoration: 'none', color: 'black' }}>
                  <MenuItem>
                    <Avatar /> Tài khoản của tôi
                  </MenuItem>
                </Link>
                <MenuItem style={{ color: 'black' }} onClick={() => handleAccount()}>
                  <ListItemIcon>
                    <Logout fontSize="small" />
                  </ListItemIcon>
                  Đăng xuất
                </MenuItem>
              </>
            ) : (
              <Link to={`/login`} style={{ textDecoration: 'none', color: 'black' }}>
                <MenuItem>
                  <Avatar /> Đăng nhập
                </MenuItem>
              </Link>
            )}
          </Menu>
          <Typography
            variant="subtitle2"
            sx={{
              textTransform: 'none',
              display: { md: 'block', xs: 'none' },
            }}>
            {user ? user.name : 'Đăng nhập'}
          </Typography>
        </IconButton>
      </Toolbar>
    </AppBar>
  )
}
