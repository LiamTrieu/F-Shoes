import React, { useState } from 'react'
import { Box, Button, Container, Stack, Tab, Tabs, Typography } from '@mui/material'

import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import SellFrom from './SellFrom'
import sellApi from '../../../api/admin/sell/SellApi'
export default function OrderAdmin({}) {
  const [listSellOrder, setlistSellOrder] = useState([])
  const [statusOrder, setStatusOrder] = useState(() => {
    if (listSellOrder.length > 0) return listSellOrder[0].ma
    else {
      return ''
    }
  })
  const handleChange = (event, newValue) => {
    setStatusOrder(newValue)
  }

  const handleIconButtonClick = (maHD, e) => {
    e.stopPropagation()
    let indexDelete = -1
    for (let i = 0; i < listSellOrder.length; i++) {
      if (maHD === listSellOrder[i].ma) {
        indexDelete = i
        if (maHD === statusOrder && listSellOrder.length > 0) {
          setStatusOrder(listSellOrder[0].ma)
        }
        break
      }
    }
    if (indexDelete !== -1) {
      const updatedList = [...listSellOrder]
      updatedList.splice(indexDelete, 1)
      setlistSellOrder(updatedList)
      if (updatedList.length === 0) setStatusOrder('')
    }
  }

  const handleAddSellClick = async () => {
    if (listSellOrder.length === 5) {
      alert('Tối đa 5 hóa đơn')
      return
    }
    const updatedList = [...listSellOrder]
    var currentDate = new Date()
    var miniSeconds = currentDate.getMilliseconds()
    var seconds = currentDate.getSeconds()
    var minutes = currentDate.getMinutes()
    var hours = currentDate.getHours()
    var day = currentDate.getDate()
    var month = currentDate.getMonth() + 1
    var year = currentDate.getFullYear()
    var ma = 'HD' + day + month + year + hours + minutes + seconds + miniSeconds
    const newSell = { ma: ma }
    updatedList.push(newSell)
    setStatusOrder(newSell.ma)
    setlistSellOrder(updatedList)

    try {
      const response = await fetch('http://localhost:8080/api/sell/create-cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newSell), // Send the order data to the backend
      })

      if (response.ok) {
        alert('create order successfully')
      } else {
        alert('Failed to create order')
      }
    } catch (error) {
      alert('An error occurred while creating the order')
    }
  }

  return (
    <>
      <Stack
        mt={1}
        direction="row"
        justifyContent="space-between"
        alignItems="flex-start"
        spacing={2}>
        <Typography variant="h6" fontWeight={'bold'}>
          Bán hàng
        </Typography>
        <Box>
          <Button
            onClick={handleAddSellClick}
            style={{
              marginTop: '5px',
              textTransform: 'none',
              fontWeight: 'bold',
            }}
            variant="contained"
            color="success">
            Tạo đơn hàng
          </Button>
        </Box>
      </Stack>
      {statusOrder === '' ? (
        <p style={{ textAlign: 'center', width: '100%' }}>
          <h3>Không có đơn hàng nào</h3>
        </p>
      ) : (
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }} mb={2}>
          <Tabs value={statusOrder} onChange={handleChange} aria-label="disabled tabs example">
            {listSellOrder.map((hd) => (
              <Tab
                key={hd.ma}
                value={hd.ma}
                style={{
                  padding: 0,
                  marginRight: 10,
                  textTransform: 'none',
                  fontWeight: 'bold',
                }}
                label={
                  <div>
                    {hd.ma}
                    <span onClick={(e) => handleIconButtonClick(hd.ma, e)}>
                      <HighlightOffIcon style={{ paddingLeft: 3 }} color="error" fontSize="small" />
                    </span>
                  </div>
                }
              />
            ))}
          </Tabs>
        </Box>
      )}
      {statusOrder && <SellFrom maHD={statusOrder} />}
    </>
  )
}
