import { Button, Container, Paper, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ClientAccountApi from '../../api/client/clientAccount'
import { toast } from 'react-toastify'

export default function Tracking() {
  const [getCodeBill, setGetCodeBill] = useState('')

  const navigate = useNavigate()
  const getBillByIdBill = (code) => {
    ClientAccountApi.getBillDetailByCode(code).then(
      (response) => {
        if (response.data.data.length > 0) {
          navigate('/tracking/' + code)
        } else {
          toast.warning('Đơn hàng không tồn tại')
        }
      },
      () => {},
    )
  }

  return (
    <>
      <Container>
        <div
          style={{
            textAlign: 'center',
            alignItems: 'center',
            justifyContent: 'center',
            marginLeft: '30%',
            marginTop: '80px',
          }}>
          <div
            style={{
              width: '420px',
              height: '320px',
              backgroundColor: 'rgb(30, 39, 51)',
              borderTopRightRadius: '10px',
              borderTopLeftRadius: '10px',
            }}>
            <img
              src={require('../../assets/image/TinTuc/tracking.png')}
              alt=""
              style={{ width: '200px', height: '100px', marginTop: '10px' }}
            />
            <Typography style={{ color: 'white', fontSize: '30px', fontWeight: 700 }}>
              KIỂM TRA ĐƠN HÀNG
            </Typography>
            <Typography style={{ color: 'white', fontSize: '16px' }}>
              Vui lòng nhập thông tin sau để kiểm tra nhanh đơn hàng. Nếu không có mã đơn hàng xin
              vui lòng liên hệ hỗ trợ qua email
            </Typography>
          </div>

          <Paper style={{ width: '420px' }}>
            <div
              style={{
                textAlign: 'center',
                width: '420px',
                border: '3px solid white',
              }}>
              <TextField
                id="outlined-basic"
                placeholder="Nhập mã đơn hàng"
                variant="outlined"
                onChange={(e) => setGetCodeBill(e.target.value)}
                style={{ width: '400px', marginTop: '10px' }}
              />
              <div>
                <Button
                  variant="contained"
                  style={{
                    width: '400px',
                    backgroundColor: 'black',
                    marginTop: '10px',
                    marginBottom: '10px',
                  }}
                  onClick={() => getBillByIdBill(getCodeBill)}>
                  Tra cứu
                </Button>
              </div>
            </div>
          </Paper>
        </div>
      </Container>
    </>
  )
}
