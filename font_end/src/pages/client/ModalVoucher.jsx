import {
  Box,
  Button,
  Grid,
  IconButton,
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
import './ModalVoucher.css'

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

export default function ModalVoucher({
  open,
  setOpen,
  setVoucher,
  arrData,
  setGiamGia,
  voucherFilter,
}) {
  const [listVoucher, setListVoucher] = useState([])
  const [dataVoucher, setDataVoucher] = useState(null)
  const [codeVoucher, setCodeVoucher] = useState('')

  const fetchVoucher = (request) => {
    ClientVoucherApi.fetchVoucher(request)
      .then((response) => {
        setListVoucher(response.data.data)
      })
      .catch(() => {
        toast.error('Vui lòng tải lại trang: ', {
          position: toast.POSITION.TOP_CENTER,
        })
      })
  }

  const voucherByCode = (code) => {
    ClientVoucherApi.voucherByCode(code)
      .then((response) => {
        setDataVoucher(response.data.data)
      })
      .catch(() => {})
  }

  const totalMoney = arrData.reduce((tong, e) => tong + e.gia * e.soLuong, 0)
  const totalVoucher = dataVoucher
    ? dataVoucher.typeValue === 0
      ? (totalMoney * dataVoucher.value) / 100
      : dataVoucher.value
    : 0

  const handleGiamGia = () => {
    dataVoucher != null ? setVoucher(dataVoucher) : setVoucher(null)
    setGiamGia(totalVoucher)
    setOpen(false)
  }

  useEffect(() => {
    fetchVoucher(voucherFilter)
    if (codeVoucher.trim() !== '') {
      voucherByCode(codeVoucher)
    }
  }, [voucherFilter, codeVoucher])

  return (
    <div className="client-modal-voucher">
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box className="box-modal-voucher" sx={styleModalVoucher}>
          <Toolbar>
            <Box
              sx={{
                color: 'black',
                flexGrow: 1,
              }}>
              <Typography variant="h6" component="div">
                Chọn mã khuyến mãi
              </Typography>
            </Box>
            <IconButton
              className="icon-button-close"
              onClick={() => {
                setOpen(false)
              }}
              aria-label="close"
              color="error">
              <CloseIcon />
            </IconButton>
          </Toolbar>
          <Grid className="grid-apply-modal-voucher">
            <TextField
              className="text-field-apply-modal-voucher"
              placeholder="phiếu giảm giá"
              size="small"
              value={codeVoucher}
              onChange={(e) => setCodeVoucher(e.target.value)}
            />
            <Button
              className="button-apply-modal-voucher"
              variant="outlined"
              onClick={() => handleGiamGia()}>
              <b>Áp dụng</b>
            </Button>
          </Grid>
          <div className="data-radio-group-modal-voucher">
            <RadioGroup className="radio-group-modal-voucher" name="voucher">
              {listVoucher &&
                listVoucher.map((v) => (
                  <ListItem key={v.id} variant="outlined" sx={{ boxShadow: 'sm' }}>
                    <Grid className="grid-radio-group-modal-voucher">
                      <Grid item xs={4} className="grid-name-voucher"></Grid>
                      <Grid item xs={8} className="grid-information-voucher">
                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                          <div>
                            Giá trị: {v.typeValue === 0 ? v.value + ' %' : v.value + ' VNĐ'}
                            <br />
                            Giá trị tối đa: {v.maximumValue} VNĐ
                            <br />
                            Kiểu: {v.type === 0 ? 'Công khai' : 'Cá nhân'}
                          </div>
                          <Radio
                            name="radioVoucher"
                            value={v.id}
                            onClick={() => setCodeVoucher(v.code)}
                            checked={codeVoucher ? codeVoucher === v.code : false}
                          />
                        </Stack>
                      </Grid>
                    </Grid>
                  </ListItem>
                ))}
            </RadioGroup>
            {!listVoucher && <Empty />}
          </div>
        </Box>
      </Modal>
    </div>
  )
}
