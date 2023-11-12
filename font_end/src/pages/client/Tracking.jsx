import { Button, Container, Paper, TextField } from '@mui/material'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Tracking() {
  const [getCodeBill, setGetCodeBill] = useState('')

  return (
    <Container>
      <Paper>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div
            style={{
              width: '320px',
              height: '320px',
              backgroundColor: 'black',
            }}></div>
        </div>
        <div
          style={{
            textAlign: 'center',

            border: '3px solid black',
          }}>
          <TextField
            id="outlined-basic"
            placeholder="Nhập mã đơn hàng"
            variant="outlined"
            onChange={(e) => setGetCodeBill(e.target.value)}
            style={{ width: '300px', marginTop: '10px' }}
          />
          <div>
            <Link to={`/tracking/${getCodeBill}`}>
              <Button
                variant="contained"
                style={{ width: '300px', backgroundColor: 'black', marginTop: '10px' }}>
                Tra cứu
              </Button>
            </Link>
          </div>
        </div>
      </Paper>
    </Container>
  )
}
