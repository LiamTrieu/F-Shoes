import React, { useEffect, useState } from 'react'
import {
  Box,
  Button,
  Checkbox,
  Container,
  IconButton,
  TableFooter,
  TextField,
  Typography,
} from '@mui/material'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Grid2 from '@mui/material/Unstable_Grid2/Grid2'
import PaidRoundedIcon from '@mui/icons-material/PaidRounded'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import { Link } from 'react-router-dom'
import {
  OrderCartBody,
  OrderCartFotter,
  OrderCartHeading,
  TableCellCustom,
} from '../../layout/client/cartpage/OrderCart'
import { BoderDotted, NoBoder } from '../../styles/TableStyle'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import './Cart.css'
import { useDispatch, useSelector } from 'react-redux'
import { GetCart, removeCart, setCart, updateCart } from '../../services/slices/cartSlice'
import { setCheckout } from '../../services/slices/checkoutSlice'

import clientProductApi from '../../api/client/clientProductApi'

export default function Cart() {
  const [productSelect, setProductSelect] = useState([])
  const dispatch = useDispatch()

  const onChangeSL = (cart, num) => {
    const soluong = cart.soLuong + num
    const preProductSelect = [...productSelect]
    const index = preProductSelect.findIndex((e) => e.id === cart.id)
    if (soluong <= 0) {
      dispatch(removeCart(cart))
    } else {
      const updatedProduct = {
        ...cart,
        soLuong: soluong,
      }
      if (index !== -1) {
        preProductSelect[index] = updatedProduct
        setProductSelect(preProductSelect)
      }
      dispatch(updateCart(updatedProduct))
    }
  }

  const product = useSelector(GetCart)

  const onChangeCheck = (cart, checked) => {
    const preProductSelect = [...productSelect]
    if (checked) {
      preProductSelect.push(cart)
    } else {
      const index = preProductSelect.findIndex((e) => e.id === cart.id)
      preProductSelect.splice(index, 1)
    }
    setProductSelect(preProductSelect)
  }

  const RowDataCustom = ({ cartDatas }) => {
    const dispatch = useDispatch()
    const [sizes, setSizes] = useState([])
    function getListSize(id) {
      let data
      clientProductApi
        .get({ id: id })
        .then((result) => {
          data = result.data.data[0]
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
            })
        })
    }
    function chageSize(id, cart) {
      const size = sizes.find((s) => s.id === id)
      const carts = [...cartDatas]
      const index = cartDatas.findIndex((c) => c.id === cart)
      carts[index] = { ...carts[index], id: size.id, size: size.size }
      dispatch(setCart(carts))
      const preProductSelect = [...productSelect]
      const indexSelect = preProductSelect.findIndex((e) => e.id === cart)
      if (indexSelect !== -1) {
        preProductSelect.splice(indexSelect, 1)
        setProductSelect(preProductSelect)
      }
    }
    return cartDatas.map((cart) => {
      return (
        <TableRow sx={{ border: 0 }} key={cart.id}>
          <TableCell sx={{ px: 0 }}>
            <Checkbox
              checked={productSelect.findIndex((e) => e.id === cart.id) >= 0}
              size="small"
              onClick={(e) => onChangeCheck(cart, e.target.checked)}
            />
          </TableCell>
          <TableCell style={{ verticalAlign: 'middle' }} sx={{ px: 0 }}>
            <Box component={Link} to={`/product/${cart.id}`} display={{ lg: 'inline', xs: 'none' }}>
              <img
                style={{
                  maxWidth: '20%',
                  maxHeight: '20%',
                  verticalAlign: 'middle',
                }}
                key={'anh'}
                src={cart.image[0]}
                alt="anh"
              />
            </Box>
            <span
              style={{
                display: 'inline-block',
                verticalAlign: 'middle',
                marginLeft: '10px',
                maxWidth: '80%',
              }}>
              <p style={{ margin: 0 }}>{cart.name}</p>
              <b style={{ margin: 0 }}>
                size:&nbsp;
                <select
                  onChange={(e) => {
                    chageSize(e.target.value, cart.id)
                  }}
                  onClick={() => {
                    getListSize(cart.id)
                  }}
                  value={
                    parseFloat(cart.size) % 1 === 0
                      ? parseFloat(cart.size).toFixed(0)
                      : parseFloat(cart.size).toFixed(1)
                  }>
                  <option value={cart.id}>
                    {parseFloat(cart.size) % 1 === 0
                      ? parseFloat(cart.size).toFixed(0)
                      : parseFloat(cart.size).toFixed(1)}
                  </option>
                  {sizes &&
                    sizes.map((size) => {
                      if (size.size !== cart.size) {
                        return (
                          <option value={size.id} key={`size${size.id}`}>
                            {parseFloat(size.size) % 1 === 0
                              ? parseFloat(size.size).toFixed(0)
                              : parseFloat(size.size).toFixed(1)}
                          </option>
                        )
                      }
                    })}
                </select>
              </b>
            </span>
          </TableCell>
          <TableCell
            className="table-gia"
            sx={{
              maxWidth: '10px',
              display: { md: 'table-cell', xs: 'none' },
              color: 'red',
              fontWeight: 'bold',
              textAlign: 'left',
            }}>
            {cart.gia.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}
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
              <IconButton onClick={() => onChangeSL(cart, -1)} sx={{ p: 0 }} size="small">
                <RemoveIcon fontSize="1px" />
              </IconButton>
              <TextField
                onChange={(e) => {
                  dispatch(updateCart({ ...cart, soLuong: e.target.value }))
                }}
                value={cart.soLuong}
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
              <IconButton onClick={() => onChangeSL(cart, 1)} size="small" sx={{ p: 0 }}>
                <AddIcon fontSize="1px" />
              </IconButton>
            </Box>
          </TableCell>
          <TableCell
            className="table-gia"
            sx={{
              maxWidth: '10px',
              display: { md: 'table-cell', xs: 'none' },
              color: 'red',
              fontWeight: 'bold',
            }}>
            {(cart.gia * cart.soLuong).toLocaleString('it-IT', {
              style: 'currency',
              currency: 'VND',
            })}
          </TableCell>
          <TableCell>
            <Button
              onClick={() => {
                const updatedProduct = product.filter((item) => item.id !== cart.id)
                dispatch(setCart(updatedProduct))
              }}
              sx={{
                minHeight: 0,
                minWidth: 0,
                padding: 0,
                float: 'right',
              }}>
              <DeleteForeverIcon color="disabled" />
            </Button>
          </TableCell>
        </TableRow>
      )
    })
  }

  function checkAll(checked) {
    if (checked) {
      setProductSelect([...product])
    } else {
      setProductSelect([])
    }
  }

  return (
    <Container maxWidth="xl">
      <Grid2 container rowSpacing={1} columnSpacing={3}>
        <Grid2 lg={8} width={'100%'}>
          <TableContainer component={Paper} sx={{ mb: '10px' }}>
            <Table>
              <TableHead>
                <TableRow sx={{ display: { md: 'table-row', xs: 'none' } }}>
                  <TableCell sx={{ px: 0 }} width={'1%'}>
                    <Checkbox
                      size="small"
                      checked={productSelect.length === product.length}
                      onClick={(e) => {
                        checkAll(e.target.checked)
                      }}
                    />
                  </TableCell>
                  <TableCellCustom
                    className="table-custom"
                    labels={['Sản phẩm', 'Giá', 'Số lượng', 'Tạm tính', '']}
                    isCart={true}
                  />
                </TableRow>
                <TableRow sx={{ display: { md: 'none', xs: 'table-row' } }}>
                  <TableCell sx={{ width: '1%', px: 0 }}>
                    <Checkbox size="small" />
                  </TableCell>
                  <TableCellCustom labels={['Sản phẩm', 'Số lượng', '']} isCart={true} />
                </TableRow>
              </TableHead>
              <TableBody>{RowDataCustom({ cartDatas: product })}</TableBody>
            </Table>
          </TableContainer>
          <Button component={Link} to="/products" variant="outlined" color="success">
            <ArrowBackIcon />
            <b>Tiếp tục mua hàng</b>
          </Button>
        </Grid2>
        <Grid2 lg={4} xs={12}>
          {productSelect.length !== 0 && (
            <Paper component={Container} variant="outlined" sx={{ minHeight: '74vh' }}>
              <Typography variant="h6" sx={{ fontFamily: 'monospace', fontWeight: '900' }}>
                Cộng giỏ hàng
              </Typography>
              <Table>
                <OrderCartHeading />
                <TableBody sx={BoderDotted}>
                  <OrderCartBody orders={productSelect} />
                </TableBody>
                <TableFooter sx={NoBoder}>
                  <OrderCartFotter
                    label="Tạm tính"
                    value={productSelect
                      .reduce((tong, e) => tong + e.gia * e.soLuong, 0)
                      .toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}
                  />
                </TableFooter>
              </Table>
              <Button
                component={Link}
                to="/checkout"
                onClick={() => {
                  dispatch(setCheckout(productSelect))
                }}
                size="sm"
                variant="contained"
                color="warning"
                sx={{ minWidth: '100%' }}>
                <PaidRoundedIcon />
                <b> Tiến hành thanh toán</b>
              </Button>
            </Paper>
          )}
        </Grid2>
      </Grid2>
    </Container>
  )
}
