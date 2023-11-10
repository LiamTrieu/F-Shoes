import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Container,
  IconButton,
  TextField,
  ThemeProvider,
  Typography,
} from '@mui/material'
import Grid2 from '@mui/material/Unstable_Grid2/Grid2'
import React, { useState } from 'react'
import { ColorCustom } from '../../styles/ColorCustom'
import CartProduct from '../../layout/client/CartProduct'
import LabelTitle from '../../layout/client/LabelTitle'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import { useEffect } from 'react'
import clientProductApi from '../../api/client/clientProductApi'
import { Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { GetCart, addCart, removeCart, setCart, updateCart } from '../../services/slices/cartSlice'
import ReactImageGallery from 'react-image-gallery'
import { Drawer } from '@mui/material'
import 'react-image-gallery/styles/css/image-gallery.css'
import './DetailProduct.css'
import { setCheckout } from '../../services/slices/checkoutSlice'

function calculateTotalPayment(cart) {
  let total = 0
  cart.forEach((item) => {
    total += item.gia * item.soLuong
  })
  return total.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })
}

export default function DetailProduct() {
  const [soLuong, setSoluong] = useState(1)
  const [product, setProduct] = useState({ image: [], price: '' })
  const [products, setProducts] = useState([])
  const [sizes, setSizes] = useState([])
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [sizeSelect, setSizeSelect] = useState()
  const param = useParams('id')

  const openSidebar = () => {
    setIsSidebarOpen(true)
  }
  useEffect(() => {
    let data
    clientProductApi
      .get(param)
      .then((result) => {
        data = result.data.data[0]
        setProduct({
          ...data,
          image: data.image.split(','),
        })
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
            setSizeSelect(result.data.data.find((data) => data.id === param.id).size)
          })
      })
    clientProductApi.get().then((result) => {
      const data = result.data.data
      setProducts(
        data.map((e) => {
          return {
            id: e.id,
            title: e.name,
            priceBefort: e.price,
            priceAfter: e.price,
            promotion: e.promotion,
            value: e.value,
            image: e.image.split(','),
            idProduct: e.idProduct,
            idColor: e.idColor,
            idMaterial: e.idMaterial,
            idSole: e.idSole,
            idCategory: e.idCategory,
            idBrand: e.idBrand,
          }
        }),
      )
    })
  }, [sizeSelect])

  const calculateDiscountedPrice = (originalPrice, discountPercentage) => {
    const discountAmount = (discountPercentage / 100) * originalPrice
    const discountedPrice = originalPrice - discountAmount
    return discountedPrice
  }

  const dispatch = useDispatch()
  const addProductToCart = () => {
    const newItem = {
      id: param.id,
      name: product.name,
      gia: product.price,
      weight: product.weight,
      image: product.image,
      soLuong: soLuong,
      size: sizeSelect,
    }
    dispatch(addCart(newItem))
    openSidebar()
  }

  const productCart = useSelector(GetCart)

  const onChangeSL = (cart, num) => {
    const soluong = cart.soLuong + num
    if (soluong <= 0) {
      dispatch(removeCart(cart.id))
    } else {
      dispatch(updateCart({ ...cart, soLuong: soluong }))
    }
  }

  function convert(images) {
    return images.map((image) => {
      return {
        original: image,
        thumbnail: image,
      }
    })
  }
  return (
    <div className="detail-product">
      <Container maxWidth="xl">
        <Grid2 container rowSpacing={1} columnSpacing={3}>
          <Grid2 md={6} textAlign={'center'} width={'100%'}>
            <ReactImageGallery
              showBullets={false}
              showPlayButton={false}
              showNav={false}
              autoPlay={true}
              items={convert(product.image)}
            />
          </Grid2>
          <Grid2 md={6} width={'100%'}>
            <Box borderBottom={'1px dotted gray'} py={2}>
              <Typography variant="h4" fontFamily={'monospace'} fontWeight={'bolder'}>
                {product.name}
              </Typography>
              <div style={{ marginTop: '5px', marginBottom: '10px' }}>
                <b>Loại giày: </b>
                {product.nameCate}
                &nbsp;&nbsp;&nbsp;&nbsp;
                <b>Thương hiệu: </b>
                {product.nameBrand}
              </div>
              <Typography variant="h5" fontFamily={'monospace'} fontWeight={'900'} color={'red'}>
                {/* {product.price.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })} */}
                <span>
                  {' '}
                  {product.promotion ? (
                    <div style={{ display: 'flex' }}>
                      <div className="promotion-price">{`${product.price.toLocaleString('it-IT', {
                        style: 'currency',
                        currency: 'VND',
                      })} `}</div>{' '}
                      <div>
                        <span style={{ color: 'red', fontWeight: 'bold' }}>
                          {`${calculateDiscountedPrice(product.price, product.value).toLocaleString(
                            'it-IT',
                            {
                              style: 'currency',
                              currency: 'VND',
                            },
                          )} `}
                        </span>{' '}
                      </div>
                    </div>
                  ) : (
                    <span>{`${product.price.toLocaleString('it-IT', {
                      style: 'currency',
                      currency: 'VND',
                    })} `}</span>
                  )}
                </span>
              </Typography>
            </Box>
            <Box borderBottom={'1px dotted gray'} py={2} mb={2}>
              <Box py={2}>
                <Typography mr={2} fontWeight={'bold'} variant="button" gutterBottom>
                  Size
                </Typography>
                {sizes.map((e, index) => {
                  return (
                    <Button
                      onClick={() => {
                        setSizeSelect(e.size)
                      }}
                      component={Link}
                      to={`/product/${e.id}`}
                      key={'size' + index}
                      variant="outlined"
                      style={{
                        marginLeft: '10px',
                        color: param.id === e.id ? 'white' : 'black',
                        backgroundColor: param.id === e.id ? 'black' : 'white',
                        padding: '2px 0px 2px 0px',
                        border: '1px solid gray',
                      }}>
                      {parseInt(e.size)}
                    </Button>
                  )
                })}
              </Box>
              <Box py={2}>
                <Typography
                  sx={{ float: 'left', mt: '3px' }}
                  color={'red'}
                  mr={2}
                  fontWeight={'bold'}
                  variant="button"
                  gutterBottom>
                  Số lượng: {product.amount}
                </Typography>
                <Box
                  width={'65px'}
                  display="flex"
                  alignItems="center"
                  sx={{
                    border: '1px solid gray',
                    borderRadius: '20px',
                  }}
                  p={'3px'}>
                  <IconButton
                    onClick={(e) => {
                      setSoluong(soLuong - 1)
                    }}
                    sx={{ p: 0 }}
                    size="small">
                    <RemoveIcon fontSize="1px" />
                  </IconButton>
                  <TextField
                    onChange={(e) => {
                      setSoluong(e.target.value)
                    }}
                    value={soLuong}
                    inputProps={{ min: 1 }}
                    size="small"
                    sx={{
                      width: '30px ',
                      '& input': { p: 0, textAlign: 'center' },
                      '& fieldset': {
                        border: 'none',
                      },
                    }}
                  />
                  <IconButton
                    onClick={() => {
                      setSoluong(soLuong + 1)
                    }}
                    size="small"
                    sx={{ p: 0 }}>
                    <AddIcon fontSize="1px" />
                  </IconButton>
                </Box>
              </Box>
            </Box>
            <ThemeProvider theme={ColorCustom}>
              <Button
                onClick={addProductToCart}
                type="submit"
                variant="contained"
                color="neutral"
                sx={{ marginRight: '15px' }}>
                Thêm vào giỏ hàng
              </Button>
              <Button type="submit" variant="contained" color="red" sx={{ marginRight: '15px' }}>
                Mua ngay
              </Button>
            </ThemeProvider>
            <Accordion sx={{ boxShadow: 'none', mt: 3 }}>
              <AccordionSummary
                sx={{ padding: 0 }}
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header">
                <Typography color={'gray'}>Mô tả sản phẩm</Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ padding: 0 }}>
                <Typography>{product.description}</Typography>
              </AccordionDetails>
            </Accordion>
          </Grid2>
        </Grid2>
        <Box sx={{ width: '100%' }} mt={5}>
          <LabelTitle text="Sản phẩm mới" />
          <CartProduct products={products} colsm={6} colmd={4} collg={3} />
        </Box>
        <Drawer anchor="right" open={isSidebarOpen} onClose={() => setIsSidebarOpen(false)}>
          <div className="custom-sidebar">
            <div className="cart-title">
              <h1>Giỏ hàng</h1>
              <p>({productCart.length} sản phẩm)</p>
            </div>
            <div className="product-cart">
              {productCart.map((cart) => (
                <div key={cart.id} className="cart-item">
                  <div className="cart-item-content">
                    <div
                      className="remove-item"
                      onClick={() => {
                        const updatedProduct = productCart.filter((item) => item.id !== cart.id)
                        dispatch(setCart(updatedProduct))
                      }}>
                      X
                    </div>
                    <img src={cart.image[0]} alt={cart.name} className="cart-item-image" />
                    <div className="cart-item-details">
                      <Typography className="product-name-detail-gh" variant="body1">
                        {cart.name}
                      </Typography>

                      <div className="price-and-quantity">
                        <Typography className="price-gh" variant="body1">
                          <span>
                            {' '}
                            {product.promotion ? (
                              <div style={{ display: 'flex' }}>
                                <div className="promotion-price">{`${product.price.toLocaleString(
                                  'it-IT',
                                  {
                                    style: 'currency',
                                    currency: 'VND',
                                  },
                                )} `}</div>{' '}
                                <div>
                                  <span style={{ color: 'red', fontWeight: 'bold' }}>
                                    {`${calculateDiscountedPrice(
                                      product.price,
                                      product.value,
                                    ).toLocaleString('it-IT', {
                                      style: 'currency',
                                      currency: 'VND',
                                    })} `}
                                  </span>{' '}
                                </div>
                              </div>
                            ) : (
                              <span>{`${product.price.toLocaleString('it-IT', {
                                style: 'currency',
                                currency: 'VND',
                              })} `}</span>
                            )}
                          </span>
                        </Typography>
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
                      </div>
                      <Typography className="price-and-size" variant="body1">
                        Size: {Math.floor(cart.size)}
                      </Typography>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="end-cart">
              <div className="total-payment">
                <p>
                  Tổng thanh toán: <span>{calculateTotalPayment(productCart)}</span>{' '}
                </p>
              </div>
              <div className="checkout-buttons">
                <Button
                  component={Link}
                  to="/cart"
                  variant="contained"
                  color="primary"
                  style={{ width: '49%' }}>
                  Đến giỏ hàng
                </Button>
                <Button
                  component={Link}
                  to="/checkout"
                  onClick={() => {
                    dispatch(setCheckout(productCart))
                  }}
                  variant="contained"
                  color="secondary"
                  style={{ width: '49%' }}>
                  Đến thanh toán
                </Button>
              </div>
            </div>
          </div>
        </Drawer>
      </Container>
    </div>
  )
}
