import React from 'react'
import { Grid, Card, CardMedia, CardContent, Typography, Box, Button } from '@mui/material'
import { Link } from 'react-router-dom'
import './productHome.css'
import Carousel from 'react-material-ui-carousel'

export default function CartProduct({ products, colmd, collg }) {
  const calculateDiscountedPrice = (originalPrice, discountPercentage) => {
    const discountAmount = (discountPercentage / 100) * originalPrice
    const discountedPrice = originalPrice - discountAmount
    return discountedPrice
  }
  return (
    <Grid container rowSpacing={1} columnSpacing={3}>
      {products.map((product, i) => {
        const hasPromotion = product.promotion !== null
        const discountValue = product.value || 0
        return (
          <Grid key={i} item xs={6} sm={6} md={colmd} lg={collg} width={'100%'}>
            <Button
              component={Link}
              to={`/product/${product.id}`}
              sx={{ width: '100%', p: 0, my: 1 }}>
              <Card sx={{ width: '100%' }}>
                <Box
                  sx={{
                    position: 'relative',
                    width: '100%',
                    paddingBottom: '100%',
                    overflow: 'hidden',
                  }}>
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
                    {hasPromotion && (
                      <div className="discount-badge">{`${
                        discountValue ? discountValue : ''
                      }%`}</div>
                    )}
                  </Box>
                </Box>
                <CardContent>
                  <Typography className="title" gutterBottom component="div">
                    {product.title}
                  </Typography>
                  <Typography gutterBottom component="div">
                    <span>
                      {' '}
                      {product.promotion ? (
                        <div>
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
                </CardContent>
              </Card>
            </Button>
          </Grid>
        )
      })}
    </Grid>
  )
}
