import { RouterProvider } from 'react-router-dom'
import router from './routers/router'
import './assets/styles/main.css'
import Toast from './components/Toast'
import { Backdrop, CircularProgress } from '@mui/material'
import { useSelector } from 'react-redux'
import { GetLoading } from './services/slices/loadingSlice'
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew'
import Loading from './layout/Loading'
function App() {
  const loading = useSelector(GetLoading)
  return (
    <div className="App">
      <Backdrop
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
        open={loading}>
        <Loading />
      </Backdrop>
      <Toast />
      <RouterProvider router={router}/>
    </div>
  )
}

export default App
