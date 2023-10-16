import React from 'react'
import { Line } from 'react-chartjs-2'
import { Chart as ChartJS } from 'chart.js/auto'
import { Box } from '@mui/material'

ChartJS.register()

export default function LineChartDashBoard() {
  const data = {
    labels: [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023],
    datasets: [
      {
        label: 'Sản phẩm',
        data: [220, 321, 603, 503, 650, 35, 512, 84, 91, 232, 521, 112, 213, 113],
      },
    ],
  }
  return (
    <Box mt={2} width={'99%'}>
      <Line data={data} height={'100%'} />
    </Box>
  )
}
