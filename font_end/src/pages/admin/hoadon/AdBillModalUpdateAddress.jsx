import React, { useEffect, useState } from 'react'
import {
  Autocomplete,
  Box,
  Button,
  Grid,
  IconButton,
  Modal,
  Paper,
  Stack,
  Switch,
  TextField,
  Toolbar,
  Typography,
} from '@mui/material'

import CloseIcon from '@mui/icons-material/Close'
import ghnAPI from '../../../api/admin/ghn/ghnApi'
import dayjs from 'dayjs'
import { formatCurrency } from '../../../services/common/formatCurrency '

const styleAdBillModalUpdateAdd = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: '70vw', md: '60vw' },
  bgcolor: 'white',
  borderRadius: 1.5,
  boxShadow: 24,
}

export default function ModalAdBillUpdateAddress({ open, setOPen, billDetail, listBillDetail }) {
  const [diaChi, setDiaChi] = useState({
    name: '',
    phoneNumber: '',
    specificAddress: '',
    type: true,
    provinceId: null,
    districtId: null,
    wardId: null,
    idCustomer: '',
  })
  const [giaoHang, setGiaoHang] = useState()
  const [list, setList] = useState([])
  const [selectedTinh, setSelectedTinh] = useState(null)
  const [selectedHuyen, setSelectedHuyen] = useState(null)
  const [selectedXa, setSelectedXa] = useState(null)
  const [selectedTinhValue, setSelectedTinhValue] = useState(null)
  const [timeShip, setTimeShip] = useState('')
  const [phiShip, setPhiShip] = useState('')

  useEffect(() => {
    console.log('hello')
    console.log(listBillDetail)
    loadTinh()
    if (billDetail && billDetail.address) {
      const addressParts = billDetail.address.split(', ')
      if (addressParts.length === 4) {
        const [address, xaDetail, huyenDetail, tinhDetail] = addressParts
        setXaName(xaDetail)
        setHuyenName(huyenDetail)
        setTinhName(tinhDetail)

        const tinhValue = tinh.find((item) => item.provinceName === tinhDetail)
        const huyenValue = huyen.find((item) => item.districtName === huyenDetail)
        const xaValue = xa.find((item) => item.wardName === xaDetail)

        if (tinhValue) {
          loadHuyen(tinhValue.provinceID)
        }

        setSelectedTinh(tinhValue)
        setSelectedHuyen(huyenValue)
        setSelectedXa(xaValue)

        setDiaChi({
          ...diaChi,
          provinceId: tinhValue ? tinhValue.id : null,
          districtId: huyenValue ? huyenValue.id : null,
          wardId: xaValue ? xaValue.id : null,
        })

        setDetailDiaChi({
          ...detailDiaChi,
          specificAddress: address,
          provinceId: tinhValue ? tinhValue.id : null,
          districtId: huyenValue ? huyenValue.id : null,
          wardId: xaValue ? xaValue.id : null,
        })

        if (selectedTinhValue) {
          loadHuyen(selectedTinhValue.id)

          setSelectedTinh(selectedTinhValue)
        }
      }
    }
  }, [open, billDetail])

  const [tinh, setTinh] = useState([])
  const [huyen, setHuyen] = useState([])
  const [xa, setXa] = useState([])

  const loadTinh = () => {
    ghnAPI.getProvince().then((response) => {
      setTinh(response.data)
    })
  }

  const loadHuyen = (idProvince) => {
    ghnAPI.getDistrict(idProvince).then((response) => {
      setHuyen(response.data)
    })
  }

  const loadXa = (idDistrict) => {
    ghnAPI.getWard(idDistrict).then((response) => {
      setXa(response.data)
    })
  }

  const handleTinhChange = (_, newValue) => {
    setSelectedTinh(newValue)
    setSelectedTinhValue(newValue)
    setSelectedHuyen(null)
    if (newValue) {
      loadHuyen(newValue.id)
      setTinhName(newValue.label)
      setDiaChi({ ...diaChi, provinceId: newValue.id })
      setDetailDiaChi({ ...detailDiaChi, provinceId: newValue.id })
    } else {
      setHuyen([])
      setDiaChi({ ...diaChi, provinceId: null })
      setDetailDiaChi({ ...detailDiaChi, provinceId: '' })
    }
  }

  const handleHuyenChange = (_, newValue) => {
    setSelectedHuyen(newValue)
    setSelectedXa(null)
    if (newValue) {
      loadXa(newValue.id)
      setDiaChi({ ...diaChi, districtId: newValue.id })
      setHuyenName(newValue.label)
      setDetailDiaChi({ ...detailDiaChi, districtId: newValue.id })
    } else {
      setXa([])
      setDetailDiaChi({ ...detailDiaChi, districtId: '' })
    }
  }

  const handleXaChange = (_, newValue) => {
    if (newValue) {
      setSelectedXa(newValue)
      setDiaChi({ ...diaChi, wardId: newValue?.id })
      setXaName(newValue.label)
      setDetailDiaChi({ ...detailDiaChi, wardId: newValue.id })
      const filtelService = {
        shop_id: '3911708',
        from_district: '3440',
        to_district: selectedHuyen.id,
      }

      ghnAPI.getServiceId(filtelService).then((response) => {
        const serviceId = response.data.body.serviceId
        const totalWeight = listBillDetail.reduce((acc, item) => acc + parseInt(item.weight), 0)
        const filterTotal = {
          from_district_id: '3440',
          service_id: serviceId,
          to_district_id: selectedHuyen.id,
          to_ward_code: newValue.id,
          weight: totalWeight,
          insurance_value: '10000',
        }
        ghnAPI.getTotal(filterTotal).then((response) => {
          setPhiShip(response.data.body.total)

          const filtelTime = {
            from_district_id: '3440',
            from_ward_code: '13010',
            to_district_id: selectedHuyen.id,
            to_ward_code: newValue.id,
            service_id: serviceId,
          }
          ghnAPI.getime(filtelTime).then((response) => {
            setTimeShip(response.data.body.leadtime * 1000)
          })
        })
      })
    } else {
      setDetailDiaChi({ ...detailDiaChi, wardId: '' })
    }
  }

  const [detailDiaChi, setDetailDiaChi] = useState({
    name: '',
    phoneNumber: '',
    email: '',
    specificAddress: '',
    type: 0,
  })
  const [xaName, setXaName] = useState('')
  const [huyenName, setHuyenName] = useState('')
  const [tinhName, setTinhName] = useState('')

  return (
    <>
      <Modal
        open={open}
        onClose={() => {
          setOPen(false)
        }}>
        <Paper sx={styleAdBillModalUpdateAdd}>
          <Toolbar>
            <Box
              sx={{
                color: 'black',
                flexGrow: 1,
              }}>
              <Typography variant="h6" component="div">
                Cập nhật thông tin
              </Typography>
            </Box>
            <IconButton
              onClick={() => {
                setOPen(false)
              }}
              aria-label="close"
              color="error"
              style={{
                boxShadow: '1px 2px 3px 1px rgba(0,0,0,.05)',
              }}>
              <CloseIcon />
            </IconButton>
          </Toolbar>
          <Stack>
            <Box p={3} pt={0} pb={2}>
              <TextField
                color="cam"
                variant="outlined"
                label="Tên người nhận"
                type="text"
                size="small"
                sx={{ mt: 1, width: '48%' }}
                name="name"
                value={billDetail ? billDetail.recipientName : ''}
              />
              <TextField
                color="cam"
                variant="outlined"
                label="Số điện thoại"
                type="text"
                size="small"
                sx={{
                  mt: 1,
                  width: '48%',
                  float: 'right',
                }}
                name="phoneNumber"
                value={billDetail ? billDetail.recipientPhoneNumber : ''}
              />

              <Grid container spacing={2} sx={{ mb: 3 }}>
                <Grid item xs={4}>
                  <Autocomplete
                    popupIcon={null}
                    sx={{ mt: 1, width: '100%' }}
                    size="small"
                    className="search-field"
                    id="combo-box-demo"
                    value={{ label: tinhName, id: detailDiaChi.provinceId }}
                    onChange={handleTinhChange}
                    options={
                      tinh &&
                      tinh.map((item) => ({
                        label: item.provinceName,
                        id: item.provinceID,
                      }))
                    }
                    getOptionLabel={(options) => options.label}
                    renderInput={(params) => (
                      <TextField
                        placeholder="nhập tên tỉnh"
                        label="Tỉnh/thành phố"
                        color="cam"
                        {...params}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={4}>
                  <Autocomplete
                    popupIcon={null}
                    sx={{ mt: 1, width: '100%' }}
                    size="small"
                    className="search-field"
                    value={{ label: huyenName, id: detailDiaChi.districtId }}
                    onChange={handleHuyenChange}
                    options={
                      huyen &&
                      huyen.map((item) => ({
                        label: item.districtName,
                        id: item.districtID,
                      }))
                    }
                    getOptionLabel={(option) => option.label}
                    renderInput={(params) => (
                      <TextField
                        placeholder="Chọn huyện"
                        label="Quận/huyện"
                        color="cam"
                        {...params}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={4}>
                  <Autocomplete
                    popupIcon={null}
                    sx={{ mt: 1, width: '100%' }}
                    size="small"
                    className="search-field"
                    value={{ label: xaName, id: detailDiaChi.wardId }}
                    onChange={handleXaChange}
                    options={xa && xa.map((item) => ({ label: item.wardName, id: item.wardCode }))}
                    getOptionLabel={(option) => option.label}
                    renderInput={(params) => (
                      <TextField
                        placeholder="Chọn xã"
                        label="Xã/phường/thị trấn"
                        color="cam"
                        {...params}
                      />
                    )}
                  />
                </Grid>
              </Grid>
              <TextField
                color="cam"
                variant="outlined"
                label="Địa chỉ cụ thể"
                type="text"
                size="small"
                sx={{ mt: 1, width: '48%', marginTop: 2 }}
                name="specificAddress"
                value={detailDiaChi.specificAddress}
              />
              <TextField
                id="bill_note"
                sx={{ mt: 1, width: '48%', float: 'right', marginTop: 2 }}
                color="cam"
                label="Ghi chú"
                size="small"
                value={billDetail ? billDetail.note : ''}
              />
            </Box>
            <Box display={'inline'} sx={{ marginLeft: 5 }}>
              <b>Giao hàng</b>
              <Switch
                onChange={() => {
                  setGiaoHang(!giaoHang)
                }}
                color="secondary"
                checked={giaoHang}
                size="small"
              />
            </Box>
          </Stack>
          <Stack>
            <p>Thời gian giao hàng dự kiến: {dayjs(timeShip).format('DD-MM-YYYY')} </p>
            <p>Phí giao hàng: {formatCurrency(phiShip)}</p>
          </Stack>
          <Stack sx={{ margin: 2 }}>
            <Button variant="outlined" className="them-moi" color="cam">
              Xác nhận
            </Button>
          </Stack>
        </Paper>
      </Modal>
    </>
  )
}
