import React from 'react'
import { Grid, Card, CardMedia, CardContent, Typography, Box, Button } from '@mui/material'
import { Link } from 'react-router-dom'
import './productHome.css'
import Carousel from 'react-material-ui-carousel'

export default function CartProduct({ products, colmd, collg }) {
  return (
    <Grid container rowSpacing={1} columnSpacing={3}>
      {products.map((product, i) => {
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
                  </Box>
                </Box>
                <CardContent>
                  <Typography className="title" gutterBottom component="div">
                    {product.title}
                  </Typography>
                  <Typography gutterBottom component="div">
                    <span className="price"> {product.price} </span>
                    <span className="price-discount"> {product.priceAfter}đ</span>
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
