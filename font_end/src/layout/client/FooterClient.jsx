import { Box, Container, Grid, Typography } from '@mui/material'
import React from 'react'
import './HeadingClient.css'
import { Link } from 'react-router-dom'

export default function FooterClient() {
  return (
    <Box
      sx={{
        boxShadow: '0px -4px 5px -2px rgba(0,0,0,0.14), 0px 0px',
        width: '100%',
        backgroundColor: 'white',
        mt: 2,
      }}>
      <Container maxWidth="lg">
        <Grid container direction="column" alignItems="center">
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
              <img src={require('../../assets/image/ghn.png')} alt="" style={{ width: '200px' }} />
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
                Mua hàng:<span className="phoneNumber"> 0763104018</span>{' '}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography className="footerTitle">Liên hệ với chúng tôi</Typography>
              <img
                className="img-contact"
                src={require('../../assets/image/facebook.png')}
                alt=""
              />
              <img
                className="img-contact"
                src={require('../../assets/image/intagram.jpg')}
                alt=""
              />
              <img className="img-contact" src={require('../../assets/image/tiktok.png')} alt="" />
              <img className="img-contact" src={require('../../assets/image/Twitter.png')} alt="" />
              <Typography>
                {' '}
                <span className="title-footer"> Hotline:</span>{' '}
                <span className=".text-footer"> 0123456789</span>
              </Typography>
              <Typography>
                {' '}
                <span className="title-footer"> Email:</span>{' '}
                <span className="phoneNumber"> kienvan131203@gmail.com</span>
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}
