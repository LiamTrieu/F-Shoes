import React, { useEffect, useState } from 'react'
import {
  Box,
  Button,
  Container,
  IconButton,
  MenuItem,
  Modal,
  Select,
  Stack,
  Table,
  TableBody,
  TableHead,
  TextField,
  Toolbar,
  Typography,
} from '@mui/material'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import CloseIcon from '@mui/icons-material/Close'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import sellApi from '../../../api/admin/sell/SellApi'
import './sell.css'
import bradApi from '../../../api/admin/sanpham/bradApi'
import materialApi from '../../../api/admin/sanpham/materialApi'
import colorApi from '../../../api/admin/sanpham/colorApi'
import categoryApi from '../../../api/admin/sanpham/categoryApi'
import soleApi from '../../../api/admin/sanpham/soleApi'
import sizeApi from '../../../api/admin/sanpham/sizeApi'
import { toast } from 'react-toastify'

const styleModalProduct = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: '90vw', md: '80vw' },
  height: '650px',
  bgcolor: 'white',
  borderRadius: 1.5,
  boxShadow: 24,
}
const styleModalProductDetail = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: '100vw', md: '38vw' },
  height: '300px',
  bgcolor: 'white',
  borderRadius: 1.5,
  boxShadow: 24,
}

export default function ModelSell({ open, setOPen, idBill, load }) {
  const [isShowProductDetail, setIsShowProductDetail] = useState(false)
  const [listProduct, setListProduct] = useState([])
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [errorQuantity, setErrorQuantity] = useState('')

  const [filter, setFilter] = useState({
    brand: null,
    material: null,
    color: null,
    sole: null,
    category: null,
    size: null,
    nameProductDetail: '',
  })
  const [listBrand, setListBrand] = useState([])
  const [listMaterial, setListMaterial] = useState([])
  const [listColor, setListColor] = useState([])
  const [listSole, setListSole] = useState([])
  const [listCategory, setListCategory] = useState([])
  const [listSize, setListSize] = useState([])
  const [getAmountProduct, setGetAmountProduct] = useState([])

  const [addAmount, setAddAmount] = useState(1)

  const handleAddAmount = () => {
    setAddAmount(addAmount + 1)
  }

  const handleRemoveAmount = () => {
    if (addAmount > 1) {
      setAddAmount(addAmount - 1)
    }
  }

  const hanldeAmountProduct = (id) => {
    sellApi.getAount(id).then((response) => {
      setGetAmountProduct(response.data.data)
    })
  }

  const updateQuantityProductDetail = (id, quantity) => {
    if (addAmount <= getAmountProduct.amount) {
      sellApi
        .updateQuantityProductDetail(id, quantity)
        .then((response) => {})
        .catch((error) => {})
    }
  }

  useEffect(() => {
    bradApi.findAll().then((response) => {
      setListBrand(response.data.data)
    })
    materialApi.findAll().then((response) => {
      setListMaterial(response.data.data)
    })
    colorApi.findAll().then((response) => {
      setListColor(response.data.data)
    })
    soleApi.findAll().then((response) => {
      setListSole(response.data.data)
    })
    categoryApi.findAll().then((response) => {
      setListCategory(response.data.data)
    })
    sizeApi.findAll().then((response) => {
      setListSize(response.data.data)
    })
  }, [])

  const fecthData = (filter) => {
    sellApi.getAllProduct(filter).then((response) => {
      setListProduct(response.data.data)
    })
  }
  useEffect(() => {
    fecthData(filter)
  }, [filter])

  const onSubmitAddBillDetail = (id, idBill) => {
    let priceToAdd = selectedProduct.price
    if (selectedProduct.value) {
      priceToAdd = (selectedProduct.price * (100 - selectedProduct.value)) / 100
    }
    if (addAmount > getAmountProduct.amount) {
      setErrorQuantity('Số lượng không còn đủ')
      return
    } else {
      setErrorQuantity('')
      const BillDetail = {
        billId: idBill,
        productDetailId: id,
        quantity: addAmount,
        price: priceToAdd,
      }

      sellApi.addBillDetail(BillDetail, idBill).then(() => {
        toast.success('Thêm sản phẩm thành công', {
          position: toast.POSITION.TOP_CENTER,
        })
        setAddAmount(1)
        setIsShowProductDetail(false)
        load(idBill)
      })
    }
  }
  const calculateDiscountedPrice = (originalPrice, discountPercentage) => {
    const discountAmount = (discountPercentage / 100) * originalPrice
    const discountedPrice = originalPrice - discountAmount
    return discountedPrice
  }
  const formatPrice = (price) => {
    return price.toLocaleString('vi-VN', {
      style: 'currency',
      currency: 'VND',
    })
  }

  return (
    <div className="scrollbar-modal-add">
      <Modal
        open={open}
        onClose={() => {
          setOPen(false)
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
                setOPen(false)
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
                onChange={(e) => {
                  setFilter({ ...filter, nameProductDetail: e.target.value })
                }}
              />
            </Box>
            <Box>
              <b>Danh mục:</b>
              <Select
                displayEmpty
                sx={{
                  '.MuiSelect-select': {
                    pl: 1,
                    color: 'orange',
                    fontWeight: 'bold',
                  },
                  '.MuiOutlinedInput-notchedOutline': {
                    border: 'none!important',
                  },
                }}
                value={filter.category}
                onChange={(e) => {
                  setFilter({ ...filter, category: e.target.value })
                }}>
                <MenuItem value={null}>Tất cả</MenuItem>
                {listCategory?.map((item) => (
                  <MenuItem value={item?.id} key={item?.id}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
              <b>Màu sắc:</b>
              <Select
                displayEmpty
                sx={{
                  '.MuiSelect-select': {
                    pl: 1,
                    color: 'orange',
                    fontWeight: 'bold',
                  },
                  '.MuiOutlinedInput-notchedOutline': {
                    border: 'none!important',
                  },
                }}
                value={filter.color}
                onChange={(e) => {
                  setFilter({ ...filter, color: e.target.value })
                }}>
                <MenuItem value={null}>Tất cả</MenuItem>
                {listColor?.map((item) => (
                  <MenuItem value={item?.id} key={item?.id}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
              <b>Chất liệu:</b>
              <Select
                displayEmpty
                sx={{
                  '.MuiSelect-select': {
                    pl: 1,
                    color: 'orange',
                    fontWeight: 'bold',
                  },
                  '.MuiOutlinedInput-notchedOutline': {
                    border: 'none!important',
                  },
                }}
                value={filter.material}
                onChange={(e) => {
                  setFilter({ ...filter, material: e.target.value })
                }}>
                <MenuItem value={null}>Tất cả</MenuItem>
                {listMaterial?.map((item) => (
                  <MenuItem value={item?.id} key={item?.id}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>

              <b>Kích cỡ:</b>
              <Select
                displayEmpty
                sx={{
                  '.MuiSelect-select': {
                    pl: 1,
                    color: 'orange',
                    fontWeight: 'bold',
                  },
                  '.MuiOutlinedInput-notchedOutline': {
                    border: 'none!important',
                  },
                }}
                value={filter.size}
                onChange={(e) => {
                  setFilter({ ...filter, size: e.target.value })
                }}>
                <MenuItem value={null}>Tất cả</MenuItem>
                {listSize?.map((item) => (
                  <MenuItem value={item?.id} key={item?.id}>
                    {item.size}
                  </MenuItem>
                ))}
              </Select>

              <b>Đế giày:</b>
              <Select
                displayEmpty
                sx={{
                  '.MuiSelect-select': {
                    pl: 1,
                    color: 'orange',
                    fontWeight: 'bold',
                  },
                  '.MuiOutlinedInput-notchedOutline': {
                    border: 'none!important',
                  },
                }}
                value={filter.sole}
                onChange={(e) => {
                  setFilter({ ...filter, sole: e.target.value })
                }}>
                <MenuItem value={null}>Tất cả</MenuItem>
                {listSole?.map((item) => (
                  <MenuItem value={item?.id} key={item?.id}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>

              <b>Thương hiệu:</b>
              <Select
                displayEmpty
                sx={{
                  '.MuiSelect-select': {
                    pl: 1,
                    color: 'orange',
                    fontWeight: 'bold',
                  },
                  '.MuiOutlinedInput-notchedOutline': {
                    border: 'none!important',
                  },
                }}
                value={filter.brand}
                onChange={(e) => {
                  setFilter({ ...filter, brand: e.target.value })
                }}>
                <MenuItem value={null}>Tất cả</MenuItem>
                {listBrand?.map((item) => (
                  <MenuItem value={item?.id} key={item?.id}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </Box>
            <Box
              sx={{
                maxHeight: '440px',
                overflow: 'auto',
              }}>
              <Table style={{ maxHeight: '400px', overflowY: 'auto' }}>
                <TableHead>
                  <TableRow>
                    <TableCell width={'10%'} align="center" sx={{ fontWeight: 'bold' }}>
                      Ảnh
                    </TableCell>
                    <TableCell width={'10%'} align="center" sx={{ fontWeight: 'bold' }}>
                      Tên
                    </TableCell>
                    <TableCell width={'10%'} align="center" sx={{ fontWeight: 'bold' }}>
                      Mã
                    </TableCell>
                    <TableCell width={'10%'} align="center" sx={{ fontWeight: 'bold' }}>
                      Đế Giày
                    </TableCell>
                    <TableCell width={'10%'} align="center" sx={{ fontWeight: 'bold' }}>
                      Danh mục
                    </TableCell>
                    <TableCell width={'10%'} align="center" sx={{ fontWeight: 'bold' }}>
                      Thương hiệu
                    </TableCell>
                    <TableCell width={'10%'} align="center" sx={{ fontWeight: 'bold' }}>
                      Màu sắc
                    </TableCell>
                    <TableCell width={'10%'} align="center" sx={{ fontWeight: 'bold' }}>
                      Chất liệu
                    </TableCell>
                    <TableCell width={'10%'} align="center" sx={{ fontWeight: 'bold' }}>
                      size
                    </TableCell>
                    <TableCell width={'15%'} align="center" sx={{ fontWeight: 'bold' }}>
                      Giá
                    </TableCell>
                    <TableCell width={'15%'} align="center" sx={{ fontWeight: 'bold' }}>
                      Thao tác
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {listProduct.map((cart, index) => (
                    <TableRow key={index.id}>
                      <TableCell width={'15%'} align="center">
                        <div style={{ position: 'relative' }}>
                          <img width={'100%'} alt="error" src={cart.url} />
                          {cart.value && cart.statusPromotion === 1 && (
                            <div
                              style={{
                                position: 'absolute',
                                top: '0',
                                right: '0',
                                backgroundColor:
                                  cart.value >= 1 && cart.value <= 50
                                    ? '#66CC00'
                                    : cart.value >= 51 && cart.value <= 80
                                    ? '#FF9900'
                                    : '#FF0000',
                                color: 'white',
                                padding: '6px 5px',
                                borderRadius: '0 0 0 10px',
                              }}
                              className="discount">
                              {cart.value}% OFF
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell align="center">{cart.name}</TableCell>
                      <TableCell align="center">{cart.code}</TableCell>
                      <TableCell align="center">{cart.sole}</TableCell>
                      <TableCell align="center">{cart.category}</TableCell>
                      <TableCell align="center">{cart.brand}</TableCell>
                      <TableCell align="center">{cart.color}</TableCell>
                      <TableCell align="center">{cart.material}</TableCell>
                      <TableCell align="center">{cart.size}</TableCell>
                      <TableCell
                        align="center"
                        sx={{
                          color: 'red',
                          fontWeight: 'bold',
                        }}>
                        <p style={{ color: 'red', margin: '5px 0' }}>
                          {cart.promotion && cart.statusPromotion === 1 ? ( // Kiểm tra xem sản phẩm có khuyến mãi không
                            <div>
                              <div className="promotion-price">{`${formatPrice(cart.price)}`}</div>{' '}
                              {/* Hiển thị giá gốc */}
                              <div>
                                <span style={{ color: 'red', fontWeight: 'bold' }}>
                                  {`${formatPrice(
                                    calculateDiscountedPrice(cart.price, cart.value),
                                  )}`}
                                </span>{' '}
                                {/* Hiển thị giá sau khuyến mãi */}
                              </div>
                            </div>
                          ) : (
                            // Nếu không có khuyến mãi, chỉ hiển thị giá gốc
                            <span>{`${formatPrice(cart.price)}`}</span>
                          )}
                        </p>
                      </TableCell>
                      <TableCell width={'15%'} align="center">
                        <Button
                          onClick={
                            // () => onSubmitAddCartDetail(cart.productDetailId)
                            () => {
                              setIsShowProductDetail(true)
                              hanldeAmountProduct(cart.productDetailId)
                              setSelectedProduct(cart)
                            }
                          }
                          variant="outlined"
                          color="info"
                          size="small">
                          Chọn
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
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
                    <Typography variant="h5" fontFamily={'monospace'} fontWeight={'bolder'}>
                      {getAmountProduct.nameProduct +
                        ' ' +
                        getAmountProduct.material +
                        ' ' +
                        getAmountProduct.sole}{' '}
                      "{getAmountProduct.color}"
                    </Typography>
                    <div style={{ marginTop: '5px', marginBottom: '10px' }}>
                      <b>Loại giày: </b>
                      {getAmountProduct.category}
                      &nbsp;&nbsp;&nbsp;&nbsp;
                      <b>Thương hiệu: </b>
                      {getAmountProduct.brand}
                    </div>
                    <p style={{ color: 'red', margin: '5px 0' }}>
                      {getAmountProduct.promotion && getAmountProduct.statusPromotion === 1 ? ( // Kiểm tra xem sản phẩm có khuyến mãi không
                        <div style={{ display: 'flex' }}>
                          <div className="promotion-price">{`${getAmountProduct.price}đ`}</div>{' '}
                          <div>
                            <span style={{ color: 'red', fontWeight: 'bold' }}>
                              {`${formatPrice(
                                calculateDiscountedPrice(
                                  getAmountProduct.price,
                                  getAmountProduct.value,
                                ) * addAmount,
                              )}`}
                            </span>{' '}
                          </div>
                        </div>
                      ) : (
                        <span>{`${getAmountProduct.price * addAmount}đ`}</span>
                      )}
                    </p>
                    {'size:' + getAmountProduct.size}
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
                    <Typography
                      sx={{ float: 'left' }}
                      color={'red'}
                      mr={2}
                      mt={'5px'}
                      fontWeight={'bold'}>
                      Số lượng: {getAmountProduct.amount}
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
                      <IconButton sx={{ p: 0 }} size="small" onClick={handleRemoveAmount}>
                        <RemoveIcon fontSize="1px" />
                      </IconButton>
                      <TextField
                        value={addAmount}
                        inputProps={{ min: 1 }}
                        onChange={(e) => setAddAmount(e.target.value)}
                        size="small"
                        sx={{
                          width: '30px ',
                          '& input': { p: 0, textAlign: 'center' },
                          '& fieldset': {
                            border: 'none',
                          },
                        }}
                      />
                      <IconButton size="small" sx={{ p: 0 }} onClick={handleAddAmount}>
                        <AddIcon fontSize="1px" />
                      </IconButton>
                    </Box>
                    <div style={{ fontSize: '12px', fontWeight: 700, color: 'red' }}>
                      {errorQuantity}
                    </div>
                  </Box>
                  <Stack
                    direction="row"
                    justifyContent="flex-end"
                    alignItems="flex-end"
                    spacing={2}>
                    <Box>
                      <Button
                        onClick={() => {
                          onSubmitAddBillDetail(selectedProduct.productDetailId, idBill)
                          updateQuantityProductDetail(selectedProduct.productDetailId, addAmount)
                        }}
                        style={{}}
                        variant="outlined"
                        color="cam">
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
    </div>
  )
}
