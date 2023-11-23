import { Box, Container, Divider, Grid, Typography } from '@mui/material'
import React from 'react'
import './HeadingClient.css'
import { Link } from 'react-router-dom'

export default function FooterClient() {
  return (
    <Box
      className="footer"
      sx={{
        boxShadow: '0px -4px 5px -2px rgba(0,0,0,0.14), 0px 0px',
        width: '100%',
        // backgroundColor: 'white',
        color: 'white',
        mt: 2,
      }}>
      <div style={{ textAlign: 'center', paddingTop: '30px' }}>
        <img
          src={require('../../assets/image/TinTuc/logo_Footer.jpg')}
          alt=""
          style={{ width: '400px' }}
        />
      </div>
      <Typography style={{ textAlign: 'center' }}>
        Được thành lập vào năm 2019, trải qua những năm hoạt động và phát triển, Dola Watch trở
        thành đại lý ủy quyền cho rất nhiều thương hiệu trên thế giới, chuyên bán đồng hồ chính
        hãng.
      </Typography>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: '20px',
        }}>
        <Divider sx={{ height: '2px', backgroundColor: 'white', width: '40%', mr: 2 }} />
        <img
          src={require('../../assets/image/TinTuc/zalo.webp')}
          alt=""
          width={40}
          style={{ marginRight: '10px' }}
        />
        <img
          src={require('../../assets/image/TinTuc/facebook.webp')}
          alt=""
          width={40}
          style={{ marginRight: '10px' }}
        />
        <img
          src={require('../../assets/image/TinTuc/google.webp')}
          alt=""
          width={40}
          style={{ marginRight: '10px' }}
        />
        <img
          src={require('../../assets/image/TinTuc/youtobe.webp')}
          alt=""
          width={40}
          style={{ marginRight: '10px' }}
        />
        <Divider sx={{ height: '2px', backgroundColor: 'white', width: '40%' }} />
      </div>
      <Container maxWidth="lg">
        <Grid container direction="column" className="gird-footer" alignItems="center">
          <Grid container spacing={12}>
            <Grid item xs={12} sm={6} md={3}>
              <Typography className="footerTitle">Giới thiệu</Typography>
              <div>
                <img
                  src={require('../../assets/image/logoweb.png')}
                  alt=""
                  style={{ width: '100px' }}
                />
                F-Shoes
              </div>
              <Typography className="text-footer">
                <span className="title-footer"> Chin Su:</span> nơi trao tặng các sản phẩm giày thời
                trang trẻ trung, phong cách, bắt trend cho giới trẻ.
              </Typography>
              <Typography className="text-footer">
                <span className="title-footer"> Địa chỉ:</span> Số 22 ngõ 132 đường cầu diễn, Phường
                Minh Khai, Bắc Từ Liêm, hà nội{' '}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography className="footerTitle">Các chính sách</Typography>
              <Typography className="text-footer">Chính sách bảo mật của Chin Su</Typography>
              <Typography className="text-footer">Chính sách bảo hành của Chin Su</Typography>
              <Typography className="text-footer">Phương thức thanh toán của Chin Su</Typography>
              <Typography className="text-footer">Chính sách vận chuyển của Chin Su</Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography className="footerTitle">Hỗ trợ khách hàng</Typography>
              <Typography className="text-footer" component={Link} to="/about-us">
                Giới thiệu
              </Typography>
              <br />
              <Typography className="text-footer" component={Link} to="/contact">
                Liên hệ
              </Typography>
              <Typography className="text-footer">Tác giả</Typography>
              <Typography className="text-footer">
                Mua hàng:<span className="phoneNumber"> 07987654321</span>{' '}
              </Typography>
              <Typography className="footerTitle">Hình thức thanh toán</Typography>
              <img
                className="img-contact"
                src={require('../../assets/image/TinTuc/payment_1.webp')}
                alt=""
              />
              <img
                className="img-contact"
                src={require('../../assets/image/TinTuc/payment_2.webp')}
                alt=""
              />
              <img
                className="img-contact"
                src={require('../../assets/image/TinTuc/payment_3.webp')}
                alt=""
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography className="footerTitle">Liên hệ với chúng tôi</Typography>

              <Typography>
                {' '}
                <span className="title-footer"> Hotline:</span>{' '}
                <span className=".text-footer"> 0123456789</span>
              </Typography>
              <Typography>
                {' '}
                <span className="title-footer"> Email:</span>{' '}
                <span className="phoneNumber"> Fshoes131203@gmail.com</span>
              </Typography>
              <Typography className="footerTitle">Liên kết sàn</Typography>
              <img
                className="img-contact"
                src={require('../../assets/image/TinTuc/shopee.webp')}
                alt=""
              />
              <img
                className="img-contact"
                src={require('../../assets/image/TinTuc/lazada.webp')}
                alt=""
              />
              <img
                className="img-contact"
                src={require('../../assets/image/TinTuc/sendo.webp')}
                alt=""
              />
              <img
                className="img-contact"
                src={require('../../assets/image/TinTuc/tiki.webp')}
                alt=""
              />
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}
