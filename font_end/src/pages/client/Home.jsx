import React, { Fragment, useRef } from 'react'
import Box from '@mui/material/Box'
import { Button, Container, Grid, Typography } from '@mui/material'
import CartProduct from '../../layout/client/CartProduct'
import LabelTitle from '../../layout/client/LabelTitle'
import './Home.css'

const products = [
  {
    id: 1,
    title: 'Giày Sneaker',
    price: '1.000.000đ',
    image:
      'https://tyhisneaker.com/wp-content/uploads/2023/09/giay-sneaker-lv-x-yayoi-kusama-2023-auth-tuong-6.jpeg',
  },
  {
    id: 7,
    title: 'Giày Sneaker',
    price: '1.000.000đ',
    image:
      'https://tyhisneaker.com/wp-content/uploads/2023/09/giay-lv-trainer-54-new-york-navy-auth-tuong-6.jpeg',
  },
  {
    id: 8,
    title: 'Giày Sneaker',
    price: '1.000.000đ',
    image:
      'https://tyhisneaker.com/wp-content/uploads/2023/09/giay-lv-trainer-54-white-red-auth-tuong-6.jpeg',
  },
  {
    id: 2,
    title: 'Giày Sneaker',
    price: '1.000.000đ',
    image:
      'https://tyhisneaker.com/wp-content/uploads/2023/09/giay-lv-trainer-54-signature-green-white-auth-tuong-5.jpeg',
  },
  {
    id: 7,
    title: 'Giày Sneaker',
    price: '1.000.000đ',
    image:
      'https://tyhisneaker.com/wp-content/uploads/2023/09/giay-louis-vuitton-lv-trainer-maxi-trang-auth-tuong-5.jpeg',
  },
  {
    id: 8,
    title: 'Giày Sneaker',
    price: '1.000.000đ',
    image:
      'https://tyhisneaker.com/wp-content/uploads/2023/09/giay-sneaker-lv-x-yayoi-kusama-2023-auth-tuong-6.jpeg',
  },
  {
    id: 8,
    title: 'Giày Sneaker',
    price: '1.000.000đ',
    image:
      'https://tyhisneaker.com/wp-content/uploads/2023/09/giay-sneaker-lv-x-yayoi-kusama-2023-auth-tuong-6.jpeg',
  },
  {
    id: 4,
    title: 'Giày Sneaker',
    price: '1.000.000đ',
    image:
      'https://tyhisneaker.com/wp-content/uploads/2023/09/giay-sneaker-lv-x-yayoi-kusama-2023-auth-tuong-6.jpeg',
  },
]

export default function Home() {
  const videoRef = useRef(null)

  const handleVideoEnded = () => {
    videoRef.current.play()
  }
  return (
    <>
      <div className="home">
        <Fragment>
          <Container maxWidth="xl">
            <Box>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <video
                    ref={videoRef}
                    autoPlay
                    muted
                    onEnded={handleVideoEnded}
                    style={{ width: '100%', height: '100%' }}
                    src="https://brand.assets.adidas.com/video/upload/if_w_gt_1920,w_1920/running_fw23_adizero_boston12_launch_hp_masthead_d_dcb43d7604.mp4"></video>
                </Grid>
              </Grid>
            </Box>
            <Typography className="title-banner">RUN YOUR RUN</Typography>
            <Typography className="title-banner-child">
              Follow the feeling that keeps you running your best in the city
            </Typography>
            <div className="btn-div-product">
              <Button className="btn-product">Shop Apparel</Button>
              <Button className="btn-product">Shop Apparel</Button>
            </div>
            <Typography className="text-just-in">Just In</Typography>

            <Box>
              <Grid container spacing={12}>
                <Grid item xs={12}>
                  <img
                    src={require('../../assets/image/image.jpg')}
                    alt=""
                    style={{ width: '100%' }}
                  />
                </Grid>
              </Grid>
            </Box>
            <Typography className="text-just-in">Trending</Typography>
            <Box>
              <Grid container spacing={12}>
                <Grid item xs={12}>
                  <img
                    src={require('../../assets/image/nike-just-do-it.jpg')}
                    alt=""
                    style={{ width: '100%' }}
                  />
                </Grid>
              </Grid>
            </Box>
            <Typography className="title-banner">NIKE ZOOM TRI</Typography>
            <Typography className="title-banner-child">
              Light and responsive. Build for your workout and beyond
            </Typography>
            <div className="btn-div-product">
              <Button className="btn-product">Shop Apparel</Button>
            </div>
            <Typography className="text-just-in">Just In</Typography>
            <Box>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <img
                    src={require('../../assets/image/nike-just-do-it (1).jpg')}
                    alt=""
                    style={{ width: '100%' }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <img
                    src={require('../../assets/image/nike-just-do-it (2).jpg')}
                    alt=""
                    style={{ width: '100%' }}
                  />
                </Grid>
              </Grid>
            </Box>
            <Typography className="title-banner">MEN'S SPORT</Typography>
            <Typography className="title-banner-child">
              Light and responsive. Build for your workout and beyond
            </Typography>
            <div className="btn-div-product">
              <Button className="btn-product">Shop Apparel</Button>
            </div>
          </Container>
          <Container maxWidth="lg">
            <Box className="new-product">
              <LabelTitle text="Sản phẩm mới" />
              <CartProduct products={products} colsm={6} colmd={4} collg={3} />
            </Box>

            <Box className="selling-product">
              <CartProduct products={products} colmd={4} collg={3} />
            </Box>

            <Box className="about-us">
              <Grid container spacing={12}>
                <Grid item xs={6}>
                  <Typography className="text-about-us">VỀ CHÚNG TÔI</Typography>
                  <Typography>
                    {' '}
                    <span className="fShoes">F_Shoes</span> -{' '}
                    <span className="fshoes-shop"> Shop Giày F-Shoes</span>
                  </Typography>
                  <span>
                    Cung cấp hơn 500 đôi giày replica 1:1, sneaker nam, nữ của các thương hiệu như
                    Adidas, Nike, Jordan, Yeezy, Balenciaga, Gucci, MLB,… Hàng chuẩn, Like Auth,
                    Giày rep 1:1 với chất lượng tốt nhất, giá rẻ nhất thị trường hiện nay. Giao hàng
                    nhanh toàn quốc, chính sách đổi trả và chính sách bảo hành linh hoạt.
                    <br />
                    <br /> Nếu bạn không đủ tài chính để mua một đôi giày chính hãng hoặc gặp khó
                    khăn về việc đặt hàng và size giày, Tyhi Sneaker sẽ giúp bạn chọn một đôi giày
                    rep 1:1 hợp với đôi chân của bạn. Chúng tôi cung cấp các mẫu giày sneaker
                    replica chất lượng với chi tiết chuẩn hàng Auth. Chúng tôi đa dạng về mẫu mã và
                    luôn có sẵn hàng.
                    <br />
                    <br /> Hãy đến với Tyhi Sneaker -Shop Giày Replica để trải nghiệm sự khác biệt
                    về chất lượng và dịch vụ. Chúng tôi sẵn lòng phục vụ bạn và đem đến cho bạn
                    những đôi giày sneaker tuyệt vời mà bạn đang tìm kiếm.
                  </span>
                </Grid>
                <Grid item xs={6}>
                  <img
                    src={require('../../assets/image/banner.jpg')}
                    alt=""
                    style={{ width: '100%' }}
                  />
                </Grid>
              </Grid>
            </Box>
          </Container>
        </Fragment>
      </div>
    </>
  )
}
