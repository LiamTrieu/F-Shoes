import React from 'react'
import { Bar, Line } from 'react-chartjs-2'
import { Chart as ChartJS } from 'chart.js/auto'
import { Box } from '@mui/material'
import dayjs from 'dayjs'

ChartJS.register()

export default function LineChartDashBoard(props) {
  const { dataBieuDo, typeBieuDo } = props

  const ngayArr = dataBieuDo.map((item) => dayjs(item.ngay).format('DD-MM-YYYY'))
  const giaTriArr = dataBieuDo.map((item) => (typeBieuDo === 1 ? item.giaTri : item.giaTri * 1000))
  const data = {
    labels: ngayArr,
    datasets: [
      {
        label: typeBieuDo === 1 ? 'Số lượng' : 'Tổng tiền (VNĐ)',
        data: giaTriArr,
      },
    ],
  }
  return (
    <Box mt={2} width={'99%'}>
      <Bar data={data} height={'100%'} />
    </Box>
  )
}
