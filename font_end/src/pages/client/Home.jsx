import React, { Fragment } from 'react'
import Box from '@mui/material/Box'
import { Container } from '@mui/material'
import CartProduct from '../../layout/client/CartProduct'
import Carousel from 'react-material-ui-carousel'
import LabelTitle from '../../layout/client/LabelTitle'

const products = [
  {
    id: 1,
    title: 'Giay so 1',
    image: 'https://shorturl.at/dfhyC',
  },
  {
    id: 7,
    title: 'Giay so 1',
    image: 'https://shorturl.at/dfhyC',
  },
  {
    id: 8,
    title: 'Giay so 1',
    image: 'https://shorturl.at/dfhyC',
  },
  {
    id: 2,
    title: 'Giay so 1',
    image: 'https://shorturl.at/dfhyC',
  },
  {
    id: 7,
    title: 'Giay so 1',
    image: 'https://shorturl.at/dfhyC',
  },
  {
    id: 8,
    title: 'Giay so 1',
    image: 'https://shorturl.at/dfhyC',
  },
  {
    id: 3,
    title: 'Giay so 1',
    image: 'https://shorturl.at/dfhyC',
  },
  {
    id: 7,
    title: 'Giay so 1',
    image: 'https://shorturl.at/dfhyC',
  },
  {
    id: 8,
    title: 'Giay so 1',
    image: 'https://shorturl.at/dfhyC',
  },
  {
    id: 4,
    title: 'Giay so 1',
    image: 'https://shorturl.at/dfhyC',
  },
  {
    id: 5,
    title: 'Giay so 1',
    image: 'https://shorturl.at/dfhyC',
  },
  {
    id: 6,
    title: 'Giay so 1',
    image: 'https://shorturl.at/dfhyC',
  },
  {
    id: 7,
    title: 'Giay so 1',
    image: 'https://shorturl.at/dfhyC',
  },
  {
    id: 8,
    title: 'Giay so 1',
    image: 'https://shorturl.at/dfhyC',
  },
]

function CarouselHome() {
  var itemImage = [
    'https://i.pinimg.com/originals/fa/45/96/fa4596ad9a9d39901eeb455ed4f74e44.jpg',
    'https://i.insider.com/511d398169bedd436300000a?width=1200&format=jpeg',
    'https://mir-s3-cdn-cf.behance.net/project_modules/fs/2bbcfa99737217.5ef9be3dbb9a9.jpg',
  ]
  return (
    <Carousel indicators={false} sx={{ mt: -2 }}>
      {itemImage.map((item, i) => (
        <Box
          component="img"
          sx={{
            maxHeight: { xs: 200, sm: 300, md: 400, lg: 500, xl: 600 },
            minHeight: { xs: 200, sm: 300, md: 400, lg: 500, xl: 600 },
            minWidth: '100%',
          }}
          key={i}
          alt="error"
          src={item}
        />
      ))}
    </Carousel>
  )
}

export default function Home() {
  return (
    <Fragment>
      <Box>
        <CarouselHome />
      </Box>
      <Container maxWidth="lg" sx={{ mt: 2 }}>
        <Box sx={{ width: '100%' }}>
          <LabelTitle text="Sản phẩm mới" />
          <CartProduct products={products} colsm={6} colmd={4} collg={3} />
        </Box>
        <Box>
          <LabelTitle text="Sản phẩm bán chạy" />
          <CartProduct products={products} colmd={4} collg={3} />
        </Box>
      </Container>
    </Fragment>
  )
}
