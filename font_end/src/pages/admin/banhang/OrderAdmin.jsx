import React, { useState } from 'react'
import { Box, Button, Container, Stack, Tab, Tabs, Typography } from '@mui/material'

import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import SellFrom from './SellFrom'
import sellApi from '../../../api/admin/sell/SellApi'
import Empty from '../../../components/Empty'
import { toast } from 'react-toastify'
export default function OrderAdmin() {
  const [listCart, setlistCart] = useState([])
  const [selectCart, setSelectCart] = useState('')

  const handleAddSellClick = async () => {
    if (listCart.length === 5) {
      toast.warning('Tối đa 5 hóa đơn', { position: toast.POSITION.TOP_CENTER })
      return
    }
    sellApi.createCart().then((res) => {
      if (res.data.success) {
        setlistCart([...listCart, res.data.data])
        setSelectCart(res.data.data.id)
      }
    })
  }

  function deleteSellClick(id) {
    sellApi.deleteCart(id).then((res) => {
      if (res.data.success) {
        setSelectCart('')
        setlistCart(listCart.filter((item) => item.id !== id))
      }
    })
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
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }} mb={2}>
        <Tabs value={selectCart}>
          {listCart.length <= 0 ? (
            <Empty />
          ) : (
            listCart.map((cart, index) => (
              <Tab
                key={cart.id}
                value={cart.id}
                onClick={() => {
                  setSelectCart(cart.id)
                }}
                style={{
                  padding: 0,
                  marginRight: 10,
                  textTransform: 'none',
                  fontWeight: 'bold',
                }}
                label={
                  <div>
                    Đơn hàng {index + 1}
                    <span
                      onClick={() => {
                        deleteSellClick(cart.id)
                      }}>
                      <HighlightOffIcon style={{ paddingLeft: 3 }} color="error" fontSize="small" />
                    </span>
                  </div>
                }
              />
            ))
          )}
        </Tabs>
      </Box>
      {selectCart !== '' && <SellFrom idCart={selectCart} />}
    </>
  )
}
