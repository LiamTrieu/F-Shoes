import React from 'react'
import {
  Box,
  Card,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Typography,
} from '@mui/material'
import EventNoteIcon from '@mui/icons-material/EventNote'
import AssessmentIcon from '@mui/icons-material/Assessment'
import AssignmentIcon from '@mui/icons-material/Assignment'
import AutoAwesomeMotionIcon from '@mui/icons-material/AutoAwesomeMotion'
import Grid2 from '@mui/material/Unstable_Grid2/Grid2'
import dayjs from 'dayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import LineChartDashBoard from './LineChartDashBoard'

const DashboardCard = function ({ iconCart, title, total, product, order, color }) {
  return (
    <Grid2 lg={3} md={6} xs={12} justifyContent={'center'}>
      <Card variant="elevation" sx={{ p: 2, backgroundColor: color, color: 'white' }}>
        <Box display="flex" justifyContent="center" alignItems="center">
          {iconCart}
        </Box>
        <Typography mt={1} align="center" fontFamily={'monospace'} fontSize={'17px'}>
          Đơn hàng {title}
        </Typography>
        <Typography
          my={1}
          fontWeight={'600'}
          align="center"
          fontSize={'20px'}
          fontFamily={'monospace'}>
          {total} VND
        </Typography>
        <table
          style={{
            textAlign: 'center',
            width: '100%',
            fontFamily: 'monospace',
            fontSize: '15px',
          }}>
          <thead>
            <tr>
              <td>Sản phẩm</td>
              <td>Đơn hàng</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ fontWeight: 'bold' }}>{product}</td>
              <td style={{ fontWeight: 'bold' }}>{order}</td>
            </tr>
          </tbody>
        </table>
      </Card>
    </Grid2>
  )
}

export default function Dashboard() {
  return (
    <Container maxWidth="lg" sx={{ mb: 5 }}>
      <Typography variant="h6" fontWeight={'bold'} my={2}>
        Dashboard Overview
      </Typography>
      <Grid2 container spacing={2} mb={2}>
        <DashboardCard
          iconCart={<EventNoteIcon />}
          title={'hôm nay'}
          total={'100.000.000'}
          product={12}
          order={10}
          color={'#0694a2'}
        />
        <DashboardCard
          iconCart={<AutoAwesomeMotionIcon />}
          title={'hôm qua'}
          total={'100.000.000'}
          product={32}
          order={11}
          color={'#ff8a4c'}
        />
        <DashboardCard
          iconCart={<AssignmentIcon />}
          title={'tháng này'}
          total={'100.000.000'}
          product={52}
          order={32}
          color={'#3f83f8'}
        />
        <DashboardCard
          iconCart={<AssessmentIcon />}
          title={'năm nay'}
          total={'100.000.000'}
          product={441}
          order={122}
          color={'#0e9f6e'}
        />
      </Grid2>
      <Paper variant="outlined" sx={{ mb: 2 }}>
        <Typography fontWeight={'bold'} m={2}>
          Biểu đồ thống kê
        </Typography>
        <Box m={2}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Grid2 container spacing={2}>
              <Grid2 lg={3} md={4} xs={5}>
                <DatePicker format="DD-MM-YYYY" label="Từ ngày" defaultValue={dayjs(new Date())} />
              </Grid2>
              <Grid2 lg={3} md={4} xs={5}>
                <DatePicker
                  sx={{ mx: 2 }}
                  format="DD-MM-YYYY"
                  label="Đến ngày"
                  defaultValue={dayjs(new Date())}
                />
              </Grid2>
              <Grid2 lg={3} md={4} xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Giá trị hiện thị</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Giá trị hiện thị"
                    value={1}>
                    <MenuItem value={1}>Sản phẩm</MenuItem>
                    <MenuItem value={2}>Đơn hàng</MenuItem>
                    <MenuItem value={3}>Tổng tiền</MenuItem>
                  </Select>
                </FormControl>
              </Grid2>
            </Grid2>
          </LocalizationProvider>
          <LineChartDashBoard />
        </Box>
      </Paper>
      <Typography variant="h6" fontWeight={'bold'} my={2}>
        Danh sách sản phẩm bán chạy trong tháng
      </Typography>
    </Container>
  )
}
