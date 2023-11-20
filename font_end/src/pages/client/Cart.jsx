import React, { useEffect, useState } from 'react'
import {
  Box,
  Button,
  Checkbox,
  Container,
  Divider,
  IconButton,
  TableFooter,
  TextField,
  Typography,
} from '@mui/material'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Grid2 from '@mui/material/Unstable_Grid2/Grid2'
import PaidRoundedIcon from '@mui/icons-material/PaidRounded'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import { Link } from 'react-router-dom'
import {
  OrderCartBody,
  OrderCartFotter,
  OrderCartHeading,
  TableCellCustom,
} from '../../layout/client/cartpage/OrderCart'
import { BoderDotted, NoBoder } from '../../styles/TableStyle'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import './Cart.css'
import { useDispatch, useSelector } from 'react-redux'
import { GetCart, removeCart, setCart, updateCart } from '../../services/slices/cartSlice'
import { setCheckout } from '../../services/slices/checkoutSlice'

import clientProductApi from '../../api/client/clientProductApi'
import clientCartApi from '../../api/client/clientCartApi'

export default function Cart() {
  const [productSelect, setProductSelect] = useState([])
  const [promotionByProductDetail, setGromotionByProductDetail] = useState([])
  // const dispatch = useDispatch()

  const onChangeSL = (cart, num) => {
    const soluong = cart.soLuong + num
    const preProductSelect = [...productSelect]
    const index = preProductSelect.findIndex((e) => e.id === cart.id)
    if (soluong <= 0) {
      dispatch(removeCart(cart))
    } else {
      const updatedProduct = {
        ...cart,
        soLuong: soluong,
      }
      if (index !== -1) {
        preProductSelect[index] = updatedProduct
        setProductSelect(preProductSelect)
      }
      dispatch(updateCart(updatedProduct))
    }
  }

  const product = useSelector(GetCart)
  const amountProduct = useSelector(GetCart).length

  const productIds = product.map((cart) => cart.id)

  const onChangeCheck = (cart, checked) => {
    const preProductSelect = [...productSelect]
    if (checked) {
      preProductSelect.push(cart)
    } else {
      const index = preProductSelect.findIndex((e) => e.id === cart.id)
      preProductSelect.splice(index, 1)
    }
    setProductSelect(preProductSelect)
  }
  const getPromotionProductDetails = (id) => {
    clientCartApi.getPromotionByProductDetail(id).then((response) => {
      setGromotionByProductDetail(response.data.data)
      console.log(response.data.data)
    })
  }

  useEffect(() => {
    if (amountProduct > 0) {
      getPromotionProductDetails(productIds)
    }
  }, [])

  const dispatch = useDispatch()
  const [sizes, setSizes] = useState([])
  function getListSize(id) {
    let data
    clientProductApi
      .get({ id: id })
      .then((result) => {
        data = result.data.data[0]
      })
      .finally(() => {
        clientProductApi
          .getSizes({
            idProduct: data.idProduct,
            idColor: data.idColor,
            idCategory: data.idCategory,
            idBrand: data.idBrand,
            idSole: data.idSole,
            idMaterial: data.idMaterial,
          })
          .then((result) => {
            setSizes(result.data.data)
          })
      })
  }
  function chageSize(id, cart) {
    const size = sizes.find((s) => s.id === id)
    const carts = [...product]
    const index = product.findIndex((c) => c.id === cart)
    carts[index] = { ...carts[index], id: size.id, size: size.size }
    dispatch(setCart(carts))
    const preProductSelect = [...productSelect]
    const indexSelect = preProductSelect.findIndex((e) => e.id === cart)
    if (indexSelect !== -1) {
      preProductSelect.splice(indexSelect, 1)
      setProductSelect(preProductSelect)
    }
  }

  // const RowDataCustom = ({ cartDatas }) => {
  //   const dispatch = useDispatch()
  //   const [sizes, setSizes] = useState([])
  //   function getListSize(id) {
  //     let data
  //     clientProductApi
  //       .get({ id: id })
  //       .then((result) => {
  //         data = result.data.data[0]
  //       })
  //       .finally(() => {
  //         clientProductApi
  //           .getSizes({
  //             idProduct: data.idProduct,
  //             idColor: data.idColor,
  //             idCategory: data.idCategory,
  //             idBrand: data.idBrand,
  //             idSole: data.idSole,
  //             idMaterial: data.idMaterial,
  //           })
  //           .then((result) => {
  //             setSizes(result.data.data)
  //           })
  //       })
  //   }
  //   function chageSize(id, cart) {
  //     const size = sizes.find((s) => s.id === id)
  //     const carts = [...cartDatas]
  //     const index = cartDatas.findIndex((c) => c.id === cart)
  //     carts[index] = { ...carts[index], id: size.id, size: size.size }
  //     dispatch(setCart(carts))
  //     const preProductSelect = [...productSelect]
  //     const indexSelect = preProductSelect.findIndex((e) => e.id === cart)
  //     if (indexSelect !== -1) {
  //       preProductSelect.splice(indexSelect, 1)
  //       setProductSelect(preProductSelect)
  //     }
  //   }
  //   const calculateDiscountedPrice = (originalPrice, discountPercentage) => {
  //     const discountAmount = (discountPercentage / 100) * originalPrice
  //     const discountedPrice = originalPrice - discountAmount
  //     return discountedPrice
  //   }
  //   return cartDatas.map((cart) => {
  //     return (
  //       <TableRow sx={{ border: 0 }} key={cart.id}>
  //         <TableCell sx={{ px: 0 }}>
  //           <Checkbox
  //             checked={productSelect.findIndex((e) => e.id === cart.id) >= 0}
  //             size="small"
  //             onClick={(e) => onChangeCheck(cart, e.target.checked)}
  //           />
  //         </TableCell>
  //         <TableCell style={{ verticalAlign: 'middle' }} sx={{ px: 0 }}>
  //           <Box component={Link} to={`/product/${cart.id}`} display={{ lg: 'inline', xs: 'none' }}>
  //             <img
  //               style={{
  //                 maxWidth: '20%',
  //                 maxHeight: '20%',
  //                 verticalAlign: 'middle',
  //               }}
  //               key={'anh'}
  //               src={cart.image[0]}
  //               alt="anh"
  //             />
  //           </Box>
  //           <span
  //             style={{
  //               display: 'inline-block',
  //               verticalAlign: 'middle',
  //               marginLeft: '10px',
  //               maxWidth: '80%',
  //             }}>
  //             {/* <p style={{ margin: 0 }}>{cart.name}</p> */}
  //             <b style={{ margin: 0 }}>
  //               size:&nbsp;
  //               <select
  //                 onChange={(e) => {
  //                   chageSize(e.target.value, cart.id)
  //                 }}
  //                 onClick={() => {
  //                   getListSize(cart.id)
  //                 }}
  //                 value={
  //                   parseFloat(cart.size) % 1 === 0
  //                     ? parseFloat(cart.size).toFixed(0)
  //                     : parseFloat(cart.size).toFixed(1)
  //                 }>
  //                 <option value={cart.id}>
  //                   {parseFloat(cart.size) % 1 === 0
  //                     ? parseFloat(cart.size).toFixed(0)
  //                     : parseFloat(cart.size).toFixed(1)}
  //                 </option>
  //                 {sizes &&
  //                   sizes.map((size) => {
  //                     if (size.size !== cart.size) {
  //                       return (
  //                         <option value={size.id} key={`size${size.id}`}>
  //                           {parseFloat(size.size) % 1 === 0
  //                             ? parseFloat(size.size).toFixed(0)
  //                             : parseFloat(size.size).toFixed(1)}
  //                         </option>
  //                       )
  //                     }
  //                   })}
  //               </select>
  //             </b>
  //           </span>
  //         </TableCell>
  //         {/* <TableCell
  //           className="table-gia"
  //           sx={{
  //             maxWidth: '10px',
  //             display: { md: 'table-cell', xs: 'none' },
  //             color: 'red',
  //             fontWeight: 'bold',
  //             textAlign: 'left',
  //           }}>
  //           <span>
  //             {' '}
  //             {cart.promotion ? (
  //               <div style={{ display: 'flex' }}>
  //                 <div className="promotion-price">{`${cart.gia.toLocaleString('it-IT', {
  //                   style: 'currency',
  //                   currency: 'VND',
  //                 })} `}</div>{' '}
  //                 <div>
  //                   <span style={{ color: 'red', fontWeight: 'bold' }}>
  //                     {`${calculateDiscountedPrice(cart.gia, cart.value).toLocaleString('it-IT', {
  //                       style: 'currency',
  //                       currency: 'VND',
  //                     })} `}
  //                   </span>{' '}
  //                 </div>
  //               </div>
  //             ) : (
  //               <span>{`${cart.gia.toLocaleString('it-IT', {
  //                 style: 'currency',
  //                 currency: 'VND',
  //               })} `}</span>
  //             )}
  //           </span>
  //         </TableCell>
  //         <TableCell sx={{ px: 0 }}>
  //           <Box
  //             width={'65px'}
  //             display="flex"
  //             alignItems="center"
  //             sx={{
  //               border: '1px solid gray',
  //               borderRadius: '20px',
  //             }}
  //             p={'3px'}>
  //             <IconButton onClick={() => onChangeSL(cart, -1)} sx={{ p: 0 }} size="small">
  //               <RemoveIcon fontSize="1px" />
  //             </IconButton>
  //             <TextField
  //               onChange={(e) => {
  //                 dispatch(updateCart({ ...cart, soLuong: e.target.value }))
  //               }}
  //               value={cart.soLuong}
  //               inputProps={{ min: 1 }}
  //               size="small"
  //               sx={{
  //                 width: '30px ',
  //                 '& input': { p: 0, textAlign: 'center' },
  //                 '& fieldset': {
  //                   border: 'none',
  //                 },
  //               }}
  //             />
  //             <IconButton onClick={() => onChangeSL(cart, 1)} size="small" sx={{ p: 0 }}>
  //               <AddIcon fontSize="1px" />
  //             </IconButton>
  //           </Box>
  //         </TableCell>
  //         <TableCell
  //           className="table-gia"
  //           sx={{
  //             maxWidth: '10px',
  //             display: { md: 'table-cell', xs: 'none' },
  //             color: 'red',
  //             fontWeight: 'bold',
  //           }}>
  //           {(cart.gia * cart.soLuong).toLocaleString('it-IT', {
  //             style: 'currency',
  //             currency: 'VND',
  //           })}
  //         </TableCell>
  //         <TableCell>
  //           <Button
  //             onClick={() => {
  //               const updatedProduct = product.filter((item) => item.id !== cart.id)
  //               dispatch(setCart(updatedProduct))
  //             }}
  //             sx={{
  //               minHeight: 0,
  //               minWidth: 0,
  //               padding: 0,
  //               float: 'right',
  //             }}>
  //             <DeleteForeverIcon color="disabled" />
  //           </Button>
  //         </TableCell> */}
  //       </TableRow>
  //     )
  //   })
  // }

  function checkAll(checked) {
    if (checked) {
      setProductSelect([...product])
    } else {
      setProductSelect([])
    }
  }
  const calculateDiscountedPrice = (originalPrice, discountPercentage) => {
    const discountAmount = (discountPercentage / 100) * originalPrice
    const discountedPrice = originalPrice - discountAmount
    return discountedPrice
  }
  const formatPrice = (price) => {
    return price.toLocaleString('vi-VN', {
      style: 'currency',
      currency: 'VND',
    })
  }
  return (
    <div className="cart">
      <Container maxWidth="xl">
        <Grid2 container rowSpacing={1} columnSpacing={3}>
          <Grid2 lg={8} width={'100%'}>
            <TableContainer
              component={Paper}
              sx={{ mb: '10px', maxHeight: '1000px', overflow: 'auto' }}>
              <Typography sx={{ fontSize: '20px', fontWeight: 700, ml: 3, mb: 3, mt: 2 }}>
                Giỏ hàng của bạn
              </Typography>
              <Divider style={{ height: '1px', backgroundColor: 'black', marginBottom: '20px' }} />

              <Typography sx={{ fontSize: '17px', ml: 3, mb: 3, mt: 2 }}>
                Bạn đang có <span style={{ fontWeight: 700 }}>{amountProduct} sản phẩm</span> trong
                giỏ hàng
              </Typography>
              <div style={{}}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead style={{ backgroundColor: '#333', color: 'white' }}>
                    <TableRow>
                      <TableCell width="4%">
                        {' '}
                        <Checkbox
                          size="small"
                          checked={productSelect.length === product.length}
                          onClick={(e) => {
                            checkAll(e.target.checked)
                          }}
                        />
                      </TableCell>
                      <TableCell style={{ color: 'white' }} align="center">
                        ẢNH SẢN PHẨM
                      </TableCell>
                      <TableCell style={{ color: 'white' }} align="center">
                        TÊN SẢN PHẨM
                      </TableCell>
                      <TableCell style={{ color: 'white' }} align="center">
                        SIZE
                      </TableCell>
                      <TableCell style={{ color: 'white' }} align="center">
                        ĐƠN GIÁ
                      </TableCell>
                      <TableCell style={{ color: 'white', width: '20%' }} align="center">
                        SỐ LƯỢNG
                      </TableCell>
                      <TableCell style={{ color: 'white' }} align="center">
                        THÀNH TIỀN
                      </TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {product.map((cart) => (
                      <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <TableCell>
                          <Checkbox
                            checked={productSelect.findIndex((e) => e.id === cart.id) >= 0}
                            size="small"
                            onClick={(e) => onChangeCheck(cart, e.target.checked)}
                          />
                        </TableCell>

                        <TableCell>
                          <div style={{ position: 'relative', display: 'inline-block' }}>
                            <img src={cart.image[0]} alt={cart.name} width={70} />
                            <div
                              className="delete-product-cart"
                              onClick={() => {
                                const updatedProduct = product.filter((item) => item.id !== cart.id)
                                dispatch(setCart(updatedProduct))
                              }}>
                              xóa
                            </div>
                          </div>
                        </TableCell>

                        <TableCell sx={{ fontWeight: 1000, width: '30%' }} align="center">
                          {cart.name}
                        </TableCell>
                        <TableCell sx={{ fontWeight: 1000, width: '10%' }} align="center">
                          <b style={{ margin: 0 }}>
                            <select
                              onChange={(e) => {
                                chageSize(e.target.value, cart.id)
                              }}
                              onClick={() => {
                                getListSize(cart.id)
                              }}
                              value={
                                parseFloat(cart.size) % 1 === 0
                                  ? parseFloat(cart.size).toFixed(0)
                                  : parseFloat(cart.size).toFixed(1)
                              }>
                              <option value={cart.id}>
                                {parseFloat(cart.size) % 1 === 0
                                  ? parseFloat(cart.size).toFixed(0)
                                  : parseFloat(cart.size).toFixed(1)}
                              </option>
                              {sizes &&
                                sizes.map((size) => {
                                  if (size.size !== cart.size) {
                                    return (
                                      <option value={size.id} key={`size${size.id}`}>
                                        {parseFloat(size.size) % 1 === 0
                                          ? parseFloat(size.size).toFixed(0)
                                          : parseFloat(size.size).toFixed(1)}
                                      </option>
                                    )
                                  }
                                })}
                            </select>
                          </b>
                        </TableCell>
                        <TableCell align="center">
                          {' '}
                          <Typography fontFamily={'monospace'} fontWeight={'700'} color={'red'}>
                            {promotionByProductDetail.map((item, index) => (
                              <div key={index}>
                                {item.id ? (
                                  <div>
                                    {item.idProductDetail === cart.id && (
                                      <div>
                                        <div>
                                          <div className="promotion-price">{`${formatPrice(
                                            cart.gia,
                                          )} `}</div>
                                          <div>
                                            <span style={{ color: 'red', fontWeight: 'bold' }}>
                                              {`${formatPrice(
                                                calculateDiscountedPrice(cart.gia, item.value),
                                              )} `}
                                            </span>
                                          </div>
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                ) : (
                                  <div>{`${formatPrice(cart.gia)} `}</div>
                                )}
                              </div>
                            ))}
                            {/* <div className="promotion-price">{`${formatPrice(cart.gia)} `}</div> */}
                          </Typography>
                        </TableCell>
                        <TableCell align="center">
                          {' '}
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
                          {promotionByProductDetail.map((item) => (
                            <div>
                              {item.idProductDetail === cart.id && (
                                <div>
                                  {item.id ? (
                                    <div>
                                      {formatPrice(
                                        cart.soLuong *
                                          calculateDiscountedPrice(cart.gia, item.value),
                                      )}
                                    </div>
                                  ) : (
                                    <span>{`${formatPrice(cart.soLuong * cart.gia)} `}</span>
                                  )}
                                </div>
                              )}
                            </div>
                          ))}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TableContainer>
            <Button component={Link} to="/products" variant="outlined" color="cam">
              <ArrowBackIcon />
              <b>Tiếp tục mua hàng</b>
            </Button>
          </Grid2>
          <Grid2 lg={4} xs={12}>
            <Paper variant="outlined" sx={{ minHeight: '54vh', padding: 4 }}>
              <Typography
                variant="h6"
                sx={{ fontFamily: 'monospace', fontWeight: '900', mt: 4, mb: 4 }}>
                THÔNG TIN ĐƠN HÀNG
              </Typography>
              <Table>
                <TableFooter sx={NoBoder}>
                  <OrderCartFotter
                    label="Tổng tiền"
                    value={productSelect
                      .reduce((total, cart) => {
                        const matchingPromotion = promotionByProductDetail.find(
                          (item) => item.idProductDetail === cart.id,
                        )

                        const itemTotal =
                          cart.soLuong *
                          (matchingPromotion && matchingPromotion.id !== ''
                            ? calculateDiscountedPrice(cart.gia, matchingPromotion.value)
                            : cart.gia)

                        return total + itemTotal
                      }, 0)
                      .toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}
                  />
                </TableFooter>
              </Table>
              <Divider style={{ height: '1px', backgroundColor: 'black', marginBottom: '20px' }} />
              <Typography sx={{ fontSize: '14px' }}>
                . Phí vận chuyển sẽ được tính ở trang thanh toán.
              </Typography>
              <Typography sx={{ fontSize: '14px', marginBottom: '20px' }}>
                .Bạn cũng có thể nhập mã giảm giá ở trang thanh toán.
              </Typography>
              <Button
                component={Link}
                to="/checkout"
                onClick={() => {
                  dispatch(setCheckout(productSelect))
                }}
                size="sm"
                variant="contained"
                sx={{
                  minWidth: '100%',
                  backgroundColor: '#333',
                  ':hover': {
                    backgroundColor: '#000',
                  },
                }}>
                <PaidRoundedIcon />
                <b> Tiến hành thanh toán</b>
              </Button>
            </Paper>
          </Grid2>
        </Grid2>
      </Container>
    </div>
  )
}
