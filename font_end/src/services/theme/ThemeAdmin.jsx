import { ThemeProvider, createTheme } from '@mui/material'
import React from 'react'
import { layoutThemeAdmin } from './layoutThemeAdmin'
import { sanPham } from './sanpham/sanPham'

export default function ThemeAdmin({ darkMode, children }) {
  const themeMode = createTheme({
    typography: { fontFamily: 'Open Sans' },
    palette: {
      ...(darkMode
        ? {
            mode: 'dark',
            background: {
              default: '#1F263C',
              paper: '#1F263C',
            },
            layout: { ...layoutThemeAdmin.dark },
            sanPham: { ...sanPham.dark },
          }
        : {
            mode: 'light',
            background: {
              default: '#FFFFFF',
              paper: '#FFFFFF',
            },
            layout: { ...layoutThemeAdmin.light },
            sanPham: { ...sanPham.light },
          }),
    },
  })
  return <ThemeProvider theme={themeMode}> {children}</ThemeProvider>
}
