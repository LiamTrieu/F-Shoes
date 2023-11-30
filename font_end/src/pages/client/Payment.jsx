import { useEffect, useState } from 'react'
import clientCheckoutApi from '../../api/client/clientCheckoutApi'
import { Link, useNavigate } from 'react-router-dom'
import { Container } from '@mui/system'
import { Button, Typography } from '@mui/material'
import { makeStyles } from '@material-ui/core/styles'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { removeCart } from '../../services/slices/cartSlice'
import { setLoading } from '../../services/slices/loadingSlice'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'

const useStyles = makeStyles((theme) => ({
  container: {
    textAlign: 'center',
    marginTop: '50px',
  },
  successIcon: {
    color: theme.palette.success.main, // Assuming you have a success color in your theme
    fontSize: '5rem',
    marginBottom: '20px',
  },
  orderDetails: {
    marginBottom: '20px',
  },
  continueShoppingButton: {
    marginTop: '20px',
    padding: '10px 20px',
    fontSize: '1.2rem',
    backgroundColor: 'black',
  },
}))

export default function Payment() {
  const [data, setData] = useState(true)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  // useEffect(() => {
  //   const requestData = {}
  //   for (const [key, value] of new URLSearchParams(window.location.search)) {
  //     requestData[key] = value
  //   }
  //   dispatch(setLoading(true))
  //   clientCheckoutApi
  //     .payment(requestData)
  //     .then((response) => {
  //       if (response.data.success) {
  //         response.data.data.forEach((e) => {
  //           dispatch(removeCart(e))
  //         })
  //         toast.success('Đặt hàng thành công')
  //         setData(response.data.data)
  //       } else {
  //         navigate('/cart')
  //       }
  //     })
  //     .catch((error) => {
  //       console.error('Error:', error)
  //     })
  //     .finally(() => {
  //       dispatch(setLoading(false))
  //     })
  // }, [navigate, dispatch])
  const classes = useStyles()

  return (
    <>
      {data && (
        <Container maxWidth="sm" className={classes.container}>
          <CheckCircleIcon className={classes.successIcon} />
          <Typography variant="h4" gutterBottom>
            Đặt hàng thành công!
          </Typography>
          <div className={classes.orderDetails}>
            <Typography variant="h6" gutterBottom>
              Mã đơn hàng:{' '}
              <Link
                to={`/tracking/${new URLSearchParams(window.location.search).get('vnp_TxnRef')}`}>
                {new URLSearchParams(window.location.search).get('vnp_TxnRef')}
              </Link>
            </Typography>
            <Typography variant="body1" paragraph>
              Cảm ơn bạn đã đặt hàng tại cửa hàng của chúng tôi. Đơn hàng của bạn đang được xử lý.
            </Typography>
          </div>
          <Button
            variant="contained"
            className={classes.continueShoppingButton}
            component={Link}
            to="/products">
            Tiếp tục mua sắm
          </Button>
        </Container>
      )}
    </>
  )
}
