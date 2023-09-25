import React, { useState } from 'react'
import {
  Box,
  Button,
  Container,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Modal,
  Paper,
  Select,
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
const arrData = [
  {
    id: 2,
    name: 'Air Jordan 1 Mid - Neutral Grey',
    size: 40,
    gia: '100.000',
    soLuong: 1,
    image: 'https://shorturl.at/tvLO2',
    checked: false,
  },
  {
    id: 1,
    name: 'Air Jordan 1 Mid - Neutral Grey',
    size: 41,
    gia: '500.000',
    soLuong: 3,
    image: 'https://shorturl.at/tvLO2',
    checked: false,
  },
  {
    id: 1,
    name: 'Air Jordan 1 Mid - Neutral Grey',
    size: 41,
    gia: '500.000',
    soLuong: 3,
    image: 'https://shorturl.at/tvLO2',
    checked: false,
  },
  {
    id: 1,
    name: 'Air Jordan 1 Mid - Neutral Grey',
    size: 41,
    gia: '500.000',
    soLuong: 3,
    image: 'https://shorturl.at/tvLO2',
    checked: false,
  },
  {
    id: 1,
    name: 'Air Jordan 1 Mid - Neutral Grey',
    size: 41,
    gia: '500.000',
    soLuong: 3,
    image: 'https://shorturl.at/tvLO2',
    checked: false,
  },
]

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
const styleModalProductDetail = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: '60vw', md: '30vw' },
  height: '300px',
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

const RowDataCustom = ({ cartDatas }) => {
  return cartDatas.map((cart) => {
    return (
      <TableRow sx={{ border: 0 }} key={cart.id}>
        <TableCell sx={{ px: 0 }}>
          <IconButton color="error">
            <CloseIcon />
          </IconButton>
        </TableCell>
        <TableCell style={{ verticalAlign: 'middle' }} sx={{ px: 0 }}>
          <Box component="span" display={{ sm: 'inline', xs: 'none' }}>
            <img
              alt="error"
              src={cart.image}
              style={{
                maxWidth: '20%',
                maxHeight: '20%',
                verticalAlign: 'middle',
              }}></img>
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
              <b>{cart.gia}&#8363;</b>
            </p>
            <p style={{ margin: 0 }}>size:{cart.size}</p>
          </span>
        </TableCell>
        <TableCell sx={{ px: 0 }}>
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
          }}>
          {cart.gia * cart.soLuong}.000&#8363;
        </TableCell>
      </TableRow>
    )
  })
}
export default function SellFrom({ maHD }) {
  const [giaoHang, setGiaoHang] = useState(false)
  const [isShowCustomer, setIsShowCustomer] = useState(false)
  const [isShowAddCustomer, setIsShowAddCustomer] = useState(false)
  const [isShowProduct, setIsShowProduct] = useState(false)
  const [isShowProductDetail, setIsShowProductDetail] = useState(false)

  const RowDataProduct = ({ cartDatas }) => {
    return cartDatas.map((cart) => {
      return (
        <TableRow key={cart.id}>
          <TableCell width={'15%'} align="center">
            <img width={'100%'} alt="error" src={cart.image} />
          </TableCell>
          <TableCell width={'65%'}>
            <p style={{ margin: 0 }}>
              <b>{cart.name}</b>
            </p>
          </TableCell>
          <TableCell
            width={'15%'}
            align="center"
            sx={{
              color: 'red',
              fontWeight: 'bold',
            }}>
            {cart.gia * cart.soLuong}.000&#8363;
          </TableCell>
          <TableCell width={'15%'} align="center">
            <Button
              onClick={() => {
                setIsShowProductDetail(true)
              }}
              variant="outlined"
              color="info"
              size="small">
              Chọn
            </Button>
          </TableCell>
        </TableRow>
      )
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
            onClick={() => {
              setIsShowProduct(true)
            }}
            sx={{ float: 'right' }}
            size="small"
            variant="contained"
            color="warning">
            <AddIcon fontSize="small" /> Thêm sản phẩm
          </Button>
        </Box>
        <Modal
          open={isShowProduct}
          onClose={() => {
            setIsShowProduct(false)
          }}>
          <Box sx={styleModalProduct}>
            <Toolbar>
              <Box
                sx={{
                  color: 'black',
                  flexGrow: 1,
                }}>
                <Typography variant="h6" component="div">
                  Tìm kiếm sản phẩm
                </Typography>
              </Box>
              <IconButton
                onClick={() => {
                  setIsShowProduct(false)
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
                  placeholder="Tên sản phẩm"
                />
                <Button sx={{ ml: 2 }} variant="contained">
                  Tìm kiếm
                </Button>
              </Box>
              <Box>
                <b>Danh mục:</b>
                <Select
                  sx={{
                    '.MuiSelect-select': {
                      pl: 1,
                      color: 'rgb(34, 143, 65)',
                      fontWeight: 'bold',
                    },
                    '.MuiOutlinedInput-notchedOutline': {
                      border: 'none!important',
                    },
                  }}
                  value={0}>
                  <MenuItem value={0}>Tất cả</MenuItem>
                  <MenuItem value={1}>Danh mục 1</MenuItem>
                </Select>
                <b>Màu sắc:</b>
                <Select
                  sx={{
                    '.MuiSelect-select': {
                      pl: 1,
                      color: 'rgb(34, 143, 65)',
                      fontWeight: 'bold',
                    },
                    '.MuiOutlinedInput-notchedOutline': {
                      border: 'none!important',
                    },
                  }}
                  value={0}>
                  <MenuItem value={0}>Tất cả</MenuItem>
                  <MenuItem value={1}>Danh mục 1</MenuItem>
                </Select>
                <b>Sắp xếp:</b>
                <Select
                  sx={{
                    '.MuiSelect-select': {
                      pl: 1,
                      color: 'rgb(34, 143, 65)',
                      fontWeight: 'bold',
                    },
                    '.MuiOutlinedInput-notchedOutline': {
                      border: 'none!important',
                    },
                  }}
                  value={0}>
                  <MenuItem value={0}>Tất cả</MenuItem>
                  <MenuItem value={1}>Danh mục 1</MenuItem>
                </Select>
              </Box>
              <Box
                sx={{
                  maxHeight: '440px',
                  overflow: 'auto',
                }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell width={'10%'} align="center" sx={{ fontWeight: 'bold' }}>
                        Ảnh
                      </TableCell>
                      <TableCell width={'60%'} align="center" sx={{ fontWeight: 'bold' }}>
                        Tên
                      </TableCell>
                      <TableCell width={'15%'} align="center" sx={{ fontWeight: 'bold' }}>
                        Giá
                      </TableCell>
                      <TableCell width={'15%'} align="center" sx={{ fontWeight: 'bold' }}>
                        Thao tác
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>{RowDataProduct({ cartDatas: arrData })}</TableBody>
                </Table>
              </Box>
              <Modal
                open={isShowProductDetail}
                onClose={() => {
                  setIsShowProductDetail(false)
                }}>
                <Box sx={styleModalProductDetail}>
                  <Toolbar>
                    <Box
                      sx={{
                        color: 'black',
                        flexGrow: 1,
                      }}>
                      <Typography variant="h6" component="div">
                        Air Jordan 1 Mid - Neutral Grey
                      </Typography>
                    </Box>
                    <IconButton
                      onClick={() => {
                        setIsShowProductDetail(false)
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
                    <Box py={1}>
                      <Typography mr={2} fontWeight={'bold'} variant="button" gutterBottom>
                        Size
                      </Typography>
                      <Select
                        sx={{
                          '.MuiSelect-select': {
                            pl: 1,
                            color: 'rgb(34, 143, 65)',
                            fontWeight: 'bold',
                          },
                          '.MuiOutlinedInput-notchedOutline': {
                            border: 'none!important',
                          },
                        }}
                        value={0}>
                        <MenuItem value={0}>33</MenuItem>
                      </Select>
                      <FormControl></FormControl>
                    </Box>
                    <Box py={1}>
                      <Typography mr={2} fontWeight={'bold'} variant="button" gutterBottom>
                        Color
                      </Typography>
                      <Select
                        sx={{
                          '.MuiSelect-select': {
                            pl: 1,
                            color: 'rgb(34, 143, 65)',
                            fontWeight: 'bold',
                          },
                          '.MuiOutlinedInput-notchedOutline': {
                            border: 'none!important',
                          },
                        }}
                        value={0}>
                        <MenuItem value={0}>Đỏ</MenuItem>
                      </Select>
                    </Box>
                    <Box py={1}>
                      <Typography
                        sx={{ float: 'left' }}
                        color={'red'}
                        mr={2}
                        mt={'5px'}
                        fontWeight={'bold'}>
                        Số lượng: 100
                      </Typography>

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
                    </Box>
                    <Stack
                      direction="row"
                      justifyContent="flex-end"
                      alignItems="flex-end"
                      spacing={2}>
                      <Box>
                        <Button variant="contained" color="success">
                          <b>Xác nhận</b>
                        </Button>
                      </Box>
                    </Stack>
                  </Container>
                </Box>
              </Modal>
            </Container>
          </Box>
        </Modal>

        {arrData.length > 0 ? (
          <Box>
            <Box sx={{ maxHeight: '55vh', overflow: 'auto' }}>
              <Table>
                <TableBody>{RowDataCustom({ cartDatas: arrData })}</TableBody>
              </Table>
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
        ) : (
          'Không có sản phẩm nào '
        )}
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
            color="info">
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
                disabled={!giaoHang}
                sx={{ mt: 1, width: '49%' }}
                label="Họ & tên"
                size="small"
              />
              <TextField
                disabled={!giaoHang}
                sx={{ mt: 1, width: '49%', ml: '2%' }}
                label="Số điện thoại"
                size="small"
              />
              <FormControl disabled={!giaoHang} sx={{ mt: 2, width: '32%' }} size="small">
                <InputLabel id="lable-tinh">Tỉnh/Thành phố</InputLabel>
                <Select
                  labelId="lable-tinh"
                  id="demo-simple-select"
                  value=""
                  label="Tỉnh/Thành phố">
                  <MenuItem value={'hungyen'}>Hưng Yên</MenuItem>
                </Select>
              </FormControl>
              <FormControl disabled={!giaoHang} sx={{ mt: 2, width: '32%', ml: '2%' }} size="small">
                <InputLabel id="lable-huyen">Quận/Huyện</InputLabel>
                <Select
                  labelId="lable-huyen"
                  id="demo-simple-select"
                  value=""
                  label="Tỉnh/Thành phố">
                  <MenuItem value={'hungyen'}>Ân Thi</MenuItem>
                </Select>
              </FormControl>
              <FormControl disabled={!giaoHang} sx={{ mt: 2, width: '32%', ml: '2%' }} size="small">
                <InputLabel id="lable-xa">Phường/Xã</InputLabel>
                <Select labelId="lable-xa" id="demo-simple-select" value="" label="Tỉnh/Thành phố">
                  <MenuItem value={'hungyen'}>Đặng Lễ</MenuItem>
                </Select>
              </FormControl>
              <TextField
                disabled={!giaoHang}
                sx={{ mt: 2, width: '100%' }}
                label="Địa chỉ cụ thể"
                size="small"
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
          </Grid2>
          <Grid2 md={5} xs={12} p={0}>
            <Box sx={{ m: 1, ml: 3 }}>
              <TextField label="Mã giảm giá" size="small" />
              <Button sx={{ py: '6.7px', ml: 1 }} variant="outlined">
                <b>Áp dụng</b>
              </Button>
            </Box>
            <Box sx={{ m: 1, ml: 3, mr: 3 }}>
              <Stack sx={{ my: '29px' }} direction={'row'} justifyContent={'space-between'}>
                <Typography>Tiền hàng</Typography>
                <Typography>3,600,000₫</Typography>
              </Stack>
              <Stack sx={{ my: '29px' }} direction={'row'} justifyContent={'space-between'}>
                <Typography>Phí vận chuyển</Typography>
                <Typography>80,000₫</Typography>
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
