import React, { useEffect, useState } from 'react'
import {
  Avatar,
  Badge,
  Box,
  Container,
  IconButton,
  SwipeableDrawer,
  Toolbar,
  Tooltip,
  Typography,
  useMediaQuery,
} from '@mui/material'
import AdminMenu from './AdminMenu'
import { AiOutlineMenuFold } from 'react-icons/ai'
import { IoMdNotificationsOutline } from 'react-icons/io'
import { MdOutlineModeNight, MdOutlineLightMode } from 'react-icons/md'
import { colorBaseAdmin } from './menuStyle'
import ThemeAdmin from '../services/theme/ThemeAdmin'

export default function AdminHeader({ children }) {
  const adminMode = localStorage.getItem('admim-dark-mode') === 'true'
  const [darkMode, setDarkMode] = useState(adminMode)

  useEffect(() => {
    localStorage.setItem('admim-dark-mode', darkMode)
  }, [darkMode])

  const [openMenuLg, setOpenMenuLg] = useState(true)
  const [openMenu, setOpenMenu] = useState(false)
  const isMdScreen = useMediaQuery('(min-width: 1055px)')

  const showOpenMenu = (open) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return
    }
    setOpenMenu(open)
  }

  const handleMenuClose = (isClose) => {
    setOpenMenu(isClose)
  }

  return (
    <ThemeAdmin darkMode={darkMode}>
      <Box display="flex" height="100vh" sx={{ ...colorBaseAdmin.colorBgNav }}>
        {isMdScreen && <AdminMenu isMenuLg={openMenuLg} />}
        <Box flexGrow={1}>
          <Toolbar
            style={{
              minHeight: '10vh',
              boxShadow: '0 1px 2px 0 rgba(0,0,0,.05)',
            }}>
            <IconButton
              color="layout.colorText"
              onClick={() => {
                if (isMdScreen) setOpenMenuLg(!openMenuLg)
                else setOpenMenu(!openMenu)
              }}
              sx={{
                transform: `rotate(${openMenuLg ? 0 : 180}deg)`,
              }}>
              <Box
                component={AiOutlineMenuFold}
                sx={{ fontSize: '25px', ...colorBaseAdmin.colorText }}
              />
            </IconButton>
            <SwipeableDrawer
              transitionDuration={500}
              onOpen={showOpenMenu(true)}
              open={openMenu}
              onClose={showOpenMenu(false)}>
              {!isMdScreen && openMenu && (
                <AdminMenu isCloseOpenMenu={handleMenuClose} isMenuLg={true} />
              )}
            </SwipeableDrawer>
            <Box flexGrow={1} />
            <Tooltip title={darkMode ? 'Chế độ tối' : 'Chế độ sáng'}>
              <IconButton
                color="theme."
                size="small"
                onClick={() => {
                  setDarkMode(!darkMode)
                }}>
                {darkMode ? (
                  <Box
                    component={MdOutlineModeNight}
                    sx={{ fontSize: '25px', ...colorBaseAdmin.colorText }}
                  />
                ) : (
                  <Box
                    component={MdOutlineLightMode}
                    sx={{ fontSize: '25px', ...colorBaseAdmin.colorText }}
                  />
                )}
              </IconButton>
            </Tooltip>
            <Tooltip title="Thông báo">
              <IconButton size="small" color="layout.colorText" sx={{ m: 1.5 }}>
                <Badge variant="dot" invisible={false} color="error">
                  <Box
                    component={IoMdNotificationsOutline}
                    sx={{ fontSize: '25px', ...colorBaseAdmin.colorText }}
                  />
                </Badge>
              </IconButton>
            </Tooltip>
            <Tooltip title="Tài khoản">
              <IconButton size="small">
                <Avatar src={require('../assets/image/image.png')} sx={{ width: 35, height: 35 }} />
              </IconButton>
            </Tooltip>
          </Toolbar>

          <Box
            maxWidth="xl"
            sx={{
              transition: 'width 0.5s maxidth 0.5s',
              ...colorBaseAdmin.colorBg,
              overflow: 'auto',
              '::-webkit-scrollbar': {
                width: '2px',
              },
              '::-webkit-scrollbar-thumb': {
                background: 'rgba(76,78,100,0.4)',
              },
              maxHeight: '90vh',
              minHeight: '90vh',
              maxWidth: isMdScreen ? '95vw' : '100vw',
              pt: 1,
              pb: 7,
            }}>
            <Container>{children}</Container>
          </Box>
        </Box>
      </Box>
    </ThemeAdmin>
  )
}
