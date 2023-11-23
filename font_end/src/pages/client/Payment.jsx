import { useEffect, useState } from 'react'
import clientCheckoutApi from '../../api/client/clientCheckoutApi'
import { Link, useNavigate } from 'react-router-dom'
import { Container } from '@mui/system'
import { Typography } from '@mui/material'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { removeCart } from '../../services/slices/cartSlice'
import { setLoading } from '../../services/slices/loadingSlice'

export default function Payment() {
  const [data, setData] = useState(null)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  useEffect(() => {
    const requestData = {}
    for (const [key, value] of new URLSearchParams(window.location.search)) {
      requestData[key] = value
    }
    dispatch(setLoading(true))
    clientCheckoutApi
      .payment(requestData)
      .then((response) => {
        if (response.data.success) {
          response.data.data.forEach((e) => {
            dispatch(removeCart(e))
          })
          toast.success('Đặt hàng thành công')
          setData(response.data.data)
        } else {
          navigate('/cart')
        }
      })
      .catch((error) => {
        console.error('Error:', error)
      })
      .finally(() => {
        dispatch(setLoading(false))
      })
  }, [navigate, dispatch])

  return (
    <>
      {data && (
        <Container maxWidth="sm" style={{ textAlign: 'center', marginTop: '50px' }}>
          <Typography variant="h4" gutterBottom>
            Đặt hàng thành công!
          </Typography>
          <Typography variant="h6" gutterBottom>
            Mã đơn hàng:{' '}
            <Link to={`/tracking/${new URLSearchParams(window.location.search).get('vnp_TxnRef')}`}>
              {new URLSearchParams(window.location.search).get('vnp_TxnRef')}
            </Link>
          </Typography>
          <Typography variant="body1" paragraph>
            Cảm ơn bạn đã đặt hàng tại cửa hàng của chúng tôi. Đơn hàng của bạn đang được xử lý.
          </Typography>
          <Link variant="contained" color="primary" to="/products">
            Tiếp tục mua sắm
          </Link>
        </Container>
      )}
    </>
  )
}
