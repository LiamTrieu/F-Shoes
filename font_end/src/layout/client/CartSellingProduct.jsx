import React, { useState } from 'react'
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Button,
  Stack,
  Rating,
  Tooltip,
} from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import './productHome.css'
import Carousel from 'react-material-ui-carousel'
import { useDispatch } from 'react-redux'
import clientProductApi from '../../api/client/clientProductApi'
import { addCart } from '../../services/slices/cartSlice'
import { toast } from 'react-toastify'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'
import ModalAddProductToCart from '../../pages/client/ModalAddProductToCart'

export default function CartSellingProduct({ products, colmd, collg }) {
  const [openModalCart, setOpenModalCart] = useState(false)
  const handleOpenModalCart = () => setOpenModalCart(true)
  const handleCloseModalCart = () => setOpenModalCart(false)
  const calculateDiscountedPrice = (originalPrice, discountPercentage) => {
    const discountAmount = (discountPercentage / 100) * originalPrice
    const discountedPrice = originalPrice - discountAmount
    return discountedPrice
  }
  const [isCartHovered, setIsCartHovered] = useState(false)
  const [product, setProduct] = useState({ image: [], price: '' })

  const dispatch = useDispatch()
  const addProductToCart = (id) => {
    clientProductApi.getById(id).then((response) => {
      console.log(response.data.data)
      setProduct({
        ...response.data.data,
        image: response.data.data.image.split(','),
      })
      const newItem = {
        id: id,
        idProduct: response.data.data.idProduct,
        name: response.data.data.name,
        gia: response.data.data.price,
        weight: response.data.data.weight,
        image: response.data.data.image.split(','),
        soLuong: parseInt(1),
        size: response.data.data.size,
      }
      dispatch(addCart(newItem))
      handleOpenModalCart()
      toast.success('Thêm sản phẩm thành công')
    })
  }

  return (
    <>
      <Grid container rowSpacing={1} columnSpacing={3}>
        {products.map((product, i) => {
          const discountValue = product.value || 0

          const red = [255, 0, 0]
          const green = [255, 255, 0]
          const interpolatedColor = [
            Math.round((1 - discountValue / 100) * green[0] + (discountValue / 100) * red[0]),
            Math.round((1 - discountValue / 100) * green[1] + (discountValue / 100) * red[1]),
            Math.round((1 - discountValue / 100) * green[2] + (discountValue / 100) * red[2]),
          ]
          return (
            <Grid
              key={i}
              item
              xs={6}
              sm={6}
              md={colmd}
              lg={collg}
              mt={1}
              width={'100%'}
              onMouseEnter={() => setIsCartHovered(i)}
              onMouseLeave={() => setIsCartHovered(null)}
              className="cart-product-hover">
              <Card sx={{ width: '100%', height: '500px' }}>
                <Box
                  sx={{
                    position: 'relative',
                    width: '100%',
                    paddingBottom: '100%',
                    overflow: 'hidden',
                  }}>
                  {product.value && (
                    <div
                      className="discount-badge"
                      style={{
                        backgroundColor: `rgb(${interpolatedColor[0]}, ${interpolatedColor[1]}, ${interpolatedColor[2]})`,
                      }}>{`${discountValue ? discountValue : ''}%`}</div>
                  )}
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Carousel
                      indicators={false}
                      sx={{ width: '100%', height: '100%' }}
                      navButtonsAlwaysInvisible>
                      {product.image.map((item, i) => (
                        <Button
                          component={Link}
                          to={`/product/${product.id}`}
                          sx={{ width: '100%', p: 0, my: 1 }}>
                          <CardMedia
                            component="img"
                            alt="Product"
                            image={item}
                            sx={{
                              minWidth: '100%',
                              minHeight: '100%',
                              objectFit: 'contain',
                            }}
                          />
                        </Button>
                      ))}
                    </Carousel>
                    {isCartHovered === i && (
                      <div
                        style={{
                          position: 'absolute',
                          zIndex: 2,
                          top: '80%',
                          left: '40%',
                        }}>
                        <Tooltip title="Thêm vào giỏ hàng">
                          <Button
                            variant="contained"
                            color="error"
                            onClick={() => addProductToCart(product.id)}>
                            <AddShoppingCartIcon />
                          </Button>
                        </Tooltip>
                      </div>
                    )}
                  </Box>
                </Box>
                <Button component={Link} to={`/product/${product.id}`} sx={{ width: '100%', p: 0 }}>
                  <CardContent>
                    <Typography
                      className="title"
                      gutterBottom
                      component="div"
                      sx={{ textTransform: 'none', color: 'black' }}>
                      {product.title}
                    </Typography>
                    <Typography gutterBottom component="div">
                      <span>
                        {' '}
                        {product.value ? (
                          <div style={{ display: 'flex' }}>
                            <div className="promotion-price">{`${product.priceBefort.toLocaleString(
                              'it-IT',
                              { style: 'currency', currency: 'VND' },
                            )} `}</div>{' '}
                            <div>
                              <span style={{ color: 'red', fontWeight: 'bold' }}>
                                {`${calculateDiscountedPrice(
                                  product.priceBefort,
                                  product.value,
                                ).toLocaleString('it-IT', {
                                  style: 'currency',
                                  currency: 'VND',
                                })} `}
                              </span>{' '}
                            </div>
                          </div>
                        ) : (
                          <span style={{ color: 'black' }}>{`${product.priceBefort.toLocaleString(
                            'it-IT',
                            {
                              style: 'currency',
                              currency: 'VND',
                            },
                          )} `}</span>
                        )}
                      </span>
                    </Typography>

                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="flex-end"
                      spacing={1}>
                      <Typography
                        className="title"
                        gutterBottom
                        component="div"
                        sx={{ textTransform: 'none', color: 'black' }}>
                        Đã bán: {product.amount}
                      </Typography>
                      <Rating name="size-small" defaultValue={2} size="medium" />
                    </Stack>
                  </CardContent>
                </Button>
              </Card>
            </Grid>
          )
        })}
        {openModalCart && (
          <ModalAddProductToCart
            openModal={openModalCart}
            handleCloseModal={handleCloseModalCart}
            product={product}
          />
        )}
      </Grid>
    </>
  )
}
