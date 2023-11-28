import { RouterProvider } from 'react-router-dom'
import router from './routers/router'
import './assets/styles/main.css'
import Toast from './components/Toast'
import { Backdrop } from '@mui/material'
import { useSelector } from 'react-redux'
import { GetLoading } from './services/slices/loadingSlice'
import Loading from './layout/Loading'
import { useEffect, useState } from 'react'
import checkStartApi from './api/checkStartApi'
import { connectStompClient } from './services/socket'

function App() {
  const [isStartSuccessful, setIsStartSuccessful] = useState(false)
  const loading = useSelector(GetLoading)

  useEffect(() => {
    const checkStart = async () => {
      try {
        const response = await checkStartApi.check()
        await connectStompClient()
        setIsStartSuccessful(response.data)
      } catch (error) {
        alert('Không khởi động được server, vui lòng tải lại trang!')
      }
    }

    checkStart()
  }, [])

  if (!isStartSuccessful) {
    return (
      <Backdrop
        sx={{
          backgroundColor: 'white',
          zIndex: (theme) => theme.zIndex.drawer + 999,
        }}
        open={loading}>
        <Loading start={true} />
      </Backdrop>
    )
  }

  return (
    <div className="App">
      <Backdrop
        sx={{
          backgroundColor: 'white',
          zIndex: (theme) => theme.zIndex.drawer + 999,
        }}
        open={loading}>
        <Loading />
      </Backdrop>

      <Toast />
      <RouterProvider router={router} />
    </div>
  )
}

export default App
