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
import colorApi from '../../../api/admin/sanpham/colorApi'
import colorHelper from 'color-convert'
import Avatar from '@mui/material/Avatar'

const listBreadcrumb = [{ name: 'Quản lý màu sắc' }]
export default function AdColorPage() {
  const theme = useTheme()
  const [openAdd, setOpenAdd] = useState(false)
  const [openUpdate, setOpenUpdate] = useState(false)
  const [color, setColor] = useState({ code: '#000000', name: 'Black' })
  const [colorUpdate, setColorUpdate] = useState({ id: 0, code: '', name: '' })
  const [listColor, setListColor] = useState([])
  const [isBackdrop, setIsBackdrop] = useState(true)
  const [filter, setFilter] = useState({ page: 1, size: 5, textSearch: '' })
  const [pageRespone, setPageRespone] = useState({ currentPage: 1, totalPages: 0 })

  useEffect(() => {
    fetchData(filter)
  }, [filter])

  const fetchData = (filter) => {
    setIsBackdrop(true)
    colorApi
      .getColor(filter)
      .then((response) => {
        const res = response.data
        setListColor(res.data.content)
        setPageRespone({ currentPage: res.data.currentPage, totalPages: res.data.totalPages })
      })
      .catch((error) => {
        console.log(error)
      })
    setIsBackdrop(false)
  }

  const addColor = () => {
    setIsBackdrop(true)
    const title = 'Xác nhận Thêm mới màu sắc?'
    const text = ''
    setOpenAdd(false)
    confirmSatus(title, text, theme).then((result) => {
      if (result.isConfirmed) {
        colorApi.addColor(color).then((res) => {
          if (res.data.success) {
            setIsBackdrop(false)
            setOpenAdd(false)
            setColor({ code: '', name: '' })
            toast.success('Thêm màu sắc thành công', {
              position: toast.POSITION.TOP_RIGHT,
            })
            fetchData(filter)
          } else {
            setOpenAdd(true)
            toast.error('Thêm màu sắc thất bại', {
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
  const updateColor = () => {
    setIsBackdrop(true)
    const title = 'Xác nhận cập nhật màu sắc?'
    const text = ''
    setOpenUpdate(false)
    confirmSatus(title, text, theme).then((result) => {
      if (result.isConfirmed) {
        colorApi
          .updateColor(colorUpdate.id, { code: colorUpdate.code, name: colorUpdate.name })
          .then((res) => {
            if (res.data.success) {
              setIsBackdrop(false)
              setColor({ code: '', name: '' })
              toast.success('Cập nhật màu sắc thành công', {
                position: toast.POSITION.TOP_RIGHT,
              })
              fetchData(filter)
            } else {
              setOpenUpdate(true)
              toast.error('Cập nhật màu sắc thất bại', {
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
    if (openAdd)
      setColor({ ...color, code: e.target.value, name: colorHelper.hex.keyword(e.target.value) })
    else
      setColorUpdate({
        ...colorUpdate,
        code: e.target.value,
        name: colorHelper.hex.keyword(e.target.value),
      })
  }

  const setDeleted = (id) => {
    const title = 'Xác nhận thay đổi hoạt động?'
    const text = 'Ẩn hoạt động sẽ làm ẩn màu sắc khỏi nơi khác'
    confirmSatus(title, text, theme).then((result) => {
      if (result.isConfirmed) {
        colorApi
          .swapColor(id)
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
        <BreadcrumbsCustom nameHere={'màu sắc'} listLink={listBreadcrumb} />
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
                setFilter({ ...filter, textSearch: e.target.value })
              }}
              inputProps={{ style: { height: '20px' } }}
              size="small"
              placeholder="Tìm màu sắc"
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
                title={'Chọn màu sắc'}
                buttonSubmit={
                  <Button
                    onClick={() => {
                      openAdd ? addColor() : updateColor()
                    }}
                    color="primary"
                    disableElevation
                    sx={{ ...spButton }}
                    variant="contained">
                    Thêm
                  </Button>
                }>
                <TextField
                  type="color"
                  id={'nameInputAdd'}
                  onChange={(e) => {
                    chageName(e)
                  }}
                  defaultValue={color.code}
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
                  // placeholder="Nhập mã màu sắc"
                />
              </DialogAddUpdate>
            )}
            {openUpdate && (
              <DialogAddUpdate
                open={openUpdate}
                setOpen={setOpenUpdate}
                title={'Chỉnh sửa màu sắc'}
                buttonSubmit={
                  <Button
                    onClick={() => {
                      updateColor()
                    }}
                    color="primary"
                    disableElevation
                    sx={{ ...spButton }}
                    variant="contained">
                    Lưu
                  </Button>
                }>
                <TextField
                  type="color"
                  id={'nameInputUpdate'}
                  onChange={(e) => {
                    chageName(e)
                  }}
                  defaultValue={colorUpdate.code}
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
                  // placeholder="Nhập mã màu sắc"
                />
              </DialogAddUpdate>
            )}
          </Stack>
          {listColor.length === 0 ? (
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
                      Mã màu
                    </TableCell>
                    <TableCell sx={{ fontWeight: '500' }} align="center">
                      Tên màu
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
                  {listColor.map((row, index) => (
                    <TableRow
                      key={row.id}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                      <TableCell align="center">{index + 1}</TableCell>
                      <TableCell align="center">
                        <Button
                          disabled
                          sx={{
                            height: '50%',
                            borderRadius: '90px',
                            textTransform: 'none',
                            backgroundColor: `${row.code}`,
                          }}></Button>
                        {/* <Avatar sx={{ backgroundColor: `${row.code}`, textAlign: 'center' }}>
                          <span></span>
                        </Avatar> */}
                      </TableCell>
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
                              setColorUpdate({
                                ...colorUpdate,
                                id: row.id,
                                code: row.code,
                                name: row.name,
                              })
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
                    màu sắc
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
