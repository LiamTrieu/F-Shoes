import React, { useEffect, useState } from 'react'
import {
  Autocomplete,
  Box,
  Button,
  Chip,
  Container,
  IconButton,
  Modal,
  Paper,
  Stack,
  Switch,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TextField,
  Toolbar,
  Typography,
} from '@mui/material'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import CloseIcon from '@mui/icons-material/Close'
import Person4Icon from '@mui/icons-material/Person4'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import Grid2 from '@mui/material/Unstable_Grid2/Grid2'
import { LocalShipping } from '@mui/icons-material'
import sellApi from '../../../api/admin/sell/SellApi'
import dayjs from 'dayjs'
import './sell.css'
import ModelSell from './ModelSell'
import ghnAPI from '../../../api/admin/ghn/ghnApi'
import DiaChiApi from '../../../api/admin/khachhang/DiaChiApi'
import voucherApi from '../../../api/admin/voucher/VoucherApi'
import { toast } from 'react-toastify'

const styleModalProduct = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: '90vw', md: '80vw' },
  height: '600px',
  bgcolor: 'white',
  borderRadius: 1.5,
  boxShadow: 24,
}
const styleModalAddCustomer = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: '70vw', sm: '50vw', md: '40vw', lg: '30vw' },
  height: '350px',
  bgcolor: 'white',
  borderRadius: 1.5,
  boxShadow: 24,
}

export default function SellFrom({ maHD }) {
  const [giaoHang, setGiaoHang] = useState(false)
  const [isShowCustomer, setIsShowCustomer] = useState(false)
  const [isShowVoucher, setIsShowVoucher] = useState(false)
  const [isShowAddCustomer, setIsShowAddCustomer] = useState(false)
  const [showModal, setShowModal] = useState(false)

  const [listProductCart, setListProductCart] = useState([])
  const [listKhachHang, setlistKhachHang] = useState([])
  const [listVoucher, setListVoucher] = useState([])

  const [codeVoucher, setCodeVoucher] = useState('')
  const [idFillVoucher, setIdFIllVoucher] = useState('')
  const [shipTotal, setShipTotal] = useState('')
  const [timeShip, setTimeShip] = useState('')

  const openAddProductModal = () => {
    setShowModal(true)
  }

  useEffect(() => {
    fecthDataCustomer()
    fecthDataProductCart()
    fecthDataVoucher(idFillVoucher)
    loadTinh()
  }, [idFillVoucher])
  const fecthDataProductCart = () => {
    sellApi.getAllProductCart().then((response) => {
      setListProductCart(response.data.data)
    })
  }
  const fecthDataCustomer = () => {
    sellApi.getAllCustomer().then((response) => {
      setlistKhachHang(response.data.data.data)
    })
  }
  const fecthDataVoucher = (idCustomer) => {
    if (idCustomer !== '') {
      voucherApi.getAllVoucherByIdCustomer(idCustomer).then((response) => {
        setListVoucher(response.data.data)
      })
    } else {
      voucherApi.getAllVoucherBystatus().then((response) => {
        setListVoucher(response.data.data)
      })
    }
  }

  const calculateDiscountedPrice = (originalPrice, discountPercentage) => {
    // originalPrice là giá gốc của sản phẩm, discountPercentage là phần trăm giảm giá
    const discountAmount = (discountPercentage / 100) * originalPrice
    const discountedPrice = originalPrice - discountAmount
    return discountedPrice
  }

  const formatPrice = (price) => {
    // Sử dụng hàm toLocaleString để định dạng tiền tệ
    return price.toLocaleString('vi-VN', {
      style: 'currency',
      currency: 'VND',
    })
  }

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
    if (newValue) {
      loadHuyen(newValue.id)
      // Lưu tên tỉnh đã chọn vào state
      setTinhName(newValue.label)
      // Đặt giá trị tỉnh vào chi tiết địa chỉ
      setDetailDiaChi({ ...detailDiaChi, provinceId: newValue.id })
    } else {
      setHuyen([])
      setDetailDiaChi({ ...detailDiaChi, provinceId: '' })
    }
  }

  const handleHuyenChange = (_, newValue) => {
    if (newValue) {
      loadXa(newValue.id)
      // Lưu tên huyện đã chọn vào state
      setHuyenName(newValue.label)
      // Đặt giá trị huyện vào chi tiết địa chỉ
      setDetailDiaChi({ ...detailDiaChi, districtId: newValue.id })
    } else {
      setXa([])
      setDetailDiaChi({ ...detailDiaChi, districtId: '' })
    }
  }

  const handleXaChange = (_, newValue) => {
    if (newValue) {
      setDetailDiaChi({ ...detailDiaChi, wardId: newValue.id })
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

  const fillDetailDiaChi = (idCustomer) => {
    DiaChiApi.getAddressDefault(idCustomer).then((response) => {
      console.log(response)
      const {
        idDiaChi,
        name,
        email,
        phoneNumber,
        specificAddress,
        provinceId,
        districtId,
        wardId,
        type,
      } = response.data.data

      loadTinh()
      loadHuyen(provinceId)
      loadXa(districtId)
      // Cắt chuỗi specificAddress thành các phần riêng biệt
      const addressParts = specificAddress.split(', ')
      if (addressParts.length === 4) {
        const [address, xaDetail, huyenDetail, tinhDetail] = addressParts
        // Đặt giá trị cho các biến state tương ứng
        setXaName(xaDetail)
        setHuyenName(huyenDetail)
        setTinhName(tinhDetail)

        setDetailDiaChi({
          id: idDiaChi,
          name: name,
          type: type,
          phoneNumber: phoneNumber,
          email: email,
          specificAddress: address,
          provinceId: provinceId,
          districtId: districtId,
          wardId: wardId,
        })
        const filtelService = {
          shop_id: '3911708',
          from_district: '3440',
          to_district: districtId,
        }

        ghnAPI.getServiceId(filtelService).then((response) => {
          const serviceId = response.data.body.serviceId
          const filterTotal = {
            from_district_id: '3440',
            service_id: serviceId,
            to_district_id: districtId,
            to_ward_code: wardId,
            weight: '200',
            insurance_value: '10000',
          }

          ghnAPI.getTotal(filterTotal).then((response) => {
            setShipTotal(response.data.body.total)

            const filtelTime = {
              from_district_id: '3440',
              from_ward_code: '13010',
              to_district_id: districtId,
              to_ward_code: wardId,
              service_id: serviceId,
            }
            ghnAPI.getime(filtelTime).then((response) => {
              console.log(response.data.body.leadtime)
              setTimeShip(response.data.body.leadtime * 1000)
            })
          })
        })
      }
    })
  }

  const handleDiaChi = (idCustomer) => {
    setIsShowCustomer(false)
    fillDetailDiaChi(idCustomer)
    setIdFIllVoucher(idCustomer)
  }

  const [voucher, setVoucher] = useState({
    id: '',
    code: '',
    name: '',
    value: '',
    maximumValue: '',
    minimumAmount: '',
    type: '',
    startDate: '',
    endDate: '',
  })

  const handleVoucher = (idVoucher) => {
    setIsShowVoucher(false)
    voucherApi
      .getOneVoucherById(idVoucher)
      .then((response) => {
        setVoucher(response.data.data)
        setCodeVoucher(response.data.data.code)
      })
      .catch(() => {
        toast.error(`Không tồn tại khuyến mãi với id : ${idVoucher}`, {
          position: toast.POSITION.TOP_RIGHT,
        })
      })
  }

  return (
    <>
      <TableContainer component={Paper} variant="elevation" sx={{ mb: 4 }}>
        <Box p={2} sx={{ borderBottom: '1px dotted gray' }}>
          <Typography fontWeight={'bold'} variant="h6" display={'inline'}>
            Sản phẩm
          </Typography>

          <Button
            onClick={openAddProductModal}
            sx={{ float: 'right' }}
            size="small"
            variant="contained"
            color="warning">
            <AddIcon fontSize="small" /> Thêm sản phẩm
          </Button>
        </Box>

        <ModelSell open={showModal} setOPen={setShowModal} />

        <Box>
          <Box sx={{ maxHeight: '55vh', overflow: 'auto' }}>
            {listProductCart.map((cart) => (
              <Table>
                <TableRow sx={{ border: 0 }} key={cart.id}>
                  <TableCell sx={{ px: 0 }} width={'5%'}>
                    <IconButton color="error">
                      <CloseIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell style={{ verticalAlign: 'middle' }} sx={{ px: 0 }} width={'70%'}>
                    <Box
                      component="span"
                      display={{ sm: 'inline', xs: 'none' }}
                      style={{ position: 'relative' }}>
                      <img
                        alt="error"
                        src={cart.url}
                        style={{
                          minHeight: '200px',
                          height: '200px',
                          width: '200px',
                          verticalAlign: 'middle',
                        }}
                      />
                      <div
                        style={{
                          position: 'absolute',
                          top: '-530%',
                          right: '0',
                          backgroundColor:
                            cart.value >= 1 && cart.value <= 50
                              ? '#66CC00'
                              : cart.value >= 51 && cart.value <= 80
                              ? '#FF9900'
                              : '#FF0000',
                          color: 'white',
                          padding: '6px 5px',
                          borderRadius: '0 0 0 10px',
                        }}
                        className="discount">
                        {cart.value}% OFF
                      </div>
                    </Box>
                    <span
                      style={{
                        display: 'inline-block',
                        verticalAlign: 'middle',
                        marginLeft: '10px',
                        maxWidth: '70%',
                      }}>
                      <p style={{ margin: 0 }}>
                        <b>{cart.name}</b>
                      </p>
                      <p style={{ color: 'red', margin: '5px 0' }}>
                        {/* <b>{cart.price}.000&#8363;</b> */}
                        {cart.promotion ? ( // Kiểm tra xem sản phẩm có khuyến mãi không
                          <div>
                            <div className="promotion-price">{`${formatPrice(cart.price)}`}</div>{' '}
                            {/* Hiển thị giá gốc */}
                            <div>
                              <span style={{ color: 'red', fontWeight: 'bold' }}>
                                {`${formatPrice(calculateDiscountedPrice(cart.price, cart.value))}`}
                              </span>{' '}
                              {/* Hiển thị giá sau khuyến mãi */}
                            </div>
                          </div>
                        ) : (
                          // Nếu không có khuyến mãi, chỉ hiển thị giá gốc
                          <span>{`${cart.price}.000₫`}</span>
                        )}
                      </p>
                      <p style={{ margin: 0 }}>size:{cart.size}</p>
                    </span>
                  </TableCell>
                  <TableCell sx={{ px: 0 }} width={'5%'}>
                    <Box
                      width={'65px'}
                      display="flex"
                      alignItems="center"
                      sx={{
                        border: '1px solid gray',
                        borderRadius: '20px',
                      }}
                      p={'3px'}>
                      <IconButton sx={{ p: 0 }} size="small">
                        <RemoveIcon fontSize="1px" />
                      </IconButton>
                      <TextField
                        value="10"
                        inputProps={{ min: 1 }}
                        size="small"
                        sx={{
                          width: '30px ',
                          '& input': { p: 0, textAlign: 'center' },
                          '& fieldset': {
                            border: 'none',
                          },
                        }}
                      />
                      <IconButton size="small" sx={{ p: 0 }}>
                        <AddIcon fontSize="1px" />
                      </IconButton>
                    </Box>
                  </TableCell>
                  <TableCell
                    sx={{
                      color: 'red',
                      fontWeight: 'bold',
                    }}
                    width={'20%'}
                    align="right">
                    {formatPrice(calculateDiscountedPrice(cart.price, cart.value) * cart.amount)}
                  </TableCell>
                </TableRow>
              </Table>
            ))}
          </Box>
          <Stack
            m={2}
            direction="row"
            justifyContent="space-between"
            alignItems="flex-start"
            spacing={2}>
            <Typography fontWeight={'bold'}>Tổng tiền</Typography>
            <Box>
              <Typography fontWeight={'bold'} style={{ color: 'red' }}>
                100.000.000₫
              </Typography>
            </Box>
          </Stack>
        </Box>
        {/* ) : (
          'Không có sản phẩm nào '
        )} */}
      </TableContainer>
      <Paper sx={{ mb: 7 }}>
        <Box p={2} sx={{ borderBottom: '1px dotted gray' }}>
          <Typography fontWeight={'bold'} variant="h6" display={'inline'}>
            Khách hàng
          </Typography>
          <Button
            onClick={() => {
              setIsShowCustomer(true)
            }}
            sx={{ float: 'right' }}
            size="small"
            variant="contained"
            color="cam">
            <Person4Icon fontSize="small" /> Chọn khách hàng
          </Button>
          <Modal
            open={isShowCustomer}
            onClose={() => {
              setIsShowCustomer(false)
            }}>
            <Box sx={styleModalProduct}>
              <Toolbar sx={{ mb: 1 }}>
                <Box
                  sx={{
                    color: 'black',
                    flexGrow: 1,
                  }}>
                  <Typography variant="h6" component="div">
                    Tìm kiếm khách hàng
                  </Typography>
                </Box>
                <IconButton
                  onClick={() => {
                    setIsShowCustomer(false)
                  }}
                  aria-label="close"
                  color="error"
                  style={{
                    boxShadow: '1px 2px 3px 1px rgba(0,0,0,.05)',
                  }}>
                  <CloseIcon />
                </IconButton>
              </Toolbar>
              <Container>
                <Box>
                  <TextField
                    sx={{
                      width: '50%',
                      '.MuiInputBase-input': { py: '7.5px' },
                    }}
                    size="small"
                    variant="outlined"
                    placeholder="Tìm khách hàng"
                  />
                  <Button sx={{ ml: 2 }} variant="contained">
                    Tìm kiếm
                  </Button>
                  <Button
                    onClick={() => {
                      setIsShowAddCustomer(true)
                    }}
                    sx={{ ml: 2 }}
                    variant="contained"
                    color="success">
                    Thêm
                  </Button>
                </Box>
                <Box
                  sx={{
                    mt: 3,
                    maxHeight: '400px',
                    overflow: 'auto',
                  }}></Box>
                <Modal
                  open={isShowAddCustomer}
                  onClose={() => {
                    setIsShowAddCustomer(false)
                  }}>
                  <Box sx={styleModalAddCustomer}>
                    <Toolbar>
                      <Box
                        sx={{
                          color: 'black',
                          flexGrow: 1,
                        }}>
                        <Typography variant="h6" component="div">
                          Thêm khách hàng
                        </Typography>
                      </Box>
                      <IconButton
                        onClick={() => {
                          setIsShowAddCustomer(false)
                        }}
                        aria-label="close"
                        color="error"
                        style={{
                          boxShadow: '1px 2px 3px 1px rgba(0,0,0,.05)',
                        }}>
                        <CloseIcon />
                      </IconButton>
                    </Toolbar>
                    <Container>
                      <TextField sx={{ mt: 2 }} label="Tên khách hàng" fullWidth size="small" />
                      <TextField sx={{ mt: 2 }} label="Email" fullWidth size="small" />
                      <TextField sx={{ mt: 2 }} label="Số điện thoại" fullWidth size="small" />
                      <TextField sx={{ mt: 2 }} label="Địa chỉ" fullWidth size="small" />
                      <Stack
                        mt={2}
                        direction="row"
                        justifyContent="flex-end"
                        alignItems="flex-end"
                        spacing={2}>
                        <Box>
                          <Button variant="contained" color="success">
                            <b>Thêm</b>
                          </Button>
                        </Box>
                      </Stack>
                    </Container>
                  </Box>
                </Modal>
              </Container>
              <Container>
                <Table className="tableCss mt-5">
                  <TableHead>
                    <TableRow>
                      <TableCell align="center" width={'7%'}>
                        STT
                      </TableCell>
                      <TableCell align="center" width={'25%'}>
                        Email
                      </TableCell>
                      <TableCell align="center" width={'12%'}>
                        Họ tên
                      </TableCell>
                      <TableCell align="center" width={'15%'}>
                        Ngày sinh
                      </TableCell>
                      <TableCell align="center" width={'15%'}>
                        Số điện thoại
                      </TableCell>
                      <TableCell align="center" width={'15%'}>
                        Giới tính
                      </TableCell>
                      <TableCell align="center" width={'15%'}>
                        Trạng thái
                      </TableCell>
                      <TableCell align="center" width={'10%'}>
                        Thao tác
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {listKhachHang.map((row) => (
                      <TableRow
                        key={row.id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <TableCell align="center">{row.stt}</TableCell>
                        <TableCell align="center">{row.email}</TableCell>
                        <TableCell align="center">{row.fullName}</TableCell>
                        <TableCell align="center">
                          {dayjs(row.dateBirth).format('MM/DD/YYYY')}
                        </TableCell>
                        <TableCell align="center">{row.phoneNumber}</TableCell>
                        <TableCell align="center">{row.gender ? 'Nam' : 'Nữ'}</TableCell>
                        <TableCell align="center">
                          {row.status === 0 ? (
                            <Chip
                              // onClick={() => deleteKhachHang(row.id)}
                              className="chip-hoat-dong"
                              size="small"
                              label="Hoạt động"
                            />
                          ) : (
                            <Chip
                              className="chip-khong-hoat-dong"
                              size="small"
                              label="Không hoạt động"
                            />
                          )}
                        </TableCell>
                        <TableCell align="center">
                          <Button
                            variant="contained"
                            onClick={() => handleDiaChi(row.id)}
                            color="success">
                            <b>chọn</b>
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Container>
            </Box>
          </Modal>
        </Box>
        <Box p={2}>
          <Box display={'inline'}>
            <b>Tên Khách hàng </b>
            <span
              style={{
                padding: '5px 10px',
                borderRadius: '50px',
                marginLeft: '20px',
                backgroundColor: 'rgb(240,240,240)',
              }}>
              Khách lẻ
            </span>
          </Box>
          <Box display={'inline'} sx={{ float: 'right' }}>
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
        </Box>
        <Grid2 container spacing={2}>
          <Grid2 md={7} xs={12} p={0}>
            <Box p={3} pt={0} pb={2}>
              <TextField
                id="outlined-basic"
                variant="outlined"
                label="Tên người nhận"
                type="text"
                size="small"
                sx={{ mt: 2, width: '100%' }}
                name="name"
                value={detailDiaChi.name}
                // onChange={(e) => {
                //   setDetailDiaChi({ ...detailDiaChi, name: e.target.value })
                // }}
              />
              <TextField
                id="outlined-basic"
                variant="outlined"
                label="Số điện thoại"
                type="text"
                size="small"
                sx={{ mt: 2, width: '100%' }}
                name="phoneNumber"
                value={detailDiaChi.phoneNumber}
                // onChange={(e) => {
                //   setDetailDiaChi({ ...detailDiaChi, phoneNumber: e.target.value })
                // }}
              />
              <Autocomplete
                popupIcon={null}
                sx={{ mt: 2, width: '100%' }}
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
              <Autocomplete
                popupIcon={null}
                sx={{ mt: 2, width: '100%' }}
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
                  <TextField placeholder="Chọn huyện" label="Quận/huyện" color="cam" {...params} />
                )}
              />
              <Autocomplete
                popupIcon={null}
                sx={{ mt: 2, width: '100%' }}
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
              <TextField
                id="outlined-basic"
                variant="outlined"
                label="Địa chỉ cụ thể"
                type="text"
                size="small"
                sx={{ mt: 2, width: '100%' }}
                name="specificAddress"
                value={detailDiaChi.specificAddress}
                onChange={(e) => {
                  const updatedDetailDiaChi = { ...detailDiaChi }
                  updatedDetailDiaChi.specificAddress = e.target.value
                  setDetailDiaChi(updatedDetailDiaChi)
                }}
              />
              <TextField
                disabled={!giaoHang}
                sx={{ mt: 2, width: '100%' }}
                label="Ghi chú"
                size="small"
              />
            </Box>
            <Box ml={3} color={!giaoHang ? '#E0E0E0' : ''}>
              <LocalShipping sx={{ mb: '-5px', mr: '5px' }} />
              <b>Đơn vị vận chuyển: </b>
              <b style={{ color: !giaoHang ? '#E0E0E0' : 'rgb(20, 95, 227)' }}>Giao hàng nhanh</b>
            </Box>
            <Box ml={3} color={!giaoHang ? '#E0E0E0' : ''}>
              <LocalShipping sx={{ mb: '-5px', mr: '5px' }} />
              <b>Thời gian dự kiến: </b>
              <b style={{ color: !giaoHang ? '#E0E0E0' : 'rgb(20, 95, 227)' }}>
                {' '}
                {dayjs(timeShip).format('DD/MM/YYYY')}
              </b>
            </Box>
          </Grid2>
          <Grid2 md={5} xs={12} p={0}>
            <Box sx={{ m: 1, ml: 3 }}>
              <TextField label="Mã giảm giá" value={codeVoucher} size="small" />
              <Button
                sx={{ py: '6.7px', ml: 1 }}
                variant="outlined"
                onClick={() => setIsShowVoucher(true)}>
                <b>Chọn mã giảm giá</b>
              </Button>
              <Modal
                open={isShowVoucher}
                onClose={() => {
                  setIsShowVoucher(false)
                }}>
                <Box sx={styleModalProduct}>
                  <Toolbar sx={{ mb: 1 }}>
                    <Box
                      sx={{
                        color: 'black',
                        flexGrow: 1,
                      }}>
                      <Typography variant="h6" component="div">
                        Danh sách mã khuyến mãi
                      </Typography>
                    </Box>
                    <IconButton
                      onClick={() => {
                        setIsShowVoucher(false)
                      }}
                      aria-label="close"
                      color="error"
                      style={{
                        boxShadow: '1px 2px 3px 1px rgba(0,0,0,.05)',
                      }}>
                      <CloseIcon />
                    </IconButton>
                  </Toolbar>
                  <Container>
                    <Box>
                      <TextField
                        sx={{
                          width: '50%',
                          '.MuiInputBase-input': { py: '7.5px' },
                        }}
                        size="small"
                        variant="outlined"
                        placeholder="Tìm khách hàng"
                      />
                      <Button sx={{ ml: 2 }} variant="contained">
                        Tìm kiếm
                      </Button>
                    </Box>
                    <Box
                      sx={{
                        mt: 3,
                        maxHeight: '400px',
                        overflow: 'auto',
                      }}></Box>
                  </Container>
                  <Container>
                    <Table className="tableCss mt-5">
                      <TableHead>
                        <TableRow>
                          <TableCell align="center" width={'7%'}>
                            STT
                          </TableCell>
                          <TableCell align="center" width={'25%'}>
                            Mã
                          </TableCell>
                          <TableCell align="center" width={'12%'}>
                            Tên
                          </TableCell>
                          <TableCell align="center" width={'15%'}>
                            Giá trị
                          </TableCell>
                          <TableCell align="center" width={'15%'}>
                            Giá trị tối đa
                          </TableCell>
                          <TableCell align="center" width={'15%'}>
                            Điều kiện
                          </TableCell>
                          <TableCell align="center" width={'10%'}>
                            Kiểu
                          </TableCell>
                          <TableCell align="center" width={'15%'}>
                            Ngày bắt đầu
                          </TableCell>
                          <TableCell align="center" width={'10%'}>
                            Ngày kết thúc
                          </TableCell>
                          <TableCell align="center" width={'10%'}>
                            Thao tác
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {listVoucher.map((row) => (
                          <TableRow
                            key={row.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell align="center">{}</TableCell>
                            <TableCell align="center">{row.code}</TableCell>
                            <TableCell align="center">{row.name}</TableCell>
                            <TableCell align="center">{row.value}</TableCell>
                            <TableCell align="center">{row.maximumValue}</TableCell>
                            <TableCell align="center">{row.minimumAmount}</TableCell>
                            <TableCell align="center">
                              {row.type === 0 ? (
                                <Chip className="chip-tat-ca" size="small" label="Công khai" />
                              ) : (
                                <Chip className="chip-gioi-han" size="small" label="Cá nhân" />
                              )}
                            </TableCell>
                            <TableCell align="center">
                              {dayjs(row.startDate).format('DD/MM/YYYY HH:mm')}
                            </TableCell>
                            <TableCell align="center">
                              {dayjs(row.endDate).format('DD/MM/YYYY HH:mm')}
                            </TableCell>
                            <TableCell align="center">
                              <Button
                                variant="contained"
                                onClick={() => handleVoucher(row.id)}
                                color="success">
                                <b>chọn</b>
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </Container>
                </Box>
              </Modal>
            </Box>
            <Box sx={{ m: 1, ml: 3, mr: 3 }}>
              <Stack sx={{ my: '29px' }} direction={'row'} justifyContent={'space-between'}>
                <Typography>Tiền hàng</Typography>
                <Typography>3,600,000₫</Typography>
              </Stack>
              <Stack sx={{ my: '29px' }} direction={'row'} justifyContent={'space-between'}>
                <Typography>Phí vận chuyển</Typography>
                <Typography>{shipTotal}đ</Typography>
              </Stack>
              <Stack sx={{ my: '29px' }} direction={'row'} justifyContent={'space-between'}>
                <Typography>Giảm giá</Typography>
                <Typography>0₫</Typography>
              </Stack>
              <Stack sx={{ my: '29px' }} direction={'row'} justifyContent={'space-between'}>
                <Typography>
                  <b>Tổng số tiền</b>
                </Typography>
                <Typography color={'red'}>
                  <b>3,600,000₫</b>
                </Typography>
              </Stack>
            </Box>
          </Grid2>
        </Grid2>
        <Box p={2}>
          <Stack direction={'row'} justifyContent={'right'}>
            <Button variant="contained" color="success">
              Xác nhận đặt hàng
            </Button>
          </Stack>
        </Box>
      </Paper>
    </>
  )
}
