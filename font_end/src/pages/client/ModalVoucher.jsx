import {
  Box,
  Button,
  Grid,
  IconButton,
  List,
  ListItem,
  Modal,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Toolbar,
  Typography,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import React, { useEffect, useState } from 'react'
import ClientVoucherApi from '../../api/client/ClientVoucherApi'
import { toast } from 'react-toastify'
import Empty from '../../components/Empty'

const styleModalVoucher = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: '45vw', md: '35vw' },
  height: '650px',
  bgcolor: 'white',
  borderRadius: 1.5,
  boxShadow: 24,
}

export default function ModalVoucher({ open, setOpen, setVoucher, voucher, arrData, setGiamGia }) {
  const [request, setRequest] = useState({
    idCustomer: null,
    condition: 100,
    textSearch: null,
    page: 1,
    size: 5,
  })

  const [dataVoucher, setDataVoucher] = useState([])

  const fetchVoucher = (request) => {
    ClientVoucherApi.fetchVoucher(request)
      .then((response) => {
        setDataVoucher(response.data.data)
      })
      .catch((err) => {
        toast.error('Vui Lòng f5 tải lại trang' + err, {
          position: toast.POSITION.TOP_CENTER,
        })
      })
  }

  const handleGiamGia = () => {
    setGiamGia(
      arrData
        .reduce((tong, e) => tong + e.gia * e.soLuong - e.gia * e.soluong * (voucher.value/100), 0)
        .toLocaleString('it-IT', { style: 'currency', currency: 'VND' }),
    )
    setOpen(false)
  }

  useEffect(() => {
    fetchVoucher(request)
  }, [request])

  return (
    <div className="scrollbar-modal-add">
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box sx={styleModalVoucher}>
          <Toolbar>
            <Box
              sx={{
                color: 'black',
                flexGrow: 1,
              }}>
              <Typography variant="h6" component="div">
                Chọn mã khuyễn mãi
              </Typography>
            </Box>
            <IconButton
              onClick={() => {
                setOpen(false)
              }}
              aria-label="close"
              color="error"
              style={{
                boxShadow: '1px 2px 3px 1px rgba(0,0,0,.05)',
              }}>
              <CloseIcon />
            </IconButton>
          </Toolbar>
          <Grid
            sx={{
              mt: 2,
              ml: 2,
              mr: 2,
              display: 'flex',
              alignItems: 'center',
            }}>
            <TextField
              sx={{ flex: 1, minWidth: '100px', width: '80%' }}
              onChange={(e) => setRequest({ ...request, textSearch: e.target.value })}
              placeholder="Mã giảm giá"
              size="small"
            />
            <Button
              sx={{ ml: 2, mr: 1, width: 'auto' }}
              variant="outlined"
              onClick={() => handleGiamGia()}>
              <b>Áp dụng</b>
            </Button>
          </Grid>
          <RadioGroup name="voucher" value={voucher.id}>
            {dataVoucher &&
              dataVoucher.map((v) => (
                <ListItem key={v.id} variant="outlined" sx={{ boxShadow: 'sm' }}>
                  <Grid
                    sx={{
                      mt: 2,
                      display: 'flex',
                      alignItems: 'center',
                      height: '100px',
                      width: '100%',
                      border: '1px solid gray',
                    }}>
                    <Grid
                      item
                      xs={4}
                      sx={{
                        textAlign: 'center',
                      }}>
                      {v.name}
                    </Grid>
                    <Grid
                      item
                      xs={8}
                      sx={{
                        height: '100%',
                        borderLeft: '1px solid gray',
                        padding: '16px',
                      }}>
                      <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <div>
                          giá trị: {v.value} %<br />
                          giá trị tối đa: {v.maximumValue} VNĐ
                          <br />
                          {/* Điều kiện: {v.minimumAmount} VNĐ */}
                        </div>
                        <Radio
                          name="radioVoucher"
                          value={v.id}
                          onClick={() => setVoucher({ id: v.id, value: v.value, name: v.name })}
                          checked={voucher.id === v.id}
                        />
                      </Stack>
                    </Grid>
                  </Grid>
                </ListItem>
              ))}
          </RadioGroup>
          {!dataVoucher && <Empty />}
        </Box>
      </Modal>
    </div>
  )
}
