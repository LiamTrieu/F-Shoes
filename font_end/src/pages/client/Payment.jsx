import { useEffect, useState } from 'react'
import clientCheckoutApi from '../../api/client/clientCheckoutApi'
import { Link, useNavigate } from 'react-router-dom'
import { Container } from '@mui/system'
import { Button, Stack, Typography } from '@mui/material'
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
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()
  useEffect(() => {
    checkPayment()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function checkPayment() {
    setLoading(true)
    try {
      const requestData = {}
      for (const [key, value] of new URLSearchParams(window.location.search)) {
        requestData[key] = value
      }
      const response = await clientCheckoutApi.payment(requestData)
      if (response.status === 200) {
        if (response.data.success) {
          if (response.data.data.length > 0) {
            response.data.data.forEach((e) => {
              dispatch(removeCart(e))
            })
            toast.success('Đặt hàng thành công')
          }
          setData(response.data.data)
        }
      }
    } catch (error) {
      console.error(error)
    }
    setLoading(false)
  }

  const classes = useStyles()

  return (
    !loading && (
      <>
        {data ? (
          data.length > 0 ? (
            <Container maxWidth="sm" className={classes.container}>
              <CheckCircleIcon className={classes.successIcon} />
              <Typography variant="h4" gutterBottom>
                Đặt hàng thành công!
              </Typography>
              <div className={classes.orderDetails}>
                <Typography variant="h6" gutterBottom>
                  Mã đơn hàng:{' '}
                  <Link
                    to={`/tracking/${new URLSearchParams(window.location.search).get(
                      'vnp_TxnRef',
                    )}`}>
                    {new URLSearchParams(window.location.search).get('vnp_TxnRef')}
                  </Link>
                </Typography>
                <Typography variant="body1" paragraph>
                  Cảm ơn bạn đã đặt hàng tại cửa hàng của chúng tôi. Đơn hàng của bạn đang được xử
                  lý.
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
          ) : (
            <Container maxWidth="sm" className={classes.container}>
              <CheckCircleIcon className={classes.successIcon} />
              <Typography variant="h4" gutterBottom>
                Đơn hàng đã được thanh toán!
              </Typography>
              <div className={classes.orderDetails}>
                <Typography variant="h6" gutterBottom>
                  Mã đơn hàng:{' '}
                  <Link
                    to={`/tracking/${new URLSearchParams(window.location.search).get(
                      'vnp_TxnRef',
                    )}`}>
                    {new URLSearchParams(window.location.search).get('vnp_TxnRef')}
                  </Link>
                </Typography>
                <Typography variant="body1" paragraph>
                  Cảm ơn bạn đã đặt hàng tại cửa hàng của chúng tôi. Đơn hàng của bạn đang được xử
                  lý.
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
          )
        ) : (
          <Container maxWidth="sm" className={classes.container}>
            <CheckCircleIcon className={classes.errorIcon} />
            <Typography variant="h4" gutterBottom>
              Đặt hàng Thất bại!
            </Typography>
            <div className={classes.orderDetails}>
              <Typography variant="h6" gutterBottom>
                Thanh toán không thành công
              </Typography>
              <Typography variant="body1" paragraph>
                Vui lòng thử lại
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
  )
}
