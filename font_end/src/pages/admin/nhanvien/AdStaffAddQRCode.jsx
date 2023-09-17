import { Card, CardContent, Container, Grid, Typography } from '@mui/material'
import dayjs from 'dayjs'
import React, { useState } from 'react'
import { QrReader } from 'react-qr-reader'

export default function AddStaffAddQRCode({ onQRCodeScanned }) {
  const initStaff = {
    fullName: '',
    email: '',
    phoneNumber: '',
    dateBirth: '',
    avatar: '',
    citizenId: '',
    gender: '',
    password: '',
    role: 1,
    status: 1,
  }
  const [qrDataArray, setQRCodeData] = useState('')
  const [staffAdd, setStaffAdd] = useState(initStaff)
  const handleScan = (qrData) => {
    if (qrData?.text) {
      setQRCodeData(qrData?.text)
      const qrDataArray = qrData?.text.split('|')
      const citizenId = qrDataArray[0]
      const fullName = qrDataArray[2]
      const dateOfBirthRaw = qrDataArray[3]
      const gender = qrDataArray[4] === 'Nam'

      const dateBirth = dayjs(dateOfBirthRaw, 'DDMMYYYY').format('DD-MM-YYYY')

      setStaffAdd({
        ...staffAdd,
        citizenId: citizenId,
        fullName: fullName,
        dateBirth: dateBirth,
        gender: gender,
      })
      console.log('data', qrData)
    }
  }

  return (
    <Container>
      <Card>
        <CardContent>
          <Typography variant="h4" gutterBottom>
            Quét Mã QR Bằng Webcam
          </Typography>
          <Grid container spacing={2}>
              <QrReader delay={500} style={{ width: '100%' }} onResult={handleScan} />
          </Grid>
        </CardContent>
      </Card>
    </Container>
  )
}
