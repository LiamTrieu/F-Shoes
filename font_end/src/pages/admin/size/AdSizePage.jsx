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
import { spButton } from '../sanpham/sanPhamStyle'
import dayjs from 'dayjs'
import { RxMagnifyingGlass } from 'react-icons/rx'
import { toast } from 'react-toastify'
import { useTheme } from '@emotion/react'
import confirmSatus from '../../../components/comfirmSwal'
import { MdEditSquare } from 'react-icons/md'
import DialogAddUpdate from '../../../components/DialogAddUpdate'
import sizeApi from '../../../api/admin/sanpham/sizeApi'

const listBreadcrumb = [{ name: 'Quản lý kích cỡ' }]
export default function AdSizePage() {
  const theme = useTheme()
  const [openAdd, setOpenAdd] = useState(false)
  const [openUpdate, setOpenUpdate] = useState(false)
  const [size, setSize] = useState({ size: '' })
  const [errorSize, setErrorSize] = useState('')
  const [errorSizeUpdate, setErrorSizeUpdate] = useState('')
  const [sizeUpdate, setSizeUpdate] = useState({ id: 0, size: '' })
  const [allNameSize, setAllNameSize] = useState([])
  const [listSize, setListSize] = useState([])
  const [isBackdrop, setIsBackdrop] = useState(true)
  const [filter, setFilter] = useState({ pageNumber: 1, pageSize: 5, size: '' })
  const [pageRespone, setPageRespone] = useState({ currentPage: 1, totalPages: 0 })

  useEffect(() => {
    fetchData(filter)
    haldleAllNameSize()
  }, [filter])

  const fetchData = (filter) => {
    setIsBackdrop(true)
    sizeApi
      .getSize(filter)
      .then((response) => {
        const res = response.data
        setListSize(res.data.content)
        setPageRespone({ currentPage: res.data.currentPage, totalPages: res.data.totalPages })
      })
      .catch((error) => {
        console.log(error)
      })
    setIsBackdrop(false)
  }

  const haldleAllNameSize = () => {
    sizeApi
      .getAllNameSize()
      .then((response) => {
        setAllNameSize(response.data.data)
      })
      .catch(() => {
        toast.warning('Vui lòng f5 tải lại dữ liệu', {
          position: toast.POSITION.TOP_CENTER,
        })
      })
  }

  const handleValidateAdd = () => {
    let check = 0
    const errors = {
      name: '',
    }

    const sizeValue = size.size.toString()
    console.log(Number(sizeValue))
    if (sizeValue.trim() === '') {
      errors.name = 'Không được để trống kích cỡ'
    } else if (sizeValue < 0) {
      errors.name = 'Kích cỡ không được nhỏ hơn 0'
    } else if (allNameSize.includes(Number(sizeValue))) {
      errors.name = 'Kích cỡ đã tồn tại'
    }

    for (const key in errors) {
      if (errors[key]) {
        check++
      }
    }

    setErrorSize(errors.name)

    return check
  }

  const handleValidateUpdate = () => {
    let check = 0
    const errors = {
      nameUpdate: '',
    }

    const sizeUpdateValue = sizeUpdate.size.toString()
    if (sizeUpdateValue.trim() === '') {
      errors.nameUpdate = 'Không được để trống kích cỡ'
    } else if (sizeUpdateValue < 0) {
      errors.nameUpdate = 'Kích cỡ không được nhỏ hơn 0'
    }

    for (const key in errors) {
      if (errors[key]) {
        check++
      }
    }

    setErrorSizeUpdate(errors.nameUpdate)

    return check
  }

  const addSize = () => {
    const check = handleValidateAdd()
    if (check < 1) {
      setIsBackdrop(true)
      const title = 'Xác nhận Thêm mới kích cỡ?'
      const text = ''
      setOpenAdd(false)
      confirmSatus(title, text, theme).then((result) => {
        if (result.isConfirmed) {
          sizeApi.addSize(size).then((res) => {
            if (res.data.success) {
              setIsBackdrop(false)
              setOpenAdd(false)
              setSize({ size: '' })
              toast.success('Thêm kích cỡ thành công', {
                position: toast.POSITION.TOP_RIGHT,
              })
              fetchData(filter)
            } else {
              setOpenAdd(true)
              toast.error('Thêm kích cỡ thất bại', {
                position: toast.POSITION.TOP_RIGHT,
              })
            }
          })
        } else {
          setOpenAdd(true)
        }
      })
      setIsBackdrop(false)
    } else {
      toast.error('Thêm kích cỡ thất bại, hãy nhập đủ dữ liệu', {
        position: toast.POSITION.TOP_RIGHT,
      })
    }
  }
  const updateSize = () => {
    const check = handleValidateUpdate()
    if (check < 1) {
      setIsBackdrop(true)
      const title = 'Xác nhận cập nhập kích cỡ?'
      const text = ''
      setOpenUpdate(false)
      confirmSatus(title, text, theme).then((result) => {
        if (result.isConfirmed) {
          sizeApi.updateSize(sizeUpdate.id, { size: sizeUpdate.size }).then((res) => {
            if (res.data.success) {
              setIsBackdrop(false)
              setSize({ size: '' })
              toast.success('Cập nhập kích cỡ thành công', {
                position: toast.POSITION.TOP_RIGHT,
              })
              fetchData(filter)
            } else {
              setOpenUpdate(true)
              toast.error('Cập nhập kích cỡ thất bại', {
                position: toast.POSITION.TOP_RIGHT,
              })
            }
          })
        } else {
          setOpenUpdate(true)
        }
      })
      setIsBackdrop(false)
    } else {
      toast.error('Thêm kích cỡ thất bại, hãy nhập đủ dữ liệu', {
        position: toast.POSITION.TOP_RIGHT,
      })
    }
  }

  const chageName = (e) => {
    if (openAdd) setSize({ ...size, size: e.target.value })
    else setSizeUpdate({ ...sizeUpdate, size: e.target.value })
  }

  const setDeleted = (id) => {
    const title = 'Xác nhận thay đổi hoạt động?'
    const text = 'Ẩn hoạt động sẽ làm ẩn kích cỡ khỏi nơi khác'
    confirmSatus(title, text, theme).then((result) => {
      if (result.isConfirmed) {
        sizeApi
          .swapSize(id)
          .then((res) => {
            if (res.data.success) {
              setIsBackdrop(false)
              toast.success('Thay đổi trạng thái hoạt động thành công', {
                position: toast.POSITION.TOP_RIGHT,
              })
              fetchData(filter)
            }
          })
          .catch(() => {
            toast.error('Thay đổi trạng thái hoạt động thất bại', {
              position: toast.POSITION.TOP_RIGHT,
            })
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
        <BreadcrumbsCustom nameHere={'kích cỡ'} listLink={listBreadcrumb} />
        <Container component={Paper} elevation={3} sx={{ py: 3, borderRadius: '10px' }}>
          <Stack
            sx={{ mb: 2 }}
            direction="row"
            justifyContent="space-between"
            alignItems="flex-start"
            spacing={12}>
            <TextField
              id="seachSize"
              InputProps={{
                required: true,
                startAdornment: (
                  <RxMagnifyingGlass style={{ marginRight: '5px', fontSize: '25px' }} />
                ),
              }}
              sx={{ mr: 0.5, width: '50%' }}
              onChange={(e) => {
                setFilter({ ...filter, size: e.target.value })
              }}
              inputProps={{ style: { height: '20px' } }}
              size="small"
              placeholder="Tìm kích cỡ"
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
                title={'Thêm mới kích cỡ'}
                buttonSubmit={
                  <Button
                    onClick={() => {
                      openAdd ? addSize() : updateSize()
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
                  type="number"
                  onChange={(e) => {
                    chageName(e)
                  }}
                  defaultValue={size.size}
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
                  placeholder="Nhập kích cỡ"
                />
                <span style={{ color: 'red' }}>{errorSize}</span>
              </DialogAddUpdate>
            )}
            {openUpdate && (
              <DialogAddUpdate
                open={openUpdate}
                setOpen={setOpenUpdate}
                title={'Chỉnh sửa kích cỡ'}
                buttonSubmit={
                  <Button
                    onClick={() => {
                      updateSize()
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
                  type="number"
                  onChange={(e) => {
                    chageName(e)
                  }}
                  defaultValue={sizeUpdate.size}
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
                  placeholder="Nhập kích cỡ"
                />
                <span style={{ color: 'red' }}>{errorSizeUpdate}</span>
              </DialogAddUpdate>
            )}
          </Stack>
          {listSize.length === 0 ? (
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
                      kích cỡ
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
                  {listSize.map((row, index) => (
                    <TableRow
                      key={row.id}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                      <TableCell align="center">{index + 1}</TableCell>
                      <TableCell align="center">{row.size}</TableCell>
                      <TableCell align="center">
                        {dayjs(row.createAt).format('DD/MM/YYYY')}
                      </TableCell>
                      <TableCell align="center">
                        <Switch
                          checked={!row.deleted}
                          onChange={(e) => {
                            const isDel = !e.target.checked
                            setDeleted(row.id, isDel)
                          }}
                          size="small"
                        />
                      </TableCell>
                      <TableCell align="center">
                        <Tooltip title="Chỉnh sửa">
                          <IconButton
                            onClick={() => {
                              setSizeUpdate({ ...sizeUpdate, id: row.id, size: row.size })
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
                      setFilter({ ...filter, pageSize: e.target.value })
                    }}
                    sx={{ height: '25px', mx: 0.5 }}
                    size="small"
                    value={filter.pageSize}>
                    <MenuItem value={1}>1</MenuItem>
                    <MenuItem value={5}>5</MenuItem>
                    <MenuItem value={10}>10</MenuItem>
                    <MenuItem value={15}>15</MenuItem>
                    <MenuItem value={20}>20</MenuItem>
                  </Select>
                  <Typography sx={{ display: { xs: 'none', md: 'inline-block' } }}>
                    kích cỡ
                  </Typography>
                </Typography>
                <Pagination
                  color="primary"
                  count={pageRespone.totalPages}
                  page={pageRespone.currentPage + 1}
                  onChange={(e, value) => {
                    e.preventDefault()
                    setFilter({ ...filter, pageNumber: value })
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
