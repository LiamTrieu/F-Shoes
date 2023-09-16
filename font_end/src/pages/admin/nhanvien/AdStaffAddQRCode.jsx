import { Button, Card, CardContent, Container, Grid, Typography } from '@mui/material'
import React, { useState } from 'react'
import { QrReader } from 'react-qr-reader'

export default function AddStaffAddQRCode({ onQRCodeScanned }) {
  const [scanResultWebCam, setScanResultWebCam] = useState('')

  const handleErrorWebCam = (error) => {
    console.log(error)
  }

  const handleScanWebCam = (result) => {
    if (result) {
      setScanResultWebCam(result)
      onQRCodeScanned(result)
    }
  }
  const handleResultWebCam = (result) => {
    if (result) {
      setScanResultWebCam(result)
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
            <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
              <QrReader
                delay={300}
                style={{ width: '100%' }}
                onError={handleErrorWebCam}
                onScan={handleScanWebCam}
                onResult={handleResultWebCam}
              />
            </Grid>
            <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
              <Card>
                <CardContent>
                  <Typography variant="h5" gutterBottom>
                    Mã QR đã quét:
                  </Typography>
                  <Typography variant="body1">{scanResultWebCam}</Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  )
}
