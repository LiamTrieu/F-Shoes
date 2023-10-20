import {
  Button,
  Checkbox,
  Grid,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
  useTheme,
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import khuyenMaiApi from '../../../api/admin/khuyenmai/khuyenMaiApi'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import dayjs from 'dayjs'
import confirmSatus from '../../../components/comfirmSwal'
import { toast } from 'react-toastify'
import BreadcrumbsCustom from '../../../components/BreadcrumbsCustom'
const listBreadcrumbs = [{ name: 'Khuyến mại', link: '/admin/promotion' }]

export default function AdPromotionDetail() {
  const theme = useTheme()
  const [getProduct, setGetProduct] = useState([])
  const [selectAllProduct, setSelectAllProduct] = useState(false)
  const [totalPages, setTotalPages] = useState(0)
  const [selectedRowsProduct, setSelectedRowsProduct] = useState([])
  const [filter, setFilter] = useState({ page: 1, size: 5, nameProduct: '' })

  const [selectAll, setSelectAll] = useState(false)
  const [getProductDetailByProduct, setGetProductDetailByProduct] = useState([])
  const [selectedRows, setSelectedRows] = useState([])
  const [totalPagesDetailByProduct, setTotalPagesDetailByProduct] = useState(0)
  const [filterDetailByProduct, setFilterDetailProduct] = useState({ page: 1, size: 5 })
  const [selectedProductIds, setSelectedProductIds] = useState([])
  const [errorName, setErrorName] = useState('')
  const [errorValue, setErrorValue] = useState('')
  const [errorTimeStart, settimeStart] = useState('')
  const [errorTimeEnd, setTimeend] = useState('')

  let navigate = useNavigate()
  const { id } = useParams()
  const [updatePromotion, setUpdatePromotion] = useState({
    name: '',
    value: '',
    type: '',
    // status: 0,
    timeStart: '',
    timeEnd: '',
    idProductDetail: selectedRows,
  })
  const handleSelectAllChange = (event) => {
    const selectedIds = event.target.checked
      ? getProductDetailByProduct.map((row) => row.productDetail)
      : []
    setSelectedRows(selectedIds)
    setSelectAll(event.target.checked)
  }

  const handleRowCheckboxChange = (event, ProductDetailId) => {
    const selectedIndex = selectedRows.indexOf(ProductDetailId)
    let newSelected = []

    if (selectedIndex === -1) {
      newSelected = [...selectedRows, ProductDetailId]
    } else {
      newSelected = [
        ...selectedRows.slice(0, selectedIndex),
        ...selectedRows.slice(selectedIndex + 1),
      ]
    }

    setSelectedRows(newSelected)
    setSelectAll(newSelected.length === getProductDetailByProduct.length)
  }

  const handleSelectAllChangeProduct = (event) => {
    const selectedIds = event.target.checked ? getProduct.map((row) => row.id) : []
    setSelectedRowsProduct(selectedIds)
    setSelectAllProduct(event.target.checked)
  }

  const handleRowCheckboxChange1 = (event, ProductId) => {
    const selectedIndex = selectedRowsProduct.indexOf(ProductId)
    let newSelected = []

    if (selectedIndex === -1) {
      newSelected = [...selectedRowsProduct, ProductId]
    } else {
      newSelected = [
        ...selectedRowsProduct.slice(0, selectedIndex),
        ...selectedRowsProduct.slice(selectedIndex + 1),
      ]
    }

    setSelectedRowsProduct(newSelected)
    setSelectAllProduct(newSelected.length === getProduct.length)

    const selectedProductIds = getProduct
      .filter((row) => newSelected.includes(row.id))
      .map((selectedProduct) => selectedProduct.id)
    setSelectedProductIds(selectedProductIds)

    console.log('ID của sản phẩm đã chọn:', selectedProductIds)
  }
  const getProductDetailById = (filterDetailByProduct, selectedProductIds) => {
    if (selectedProductIds.length > 0) {
      khuyenMaiApi
        .getAllProductDetailByProduct(filterDetailByProduct, selectedProductIds)
        .then((response) => {
          setGetProductDetailByProduct(response.data.data.data)
          setTotalPagesDetailByProduct(response.data.data.totalPages)
        })
    } else {
      setGetProductDetailByProduct([])
      setTotalPagesDetailByProduct(0)
    }
  }
  useEffect(() => {
    getProductDetailById(filterDetailByProduct, selectedProductIds)
  }, [filterDetailByProduct, selectedProductIds])

  const validate = () => {
    const timeStart = dayjs(updatePromotion.timeStart, 'DD/MM/YYYY')
    const timeEnd = dayjs(updatePromotion.timeEnd, 'DD/MM/YYYY')

    const currentDate = dayjs()
    let check = 0
    const errors = {
      name: '',
      value: '',
      timeStart: '',
      timeEnd: '',
    }

    if (updatePromotion.name.trim() === '') {
      errors.name = 'Vui lòng nhập tên khuyến mại'
    } else if (!isNaN(updatePromotion.name)) {
      errors.name = 'Tên khuyến mại phải là chữ'
    } else if (updatePromotion.name.length > 50) {
      errors.name = 'Tên không được dài hơn 50 ký tự'
    }

    if (updatePromotion.value === '') {
      errors.value = 'Vui lòng nhập giá trị'
    } else if (!Number.isInteger(Number(updatePromotion.value))) {
      errors.value = 'Giá trị phải là số nguyên'
    } else if (Number(updatePromotion.value) < 0 || Number(updatePromotion.value) > 100) {
      errors.value = 'Giá trị phải lớn hơn 0% và nhở hơn 100%'
    }

    if (updatePromotion.timeStart === '') {
      errors.timeStart = 'Vui lòng nhập thời gian bắt đầu'
    }
    if (updatePromotion.timeEnd === '') {
      errors.timeEnd = 'Vui lòng nhập thời gian kết thúc'
    } else if (timeEnd.isBefore(currentDate)) {
      errors.timeEnd = 'Ngày kết thúc phải lớn hơn ngày hiện tại'
    }

    if (!timeStart.isValid() || !timeEnd.isValid() || timeStart.isAfter(timeEnd)) {
      errors.timeStart = 'Ngày bắt đầu phải bé hơn ngày kêt thúc'
    }

    for (const key in errors) {
      if (errors[key]) {
        check++
      }
    }

    setErrorName(errors.name)
    setErrorValue(errors.value)
    settimeStart(errors.timeStart)
    setTimeend(errors.timeEnd)

    return check
  }
  const onSubmit = (e, id) => {
    const check = validate()
    if (check < 1) {
      const title = 'bạn có muốn update không?'
      const text = ''
      confirmSatus(title, text, theme).then((result) => {
        if (result.isConfirmed) {
          khuyenMaiApi.UpdayePromotion(e, id).then(() => {
            toast.success('update thành công', { position: toast.POSITION.TOP_RIGHT })
            navigate('/admin/promotion')
          })
        }
      })
    } else {
      toast.error('Sửa khuyện mại không thành công', {
        position: toast.POSITION.TOP_RIGHT,
      })
    }
  }

  const detail = (id) => {
    khuyenMaiApi.getById(id).then((response) => {
      const formattedStartDate = dayjs(response.data.data.timeStart).format('DD-MM-YYYY HH:mm:ss')
      const formattedEndDate = dayjs(response.data.data.timeEnd).format('DD-MM-YYYY HH:mm:ss')
      const convertStatus = parseInt(response.data.data.status, 10)

      setUpdatePromotion({
        ...response.data.data,
        timeStart: formattedStartDate,
        timeEnd: formattedEndDate,
        status: convertStatus,
      })
      console.log(response.data)
    })
  }
  const getLisProduct = (id) => {
    khuyenMaiApi
      .getProductAndProductDetailById(id)
      .then((response) => {
        setSelectedRowsProduct(response.data.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const getLisProductDetail = (id) => {
    khuyenMaiApi
      .getProductDetailById(id)
      .then((response) => {
        setSelectedRows(response.data.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }
  useEffect(() => {
    detail(id)
  }, [id])

  useEffect(() => {
    getLisProduct(id)
  }, [id])

  useEffect(() => {
    getLisProductDetail(id)
  }, [id])

  useEffect(() => {
    setUpdatePromotion({ ...updatePromotion, idProductDetail: selectedRows })
  }, [updatePromotion, selectedRows])

  useEffect(() => {
    khuyenMaiApi.getAllProduct(filter).then((response) => {
      setGetProduct(response.data.data.data)
      setTotalPages(response.data.data.totalPages)
    })
  }, [filter])

  return (
    <>
      <div className="promotionUpdate">
        <BreadcrumbsCustom nameHere={'Chi tiết khuyến mại'} listLink={listBreadcrumbs} />
        <Paper elevation={3} sx={{ mt: 2, mb: 2, padding: 2, width: '100%' }}>
          <Grid container spacing={2} sx={{ pl: 2 }}>
            <Grid item xs={5.5} sx={{ mt: 4 }}>
              <div style={{ marginBottom: '20px' }}>
                <Typography>
                  <span style={{ color: 'red', fontWeight: 'bold' }}> *</span>Tên khuyến mại
                </Typography>
                <TextField
                  id="outlined-basic"
                  variant="outlined"
                  className="text-field-css"
                  size="small"
                  sx={{ width: '100%' }}
                  name="name"
                  value={updatePromotion?.name}
                  onChange={(e) => setUpdatePromotion({ ...updatePromotion, name: e.target.value })}
                />
                <span className="error">{errorName}</span>
              </div>
              <div style={{ marginBottom: '20px' }}>
                <Typography>
                  <span style={{ color: 'red', fontWeight: 'bold' }}> *</span>Giá trị
                </Typography>
                <TextField
                  id="outlined-basic"
                  variant="outlined"
                  className="text-field-css"
                  size="small"
                  type="number"
                  sx={{ width: '100%' }}
                  name="value"
                  value={updatePromotion?.value}
                  onChange={(e) =>
                    setUpdatePromotion({ ...updatePromotion, value: e.target.value })
                  }
                />
                <span className="error">{errorValue}</span>
              </div>
              <div style={{ marginBottom: '20px' }}>
                <Typography>
                  <span style={{ color: 'red', fontWeight: 'bold' }}> *</span>Từ ngày
                </Typography>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['DateTimePicker']}>
                    <DateTimePicker
                      size="small"
                      format={'DD-MM-YYYY HH:mm:ss'}
                      sx={{ width: '100%' }}
                      name="timeStart"
                      ampm={false}
                      minDateTime={dayjs()}
                      className="dateTimePro "
                      value={dayjs(updatePromotion?.timeStart, 'DD-MM-YYYY HH:mm:ss')}
                      onChange={(e) => {
                        setUpdatePromotion({
                          ...updatePromotion,
                          timeStart: dayjs(e).format('DD-MM-YYYY HH:mm:ss'),
                        })
                      }}
                    />
                  </DemoContainer>
                </LocalizationProvider>
                <span className="error">{errorTimeStart}</span>
              </div>
              <div style={{ marginBottom: '20px' }}>
                <Typography>
                  <span style={{ color: 'red', fontWeight: 'bold' }}> *</span>Đến ngày
                </Typography>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['DateTimePicker']}>
                    <DateTimePicker
                      format={'DD-MM-YYYY HH:mm:ss'}
                      size="small"
                      sx={{ width: '100%' }}
                      name="timeEnd"
                      ampm={false}
                      minDateTime={dayjs()}
                      className="dateTimePro "
                      value={dayjs(updatePromotion?.timeEnd, 'DD-MM-YYYY HH:mm:ss')}
                      onChange={(e) => {
                        setUpdatePromotion({
                          ...updatePromotion,
                          timeEnd: dayjs(e).format('DD-MM-YYYY HH:mm:ss'),
                        })
                      }}
                    />
                  </DemoContainer>
                </LocalizationProvider>
                <span className="error">{errorTimeEnd}</span>
              </div>
              <Button
                variant="outlined"
                color="cam"
                sx={{ marginTop: '30px' }}
                onClick={() => onSubmit(updatePromotion, id)}>
                Chỉnh sửa
              </Button>
            </Grid>

            <Grid item xs={6.5}>
              <div style={{ height: 400, width: '100%', marginTop: '42px' }}>
                <Table sx={{ minWidth: '100%' }} aria-label="simple table" className="tableCss">
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ width: '8%' }}>
                        <Checkbox
                          checked={selectAllProduct}
                          onChange={handleSelectAllChangeProduct}
                        />
                      </TableCell>
                      <TableCell align="center" sx={{ width: '8%' }}>
                        STT
                      </TableCell>

                      <TableCell align="center" sx={{ width: '30%' }}>
                        Tên sản phẩm
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {getProduct.map((row, index) => (
                      <TableRow
                        key={row.id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <TableCell>
                          <Checkbox
                            key={row.id}
                            checked={selectedRowsProduct.indexOf(row.id) !== -1}
                            onChange={(event) => handleRowCheckboxChange1(event, row.id)}
                          />
                        </TableCell>
                        <TableCell align="center" component="th" scope="row">
                          {index + 1}
                        </TableCell>

                        <TableCell align="center">{row.name}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginTop: '10px',
                  }}>
                  <Pagination
                    page={filter.page}
                    color="cam"
                    onChange={(e, value) => {
                      e.preventDefault()
                      setFilter({
                        ...filter,
                        page: value,
                      })
                    }}
                    count={totalPages}
                    variant="outlined"
                  />
                </div>
              </div>
            </Grid>
          </Grid>
        </Paper>
        {selectedRowsProduct.length > 0 && (
          <Paper elevation={3} sx={{ mt: 2, mb: 2, padding: 2, width: '100%' }}>
            <Typography
              sx={{
                fontSize: '30px',
                fontWeight: 600,
                marginBottom: '20px',
                marginLeft: '20px',
                mt: 3,
              }}>
              Chi tiết sản phẩm
            </Typography>
            <Grid item xs={12}>
              <div style={{ height: 400, width: '100%' }}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table" className="tableCss">
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ width: '8%' }}>
                        <Checkbox checked={selectAll} onChange={handleSelectAllChange} />
                      </TableCell>
                      <TableCell align="center" sx={{ width: '8%' }}>
                        STT
                      </TableCell>

                      <TableCell align="center" sx={{ width: '30%' }}>
                        Tên sản phẩm
                      </TableCell>
                      <TableCell align="center" sx={{ width: '30%' }}>
                        Thể loại
                      </TableCell>
                      <TableCell align="center" sx={{ width: '30%' }}>
                        Thương hiệu
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {getProductDetailByProduct.map((row, index) => (
                      <TableRow
                        key={row.productDetail}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <TableCell>
                          <Checkbox
                            key={row.productDetail}
                            checked={selectedRows.indexOf(row.productDetail) !== -1}
                            onChange={(event) => handleRowCheckboxChange(event, row.productDetail)}
                          />
                        </TableCell>
                        <TableCell align="center" component="th" scope="row">
                          {index + 1}
                        </TableCell>

                        <TableCell align="center">{row.name}</TableCell>
                        <TableCell align="center">{row.category}</TableCell>
                        <TableCell align="center">{row.brand}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginTop: '10px',
                  }}>
                  <Pagination
                    page={filterDetailByProduct.page}
                    color="cam"
                    onChange={(e, value) => {
                      e.preventDefault()
                      setFilterDetailProduct({
                        ...filterDetailByProduct,
                        page: value,
                      })
                    }}
                    count={totalPagesDetailByProduct}
                    variant="outlined"
                  />
                </div>
              </div>
            </Grid>
          </Paper>
        )}
      </div>
    </>
  )
}
