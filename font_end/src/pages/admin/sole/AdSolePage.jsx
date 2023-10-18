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
import soleApi from '../../../api/admin/sanpham/soleApi'

const listBreadcrumb = [{ name: 'Quản lý đế giày' }]
export default function AdSolePage() {
  const theme = useTheme()
  const [openAdd, setOpenAdd] = useState(false)
  const [openUpdate, setOpenUpdate] = useState(false)
  const [sole, setSole] = useState({ name: '' })
  const [errorSole, setErrorSole] = useState('')
  const [errorSoleUpdate, setErrorSoleUpdate] = useState('')
  const [soleUpdate, setSoleUpdate] = useState({ id: 0, name: '' })
  const [allNameSole, setAllNameSole] = useState([])
  const [listSole, setListSole] = useState([])
  const [isBackdrop, setIsBackdrop] = useState(true)
  const [filter, setFilter] = useState({ page: 1, size: 5, name: '' })
  const [pageRespone, setPageRespone] = useState({ currentPage: 1, totalPages: 0 })

  useEffect(() => {
    fetchData(filter)
    haldleAllNameSole()
  }, [filter])

  const fetchData = (filter) => {
    setIsBackdrop(true)
    soleApi
      .getSole(filter)
      .then((response) => {
        const res = response.data
        setListSole(res.data.content)
        setPageRespone({ currentPage: res.data.currentPage, totalPages: res.data.totalPages })
      })
      .catch((error) => {
        console.log(error)
      })
    setIsBackdrop(false)
  }

  const haldleAllNameSole = () => {
    soleApi
      .getAllNameSole()
      .then((response) => {
        setAllNameSole(response.data.data)
      })
      .catch(() => {
        toast.warning('Vui lòng f5 tải lại dữ liệu', {
          position: toast.POSITION.TOP_CENTER,
        })
      })
  }

  // const handleValidateAdd = () => {
  //   let check = 0
  //   const errors = {
  //     name: '',
  //   }

  //   if (sole.name.trim() === '') {
  //     errors.name = 'Không được để trống tên đế giày'
  //   } else if (sole.name.length > 100) {
  //     errors.name = 'Tên đế giày không được dài hơn 100 ký tự'
  //   } else if (allNameSole.includes(sole.name)) {
  //     errors.name = 'Tên đế giày đã tồn tại'
  //   }

  //   for (const key in errors) {
  //     if (errors[key]) {
  //       check++
  //     }
  //   }

  //   setErrorSole(errors.name)

  //   return check
  // }

  // const handleValidateUpdate = () => {
  //   let check = 0
  //   const errors = {
  //     nameUpdate: '',
  //   }

  //   if (soleUpdate.name.trim() === '') {
  //     errors.nameUpdate = 'Không được để trống tên đế giày'
  //   } else if (soleUpdate.name.length > 100) {
  //     errors.nameUpdate = 'Tên đế giày không được dài hơn 100 ký tự'
  //   } else if (allNameSole.includes(soleUpdate.name)) {
  //     errors.name = 'Tên đế giày đã tồn tại'
  //   }

  //   for (const key in errors) {
  //     if (errors[key]) {
  //       check++
  //     }
  //   }

  //   setErrorSoleUpdate(errors.nameUpdate)

  //   return check
  // }

  const addSole = () => {
    // const check = handleValidateAdd()
    // if (check < 1) {
    setIsBackdrop(true)
    const title = 'Xác nhận Thêm mới đế giày?'
    const text = ''
    setOpenAdd(false)
    confirmSatus(title, text, theme).then((result) => {
      if (result.isConfirmed) {
        soleApi
          .addSole(sole)
          .then((res) => {
            if (res.data.success) {
              setIsBackdrop(false)
              setOpenAdd(false)
              setSole({ name: '' })
              toast.success('Thêm đế giày thành công', {
                position: toast.POSITION.TOP_RIGHT,
              })
              fetchData(filter)
            } else {
              setOpenAdd(true)
              toast.error('Thêm đế giày thất bại', {
                position: toast.POSITION.TOP_RIGHT,
              })
            }
          })
          .catch((error) => {
            console.log(error)
          })
      } else {
        setOpenAdd(true)
      }
    })
    setIsBackdrop(false)
    // } else {
    //   toast.error('Thêm đế giày thất bại, hãy nhập đủ dữ liệu', {
    //     position: toast.POSITION.TOP_RIGHT,
    //   })
    // }
  }
  const updateSole = () => {
    // const check = handleValidateUpdate()
    // if (check < 1) {
    setIsBackdrop(true)
    const title = 'Xác nhận cập nhập đế giày?'
    const text = ''
    setOpenUpdate(false)
    confirmSatus(title, text, theme).then((result) => {
      if (result.isConfirmed) {
        soleApi.updateSole(soleUpdate.id, { name: soleUpdate.name }).then((res) => {
          if (res.data.success) {
            setIsBackdrop(false)
            setSole({ name: '' })
            toast.success('Cập nhập đế giày thành công', {
              position: toast.POSITION.TOP_RIGHT,
            })
            fetchData(filter)
          } else {
            setOpenUpdate(true)
            toast.error('Cập nhập đế giày thất bại', {
              position: toast.POSITION.TOP_RIGHT,
            })
          }
        })
      } else {
        setOpenUpdate(true)
      }
    })
    setIsBackdrop(false)
    // } else {
    //   toast.error('Thêm đế giày thất bại, hãy nhập đủ dữ liệu', {
    //     position: toast.POSITION.TOP_RIGHT,
    //   })
    // }
  }

  const chageName = (e) => {
    if (openAdd) setSole({ ...sole, name: e.target.value })
    else setSoleUpdate({ ...soleUpdate, name: e.target.value })
  }

  const setDeleted = (id) => {
    const title = 'Xác nhận thay đổi hoạt động?'
    const text = 'Ẩn hoạt động sẽ làm ẩn đế giày khỏi nơi khác'
    confirmSatus(title, text, theme).then((result) => {
      if (result.isConfirmed) {
        soleApi
          .swapSole(id)
          .then((res) => {
            if (res.data.success) {
              setIsBackdrop(false)
              toast.success('Thay đổi trạng thái thành công', {
                position: toast.POSITION.TOP_RIGHT,
              })
              fetchData(filter)
            }
          })
          .catch(() => {
            toast.error('Thay đổi trạng thái thất bại', {
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
        <BreadcrumbsCustom nameHere={'đế giày'} listLink={listBreadcrumb} />
        <Container component={Paper} elevation={3} sx={{ py: 3, borderRadius: '10px' }}>
          <Stack
            sx={{ mb: 2 }}
            direction="row"
            justifyContent="space-between"
            alignItems="flex-start"
            spacing={12}>
            <TextField
              id="seachSole"
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
              placeholder="Tìm đế giày"
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
                title={'Thêm mới đế giày'}
                buttonSubmit={
                  <Button
                    onClick={() => {
                      openAdd ? addSole() : updateSole()
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
                  defaultValue={sole.name}
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
                  // inputProps={{
                  //   style: { color: theme.palette.layout.colorText },
                  //   required: true,
                  // }}
                  size="small"
                  placeholder="Nhập tên đế giày"
                />
                <span style={{ color: 'red' }}>{errorSole}</span>
              </DialogAddUpdate>
            )}
            {openUpdate && (
              <DialogAddUpdate
                open={openUpdate}
                setOpen={setOpenUpdate}
                title={'Chỉnh sửa đế giày'}
                buttonSubmit={
                  <Button
                    onClick={() => {
                      updateSole()
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
                  defaultValue={soleUpdate.name}
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
                  // inputProps={{
                  //   style: { color: theme.palette.layout.colorText },
                  //   required: true,
                  // }}
                  size="small"
                  placeholder="Nhập tên đế giày"
                />
                <span style={{ color: 'red' }}>{errorSoleUpdate}</span>
              </DialogAddUpdate>
            )}
          </Stack>
          {listSole.length === 0 ? (
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
                  {listSole.map((row, index) => (
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
                              setSoleUpdate({ ...soleUpdate, id: row.id, name: row.name })
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
                    đế giày
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
