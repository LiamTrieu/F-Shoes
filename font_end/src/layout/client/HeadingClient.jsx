import {
  AppBar,
  Avatar,
  Badge,
  Box,
  Button,
  Container,
  Drawer,
  ListItemIcon,
  Menu,
  MenuItem,
  Stack,
  TextField,
  Toolbar,
  Typography,
} from '@mui/material'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
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
import SearchIcon from '@mui/icons-material/Search'
import { FiPhone } from 'react-icons/fi'
import { FiMapPin } from 'react-icons/fi'

export default function HeadingClient() {
  const [openDrawer, setOpenDrawer] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null)
  const [openMenuProfile, setOpenMenuProfile] = useState(false)
  const location = useLocation()
  const handleClick = (event) => {
    anchorEl === null ? setAnchorEl(event.currentTarget) : setAnchorEl(null)
    openMenuProfile === false ? setOpenMenuProfile(true) : setOpenMenuProfile(false)
  }
  const [activeIndex, setActiveIndex] = useState(-1) // Initialize with -1 (no active index)

  const handleLinkClick = (index) => {
    setOpenDrawer(false)
    setActiveIndex(index)
  }

  const user = useSelector(GetUser)

  useEffect(() => {
    // handleLinkClick(0)
    if (getCookie('ClientToken')) {
      authenticationAPi.getClient().then((response) => {
        if (response.data.success) {
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
        } else {
          removeCookie('ClientToken')
          dispatch(setCartLogout([]))
        }
      })
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
            handleLinkClick(0)
          }}
          component={Link}
          to="/"
          color="inherit"
          className={`link-with-underline ${location.pathname === '/home' ? 'active-link' : ''}`}
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
            handleLinkClick(1)
          }}
          className={`link-with-underline ${
            location.pathname === '/products' ? 'active-link' : ''
          }`}
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
            handleLinkClick(2)
          }}
          className={`link-with-underline ${
            location.pathname === '/about-us' ? 'active-link' : ''
          }`}
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
          Loại Giày
        </Typography>
        <Typography
          onClick={() => {
            setOpenDrawer(false)
            handleLinkClick(3)
          }}
          className={`link-with-underline ${location.pathname === '/news' ? 'active-link' : ''}`}
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
            handleLinkClick(4)
          }}
          className={`link-with-underline ${location.pathname === '/contact' ? 'active-link' : ''}`}
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
            handleLinkClick(5)
          }}
          className={`link-with-underline ${
            location.pathname === '/tracking' ? 'active-link' : ''
          }`}
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
        navigate('/home')
      })
    } else {
      navigate('/home')
    }
  }
  return (
    <>
      <div
        style={{
          backgroundColor: '#b19f9e',
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'center',
          height: '30px',
        }}>
        <Typography sx={{ fontSize: '15px', color: 'white', fontWeight: 700 }}>
          Chào mừng bạn đến với shop giày thể thao F-SHOES
        </Typography>
      </div>
      <AppBar position="sticky" sx={{ height: '180px', backgroundColor: 'white', color: 'black' }}>
        {/* <Toolbar>
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
          </Drawer> */}
        <Container maxWidth="xl">
          <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
            <div style={{ fontSize: '30px', color: '#f2741f', display: 'flex' }}>
              <FiPhone />
              <Typography sx={{ color: 'black', marginLeft: '5px', marginRight: '5px' }}>
                HOTLINE:1900 6750
              </Typography>{' '}
              <FiMapPin />
              <Link to="/contact" style={{ textDecoration: 'none' }}>
                <Typography
                  sx={{
                    color: 'black',
                    marginLeft: '5px',
                    marginRight: '5px',
                    textDecoration: 'none',
                  }}
                  className="hethong">
                  Hệ thống cửa hàng
                </Typography>
              </Link>
            </div>
            <div>
              <Typography variant="h6" component={Link} to="/">
                <Box
                  component={'img'}
                  sx={{
                    p: 6,
                    py: 0,
                    transition: 'width 0.5s',
                    height: '120px',
                  }}
                  src={require('../../assets/image/TinTuc/logo_vip.jpg')}
                  alt="logo"
                />
              </Typography>
            </div>
            <div>
              <TextField
                sx={{ width: '200px', borderRadius: '5px' }}
                size="medium"
                placeholder="Tìm kiếm sản phẩm"
                className="search-product-home"
                InputProps={{
                  endAdornment: <SearchIcon />,
                }}
              />
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
              </IconButton>
            </div>
          </Stack>
        </Container>
        {/* </Toolbar> */}
        <div
          style={{
            height: '60px',
            backgroundColor: '#f2904f',
            alignItems: 'center',
            display: 'flex',
            justifyContent: 'center',
          }}>
          <Box sx={{ flexGrow: 1 }}>
            <Box sx={{ display: { md: 'block', xs: 'none' } }}>
              <BarSelect />
            </Box>
          </Box>
        </div>
      </AppBar>
    </>
  )
}
