import { RouterProvider } from 'react-router-dom'
import router from './routers/router'
import './assets/styles/main.css'
import Toast from './components/Toast'
import { Backdrop, CircularProgress } from '@mui/material'
import { useSelector } from 'react-redux'
import { GetLoading } from './services/slices/loadingSlice'
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew'
function App() {
  const loading = useSelector(GetLoading)
  return (
    <div className="App">
      <Backdrop
        sx={{ backgroundColor: '#fff', color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}>
        <img src="https://i.gifer.com/origin/f5/f5baef4b6b6677020ab8d091ef78a3bc_w200.gif" />
      </Backdrop>
      <Toast />
      <RouterProvider router={router} />
    </div>
  )
}

export default App
