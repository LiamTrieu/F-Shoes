import React, { useEffect, useState } from 'react'
import { Box, Button, Container, Stack, Tab, Tabs, Typography } from '@mui/material'

import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import SellFrom from './SellFrom'
import sellApi from '../../../api/admin/sell/SellApi'
import Empty from '../../../components/Empty'
import { toast } from 'react-toastify'
export default function OrderAdmin() {
  const [listBill, setlistBill] = useState([])
  const [selectBill, setSelectBill] = useState('')

  const getAllBillTaoDonHang = () => {
    sellApi.getAllBillTaoDonHang().then((response) => {
      setlistBill(response.data.data)
    })
  }

  const handleAddSellClick = async () => {
    if (listBill.length === 5) {
      toast.warning('Tối đa 5 hóa đơn', { position: toast.POSITION.TOP_CENTER })
      return
    }
    sellApi.createBill().then((res) => {
      if (res.data.success) {
        setlistBill([...listBill, res.data.data])
        setSelectBill(res.data.data.id)
      }
    })
  }

  function deleteSellClick(id) {
    sellApi.deleteBill(id).then((res) => {
      if (res.data.success) {
        const updatedListBill = listBill.filter((item) => item.id !== id)
        setlistBill(updatedListBill)
        if (selectBill === id) {
          setSelectBill('')
        }
      }
    })
  }

  useEffect(() => {
    getAllBillTaoDonHang()
  }, [])

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
              borderRadius: '8px',
            }}
            variant="outlined"
            color="cam">
            Tạo đơn hàng
          </Button>
        </Box>
      </Stack>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }} mb={2}>
        <Tabs value={selectBill}>
          {listBill.length <= 0 ? (
            <Empty />
          ) : (
            listBill.map((Bill, index) => (
              <Tab
                key={Bill.id}
                value={Bill.id}
                onClick={() => {
                  setSelectBill(Bill.id)
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
                        deleteSellClick(Bill.id)
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
      {selectBill !== '' && (
        <SellFrom
          idBill={selectBill}
          getAllBillTaoDonHang={getAllBillTaoDonHang}
          setSelectBill={setSelectBill}
        />
      )}
    </>
  )
}
