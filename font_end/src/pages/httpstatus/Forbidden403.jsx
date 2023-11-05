import React from 'react'

import { Box, Typography, Button } from '@mui/material'

export default function Forbidden403() {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        flexDirection: 'column',
      }}>
      <img
        src="https://cdn.discordapp.com/attachments/1114210224874721394/1170382618370514964/image.png?ex=6558d6c0&is=654661c0&hm=21beb97f347cb11c970a70dde1b3a8800bf84789c03588bd476ee3f7a8febf16&" // Thay đổi đường dẫn hình ảnh
        alt="403 Error"
        style={{ maxWidth: '100%', marginBottom: '2rem' }}
      />
      <Typography variant="h1" gutterBottom>
        403 - Access Denied
      </Typography>
      <Typography variant="h6" gutterBottom>
        Sorry, you do not have permission to access this page.
      </Typography>
      <Button variant="contained" color="primary" href="/">
        Go Back Home
      </Button>
    </Box>
  )
}
