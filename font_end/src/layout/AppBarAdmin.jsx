import React from 'react'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import AdminMenu from './AdminMenu'
import { Avatar, Badge, IconButton, Tooltip } from '@mui/material'
import { AiOutlineMenuFold } from 'react-icons/ai'
import { IoMdNotificationsOutline } from 'react-icons/io'
import ThemeAdmin from '../services/theme/ThemeAdmin'

const drawerWidth = 250

export default function AppBarAdmin({ children }) {
  return (
    <Box sx={{ display: 'flex', backgroundColor: '#F0F2F5', minHeight: '100vh' }}>
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
            <Tooltip title="Tài khoản">
              <IconButton size="small">
                <Avatar src={require('../assets/image/image.png')} sx={{ width: 35, height: 35 }} />
              </IconButton>
            </Tooltip>
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
              py: 0,
              transition: 'width 0.5s',
              minHeight: '65px',
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
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Toolbar />
          {children}
        </Box>
      </ThemeAdmin>
    </Box>
  )
}
