import React, { useState } from 'react'
import { Grid, Card, CardMedia, CardContent, Typography, Box, Button, Tooltip } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import './productHome.css'
import Carousel from 'react-material-ui-carousel'
import { useDispatch } from 'react-redux'
import clientProductApi from '../../api/client/clientProductApi'
import { addCart } from '../../services/slices/cartSlice'
import { toast } from 'react-toastify'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'

export default function CartProductHome({ products, colmd, collg }) {
  const calculateDiscountedPrice = (originalPrice, discountPercentage) => {
    const discountAmount = (discountPercentage / 100) * originalPrice
    const discountedPrice = originalPrice - discountAmount
    return discountedPrice
  }

  const [isCartHovered, setIsCartHovered] = useState(false)

  let navigate = useNavigate()
  const dispatch = useDispatch()
  const addProductToCart = (id) => {
    clientProductApi.getById(id).then((response) => {
      console.log(response.data.data)
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
      navigate('/cart')
      toast.success('Thêm sản phẩm thành công')
    })
  }

  return (
    <>
      {/* <Grid container rowSpacing={1} columnSpacing={3}> */}
      {products.map((product, i) => {
        const hasPromotion = product.promotion !== null && product.statusPromotion === 1
        const discountValue = product.value || 0

        const red = [255, 0, 0]
        const green = [255, 255, 0]
        const interpolatedColor = [
          Math.round((1 - discountValue / 100) * green[0] + (discountValue / 100) * red[0]),
          Math.round((1 - discountValue / 100) * green[1] + (discountValue / 100) * red[1]),
          Math.round((1 - discountValue / 100) * green[2] + (discountValue / 100) * red[2]),
        ]
        return (
          // <Grid key={i} item xs={6} sm={6} md={colmd} lg={collg} width={'100%'}>
          <Button
            component={Link}
            to={`/product/${product.id}`}
            sx={{ width: '100%', p: 0, my: 1 }}>
            <Card sx={{ width: '25%', height: '450px' }}>
              {hasPromotion && (
                <div
                  className="discount-badge"
                  style={{
                    backgroundColor: `rgb(${interpolatedColor[0]}, ${interpolatedColor[1]}, ${interpolatedColor[2]})`,
                  }}>{`${discountValue ? discountValue : ''}%`}</div>
              )}
              <Box
                key={i}
                sx={{
                  position: 'relative',
                  width: '100%',
                  paddingBottom: '100%',
                  overflow: 'hidden',
                }}
                onMouseEnter={() => setIsCartHovered(i)}
                onMouseLeave={() => setIsCartHovered(null)}>
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
                      <Tooltip title="Mua ngay">
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

              <CardContent>
                <Typography
                  className="title"
                  gutterBottom
                  component="div"
                  sx={{ textTransform: 'none' }}>
                  {product.title}
                </Typography>
                <Typography gutterBottom component="div" sx={{ textTransform: 'none' }}>
                  {' '}
                  {product.nameCate}
                </Typography>
                {/* <Typography gutterBottom component="div" sx={{ textTransform: 'none' }}>
                  {product.nameBrand}
                </Typography> */}
                <Typography gutterBottom component="div">
                  <span>
                    {' '}
                    {product.promotion && product.statusPromotion === 1 ? (
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
                      <span>{`${product.priceBefort.toLocaleString('it-IT', {
                        style: 'currency',
                        currency: 'VND',
                      })} `}</span>
                    )}
                  </span>
                </Typography>
                <Typography gutterBottom component="div" sx={{ textTransform: 'none' }}>
                  New
                </Typography>
              </CardContent>
            </Card>
          </Button>
          // </Grid>
        )
      })}
      {/* </Grid> */}
    </>
  )
}
