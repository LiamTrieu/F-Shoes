import {
  Button,
  Checkbox,
  Grid,
  InputAdornment,
  Pagination,
  Paper,
  TextField,
  Typography,
  useTheme,
} from '@mui/material'
import React, { useEffect, useState } from 'react'

import khuyenMaiApi from '../../../api/admin/khuyenmai/khuyenMaiApi'
import { useNavigate, useParams } from 'react-router-dom'
import dayjs from 'dayjs'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import { toast } from 'react-toastify'
import confirmSatus from '../../../components/comfirmSwal'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import SearchIcon from '@mui/icons-material/Search'
import './home.css'
import BreadcrumbsCustom from '../../../components/BreadcrumbsCustom'

const listBreadcrumbs = [{ name: 'Khuyến mại', link: '/admin/promotion' }]

export default function AdPromotionAdd() {
  const theme = useTheme()
  const [getProduct, setGetProduct] = useState([])
  const [getProductDetailByProduct, setGetProductDetailByProduct] = useState([])
  const [getPromotion, setGetPromotion] = useState([])

  const { id } = useParams()
  const [selectAll, setSelectAll] = useState(false)
  const [selectAllProduct, setSelectAllProduct] = useState(false)
  const [selectedRows, setSelectedRows] = useState([])
  const [selectedRowsProduct, setSelectedRowsProduct] = useState([])
  const [totalPages, setTotalPages] = useState(0)
  const [totalPagesDetailByProduct, setTotalPagesDetailByProduct] = useState(0)
  const [filter, setFilter] = useState({ page: 1, size: 5, nameProduct: '' })
  const [filterDetailByProduct, setFilterDetailByProduct] = useState({ page: 1, size: 5 })
  const [errorName, setErrorName] = useState('')
  const [errorValue, setErrorValue] = useState('')
  const [errorTimeStart, settimeStart] = useState('')
  const [errorTimeEnd, setTimeend] = useState('')

  const [selectedProductIds, setSelectedProductIds] = useState([])

  const handleSelectAllChange = (event) => {
    const selectedIds = event.target.checked
      ? getProductDetailByProduct.map((row) => row.productDetail)
      : []
    setSelectedRowsProduct(selectedIds)
    setSelectedRows(selectedIds)
    setSelectAll(event.target.checked)
  }

  useEffect(() => {
    khuyenMaiApi.getAll().then((response) => {
      setGetPromotion(response.data.data)
    })
  }, [])

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
    setSelectedRows(selectedIds)
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
    if (selectedProductIds.length > 0) {
      // khuyenMaiApi
      //   .getAllProductDetailByProduct(filterDetailByProduct, selectedProductIds)
      //   .then((response) => {
      //     setGetProductDetailByProduct(response.data.data.data)
      //     setTotalPagesDetailByProduct(response.data.data.totalPages)
      //   })
      // fecthAllProductDetail(filterDetailByProduct, selectedProductIds)
    } else {
      setGetProductDetailByProduct([])
      setTotalPagesDetailByProduct(0)
    }

    console.log('ID của sản phẩm đã chọn:', selectedProductIds)
  }

  useEffect(() => {
    fecthAllProductDetail(filterDetailByProduct, id)
  }, [filterDetailByProduct, id])

  const fecthAllProductDetail = (filterDetailByProduct, selectedRows) => {
    khuyenMaiApi
      .getAllProductDetailByProduct(filterDetailByProduct, selectedRows)
      .then((response) => {
        setGetProductDetailByProduct(response.data.data.data)
        setTotalPagesDetailByProduct(response.data.data.totalPages)
      })
  }

  useEffect(() => {
    // Lấy danh sách chi tiết sản phẩm của các sản phẩm đã chọn

    if (selectedProductIds.length > 0) {
      const promises = selectedProductIds.map((productId) => {
        return khuyenMaiApi.getAllProductDetailByProduct(filterDetailByProduct, productId)
      })

      Promise.all(promises)
        .then((responses) => {
          const allProductDetails = responses.flatMap((response) => response.data.data.data)

          const startIndex = (filterDetailByProduct.page - 1) * filterDetailByProduct.size
          const endIndex = startIndex + filterDetailByProduct.size

          // Lấy danh sách sản phẩm chi tiết chỉ từ startIndex đến endIndex
          const productDetailsToDisplay = allProductDetails.slice(startIndex, endIndex)

          // Cập nhật danh sách sản phẩm chi tiết để hiển thị trên trang hiện tại
          setGetProductDetailByProduct(productDetailsToDisplay)
          // setGetProductDetailByProduct(allProductDetails)
          const itemsPerPage = filterDetailByProduct.size // Kích thước trang
          const totalPages = Math.ceil(allProductDetails.length / itemsPerPage)
          setTotalPagesDetailByProduct(totalPages)
          // setTotalPagesDetailByProduct(allProductDetails.length - 1)
        })
        .catch((error) => {
          console.error('Error fetching product details:', error)
        })
    } else {
      // Nếu không có sản phẩm nào được chọn, bạn có thể xử lý ở đây (ví dụ: xóa danh sách chi tiết sản phẩm)
      setGetProductDetailByProduct([])
      setTotalPagesDetailByProduct(0)
    }
  }, [filterDetailByProduct, selectedProductIds])

  useEffect(() => {
    khuyenMaiApi.getAllProduct(filter).then((response) => {
      setGetProduct(response.data.data.data)
      setTotalPages(response.data.data.totalPages)
    })
  }, [filter])

  let navigate = useNavigate()

  const [addPromotionRe, setAddPromotionRe] = useState({
    name: '',
    value: '',
    type: true,
    status: '2',
    timeStart: '',
    timeEnd: '',
    idProductDetail: selectedRows,
  })

  const handleInputChange = (e) => {
    setAddPromotionRe({ ...addPromotionRe, [e.target.name]: e.target.value })
  }

  const promotionNames = getPromotion.map((promotion) => promotion.name)

  const validate = () => {
    const timeStart = dayjs(addPromotionRe.timeStart, 'DD/MM/YYYY')
    const timeEnd = dayjs(addPromotionRe.timeEnd, 'DD/MM/YYYY')

    const currentDate = dayjs()
    let check = 0
    const errors = {
      name: '',
      value: '',
      timeStart: '',
      timeEnd: '',
    }

    if (addPromotionRe.name.trim() === '') {
      errors.name = 'Vui lòng nhập tên khuyến mại'
    } else if (!isNaN(addPromotionRe.name)) {
      errors.name = 'Tên khuyến mại phải là chữ'
    } else if (promotionNames.includes(addPromotionRe.name)) {
      errors.name = 'không được trùng tên khuyến mại'
    } else if (addPromotionRe.name.length > 50) {
      errors.name = 'Tên không được dài hơn 50 ký tự'
    }

    if (addPromotionRe.value === '') {
      errors.value = 'Vui lòng nhập giá trị'
    } else if (!Number.isInteger(Number(addPromotionRe.value))) {
      errors.value = 'Giá trị phải là số nguyên'
    } else if (Number(addPromotionRe.value) < 0 || Number(addPromotionRe.value) > 100) {
      errors.value = 'Giá trị phải lớn hơn 0% và nhở hơn 100%'
    }

    if (addPromotionRe.timeStart === '') {
      errors.timeStart = 'Vui lòng nhập thời gian bắt đầu'
    }
    // else if (timeStart.isBefore(currentDate)) {
    //   errors.timeStart = 'Ngày bắt đầu phải lớn hơn ngày hiện tại'
    // }

    if (addPromotionRe.timeEnd === '') {
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

  const onSubmit = (addPromotionRe, selectProductDetail) => {
    const check = validate()
    const addProductPromotion = { ...addPromotionRe, idProductDetail: selectProductDetail }
    console.log('danh sach da chon:', selectProductDetail)
    if (check < 1) {
      const title = 'bạn có muốn add Khuyến mại không'
      const text = ''
      confirmSatus(title, text, theme).then((result) => {
        if (result.isConfirmed) {
          khuyenMaiApi.addProductPromotion(addProductPromotion).then(() => {
            toast.success('Add thành công', {
              position: toast.POSITION.TOP_RIGHT,
            })
          })
          navigate('/admin/promotion')
        }
      })
    } else {
      toast.error('Thêm khuyện mại không thành công', {
        position: toast.POSITION.TOP_RIGHT,
      })
    }
  }

  return (
    <>
      <div className="promotionAdd">
        <BreadcrumbsCustom nameHere={'Thêm khuyến mại'} listLink={listBreadcrumbs} />
        <Paper elevation={3} sx={{ mt: 2, padding: 2, width: '100%' }}>
          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid item xs={5} sx={{ mt: 2 }}>
              <div style={{ marginBottom: '20px' }}>
                <Typography>
                  <span style={{ color: 'red', fontWeight: 'bold' }}> *</span>Tên khuyến mại
                </Typography>

                <TextField
                  id="outlined-basic"
                  variant="outlined"
                  className="text-field-css"
                  size="small"
                  sx={{ width: '100%', borderRadius: '20px' }}
                  name="name"
                  onChange={(e) => handleInputChange(e)}
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
                  sx={{ width: '100%' }}
                  name="value"
                  type="number"
                  onChange={(e) => handleInputChange(e)}
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
                      size="large"
                      sx={{ width: '100%' }}
                      format={'DD-MM-YYYY HH:mm:ss'}
                      name="timeStart"
                      className="dateTimePro "
                      onChange={(e) =>
                        setAddPromotionRe({
                          ...addPromotionRe,
                          timeStart: dayjs(e).format('DD-MM-YYYY HH:mm:ss'),
                        })
                      }
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
                      size="large"
                      sx={{ width: '100%' }}
                      name="timeEnd"
                      className="dateTimePro"
                      onChange={(e) => {
                        setAddPromotionRe({
                          ...addPromotionRe,
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
                sx={{ marginBottom: '0px', marginTop: '30px' }}
                onClick={() => onSubmit(addPromotionRe, selectedRows)}>
                Tạo Mới
              </Button>
            </Grid>

            <Grid item xs={7}>
              {/* <TextField
                id="standard-basic"
                sx={{ width: '50%', float: 'left', marginBottom: '20px' }}
                placeholder="Tìm kiếm theo tên sản phẩm"
                className="search-promotion"
                size="small"
                onChange={(e) => setFilter({ ...filter, nameProduct: e.target.value })}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon color="cam" />
                    </InputAdornment>
                  ),
                }}
              /> */}
              <div style={{ height: 400, width: '100%' }}>
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
          <Paper elevation={3} sx={{ mt: 2, padding: 2, width: '100%' }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography
                  sx={{
                    fontSize: '30px',
                    fontWeight: 600,
                    marginBottom: '20px',
                  }}>
                  Chi tiết sản phẩm
                </Typography>
                <div style={{ height: 400, width: '100%' }}>
                  <Table sx={{ minWidth: '100%' }} aria-label="simple table" className="tableCss">
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
                              onChange={(event) =>
                                handleRowCheckboxChange(event, row.productDetail)
                              }
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
                        setFilterDetailByProduct({
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
            </Grid>
          </Paper>
        )}
      </div>
    </>
  )
}
