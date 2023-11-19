import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  InputAdornment,
  Pagination,
  Paper,
  Radio,
  RadioGroup,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import voucherApi from '../../../api/admin/voucher/VoucherApi'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DateTimePicker } from '@mui/x-date-pickers'
import dayjs from 'dayjs'
import Empty from '../../../components/Empty'
import confirmSatus from '../../../components/comfirmSwal'
import { useTheme } from '@emotion/react'
import { toast } from 'react-toastify'
import BreadcrumbsCustom from '../../../components/BreadcrumbsCustom'
import '../../../assets/styles/admin.css'
import './voucher.css'
import { AiOutlineDollar, AiOutlineNumber, AiOutlinePercentage } from 'react-icons/ai'

const listBreadcrumbs = [{ name: 'Khuyến mãi', link: '/admin/voucher' }]

export default function AdVoucherDetail() {
  const theme = useTheme()
  const { id } = useParams()
  const navigate = useNavigate()
  const [listCustomer, setListCustomer] = useState([])
  const [initPage, setInitPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [dataFetched, setDataFetched] = useState(false)
  const [selectedCustomerIds, setSelectedCustomerIds] = useState([])
  const [selectAll, setSelectAll] = useState(false)
  const [errorCode, setErrorCode] = useState('')
  const [errorName, setErrorName] = useState('')
  const [errorValue, setErrorValue] = useState('')
  const [errorMaximumValue, setErrorMaximumValue] = useState('')
  const [errorMinimumAmount, setErrorMinimumAmount] = useState('')
  const [errorQuantity, setErrorQuantity] = useState('')
  const [errorStartDate, setErrorStartDate] = useState('')
  const [errorEndDate, setErrorEndDate] = useState('')
  const [allCodeVoucher, setAllCodeVoucher] = useState([])
  const [allNameVoucher, setAllNameVoucher] = useState([])
  const [prevCodeValue, setPrevCodeValue] = useState('')
  const [prevNameValue, setPrevNameValue] = useState('')
  const initialVoucher = {
    code: '',
    name: '',
    value: 0,
    maximumValue: 0,
    type: 0,
    minimumAmount: 0,
    quantity: 0,
    startDate: '',
    endDate: '',
    listIdCustomer: [],
  }
  const [voucherDetail, setVoucherDetail] = useState(initialVoucher)

  const listCode = []
  allCodeVoucher.map((m) => listCode.push(m.toLowerCase()))
  const listName = []
  allNameVoucher.map((m) => listName.push(m.toLowerCase()))

  useEffect(() => {
    fetchData(id)
    handelCustomeFill(initPage)
    haldleAllCodeVoucher()
    haldleAllNameVoucher()
  }, [id, initPage])

  useEffect(() => {
    fetchListIdCustomer(id)
  }, [id])

  useEffect(() => {
    setVoucherDetail({ ...voucherDetail, listIdCustomer: selectedCustomerIds })
  }, [voucherDetail, selectedCustomerIds])

  const fetchData = (id) => {
    voucherApi
      .getOneVoucherById(id)
      .then((response) => {
        const formattedStartDate = dayjs(response.data.data.startDate).format('DD-MM-YYYY HH:mm:ss')
        const formattedEndDate = dayjs(response.data.data.endDate).format('DD-MM-YYYY HH:mm:ss')

        setVoucherDetail({
          ...response.data.data,
          startDate: formattedStartDate,
          endDate: formattedEndDate,
        })

        setPrevCodeValue(response.data.data.code)
        setPrevNameValue(response.data.data.name)
      })
      .catch(() => {
        alert('Error: Không tải được dữ liệu API')
      })
  }

  const fetchListIdCustomer = (id) => {
    voucherApi
      .getListIdCustomerByIdVoucher(id)
      .then((response) => {
        setSelectedCustomerIds(response.data.data)
      })
      .catch(() => {
        console.log('NULL')
      })
  }

  const haldleAllCodeVoucher = () => {
    voucherApi.getAllCodeVoucher().then((response) => {
      setAllCodeVoucher(response.data.data)
    })
  }

  const haldleAllNameVoucher = () => {
    voucherApi.getAllNameVoucher().then((response) => {
      setAllNameVoucher(response.data.data)
    })
  }

  const handleValidation = () => {
    let check = 0
    const errors = {
      code: '',
      name: '',
      value: '',
      maximumValue: '',
      quantity: '',
      minimumAmount: '',
      startDate: '',
      endDate: '',
    }

    const minBirthYear = 1900

    if (voucherDetail.code.trim() === '') {
      errors.code = 'Mã không được để trống'
    } else if (voucherDetail.code !== voucherDetail.code.trim()) {
      errors.code = 'Mã không được chứa khoảng trắng thừa'
    } else if (voucherDetail.code.length > 30) {
      errors.code = 'Mã không được dài hơn 30 ký tự'
    } else if (voucherDetail.code.length < 5) {
      errors.code = 'Mã không được bé hơn 5 ký tự'
    } else if (
      prevCodeValue !== voucherDetail.code &&
      listCode.includes(voucherDetail.code.toLowerCase())
    ) {
      errors.code = 'Mã đã tồn tại'
    } else if (/[^a-zA-Z0-9_\s]+/.test(voucherDetail.code)) {
      errors.code = 'Mã không được chứa ký tự đặc biệt'
    }

    if (voucherDetail.name.trim() === '') {
      errors.name = 'Tên không được để trống'
    } else if (voucherDetail.name !== voucherDetail.name.trim()) {
      errors.name = 'Tên không được chứa khoảng trắng thừa'
    } else if (voucherDetail.name.length > 100) {
      errors.name = 'Tên không được dài hơn 100 ký tự'
    } else if (voucherDetail.name.length < 5) {
      errors.name = 'Tên không được bé hơn 5 ký tự'
    } else if (
      prevNameValue !== voucherDetail.name &&
      listName.includes(voucherDetail.name.toLowerCase())
    ) {
      errors.name = 'Tên đã tồn tại'
    } else if (/[^a-zA-Z0-9_\s]+/.test(voucherDetail.name)) {
      errors.name = 'Tên không được chứa ký tự đặc biệt'
    }

    if (voucherDetail.typeValue === 0) {
      if (voucherDetail.value === null) {
        errors.value = 'Giá trị không được để trống'
      } else if (!Number.isInteger(voucherDetail.value)) {
        errors.value = 'giá trị chỉ được nhập số nguyên'
      } else if (voucherDetail.value < 1) {
        errors.value = 'giá trị tối thiểu 1%'
      } else if (voucherDetail.value > 100) {
        errors.value = 'giá trị tối đa 100%'
      }
    } else {
      if (voucherDetail.value === null) {
        errors.value = 'Giá trị không được để trống'
      } else if (!Number.isInteger(voucherDetail.value)) {
        errors.value = 'giá trị chỉ được nhập số nguyên'
      } else if (voucherDetail.value < 1) {
        errors.value = 'giá trị tối thiểu 1 VNĐ'
      }
    }

    if (voucherDetail.maximumValue === null) {
      errors.maximumValue = 'Giá trị tối đa không được để trống'
    } else if (!Number.isInteger(voucherDetail.maximumValue)) {
      errors.maximumValue = 'giá trị tối đa chỉ được nhập số nguyên'
    } else if (voucherDetail.maximumValue < 1) {
      errors.maximumValue = 'giá trị tối đa tối thiểu 1 (vnđ)'
    }

    if (voucherDetail.quantity === null) {
      errors.quantity = 'Số lượng không được để trống'
    } else if (!Number.isInteger(voucherDetail.quantity)) {
      errors.quantity = 'Số lượng chỉ được nhập số nguyên'
    } else if (voucherDetail.quantity < 1) {
      errors.quantity = 'Số lượng tối thiểu 1'
    }

    if (voucherDetail.minimumAmount === null) {
      errors.minimumAmount = 'Điều kiện không được để trống'
    } else if (!Number.isInteger(voucherDetail.minimumAmount)) {
      errors.minimumAmount = 'Điều kiện chỉ được nhập số nguyên'
    } else if (voucherDetail.minimumAmount < 1) {
      errors.minimumAmount = 'Điều kiện tối thiểu 1 (vnđ)'
    }

    if (voucherDetail.startDate.trim() === '') {
      errors.startDate = 'Ngày bắt đầu không được để trống'
    } else if (
      dayjs(voucherDetail.startDate, 'DD-MM-YYYY HH:mm:ss').isAfter(
        dayjs(voucherDetail.endDate, 'DD-MM-YYYY HH:mm:ss'),
      )
    ) {
      errors.startDate = 'Ngày bắt đầu không được lớn hơn ngày kết thúc'
    } else if (
      dayjs(voucherDetail.startDate, 'DD-MM-YYYY HH:mm:ss').isBefore(`${minBirthYear}-01-01`) ||
      !dayjs(voucherDetail.startDate, 'DD-MM-YYYY HH:mm:ss').isValid()
    ) {
      errors.startDate = 'Ngày bắt đầu không hợp lệ'
    }

    if (voucherDetail.endDate.trim() === '') {
      errors.endDate = 'Ngày kết thúc không được để trống'
    } else if (
      dayjs(voucherDetail.endDate, 'DD-MM-YYYY HH:mm:ss').isBefore(`${minBirthYear}-01-01`) ||
      !dayjs(voucherDetail.endDate, 'DD-MM-YYYY HH:mm:ss').isValid()
    ) {
      errors.endDate = 'Ngày kết thúc không hợp lệ'
    }

    for (const key in errors) {
      if (errors[key]) {
        check++
      }
    }

    setErrorCode(errors.code)
    setErrorName(errors.name)
    setErrorValue(errors.value)
    setErrorMaximumValue(errors.maximumValue)
    setErrorMinimumAmount(errors.minimumAmount)
    setErrorQuantity(errors.quantity)
    setErrorStartDate(errors.startDate)
    setErrorEndDate(errors.endDate)

    return check
  }

  const handleUpdateVoucher = (idUpdate, voucherDetail) => {
    const check = handleValidation()

    if (check < 1) {
      const title = 'Xác nhận cập nhật voucher?'
      const text = ''
      confirmSatus(title, text, theme).then((result) => {
        if (result.isConfirmed) {
          voucherApi
            .updateVoucher(idUpdate, voucherDetail)
            .then(() => {
              toast.success('Cập nhật voucher thành công', {
                position: toast.POSITION.TOP_RIGHT,
              })
              navigate('/admin/voucher')
            })
            .catch(() => {
              toast.error('Cập nhật voucher thất bại', {
                position: toast.POSITION.TOP_RIGHT,
              })
            })
        }
      })
    } else {
      toast.error('Không thể cập nhật khuyến mãi', {
        position: toast.POSITION.TOP_RIGHT,
      })
    }
  }

  const handelCustomeFill = (initPage) => {
    voucherApi
      .getPageCustomer(initPage - 1)
      .then((response) => {
        setListCustomer(response.data.data.content)
        setTotalPages(response.data.data.totalPages)
        setDataFetched(true)
      })
      .catch(() => {
        setDataFetched(false)
      })
  }

  const handelOnchangePage = (page) => {
    setInitPage(page)
    handelCustomeFill(page - 1)
  }

  const handleSelectAllChange = (event) => {
    const selectedIds = event.target.checked ? listCustomer.map((row) => row.id) : []
    setSelectedCustomerIds(selectedIds)
    setSelectAll(event.target.checked)
  }

  const handleRowCheckboxChange = (event, customerId) => {
    const selectedIndex = selectedCustomerIds.indexOf(customerId)
    let newSelectedIds = []

    if (selectedIndex === -1) {
      newSelectedIds = [...selectedCustomerIds, customerId]
    } else {
      newSelectedIds = [
        ...selectedCustomerIds.slice(0, selectedIndex),
        ...selectedCustomerIds.slice(selectedIndex + 1),
      ]
    }

    setSelectedCustomerIds(newSelectedIds)
    setSelectAll(newSelectedIds.length === listCustomer.length)
  }

  return (
    <div className="voucher-detail">
      <BreadcrumbsCustom nameHere={'Chi tiết khuyến mãi'} listLink={listBreadcrumbs} />
      <Paper sx={{ p: 2 }}>
        <Grid container spacing={2} sx={{ mt: 2, mb: 2 }}>
          <Grid item xs={5}>
            <div style={{ marginBottom: '16px' }}>
              <TextField
                className="input-css"
                label="Mã voucher"
                type="text"
                size="small"
                value={voucherDetail?.code}
                onChange={(e) => {
                  setVoucherDetail({
                    ...voucherDetail,
                    code: e.target.value,
                  })
                  setErrorCode('')
                }}
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                error={Boolean(errorCode)}
                helperText={errorCode}
              />
            </div>
            {/* -------------------------------------------------------------------------------------------------------- */}
            <div style={{ marginBottom: '16px' }}>
              <TextField
                className="input-css"
                label="Tên voucher"
                type="text"
                size="small"
                value={voucherDetail?.name}
                onChange={(e) => {
                  setVoucherDetail({
                    ...voucherDetail,
                    name: e.target.value,
                  })
                  setErrorName('')
                }}
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                error={Boolean(errorName)}
                helperText={errorName}
              />
            </div>
            {/* -------------------------------------------------------------------------------------------------------- */}
            <Stack
              direction="row"
              spacing={2}
              style={{ marginBottom: '16px', justifyContent: 'space-between', display: 'flex' }}>
              <div>
                <TextField
                  className="input-css"
                  label="Giá trị"
                  type="number"
                  size="small"
                  value={voucherDetail?.value}
                  onChange={(e) => {
                    setVoucherDetail({
                      ...voucherDetail,
                      value: Number(e.target.value),
                    })
                    setErrorValue('')
                  }}
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <AiOutlinePercentage
                          color={voucherDetail.typeValue === 0 ? '#fc7c27' : ''}
                          className="icons-css"
                          onClick={() => setVoucherDetail({ ...voucherDetail, typeValue: 0 })}
                        />
                        <AiOutlineDollar
                          color={voucherDetail.typeValue === 1 ? '#fc7c27' : ''}
                          className="icons-css"
                          onClick={() => setVoucherDetail({ ...voucherDetail, typeValue: 1 })}
                        />
                      </InputAdornment>
                    ),
                  }}
                  error={Boolean(errorValue)}
                  helperText={errorValue}
                />
              </div>
              {/* -------------------------------------------------------------------------------------------------------- */}
              <div>
                <TextField
                  className="input-css"
                  label="Giá trị tối đa"
                  type="number"
                  size="small"
                  value={voucherDetail?.maximumValue}
                  onChange={(e) => {
                    setVoucherDetail({
                      ...voucherDetail,
                      maximumValue: Number(e.target.value),
                    })
                    setErrorMaximumValue('')
                  }}
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <AiOutlineDollar className="icons-css" />
                      </InputAdornment>
                    ),
                  }}
                  error={Boolean(errorMaximumValue)}
                  helperText={errorMaximumValue}
                />
              </div>
            </Stack>
            {/* -------------------------------------------------------------------------------------------------------- */}
            <Stack
              direction="row"
              spacing={2}
              style={{ marginBottom: '16px', justifyContent: 'space-between', display: 'flex' }}>
              <div>
                <TextField
                  className="input-css"
                  label="Số lượng"
                  type="number"
                  variant="outlined"
                  size="small"
                  value={voucherDetail?.quantity}
                  onChange={(e) => {
                    setVoucherDetail({
                      ...voucherDetail,
                      quantity: Number(e.target.value),
                    })
                    setErrorQuantity('')
                  }}
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <AiOutlineNumber className="icons-css" />
                      </InputAdornment>
                    ),
                  }}
                  error={Boolean(errorQuantity)}
                  helperText={errorQuantity}
                />
              </div>
              {/* -------------------------------------------------------------------------------------------------------- */}
              <div>
                <TextField
                  className="input-css"
                  label="Điều kiện"
                  type="number"
                  size="small"
                  value={voucherDetail?.minimumAmount}
                  onChange={(e) => {
                    setVoucherDetail({
                      ...voucherDetail,
                      minimumAmount: Number(e.target.value),
                    })
                    setErrorMinimumAmount('')
                  }}
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <AiOutlineDollar className="icons-css" />
                      </InputAdornment>
                    ),
                  }}
                  error={Boolean(errorMinimumAmount)}
                  helperText={errorMinimumAmount}
                />
              </div>
            </Stack>
            {/* -------------------------------------------------------------------------------------------------------- */}
            <div style={{ marginBottom: '16px' }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                  className="dateTime"
                  format={'DD-MM-YYYY HH:mm:ss'}
                  value={dayjs(voucherDetail?.startDate, 'DD-MM-YYYY HH:mm:ss')}
                  onChange={(e) => {
                    setVoucherDetail({
                      ...voucherDetail,
                      startDate: dayjs(e).format('DD-MM-YYYY HH:mm:ss'),
                    })
                    setErrorStartDate('')
                  }}
                  ampm={false}
                  minDateTime={dayjs()}
                  slotProps={{
                    actionBar: {
                      actions: ['clear'],
                      onClick: () => setVoucherDetail({ ...voucherDetail, startDate: '' }),
                    },
                  }}
                  label="Từ ngày"
                  sx={{ width: '100%' }}
                />
              </LocalizationProvider>
              <span className="error">{errorStartDate}</span>
            </div>
            {/* -------------------------------------------------------------------------------------------------------- */}
            <div style={{ marginBottom: '16px' }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                  className="dateTime"
                  format={'DD-MM-YYYY HH:mm:ss'}
                  value={dayjs(voucherDetail?.endDate, 'DD-MM-YYYY HH:mm:ss')}
                  onChange={(e) => {
                    setVoucherDetail({
                      ...voucherDetail,
                      endDate: dayjs(e).format('DD-MM-YYYY HH:mm:ss'),
                    })
                    setErrorEndDate('')
                  }}
                  ampm={false}
                  minDateTime={dayjs()}
                  slotProps={{
                    actionBar: {
                      actions: ['clear'],
                      onClick: () => setVoucherDetail({ ...voucherDetail, endDate: '' }),
                    },
                  }}
                  label="Đến ngày"
                  sx={{ width: '100%' }}
                />
              </LocalizationProvider>
              <span className="error">{errorEndDate}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'start' }}>
              <FormLabel>Kiểu</FormLabel>
              <FormControl size="small" sx={{ flex: 1, ml: 2 }}>
                <RadioGroup row value={voucherDetail?.type}>
                  <FormControlLabel
                    name="typeUpdate"
                    value={0}
                    control={<Radio />}
                    label="Công khai"
                    onChange={(e) => setVoucherDetail({ ...voucherDetail, type: e.target.value })}
                  />
                  <FormControlLabel
                    name="typeUpdate"
                    value={1}
                    control={<Radio />}
                    label="Cá nhân"
                    onChange={(e) => setVoucherDetail({ ...voucherDetail, type: e.target.value })}
                  />
                </RadioGroup>
              </FormControl>
            </div>
          </Grid>
          <Grid item xs={7}>
            {dataFetched && (
              <Table className="tableCss" aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell width={'5%'}>
                      <Checkbox
                        disabled={voucherDetail.type === 0 ? true : false}
                        name="tất cả"
                        checked={selectAll}
                        onChange={handleSelectAllChange}
                      />
                    </TableCell>
                    <TableCell align="center" width={'25%'}>
                      Tên
                    </TableCell>
                    <TableCell align="center" width={'20%'}>
                      Số điện thoại
                    </TableCell>
                    <TableCell align="center" width={'25%'}>
                      Email
                    </TableCell>
                    <TableCell align="center" width={'20%'}>
                      Ngày sinh
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {listCustomer.map((row, index) => (
                    <TableRow key={row.id}>
                      <TableCell>
                        <Checkbox
                          disabled={voucherDetail.type === 0 ? true : false}
                          key={row.id}
                          checked={selectedCustomerIds.indexOf(row.id) !== -1}
                          onChange={(event) => handleRowCheckboxChange(event, row.id)}
                        />
                      </TableCell>
                      <TableCell align="center">{row.fullName}</TableCell>
                      <TableCell align="center">{row.phoneNumber}</TableCell>
                      <TableCell align="center">{row.email}</TableCell>
                      <TableCell align="center">
                        {dayjs(row.dateBirth).format('DD-MM-YYYY')}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
            {!dataFetched && (
              <p>
                <Empty />
              </p>
            )}
            <Grid container sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
              <Pagination
                page={initPage}
                onChange={(_, page) => handelOnchangePage(page)}
                count={totalPages}
                variant="outlined"
                color="cam"
              />
            </Grid>
            <div style={{ float: 'right' }}>
              <Button
                style={{
                  width: '150px',
                  borderRadius: '8px ',
                  borderColor: '#fc7c27',
                  color: '#fc7c27',
                }}
                onClick={() => handleUpdateVoucher(id, voucherDetail)}
                variant="outlined"
                fullWidth>
                Cập nhật
              </Button>
            </div>
          </Grid>
        </Grid>
      </Paper>
    </div>
  )
}
