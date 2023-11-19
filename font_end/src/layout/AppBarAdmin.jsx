import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import AdminMenu from './AdminMenu'
import { Avatar, Badge, IconButton, ListItemIcon, Menu, MenuItem, Tooltip } from '@mui/material'
import { AiOutlineMenuFold } from 'react-icons/ai'
import { IoMdNotificationsOutline } from 'react-icons/io'
import ThemeAdmin from '../services/theme/ThemeAdmin'
import '../assets/styles/admin.css'
import { getCookie, removeCookie } from '../services/cookie'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import authenticationAPi from '../api/authentication/authenticationAPi'
import { Logout } from '@mui/icons-material'
import confirmSatus from '../components/comfirmSwal'

const drawerWidth = '17vw'

export default function AppBarAdmin({ children }) {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [anchorEl, setAnchorEl] = useState(null)
  const [openMenuProfile, setOpenMenuProfile] = useState(false)
  const token = getCookie('AdminToken')
  const handleClick = (event) => {
    anchorEl === null ? setAnchorEl(event.currentTarget) : setAnchorEl(null)
    openMenuProfile === false ? setOpenMenuProfile(true) : setOpenMenuProfile(false)
  }

  function handleAccount() {
    const title = 'Xác nhận đăng xuất tài khoản?'
    if (user) {
      confirmSatus(title, '').then((result) => {
        if (result.isConfirmed) {
          removeCookie('AdminToken')
          navigate('/admin/login')
        }
      })
    } else {
      navigate('/login')
    }
  }
  useEffect(() => {
    if (token) {
      authenticationAPi.getAdmin().then((response) => {
        setUser(response.data.data)
      })
    }
  }, [token])

  return token ? (
    <Box
      sx={{ display: 'flex', backgroundColor: '#F0F2F5', minHeight: '100vh', maxWidth: '100vw' }}>
      <ThemeAdmin>
        <AppBar
          position="fixed"
          sx={{
            pl: 0,
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            boxShadow:
              '0 1px 2px 0 rgba(0, 0, 0, 0.03), 0 1px 6px -1px rgba(0, 0, 0, 0.02), 0 2px 4px 0 rgba(0, 0, 0, 0.02);',
            backdropFilter: 'blur(8px)',
          }}>
          <Toolbar sx={{ paddingLeft: '0px !important' }}>
            <Box width={drawerWidth}></Box>
            <IconButton
              sx={{
                color: 'black',
                transform: `rotate(${true ? 0 : 180}deg)`,
              }}>
              <Box component={AiOutlineMenuFold} sx={{ fontSize: '25px' }} />
            </IconButton>
            <Box flexGrow={1} />
            <Tooltip title="Thông báo">
              <IconButton size="small" sx={{ m: 1.5, color: 'black' }}>
                <Badge variant="dot" invisible={false} color="error">
                  <Box component={IoMdNotificationsOutline} sx={{ fontSize: '25px' }} />
                </Badge>
              </IconButton>
            </Tooltip>
            <IconButton onClick={(event) => handleClick(event)} size="small">
              <Avatar src={user && user.avatar} sx={{ width: 35, height: 35 }} />
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
                    {console.log(user)}
                    <Link
                      to={`/admin/staff/detail/${user.id}`}
                      style={{ textDecoration: 'none', color: 'black' }}>
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
          </Toolbar>
        </AppBar>

        <Drawer
          variant="permanent"
          sx={{
            border: 'none',
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
          }}>
          <Box
            component={'img'}
            sx={{
              p: 6,
              py: 1,
              transition: 'width 0.5s',
              height: '100px',
            }}
            src={require('../assets/image/logoweb.png')}
            alt="logo"
          />
          <Box
            sx={{
              pb: 3,
              overflow: 'auto',
              '::-webkit-scrollbar': {
                width: '1px',
              },
              '::-webkit-scrollbar-thumb': {
                background: 'rgba(76,78,100,0.4)',
              },
            }}>
            <AdminMenu />
          </Box>
        </Drawer>
        <Box component="main" sx={{ flexGrow: 1, p: 3, maxWidth: '83vw' }}>
          <Toolbar />
          {children}
        </Box>
      </ThemeAdmin>
    </Box>
  ) : (
    <Navigate to={'/admin/login'} />
  )
}
