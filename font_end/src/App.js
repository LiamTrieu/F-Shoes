import { RouterProvider } from 'react-router-dom'
import router from './routers/router'
import './assets/styles/main.css'
import Toast from './components/Toast'
import { Backdrop, CircularProgress } from '@mui/material'
import { useSelector } from 'react-redux'
import { GetLoading } from './services/slices/loadingSlice'

function App() {
  const loading = useSelector(GetLoading)
  return (
    <div className="App">
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Toast />
      <RouterProvider router={router} />
    </div>
  )
}

export default App
