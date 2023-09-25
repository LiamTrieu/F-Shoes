import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Container,
  IconButton,
  MenuItem,
  Pagination,
  Paper,
  Select,
  Stack,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import BreadcrumbsCustom from '../../../components/BreadcrumbsCustom'
import { FaPlus } from 'react-icons/fa'
import { spButton } from './theloaiStyle'
import dayjs from 'dayjs'
import { RxMagnifyingGlass } from 'react-icons/rx'
import { toast } from 'react-toastify'
import { useTheme } from '@emotion/react'
import confirmSatus from '../../../components/comfirmSwal'
import { MdEditSquare } from 'react-icons/md'
import DialogAddUpdate from '../../../components/DialogAddUpdate'
import categoryApi from '../../../api/admin/sanpham/categoryApi'

const listBreadcrumb = [{ name: 'Quản lý thể loại' }]
export default function AdCategoryPage() {
  const theme = useTheme()
  const [openAdd, setOpenAdd] = useState(false)
  const [openUpdate, setOpenUpdate] = useState(false)
  const [category, setCategory] = useState({ name: '' })
  const [categoryUpdate, setCategoryUpdate] = useState({ id: 0, name: '' })
  const [listCategory, setListCategory] = useState([])
  const [isBackdrop, setIsBackdrop] = useState(true)
  const [filter, setFilter] = useState({ page: 1, size: 5, name: '' })
  const [pageRespone, setPageRespone] = useState({ currentPage: 1, totalPages: 0 })

  useEffect(() => {
    fetchData(filter)
  }, [filter])

  const fetchData = (filter) => {
    setIsBackdrop(true)
    categoryApi
      .getCategory(filter)
      .then((response) => {
        const res = response.data
        setListCategory(res.data.content)
        setPageRespone({ currentPage: res.data.currentPage, totalPages: res.data.totalPages })
      })
      .catch((error) => {
        console.log(error)
      })
    setIsBackdrop(false)
  }

  const addProduct = () => {
    setIsBackdrop(true)
    const title = 'Xác nhận Thêm mới thể loại?'
    const text = ''
    setOpenAdd(false)
    confirmSatus(title, text, theme).then((result) => {
      if (result.isConfirmed) {
        categoryApi.addCategory(category).then((res) => {
          if (res.data.success) {
            setIsBackdrop(false)
            setOpenAdd(false)
            setCategory({ name: '' })
            toast.success('Thêm thể loại thành công', {
              position: toast.POSITION.TOP_RIGHT,
            })
            fetchData(filter)
          } else {
            setOpenAdd(true)
            toast.error('Thêm thể loại thất bại', {
              position: toast.POSITION.TOP_RIGHT,
            })
          }
        })
      } else {
        setOpenAdd(true)
      }
    })
    setIsBackdrop(false)
  }
  const updateProduct = () => {
    setIsBackdrop(true)
    const title = 'Xác nhận cập nhập thể loại?'
    const text = ''
    setOpenUpdate(false)
    confirmSatus(title, text, theme).then((result) => {
      if (result.isConfirmed) {
        categoryApi.updateCategory(categoryUpdate.id, { name: categoryUpdate.name }).then((res) => {
          if (res.data.success) {
            setIsBackdrop(false)
            setCategory({ name: '' })
            toast.success('Cập nhập thể loại thành công', {
              position: toast.POSITION.TOP_RIGHT,
            })
            fetchData(filter)
          } else {
            setOpenUpdate(true)
            toast.error('Cập nhập thể loại thất bại', {
              position: toast.POSITION.TOP_RIGHT,
            })
          }
        })
      } else {
        setOpenUpdate(true)
      }
    })
    setIsBackdrop(false)
  }

  const chageName = (e) => {
    if (openAdd) setCategory({ ...category, name: e.target.value })
    else setCategoryUpdate({ ...categoryUpdate, name: e.target.value })
  }

  const setDeleted = (id) => {
    const title = 'Xác nhận thay đổi hoạt động?'
    const text = 'Ẩn hoạt động sẽ làm ẩn thể loại khỏi nơi khác'
    confirmSatus(title, text, theme).then((result) => {
      if (result.isConfirmed) {
        categoryApi.swapCategory(id).then((res) => {
          if (res.data.success) {
            setIsBackdrop(false)
            toast.success('Đã bật trạng thái hoạt động', {
              position: toast.POSITION.TOP_RIGHT,
            })
            fetchData(filter)
          }
        })
      }
    })
  }

  return (
    <div>
      <Box>
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={isBackdrop}>
          <CircularProgress color="inherit" />
        </Backdrop>
        <BreadcrumbsCustom nameHere={'Thể loại'} listLink={listBreadcrumb} />
        <Container component={Paper} elevation={3} sx={{ py: 3, borderRadius: '10px' }}>
          <Stack
            sx={{ mb: 2 }}
            direction="row"
            justifyContent="space-between"
            alignItems="flex-start"
            spacing={12}>
            <TextField
              id="seachProduct"
              InputProps={{
                required: true,
                startAdornment: (
                  <RxMagnifyingGlass style={{ marginRight: '5px', fontSize: '25px' }} />
                ),
              }}
              sx={{ mr: 0.5, width: '50%' }}
              onChange={(e) => {
                setFilter({ ...filter, name: e.target.value })
              }}
              inputProps={{ style: { height: '20px' } }}
              size="small"
              placeholder="Tìm thể loại"
            />
            <Button
              onClick={() => setOpenAdd(true)}
              disableElevation
              sx={{ ...spButton }}
              variant="outlined">
              <Box component={FaPlus} sx={{ mr: '3px', fontSize: '15px' }} />
              Thêm&nbsp;
              <Box sx={{ display: { xs: 'none', md: 'inline' } }} component={'span'}>
                mới
              </Box>
            </Button>
            {openAdd && (
              <DialogAddUpdate
                open={openAdd}
                setOpen={setOpenAdd}
                title={'Thêm mới thể loại'}
                buttonSubmit={
                  <Button
                    onClick={() => {
                      openAdd ? addProduct() : updateProduct()
                    }}
                    color="primary"
                    disableElevation
                    sx={{ ...spButton }}
                    variant="contained">
                    Thêm
                  </Button>
                }>
                <TextField
                  id={'nameInputAdd'}
                  onChange={(e) => {
                    chageName(e)
                  }}
                  defaultValue={category.name}
                  fullWidth
                  // sx={{
                  //   my: 2,
                  //   '& .MuiInputBase-root fieldset': {
                  //     borderColor: theme.palette.layout.colorText,
                  //     color: theme.palette.layout.colorText,
                  //   },
                  //   '& .MuiInputBase-root': {
                  //     ' &.Mui-focused fieldset': {
                  //       borderColor: theme.palette.layout.colorText,
                  //     },
                  //     borderColor: theme.palette.layout.colorText,
                  //     color: theme.palette.layout.colorText,
                  //   },
                  //   '& .MuiInputBase-root:hover fieldset': {
                  //     borderColor: 'gray',
                  //   },
                  // }}
                  inputProps={{
                    // style: { color: theme.palette.layout.colorText },
                    required: true,
                  }}
                  size="small"
                  placeholder="Nhập tên thể loại"
                />
              </DialogAddUpdate>
            )}
            {openUpdate && (
              <DialogAddUpdate
                open={openUpdate}
                setOpen={setOpenUpdate}
                title={'Chỉnh sửa thể loại'}
                buttonSubmit={
                  <Button
                    onClick={() => {
                      updateProduct()
                    }}
                    color="primary"
                    disableElevation
                    sx={{ ...spButton }}
                    variant="contained">
                    Lưu
                  </Button>
                }>
                <TextField
                  id={'nameInputUpdate'}
                  onChange={(e) => {
                    chageName(e)
                  }}
                  defaultValue={categoryUpdate.name}
                  fullWidth
                  // sx={{
                  //   my: 2,
                  //   '& .MuiInputBase-root fieldset': {
                  //     borderColor: theme.palette.layout.colorText,
                  //     color: theme.palette.layout.colorText,
                  //   },
                  //   '& .MuiInputBase-root': {
                  //     ' &.Mui-focused fieldset': {
                  //       borderColor: theme.palette.layout.colorText,
                  //     },
                  //     borderColor: theme.palette.layout.colorText,
                  //     color: theme.palette.layout.colorText,
                  //   },
                  //   '& .MuiInputBase-root:hover fieldset': {
                  //     borderColor: 'gray',
                  //   },
                  // }}
                  inputProps={{
                    // style: { color: theme.palette.layout.colorText },
                    required: true,
                  }}
                  size="small"
                  placeholder="Nhập tên thể loại"
                />
              </DialogAddUpdate>
            )}
          </Stack>
          {listCategory.length === 0 ? (
            <Typography component="span" variant={'body2'} textAlign={'center'}>
              Không có dữ liệu
            </Typography>
          ) : (
            <>
              <Table aria-label="simple table">
                <TableHead sx={{ backgroundColor: 'sanPham.colorTable' }}>
                  <TableRow>
                    <TableCell sx={{ fontWeight: '500' }} align="center">
                      STT
                    </TableCell>
                    <TableCell sx={{ fontWeight: '500' }} align="center">
                      Tên
                    </TableCell>
                    <TableCell sx={{ fontWeight: '500' }} align="center">
                      Ngày thêm
                    </TableCell>
                    <TableCell sx={{ fontWeight: '500' }} align="center">
                      Hoạt động
                    </TableCell>
                    <TableCell sx={{ fontWeight: '500' }} align="center">
                      Chức năng
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {listCategory.map((row, index) => (
                    <TableRow
                      key={row.id}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                      <TableCell align="center">{index + 1}</TableCell>
                      <TableCell align="center">{row.name}</TableCell>
                      <TableCell align="center">
                        {dayjs(row.createAt).format('DD/MM/YYYY')}
                      </TableCell>
                      <TableCell align="center">
                        <Switch
                          checked={!row.deleted}
                          onChange={(e) => {
                            setDeleted(row.id)
                          }}
                          size="small"
                        />
                      </TableCell>
                      <TableCell align="center">
                        <Tooltip title="Chỉnh sửa">
                          <IconButton
                            onClick={() => {
                              setCategoryUpdate({ ...categoryUpdate, id: row.id, name: row.name })
                              setOpenUpdate(true)
                            }}
                            color="warning">
                            <MdEditSquare style={{ fontSize: '18px' }} />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <Stack
                mt={2}
                direction="row"
                justifyContent="space-between"
                alignItems="flex-start"
                spacing={0}>
                <Typography component="span" variant={'body2'} mt={0.5}>
                  <Typography sx={{ display: { xs: 'none', md: 'inline-block' } }}>Xem</Typography>
                  <Select
                    onChange={(e) => {
                      setFilter({ ...filter, size: e.target.value })
                    }}
                    sx={{ height: '25px', mx: 0.5 }}
                    size="small"
                    value={filter.size}>
                    <MenuItem value={1}>1</MenuItem>
                    <MenuItem value={5}>5</MenuItem>
                    <MenuItem value={10}>10</MenuItem>
                    <MenuItem value={15}>15</MenuItem>
                    <MenuItem value={20}>20</MenuItem>
                  </Select>
                  <Typography sx={{ display: { xs: 'none', md: 'inline-block' } }}>
                    thể loại
                  </Typography>
                </Typography>
                <Pagination
                  color="primary"
                  count={pageRespone.totalPages}
                  page={pageRespone.currentPage + 1}
                  onChange={(e, value) => {
                    e.preventDefault()
                    setFilter({ ...filter, page: value })
                  }}
                />
              </Stack>
            </>
          )}
        </Container>
      </Box>
    </div>
  )
}
