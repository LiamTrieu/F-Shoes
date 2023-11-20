import {
  Box,
  Divider,
  Modal,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { GetCart, removeCart, setCart, updateCart } from '../../services/slices/cartSlice'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import ReplyIcon from '@mui/icons-material/Reply'
import { Link } from 'react-router-dom'
import { setCheckout } from '../../services/slices/checkoutSlice'

const styleModalCart = {
  position: 'absolute',
  top: '45%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 1000,
  height: '550px',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
}

const formatPrice = (price) => {
  return price.toLocaleString('vi-VN', {
    style: 'currency',
    currency: 'VND',
  })
}

function calculateTotalPayment(cart) {
  let total = 0
  cart.forEach((item) => {
    total += item.gia * item.soLuong
  })
  return total.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })
}

export default function ModalAddProductToCart({ openModal, handleCloseModal, product }) {
  const dispatch = useDispatch()
  const amountProduct = useSelector(GetCart).length
  const productCart = useSelector(GetCart)
  const calculateDiscountedPrice = (originalPrice, discountPercentage) => {
    const discountAmount = (discountPercentage / 100) * originalPrice
    const discountedPrice = originalPrice - discountAmount
    return discountedPrice
  }

  const onChangeSL = (cart, num) => {
    const soluong = cart.soLuong + num
    if (soluong <= 0) {
      dispatch(removeCart(cart.id))
    } else {
      dispatch(updateCart({ ...cart, soLuong: soluong }))
    }
  }
  return (
    <div>
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={styleModalCart}>
          <Typography sx={{ float: 'right', color: 'white' }} onClick={handleCloseModal}>
            <div
              style={{
                width: '30px',
                height: '30px',
                borderRadius: '50%',
                backgroundColor: 'black',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: '-30px',
                marginRight: '-40px',
                cursor: 'pointer',
              }}>
              X
            </div>
          </Typography>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Sản phẩm đã được thêm vào giỏ hàng
          </Typography>
          <Divider sx={{ height: '2px', backgroundColor: 'black', mt: 2 }} />

          <Typography
            sx={{
              fontSize: '20px',
              fontWeight: 700,
              mt: 1,
              color: '#333333',
              textTransform: 'uppercase',
            }}>
            Giỏ hàng của bạn ({amountProduct} sản phẩm)
          </Typography>
          <div style={{ maxHeight: '330px', overflow: 'auto' }}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead
                style={{ backgroundColor: '#333', color: 'white', position: 'sticky', top: 0 }}>
                <TableRow>
                  <TableCell style={{ color: 'white' }} align="center">
                    ẢNH SẢN PHẨM
                  </TableCell>
                  <TableCell style={{ color: 'white' }} align="center">
                    TÊN SẢN PHẨM
                  </TableCell>
                  <TableCell style={{ color: 'white' }} align="center">
                    ĐƠN GIÁ
                  </TableCell>
                  <TableCell style={{ color: 'white' }} align="center">
                    SỐ LƯỢNG
                  </TableCell>
                  <TableCell style={{ color: 'white' }} align="center">
                    THÀNH TIỀN
                  </TableCell>
                  <TableCell style={{ color: 'white' }} align="center">
                    XÓA
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {productCart.map((cart) => (
                  <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell>
                      <img src={cart.image[0]} alt={cart.name} width={130} />
                    </TableCell>
                    <TableCell sx={{ fontWeight: 1000, width: '30%' }} align="center">
                      {cart.name}
                    </TableCell>
                    <TableCell align="center">
                      <Typography fontFamily={'monospace'} fontWeight={'700'} color={'red'}>
                        <span>
                          {product.promotion ? (
                            <div>
                              <div className="promotion-price">{`${formatPrice(cart.gia)} `}</div>
                              <div>
                                <span style={{ color: 'red', fontWeight: 'bold' }}>
                                  {`${formatPrice(
                                    calculateDiscountedPrice(cart.gia, product.value),
                                  )} `}
                                </span>
                              </div>
                            </div>
                          ) : (
                            <span>{`${formatPrice(cart.gia)} `}</span>
                          )}
                        </span>
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <div className="quantity-control">
                        <button onClick={() => onChangeSL(cart, -1)}>-</button>
                        <input
                          onChange={(e) => {
                            const newValue = Math.floor(Number(e.target.value))
                            dispatch(updateCart({ ...cart, soLuong: newValue }))
                          }}
                          value={cart.soLuong}
                          min="1"
                        />
                        <button onClick={() => onChangeSL(cart, 1)}>+</button>
                      </div>
                    </TableCell>
                    <TableCell align="center">
                      {product.promotion ? (
                        <div>
                          {formatPrice(
                            cart.soLuong * calculateDiscountedPrice(cart.gia, product.value),
                          )}
                        </div>
                      ) : (
                        <span>{`${formatPrice(cart.soLuong * cart.gia)} `}</span>
                      )}
                    </TableCell>
                    <TableCell align="center">
                      <DeleteForeverIcon
                        onClick={() => {
                          const updatedProduct = productCart.filter((item) => item.id !== cart.id)
                          dispatch(setCart(updatedProduct))
                        }}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={12}>
            <div>
              <Link to="/cart" style={{ textDecoration: 'none' }}>
                <ReplyIcon />
                <b>Đến giỏ hàng</b>
              </Link>
            </div>
            <div>
              <Typography sx={{ mt: 3, fontSize: '17px' }}>
                Tổng thanh toán:
                <span style={{ fontWeight: 1000, marginLeft: '20px', color: 'red' }}>
                  {calculateTotalPayment(productCart)}
                </span>
              </Typography>

              <Link to="/checkout">
                <div
                  style={{
                    width: '300px',
                    height: '40px',
                    backgroundColor: '#333',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '15px',
                  }}
                  onClick={() => {
                    dispatch(setCheckout(productCart))
                  }}>
                  TIẾN HÀNH THANH TOÁN
                </div>
              </Link>
            </div>
          </Stack>
        </Box>
      </Modal>
    </div>
  )
}
