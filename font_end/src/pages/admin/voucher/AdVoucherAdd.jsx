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
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import React, { useEffect, useState } from 'react'
import voucherApi from '../../../api/admin/voucher/VoucherApi'
import { useNavigate } from 'react-router-dom'
import dayjs from 'dayjs'
import confirmSatus from '../../../components/comfirmSwal'
import { toast } from 'react-toastify'
import { useTheme } from '@emotion/react'
import '../../../assets/styles/admin.css'
import './voucher.css'
import Empty from '../../../components/Empty'
import BreadcrumbsCustom from '../../../components/BreadcrumbsCustom'
import { AiOutlineDollar, AiOutlineNumber, AiOutlinePercentage } from 'react-icons/ai'

const listBreadcrumbs = [{ name: 'Khuyến mãi', link: '/admin/voucher' }]

const initialVoucher = {
  code: '',
  name: '',
  value: null,
  maximumValue: null,
  type: 0,
  minimumAmount: null,
  quantity: null,
  startDate: '',
  endDate: '',
  status: 0,
  listIdCustomer: [],
}

export default function AdVoucherAdd() {
  const theme = useTheme()
  const navigate = useNavigate()
  const [isSelectVisible, setIsSelectVisible] = useState(false)
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
  const [voucherAdd, setVoucherAdd] = useState(initialVoucher)

  useEffect(() => {
    handelCustomeFill(initPage)
    haldleAllCodeVoucher()
  }, [initPage])

  const haldleAllCodeVoucher = () => {
    voucherApi
      .getAllCodeVoucher()
      .then((response) => {
        setAllCodeVoucher(response.data.data)
      })
      .catch(() => {
        toast.warning('Vui lòng f5 tải lại dữ liệu', {
          position: toast.POSITION.TOP_CENTER,
        })
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

    if (voucherAdd.code.trim() === '') {
      errors.code = 'Mã không được để trống'
    } else if (voucherAdd.code.length > 30) {
      errors.code = 'Mã không được dài hơn 30 ký tự'
    } else if (allCodeVoucher.includes(voucherAdd.code)) {
      errors.code = 'Mã đã tồn tại'
    }

    if (voucherAdd.name.trim() === '') {
      errors.name = 'Tên không được để trống'
    } else if (voucherAdd.name.length > 100) {
      errors.name = 'Tên không được dài hơn 100 ký tự'
    }

    if (voucherAdd.value === null) {
      errors.value = 'Giá trị không được để trống'
    } else if (!Number.isInteger(voucherAdd.value)) {
      errors.value = 'giá trị chỉ được nhập số nguyên'
    } else if (voucherAdd.value < 0) {
      errors.value = 'giá trị tối thiểu 0%'
    } else if (voucherAdd.value > 100) {
      errors.value = 'giá trị tối đa 100%'
    }

    if (voucherAdd.maximumValue === null) {
      errors.maximumValue = 'Giá trị tối đa không được để trống'
    } else if (!Number.isInteger(voucherAdd.maximumValue)) {
      errors.maximumValue = 'giá trị tối đa chỉ được nhập số nguyên'
    } else if (voucherAdd.maximumValue < 0) {
      errors.maximumValue = 'giá trị tối đa tối thiểu 0 (vnđ)'
    }

    if (voucherAdd.quantity === null) {
      errors.quantity = 'Số lượng không được để trống'
    } else if (!Number.isInteger(voucherAdd.quantity)) {
      errors.quantity = 'Số lượng chỉ được nhập số nguyên'
    } else if (voucherAdd.quantity < 0) {
      errors.quantity = 'Số lượng tối thiểu 0 (vnđ)'
    }

    if (voucherAdd.minimumAmount === null) {
      errors.minimumAmount = 'Điều kiện không được để trống'
    } else if (!Number.isInteger(voucherAdd.minimumAmount)) {
      errors.minimumAmount = 'Điều kiện chỉ được nhập số nguyên'
    } else if (voucherAdd.minimumAmount < 0) {
      errors.minimumAmount = 'Điều kiện tối thiểu 0 (vnđ)'
    }

    if (voucherAdd.startDate.trim() === '') {
      errors.startDate = 'Ngày bắt đầu không được để trống'
    } else if (
      dayjs(voucherAdd.startDate, 'DD-MM-YYYY HH:mm:ss').isAfter(
        dayjs(voucherAdd.endDate, 'DD-MM-YYYY HH:mm:ss'),
      )
    ) {
      errors.startDate = 'Ngày bắt đầu không được lớn hơn ngày kết thúc'
    }

    if (voucherAdd.endDate.trim() === '') {
      errors.endDate = 'Ngày kết thúc không được để trống'
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

  const handleVoucherAdd = () => {
    const check = handleValidation()

    if (check < 1) {
      const title = 'Xác nhận thêm mới khuyễn mãi?'
      const text = ''
      confirmSatus(title, text, theme).then((result) => {
        if (result.isConfirmed) {
          const updatedVoucherAdd = { ...voucherAdd, listIdCustomer: selectedCustomerIds }
          console.log(updatedVoucherAdd)
          voucherApi
            .addVoucher(updatedVoucherAdd)
            .then(() => {
              toast.success('Thêm mới khuyễn mãi thành công', {
                position: toast.POSITION.TOP_RIGHT,
              })
              navigate('/admin/voucher')
            })
            .catch(() => {
              toast.error('Thêm mới khuyễn mãi thất bại', {
                position: toast.POSITION.TOP_RIGHT,
              })
            })
        }
      })
    } else {
      toast.error('Không thể thêm mới khuyến mãi', {
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
        toast.warning('Vui lòng f5 tải lại dữ liệu', {
          position: toast.POSITION.TOP_CENTER,
        })
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
    <div className="voucher-add">
      <BreadcrumbsCustom nameHere={'Thêm khuyến mãi'} listLink={listBreadcrumbs} />
      <Paper sx={{ p: 2 }}>
        <Grid container spacing={2} sx={{ mt: 2, mb: 2 }}>
          <Grid item xs={5}>
            <div style={{ marginBottom: '16px' }}>
              <TextField
                className="input-css"
                label="Mã khuyến mãi"
                type="text"
                size="small"
                fullWidth
                onChange={(e) => setVoucherAdd({ ...voucherAdd, code: e.target.value })}
              />
              <span className="error">{errorCode}</span>
            </div>
            {/* -------------------------------------------------------------------------------------------------------- */}
            <div style={{ marginBottom: '16px' }}>
              <TextField
                className="input-css"
                label="Tên khuyến mãi"
                type="text"
                size="small"
                fullWidth
                onChange={(e) => setVoucherAdd({ ...voucherAdd, name: e.target.value })}
              />
              <span className="error">{errorName}</span>
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
                  fullWidth
                  onChange={(e) => setVoucherAdd({ ...voucherAdd, value: Number(e.target.value) })}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <AiOutlinePercentage className="icons-css" />
                      </InputAdornment>
                    ),
                  }}
                />
                <span className="error">{errorValue}</span>
              </div>
              {/* -------------------------------------------------------------------------------------------------------- */}
              <div>
                <TextField
                  className="input-css"
                  label="Giá trị tối đa"
                  type="number"
                  size="small"
                  fullWidth
                  onChange={(e) =>
                    setVoucherAdd({
                      ...voucherAdd,
                      maximumValue: Number(e.target.value),
                    })
                  }
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <AiOutlineDollar className="icons-css" />
                      </InputAdornment>
                    ),
                  }}
                />
                <span className="error">{errorMaximumValue}</span>
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
                  fullWidth
                  onChange={(e) =>
                    setVoucherAdd({
                      ...voucherAdd,
                      quantity: Number(e.target.value),
                    })
                  }
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <AiOutlineNumber className="icons-css" />
                      </InputAdornment>
                    ),
                  }}
                />
                <span className="error">{errorQuantity}</span>
              </div>
              {/* -------------------------------------------------------------------------------------------------------- */}
              <div>
                <TextField
                  className="input-css"
                  label="Điều kiện"
                  type="number"
                  size="small"
                  fullWidth
                  onChange={(e) =>
                    setVoucherAdd({
                      ...voucherAdd,
                      minimumAmount: Number(e.target.value),
                    })
                  }
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <AiOutlineDollar className="icons-css" />
                      </InputAdornment>
                    ),
                  }}
                />
                <span className="error">{errorMinimumAmount}</span>
              </div>
            </Stack>
            {/* -------------------------------------------------------------------------------------------------------- */}
            <div style={{ marginBottom: '16px' }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                  className="dateTime"
                  format={'DD-MM-YYYY HH:mm:ss'}
                  onChange={(e) =>
                    setVoucherAdd({
                      ...voucherAdd,
                      startDate: dayjs(e).format('DD-MM-YYYY HH:mm:ss'),
                    })
                  }
                  ampm={false}
                  minutesStep={1}
                  minDateTime={dayjs()}
                  slotProps={{
                    actionBar: {
                      actions: ['clear'],
                      onClick: () => setVoucherAdd({ ...voucherAdd, startDate: '' }),
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
                  onChange={(e) =>
                    setVoucherAdd({
                      ...voucherAdd,
                      endDate: dayjs(e).format('DD-MM-YYYY HH:mm:ss'),
                    })
                  }
                  ampm={false}
                  minDateTime={dayjs()}
                  slotProps={{
                    actionBar: {
                      actions: ['clear'],
                      onClick: () => setVoucherAdd({ ...voucherAdd, endDate: '' }),
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
              <FormControl size="small" sx={{ flex: 1 }}>
                <RadioGroup row>
                  <FormControlLabel
                    name="typeAdd"
                    value={0}
                    control={<Radio />}
                    label="Công khai"
                    onClick={(e) => {
                      setIsSelectVisible(false)
                      setVoucherAdd({ ...voucherAdd, type: 0 })
                    }}
                    checked={isSelectVisible === false}
                  />
                  <FormControlLabel
                    name="typeAdd"
                    value={1}
                    control={<Radio />}
                    label="Cá nhân"
                    onClick={() => {
                      setIsSelectVisible(true)
                      setVoucherAdd({ ...voucherAdd, type: 1 })
                      setSelectAll(false)
                    }}
                    checked={isSelectVisible === true}
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
                    <TableCell width={'7%'}>
                      <Checkbox
                        disabled={voucherAdd.type === 0 ? true : false}
                        name="tất cả"
                        checked={selectAll}
                        onChange={handleSelectAllChange}
                        // style={{ color: 'white' }}
                      />
                    </TableCell>
                    <TableCell width={'25%'}>Tên</TableCell>
                    <TableCell width={'24%'}>Số điện thoại</TableCell>
                    <TableCell width={'29%'}>Email</TableCell>
                    <TableCell width={'15%'}>Ngày sinh</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {listCustomer.map((row, index) => (
                    <TableRow key={row.id}>
                      <TableCell>
                        <Checkbox
                          disabled={voucherAdd.type === 0 ? true : false}
                          key={row.id}
                          checked={selectedCustomerIds.indexOf(row.id) !== -1}
                          onChange={(event) => handleRowCheckboxChange(event, row.id)}
                        />
                      </TableCell>
                      <TableCell>{row.fullName}</TableCell>
                      <TableCell>{row.phoneNumber}</TableCell>
                      <TableCell>{row.email}</TableCell>
                      <TableCell>{dayjs(row.dateBirth).format('DD-MM-YYYY')}</TableCell>
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
          </Grid>
        </Grid>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'end' }}>
          <Button
            style={{
              width: '150px',
              borderRadius: '8px ',
              borderColor: '#fc7c27',
              color: '#fc7c27',
            }}
            onClick={() => handleVoucherAdd(voucherAdd, selectedCustomerIds)}
            variant="outlined">
            Thêm mới
          </Button>
        </div>
      </Paper>
    </div>
  )
}
