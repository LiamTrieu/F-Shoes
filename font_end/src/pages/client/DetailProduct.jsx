import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Container,
  Divider,
  IconButton,
  Modal,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  ThemeProvider,
  Typography,
} from '@mui/material'
import Grid2 from '@mui/material/Unstable_Grid2/Grid2'
import React, { useState } from 'react'
import { ColorCustom } from '../../styles/ColorCustom'
import CartProduct from '../../layout/client/CartProduct'
import LabelTitle from '../../layout/client/LabelTitle'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import { useEffect } from 'react'
import clientProductApi from '../../api/client/clientProductApi'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { GetCart, addCart, removeCart, setCart, updateCart } from '../../services/slices/cartSlice'
import ReactImageGallery from 'react-image-gallery'
import { Drawer } from '@mui/material'
import 'react-image-gallery/styles/css/image-gallery.css'
import './DetailProduct.css'
import { setCheckout } from '../../services/slices/checkoutSlice'
import StraightenIcon from '@mui/icons-material/Straighten'
import { toast } from 'react-toastify'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import ReplyIcon from '@mui/icons-material/Reply'

function calculateTotalPayment(cart) {
  let total = 0
  cart.forEach((item) => {
    total += item.gia * item.soLuong
  })
  return total.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })
}

const styleModalCart = {
  position: 'absolute',
  top: '45%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 1000,
  height: '550px',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
}

export default function DetailProduct() {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const [soLuong, setSoluong] = useState(1)
  const [product, setProduct] = useState({ image: [], price: '' })
  const [products, setProducts] = useState([])
  const [sizes, setSizes] = useState([])
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [sizeSelect, setSizeSelect] = useState()
  const { id } = useParams()

  const [openModalCart, setOpenModalCart] = React.useState(false)
  const handleOpenModalCart = () => setOpenModalCart(true)
  const handleCloseModalCart = () => setOpenModalCart(false)

  const openSidebar = () => {
    setIsSidebarOpen(true)
  }
  useEffect(() => {
    let data
    clientProductApi
      .getById(id)
      .then((result) => {
        data = result.data.data
        setProduct({
          ...data,
          image: data.image.split(','),
        })
      })
      .finally(() => {
        clientProductApi
          .getSizes({
            idProduct: data.idProduct,
            idColor: data.idColor,
            idCategory: data.idCategory,
            idBrand: data.idBrand,
            idSole: data.idSole,
            idMaterial: data.idMaterial,
          })
          .then((result) => {
            setSizes(result.data.data)
            setSizeSelect(result.data.data.find((data) => data.id === id).size)
          })
      })
    clientProductApi
      .getCungLoai({
        category: product.idCategory,
        brand: product.idBrand,
        product: product.idProduct,
        color: product.idColor,
        sole: product.idSole,
        material: product.idMaterial,
      })
      .then((result) => {
        const data = result.data.data
        setProducts(
          data.map((e) => {
            return {
              id: e.id,
              title: e.name,
              priceBefort: e.price,
              priceAfter: e.price,
              promotion: e.promotion,
              statusPromotion: e.statusPromotion,
              value: e.value,
              image: e.image.split(','),
              idProduct: e.idProduct,
              idColor: e.idColor,
              idMaterial: e.idMaterial,
              idSole: e.idSole,
              idCategory: e.idCategory,
              idBrand: e.idBrand,
            }
          }),
        )
      })
  }, [sizeSelect, id])

  const calculateDiscountedPrice = (originalPrice, discountPercentage) => {
    const discountAmount = (discountPercentage / 100) * originalPrice
    const discountedPrice = originalPrice - discountAmount
    return discountedPrice
  }

  const dispatch = useDispatch()
  const addProductToCart = () => {
    if (
      isNaN(parseInt(soLuong.toString().trim())) ||
      soLuong <= 0 ||
      soLuong >= parseInt(product.amount)
    ) {
      toast.warning('Số lượng không hợp lệ')
    } else {
      const newItem = {
        id: id,
        name: product.name,
        gia: product.price,
        weight: product.weight,
        image: product.image,
        soLuong: parseInt(soLuong.toString().trim()),
        size: sizeSelect,
      }
      dispatch(addCart(newItem))
      handleOpenModalCart()
    }
  }
  const checkOut = () => {
    console.log(product)
    if (
      isNaN(parseInt(soLuong.toString().trim())) ||
      soLuong <= 0 ||
      soLuong >= parseInt(product.amount)
    ) {
      toast.warning('Số lượng không hợp lệ')
    } else {
      const newItem = {
        id: id,
        name: product.name,
        gia: product.price,
        weight: product.weight,
        image: product.image,
        soLuong: parseInt(soLuong.toString().trim()),
        size: sizeSelect,
      }
      dispatch(setCheckout([newItem]))
      navigate('/checkout')
    }
  }

  const productCart = useSelector(GetCart)

  console.log(productCart + '==--==--=-=--=-=-=-=-=-=-=-=--=dddddddddddddddddd')

  const onChangeSL = (cart, num) => {
    const soluong = cart.soLuong + num
    if (soluong <= 0) {
      dispatch(removeCart(cart.id))
    } else {
      dispatch(updateCart({ ...cart, soLuong: soluong }))
    }
  }

  function convert(images) {
    return images.map((image) => {
      return {
        original: image,
        thumbnail: image,
      }
    })
  }
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
  }
  const formatPrice = (price) => {
    return price.toLocaleString('vi-VN', {
      style: 'currency',
      currency: 'VND',
    })
  }
  const amountProduct = useSelector(GetCart).length
  return (
    <div className="detail-product">
      <Container maxWidth="xl">
        <Grid2 container rowSpacing={1} columnSpacing={3}>
          <Grid2 md={6} textAlign={'center'} width={'100%'}>
            <ReactImageGallery
              showBullets={false}
              showPlayButton={false}
              showNav={false}
              autoPlay={true}
              items={convert(product.image)}
            />
          </Grid2>
          <Grid2 md={6} width={'100%'}>
            <Box borderBottom={'1px dotted gray'} py={2}>
              <Typography variant="h4" fontFamily={'monospace'} fontWeight={'bolder'}>
                {product.name}
              </Typography>
              <div style={{ marginTop: '5px', marginBottom: '10px' }}>
                <b>Loại giày: </b>
                {product.nameCate}
                &nbsp;&nbsp;&nbsp;&nbsp;
                <b>Thương hiệu: </b>
                {product.nameBrand}
              </div>
              <Typography variant="h5" fontFamily={'monospace'} fontWeight={'900'} color={'red'}>
                <span>
                  {' '}
                  {product.promotion && product.statusPromotion === 1 ? (
                    <div style={{ display: 'flex' }}>
                      <div className="promotion-price">{`${product.price.toLocaleString('it-IT', {
                        style: 'currency',
                        currency: 'VND',
                      })} `}</div>{' '}
                      <div>
                        <span style={{ color: 'red', fontWeight: 'bold' }}>
                          {`${calculateDiscountedPrice(product.price, product.value).toLocaleString(
                            'it-IT',
                            {
                              style: 'currency',
                              currency: 'VND',
                            },
                          )} `}
                        </span>{' '}
                      </div>
                    </div>
                  ) : (
                    <span>{`${product.price.toLocaleString('it-IT', {
                      style: 'currency',
                      currency: 'VND',
                    })} `}</span>
                  )}
                </span>
              </Typography>
            </Box>
            <Box borderBottom={'1px dotted gray'} py={2} mb={2}>
              <Box py={2}>
                <Typography mr={2} fontWeight={'bold'} variant="button" gutterBottom>
                  Size
                </Typography>
                {sizes.map((e, index) => {
                  return (
                    <Button
                      onClick={() => {
                        setSizeSelect(e.size)
                      }}
                      component={Link}
                      to={`/product/${e.id}`}
                      key={'size' + index}
                      variant="outlined"
                      style={{
                        marginLeft: '10px',
                        color: id === e.id ? 'white' : 'black',
                        backgroundColor: id === e.id ? 'black' : 'white',
                        padding: '2px 0px 2px 0px',
                        border: '1px solid gray',
                      }}>
                      {parseInt(e.size)}
                    </Button>
                  )
                })}
                <Button
                  onClick={handleOpen}
                  variant="outlined"
                  style={{
                    marginLeft: '10px',
                    color: 'black',
                    backgroundColor: 'white',
                    padding: '2px 2px 2px 2px',
                    border: '1px solid gray',
                  }}>
                  <StraightenIcon />
                  &nbsp; Bảng size
                </Button>
              </Box>
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description">
                <Box sx={style}>
                  <img src={require('../../assets/image/chonsize.jpg')} alt="chọn-size" />
                </Box>
              </Modal>
              <Box py={2}>
                <Typography
                  sx={{ float: 'left', mt: '3px' }}
                  color={'red'}
                  mr={2}
                  fontWeight={'bold'}
                  variant="button"
                  gutterBottom>
                  Số lượng: {product.amount}
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
                  <IconButton
                    onClick={(e) => {
                      setSoluong(parseInt(soLuong) - 1)
                    }}
                    sx={{ p: 0 }}
                    size="small">
                    <RemoveIcon fontSize="1px" />
                  </IconButton>
                  <TextField
                    onChange={(e) => {
                      setSoluong(e.target.value)
                    }}
                    value={soLuong}
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
                  <IconButton
                    onClick={() => {
                      setSoluong(parseInt(soLuong) + 1)
                    }}
                    size="small"
                    sx={{ p: 0 }}>
                    <AddIcon fontSize="1px" />
                  </IconButton>
                </Box>
              </Box>
            </Box>
            <ThemeProvider theme={ColorCustom}>
              <Button
                onClick={addProductToCart}
                type="submit"
                variant="contained"
                color="neutral"
                sx={{ marginRight: '15px' }}>
                Thêm vào giỏ hàng
              </Button>
              <Button
                onClick={checkOut}
                type="submit"
                variant="contained"
                color="red"
                sx={{ marginRight: '15px' }}>
                Mua ngay
              </Button>
            </ThemeProvider>
            <Accordion sx={{ boxShadow: 'none', mt: 3 }}>
              <AccordionSummary
                sx={{ padding: 0 }}
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header">
                <Typography color={'gray'}>Mô tả sản phẩm</Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ padding: 0 }}>
                <Typography>{product.description}</Typography>
              </AccordionDetails>
            </Accordion>
          </Grid2>
        </Grid2>
        <Box sx={{ width: '100%' }} mt={5}>
          <LabelTitle text="Sản phẩm cùng loại" />
          <CartProduct products={products} colsm={6} colmd={4} collg={3} />
        </Box>
        <div>
          <Modal
            open={openModalCart}
            onClose={handleCloseModalCart}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description">
            <Box sx={styleModalCart}>
              <Typography sx={{ float: 'right', color: 'white' }} onClick={handleCloseModalCart}>
                <div
                  style={{
                    width: '30px',
                    height: '30px',
                    borderRadius: '50%',
                    backgroundColor: 'black',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: '-30px',
                    marginRight: '-40px',
                    cursor: 'pointer',
                  }}>
                  X
                </div>
              </Typography>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Sản phẩm đã được thêm vào giỏ hàng
              </Typography>
              <Divider sx={{ height: '2px', backgroundColor: 'black', mt: 2 }} />

              <Typography
                sx={{
                  fontSize: '20px',
                  fontWeight: 700,
                  mt: 1,
                  color: '#333333',
                  textTransform: 'uppercase',
                }}>
                Giỏ hàng của bạn ({amountProduct} sản phẩm)
              </Typography>
              <div style={{ maxHeight: '330px', overflow: 'auto' }}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead
                    style={{ backgroundColor: '#333', color: 'white', position: 'sticky', top: 0 }}>
                    <TableRow>
                      <TableCell style={{ color: 'white' }} align="center">
                        ẢNH SẢN PHẨM
                      </TableCell>
                      <TableCell style={{ color: 'white' }} align="center">
                        TÊN SẢN PHẨM
                      </TableCell>
                      <TableCell style={{ color: 'white' }} align="center">
                        ĐƠN GIÁ
                      </TableCell>
                      <TableCell style={{ color: 'white' }} align="center">
                        SỐ LƯỢNG
                      </TableCell>
                      <TableCell style={{ color: 'white' }} align="center">
                        THÀNH TIỀN
                      </TableCell>
                      <TableCell style={{ color: 'white' }} align="center">
                        XÓA
                      </TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {productCart.map((cart) => (
                      <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <TableCell>
                          <img src={cart.image[0]} alt={cart.name} width={130} />
                        </TableCell>

                        <TableCell sx={{ fontWeight: 1000, width: '30%' }} align="center">
                          {cart.name}
                        </TableCell>
                        <TableCell align="center">
                          {' '}
                          <Typography fontFamily={'monospace'} fontWeight={'700'} color={'red'}>
                            <span>
                              {' '}
                              {product.promotion ? (
                                <div>
                                  <div className="promotion-price">{`${formatPrice(
                                    cart.gia,
                                  )} `}</div>{' '}
                                  <div>
                                    <span style={{ color: 'red', fontWeight: 'bold' }}>
                                      {`${formatPrice(
                                        calculateDiscountedPrice(cart.gia, product.value),
                                      )} `}
                                    </span>{' '}
                                  </div>
                                </div>
                              ) : (
                                <span>{`${formatPrice(cart.gia)} `}</span>
                              )}
                            </span>
                          </Typography>
                        </TableCell>
                        <TableCell align="center">
                          {' '}
                          <div className="quantity-control">
                            <button onClick={() => onChangeSL(cart, -1)}>-</button>
                            <input
                              onChange={(e) => {
                                const newValue = Math.floor(Number(e.target.value))
                                dispatch(updateCart({ ...cart, soLuong: newValue }))
                              }}
                              value={cart.soLuong}
                              min="1"
                            />
                            <button onClick={() => onChangeSL(cart, 1)}>+</button>
                          </div>
                        </TableCell>
                        <TableCell align="center">
                          {product.promotion ? (
                            <div>
                              {formatPrice(
                                cart.soLuong * calculateDiscountedPrice(cart.gia, product.value),
                              )}
                            </div>
                          ) : (
                            <span>{`${formatPrice(cart.soLuong * cart.gia)} `}</span>
                          )}
                        </TableCell>
                        <TableCell align="center">
                          <DeleteForeverIcon
                            onClick={() => {
                              const updatedProduct = productCart.filter(
                                (item) => item.id !== cart.id,
                              )
                              dispatch(setCart(updatedProduct))
                            }}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                spacing={12}>
                <div>
                  <Link to="/cart" style={{ textDecoration: 'none' }}>
                    <ReplyIcon />
                    <b>Đến giỏ hàng</b>
                  </Link>
                </div>
                <div>
                  <Typography sx={{ mt: 3, fontSize: '17px' }}>
                    Tổng thanh toán:
                    <span style={{ fontWeight: 1000, marginLeft: '20px', color: 'red' }}>
                      {calculateTotalPayment(productCart)}
                    </span>
                  </Typography>

                  <Link to="/checkout">
                    <div
                      style={{
                        width: '300px',
                        height: '40px',
                        backgroundColor: '#333',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontSize: '15px',
                      }}
                      onClick={() => {
                        dispatch(setCheckout(productCart))
                      }}>
                      TIẾN HÀNH THANH TOÁN
                    </div>
                  </Link>
                </div>
              </Stack>
            </Box>
          </Modal>
        </div>
      </Container>
    </div>
  )
}
