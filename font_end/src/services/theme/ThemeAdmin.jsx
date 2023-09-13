import { ThemeProvider, createTheme } from '@mui/material'
import React from 'react'

export default function ThemeAdmin({ children }) {
  const themeMode = createTheme({
    typography: { fontFamily: 'Inter', color: 'black' },
    palette: {
      cam: {
        main: '#F2721E',
        contrastText: 'white',
      },
      error: {
        main: '#FF3333',
        contrastText: 'white',
      },
    },
  })
  return <ThemeProvider theme={themeMode}>{children}</ThemeProvider>
}
