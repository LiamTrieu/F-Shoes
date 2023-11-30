import React, { useEffect, useState } from 'react'
import { Box, Button, Container, IconButton, Stack, Tab, Tabs, Typography } from '@mui/material'

import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import SellFrom from './SellFrom'
import sellApi from '../../../api/admin/sell/SellApi'
import Empty from '../../../components/Empty'
import { toast } from 'react-toastify'
import Badge from '@mui/material/Badge'
import { styled } from '@mui/material/styles'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import AddIcon from '@mui/icons-material/Add'

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}))

export default function OrderAdmin() {
  const [listBill, setlistBill] = useState([])
  const [selectBill, setSelectBill] = useState('')
  const [soLuong, setSoLuong] = useState([])

  function setSL(data) {
    setSoLuong((prevSoLuong) => {
      const isIdBillExist = prevSoLuong.some((e) => e.idBill === selectBill)

      if (isIdBillExist) {
        return prevSoLuong.map((e) => {
          if (e.idBill === selectBill) {
            return data
          } else {
            return e
          }
        })
      } else {
        return [...prevSoLuong, data]
      }
    })
  }

  const getAllBillTaoDonHang = () => {
    sellApi.getAllBillTaoDonHang().then((response) => {
      setlistBill(response.data.data)
      if (response.data.data.length > 0) {
        setSelectBill(response.data.data[0].id)
      } else if (response.data.data === null) {
        setSelectBill(null)
      }
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
        if (selectBill !== id) {
          setSelectBill(updatedListBill[0].id)
        }
        if (selectBill === id) {
          const newSelectedBillId = updatedListBill.length > 0 ? updatedListBill[0].id : ''
          setSelectBill(newSelectedBillId)
        }
      }
    })
  }

  useEffect(() => {
    getAllBillTaoDonHang()
  }, [])

  return (
    <Container maxWidth="xl" sx={{ backgroundColor: 'white', borderRadius: '10px', pt: 7 }}>
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
            variant="contained"
            color="cam">
            <AddIcon fontSize="small" /> Tạo đơn hàng
          </Button>
        </Box>
      </Stack>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }} mt={5} mb={2}>
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
                  <div
                    style={{
                      marginRight: '20px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    Đơn hàng {index + 1}
                    <Badge
                      badgeContent={soLuong.find((e) => e.idBill === Bill.id)?.quantity}
                      color="cam"
                      sx={{ marginRight: '10px' }}>
                      <img
                        src={require('../../../assets/image/TinTuc/xe_giao_hang_otto.webp')}
                        alt=""
                        height="30px"
                        style={{ marginLeft: '4px', marginRight: '4px' }}
                      />
                    </Badge>
                    <span
                      onClick={() => {
                        deleteSellClick(Bill.id)
                      }}>
                      <HighlightOffIcon color="error" fontSize="small" />
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
          setSoluong={setSL}
          idBill={selectBill}
          getAllBillTaoDonHang={getAllBillTaoDonHang}
          setSelectBill={setSelectBill}
        />
      )}
    </Container>
  )
}
