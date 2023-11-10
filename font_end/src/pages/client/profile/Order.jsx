import { Box, Container, Divider, Paper, Tab, Tabs, TextField, Typography } from '@mui/material'
import React from 'react'
import PropTypes from 'prop-types'

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}>
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  }
}

export default function Order() {
  const [value, setValue] = React.useState(0)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }
  return (
    <>
      <Container maxWidth="xl">
        <Paper elevation={24}>
          <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
            <Tabs value={value} onChange={handleChange} centered>
              <Tab label="Tất cả" {...a11yProps(0)} />
              <Tab label="Chờ thanh toán" {...a11yProps(1)} />
              <Tab label="Đang vận chuyển" {...a11yProps(2)} />
              <Tab label="Hoàn thành" />
              <Tab label="Đã hủy" />
            </Tabs>
          </Box>
        </Paper>
        <TextField
          sx={{ mt: 3, mb: 3, width: '100%' }}
          size="small"
          id="filled-basic"
          placeholder="Tìm kiếm đơn hàng theo tên sản phẩm "
          variant="filled"
        />
        <CustomTabPanel value={value} index={0}>
          <div>
            <Divider />
            <div style={{ display: 'flex', marginTop: '10px', marginBottom: '10px' }}>
              <div style={{ width: '90px', height: '90px', backgroundColor: 'black' }}>
                <img
                  src={require('../../../assets/image/TinTuc/avata.jpg')}
                  alt=""
                  style={{ width: '100%', height: '100%' }}
                />
              </div>
              <Typography>New Balance 990 Suede Đế nhựa "Orange" giày thể thao</Typography>
            </div>
            <Divider />
          </div>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          Item Two
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          Item Three
        </CustomTabPanel>
      </Container>
    </>
  )
}
