import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import AdminMenu from './AdminMenu'
import {
  Avatar,
  Badge,
  Grid,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Tooltip,
} from '@mui/material'
import { AiOutlineMenuFold } from 'react-icons/ai'
import { IoMdNotificationsOutline } from 'react-icons/io'
import ThemeAdmin from '../services/theme/ThemeAdmin'
import '../assets/styles/admin.css'
import { getCookie, removeCookie } from '../services/cookie'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import authenticationAPi from '../api/authentication/authenticationAPi'
import { Logout } from '@mui/icons-material'
import confirmSatus from '../components/comfirmSwal'
import KeyIcon from '@mui/icons-material/Key'
import { useDispatch } from 'react-redux'
import { addUserAdmin } from '../services/slices/userAdminSlice'
import SockJS from 'sockjs-client'
import { Stomp } from '@stomp/stompjs'
import { socketUrl } from '../services/url'
import dayjs from 'dayjs'
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled'

const drawerWidth = '17vw'
var stompClient = null

export default function AppBarAdmin({ children }) {
  const [notification, setNotification] = useState([])
  const NotificationButton = () => {
    function getNotification(data) {
      setNotification([data, ...notification])
    }

    useEffect(() => {
      const socket = new SockJS(socketUrl)
      stompClient = Stomp.over(socket)
      stompClient.debug = () => {}
      stompClient.connect({}, onConnect)

      return () => {
        stompClient.disconnect()
      }

      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const onConnect = () => {
      stompClient.subscribe('/topic/thong-bao', (message) => {
        if (message.body) {
          const data = JSON.parse(message.body)
          getNotification(data)
        }
      })
    }
    const [anchorEl, setAnchorEl] = useState(null)

    const handleButtonClick = (event) => {
      setAnchorEl(event.currentTarget)
    }
    const navigate = useNavigate()

    const handleClose = () => {
      setAnchorEl(null)
    }

    const xemThongBao = (id, type, index) => {
      setAnchorEl(null)
      if (type === 'HOA_DON') {
        navigate('/admin/bill-detail/' + id)
        const preNotification = [...notification]
        preNotification[index] = { ...preNotification[index], status: 'KHONG_HOAT_DONG' }
        setNotification(preNotification)
      }
    }
    console.log(notification, '=====')

    return (
      <div>
        <Tooltip title="Thông báo">
          <IconButton size="small" sx={{ m: 1.5, color: 'black' }} onClick={handleButtonClick}>
            <Badge
              invisible={notification.filter((e) => e.status === 'HOAT_DONG').length <= 0}
              color="error"
              badgeContent={notification.filter((e) => e.status === 'HOAT_DONG').length}>
              <Box component={IoMdNotificationsOutline} sx={{ fontSize: '25px' }} />
            </Badge>
          </IconButton>
        </Tooltip>

        {notification.length > 0 && (
          <Menu
            slotProps={{
              paper: {
                elevation: 0,
                sx: {
                  overflow: 'visible',
                  filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                  mt: 0.5,
                  padding: 1,
                  backgroundColor: 'rgba(194, 196, 197, 0.54)',
                  '&:before': {
                    bgcolor: 'rgba(194, 196, 197, 0.54)',
                    content: '""',
                    display: 'block',
                    position: 'absolute',
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    transform: 'translateY(-50%) rotate(45deg)',
                    zIndex: 0,
                  },
                },
              },
            }}
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}>
            {notification.map((notification, index) => (
              <MenuItem
                key={index}
                onClick={() => {
                  xemThongBao(notification.idRedirect, notification.type, index)
                }}
                style={{
                  margin: '3px',
                  borderRadius: '5px',
                  backgroundColor: notification.status === 'HOAT_DONG' ? 'white' : 'white',
                }}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',

                    maxWidth: '280px',
                    width: '270px',
                    height: '70px',
                  }}>
                  <Grid container spacing={2}>
                    <Grid item xs={4}>
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          width: '50px',
                          height: '50px',
                          borderRadius: '50%',
                          backgroundColor: 'black',
                        }}>
                        <img
                          src={require('../assets/image/TinTuc/avata_nofication.jpg')}
                          alt=""
                          width="50px"
                          height="50px"
                          style={{
                            borderRadius: '50%',
                          }}
                        />
                      </div>{' '}
                    </Grid>
                    <Grid item xs={8}>
                      {notification.status === 'HOAT_DONG' ? (
                        <div
                          style={{
                            width: '10px',
                            height: '10px',
                            borderRadius: '50%',
                            backgroundColor: 'green',
                            marginTop: '-15px',
                            marginLeft: '175px',
                          }}></div>
                      ) : (
                        ''
                      )}

                      <div
                        style={{
                          flexDirection: 'column',

                          wordWrap: 'break-word',
                        }}>
                        <b>{notification.title}</b>
                        <br />
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                          }}>
                          <AccessTimeFilledIcon style={{ width: '17px' }} />{' '}
                          {dayjs(notification.createdAt).format('DD/MM/YYYY')}
                        </div>
                      </div>
                    </Grid>
                  </Grid>
                </div>
              </MenuItem>
            ))}
          </Menu>
        )}
      </div>
    )
  }
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const token = getCookie('AdminToken')
  const [anchorEl, setAnchorEl] = useState(null)
  const [openMenuProfile, setOpenMenuProfile] = useState(false)
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
  const dispatch = useDispatch()
  useEffect(() => {
    if (token) {
      authenticationAPi.getAdmin().then((response) => {
        setUser(response.data.data)
        dispatch(addUserAdmin(response.data.data))
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
            <NotificationButton />
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
                    <Link
                      to={`/admin/change-password`}
                      style={{ textDecoration: 'none', color: 'black' }}>
                      <MenuItem>
                        <KeyIcon fontSize="small" sx={{ color: 'rgba(0, 0, 0, 0.54)', mr: 2 }} />{' '}
                        Đổi mật khẩu
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
