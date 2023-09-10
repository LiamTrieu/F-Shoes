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
import { spButton } from './thuonghieuStyle'
import dayjs from 'dayjs'
import { RxMagnifyingGlass } from 'react-icons/rx'
import { toast } from 'react-toastify'
import { useTheme } from '@emotion/react'
import confirmSatus from '../../../components/comfirmSwal'
import { MdEditSquare } from 'react-icons/md'
import DialogAddUpdate from '../../../components/DialogAddUpdate'
import bradApi from '../../../api/admin/sanpham/bradApi'

const listBreadcrumb = [{ name: 'Quản lý thương hiệu' }]

export default function AdBrandPage() {
  const theme = useTheme()
  const [openAdd, setOpenAdd] = useState(false)
  const [openUpdate, setOpenUpdate] = useState(false)
  const [brand, setBrand] = useState({ name: '' })
  const [brandUpdate, setBrandUpdate] = useState({ id: 0, name: '' })
  const [listBrand, setListBrand] = useState([])
  const [isBackdrop, setIsBackdrop] = useState(true)
  const [filter, setFilter] = useState({ page: 1, size: 5, textSearch: '' })
  const [pageRespone, setPageRespone] = useState({ currentPage: 1, totalPages: 0 })

  useEffect(() => {
    fetchData(filter)
  }, [filter])

  const fetchData = (filter) => {
    setIsBackdrop(true)
    bradApi
      .get(filter)
      .then((response) => {
        const res = response.data
        setListBrand(res.data)
        setPageRespone({ currentPage: res.currentPage, totalPages: res.totalPages })
      })
      .catch((error) => {
        console.log(error)
      })
    setIsBackdrop(false)
  }

  const addProduct = () => {
    setIsBackdrop(true)
    const title = 'Xác nhận Thêm mới thương hiệu?'
    const text = ''
    setOpenAdd(false)
    confirmSatus(title, text, theme).then((result) => {
      if (result.isConfirmed) {
        bradApi.add(brand).then((res) => {
          if (res.data.success) {
            setIsBackdrop(false)
            setOpenAdd(false)
            setBrand({ name: '' })
            toast.success('Thêm thương hiệu thành công', {
              position: toast.POSITION.TOP_RIGHT,
            })
            fetchData(filter)
          } else {
            setOpenAdd(true)
            toast.error('Thêm thương hiệu thất bại', {
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
    const title = 'Xác nhận cập nhập thương hiệu?'
    const text = ''
    setOpenUpdate(false)
    confirmSatus(title, text, theme).then((result) => {
      if (result.isConfirmed) {
        bradApi.update(brandUpdate.id, { name: brandUpdate.name }).then((res) => {
          if (res.data.success) {
            setIsBackdrop(false)
            setBrand({ name: '' })
            toast.success('Cập nhập thương hiệu thành công', {
              position: toast.POSITION.TOP_RIGHT,
            })
            fetchData(filter)
          } else {
            setOpenUpdate(true)
            toast.error('Cập nhập thương hiệu thất bại', {
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
    if (openAdd) setBrand({ ...brand, name: e.target.value })
    else setBrandUpdate({ ...brandUpdate, name: e.target.value })
  }

  return (
    <div>
      <Box>
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={isBackdrop}>
          <CircularProgress color="inherit" />
        </Backdrop>
        <BreadcrumbsCustom nameHere={'thương hiệu'} listLink={listBreadcrumb} />
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
                setFilter({ ...filter, textSearch: e.target.value })
              }}
              inputProps={{ style: { height: '20px' } }}
              size="small"
              placeholder="Tìm thương hiệu"
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
                title={'Thêm mới thương hiệu'}
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
                  defaultValue={brand.name}
                  fullWidth
                  sx={{
                    my: 2,
                    '& .MuiInputBase-root fieldset': {
                      borderColor: theme.palette.layout.colorText,
                      color: theme.palette.layout.colorText,
                    },
                    '& .MuiInputBase-root': {
                      ' &.Mui-focused fieldset': {
                        borderColor: theme.palette.layout.colorText,
                      },
                      borderColor: theme.palette.layout.colorText,
                      color: theme.palette.layout.colorText,
                    },
                    '& .MuiInputBase-root:hover fieldset': {
                      borderColor: 'gray',
                    },
                  }}
                  inputProps={{
                    style: { color: theme.palette.layout.colorText },
                    required: true,
                  }}
                  size="small"
                  placeholder="Nhập tên thương hiệu"
                />
              </DialogAddUpdate>
            )}
            {openUpdate && (
              <DialogAddUpdate
                open={openUpdate}
                setOpen={setOpenUpdate}
                title={'Chỉnh sửa thương hiệu'}
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
                  defaultValue={brandUpdate.name}
                  fullWidth
                  sx={{
                    my: 2,
                    '& .MuiInputBase-root fieldset': {
                      borderColor: theme.palette.layout.colorText,
                      color: theme.palette.layout.colorText,
                    },
                    '& .MuiInputBase-root': {
                      ' &.Mui-focused fieldset': {
                        borderColor: theme.palette.layout.colorText,
                      },
                      borderColor: theme.palette.layout.colorText,
                      color: theme.palette.layout.colorText,
                    },
                    '& .MuiInputBase-root:hover fieldset': {
                      borderColor: 'gray',
                    },
                  }}
                  inputProps={{
                    style: { color: theme.palette.layout.colorText },
                    required: true,
                  }}
                  size="small"
                  placeholder="Nhập tên thương hiệu"
                />
              </DialogAddUpdate>
            )}
          </Stack>
          {listBrand.length === 0 ? (
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
                      Chức năng
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {listBrand.map((row, index) => (
                    <TableRow
                      key={row.id}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                      <TableCell align="center">{index + 1}</TableCell>
                      <TableCell align="center">{row.name}</TableCell>
                      <TableCell align="center">
                        {dayjs(row.createAt).format('DD/MM/YYYY')}
                      </TableCell>
                      <TableCell align="center">
                        <Tooltip title="Chỉnh sửa">
                          <IconButton
                            onClick={() => {
                              setBrandUpdate({ ...brandUpdate, id: row.id, name: row.name })
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
                    thương hiệu
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
