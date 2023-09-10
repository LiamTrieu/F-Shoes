// import React, { useEffect, useState } from 'react'
// import Box from '@mui/material/Box'
// import Drawer from '@mui/material/Drawer'
// import AppBar from '@mui/material/AppBar'
// import CssBaseline from '@mui/material/CssBaseline'
// import Toolbar from '@mui/material/Toolbar'
// import Typography from '@mui/material/Typography'
// import ThemeAdmin from '../services/theme/ThemeAdmin'
// import AdminMenu from './AdminMenu'
// import { useMediaQuery } from '@mui/material'

// const drawerWidth = 250

// export default function AppBarAdmin({ children }) {
//   const adminMode = localStorage.getItem('admim-dark-mode') === 'true'
//   const [darkMode, setDarkMode] = useState(adminMode)

//   useEffect(() => {
//     localStorage.setItem('admim-dark-mode', darkMode)
//   }, [darkMode])

//   const [openMenuLg, setOpenMenuLg] = useState(true)
//   const [openMenu, setOpenMenu] = useState(false)
//   const isMdScreen = useMediaQuery('(min-width: 1055px)')

//   const showOpenMenu = (open) => (event) => {
//     if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
//       return
//     }
//     setOpenMenu(open)
//   }

//   const handleMenuClose = (isClose) => {
//     setOpenMenu(isClose)
//   }
//   return (
//     <ThemeAdmin darkMode={darkMode}>
//       <Box sx={{ display: 'flex' }}>
//         <CssBaseline />
//         <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
//           <Toolbar>
//             <Typography
//               textAlign="center"
//               variant="h6"
//               sx={{
//                 py: 1,
//                 justifyContent: 'center',
//                 minHeight: '100%',
//               }}>
//               <Box
//                 component={'img'}
//                 sx={{
//                   filter: 'palette.mode' === 'dark' ? 'grayscale(1) invert(1)' : 'none',
//                   transition: 'width 0.5s',
//                   width: true ? '100px' : '50px',
//                 }}
//                 src={require('../assets/image/logoweb.png')}
//                 alt="logo"
//               />
//             </Typography>
//           </Toolbar>
//         </AppBar>
//         <Drawer
//           variant="permanent"
//           sx={{
//             width: drawerWidth,
//             flexShrink: 0,
//             [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
//           }}>
//           <Toolbar />
//           <Box sx={{ overflow: 'auto' }}>
//             <AdminMenu isMenuLg={openMenuLg} />
//           </Box>
//         </Drawer>
//         <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
//           <Toolbar />
//           {children}
//         </Box>
//       </Box>
//     </ThemeAdmin>
//   )
// }
