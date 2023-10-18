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
import { GetCart, removeCart, updateCart } from '../../services/slices/cartSlice'

export default function Cart() {
  const product = useSelector(GetCart)
  const [arrData2, setArrData2] = useState([])
  const [isChk, setisChk] = useState(false)
  const dispath = useDispatch()

  useEffect(() => {
    setArrData2(
      product
        .filter((product) => product.checked)
        .map((product) => {
          return { ...product, gia: product.gia * product.soLuong }
        }),
    )
  }, [isChk, product])

  const onChangeCheck = (id) => {
    setisChk(true)
    const updatedProduct = product.map((cart) => {
      if (cart.id === id) {
        if (cart.checked) {
          setisChk(false)
        }
        return {
          ...cart,
          checked: !cart.checked,
        }
      }
      if (cart.id !== id && !cart.checked) {
        setisChk(false)
      }
      return cart
    })
    // setProduct(updatedProduct)
  }
  const onChangeSL = (cart, num) => {
    const soluong = cart.soLuong + num
    if (soluong <= 0) {
      dispath(removeCart(cart))
    } else {
      const updatedProduct = {
        ...cart,
        soLuong: soluong,
      }
      console.log(updatedProduct)
      dispath(updateCart(updatedProduct))
    }
  }

  const RowDataCustom = ({ cartDatas }) => {
    return cartDatas.map((cart) => {
      return (
        <TableRow sx={{ border: 0 }} key={cart.id}>
          <TableCell sx={{ px: 0 }}>
            <Checkbox checked={cart.checked} size="small" onClick={() => onChangeCheck(cart.id)} />
          </TableCell>
          <TableCell
            component={Link}
            to={`/product/${cart.id}`}
            style={{ verticalAlign: 'middle' }}
            sx={{ px: 0 }}>
            <Box component="span" display={{ lg: 'inline', xs: 'none' }}>
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
                maxWidth: '80%',
              }}>
              <p style={{ margin: 0 }}>
                <b>{cart.name}</b>
              </p>
              <p style={{ color: 'red', margin: '5px 0' }}>
                <b>{cart.gia.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</b>
              </p>
              <p style={{ margin: 0 }}>size:{cart.size}</p>
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
                  dispath(updateCart({ ...cart, soLuong: e.target.value }))
                }}
                defaultValue={cart.soLuong}
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
                // setProduct(updatedProduct)
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

  const chageChk = () => {
    const tempPrd = product.map((p) => {
      return { ...p, checked: !isChk }
    })
    setisChk(!isChk)
    // setProduct(tempPrd)
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
                    <Checkbox checked={isChk} size="small" onClick={() => chageChk()} />
                  </TableCell>
                  <TableCellCustom
                    className="table-custom"
                    labels={['Sản phẩm', 'Giá', 'Số lượng', 'Tạm tính', '']}
                    isCart={true}
                  />
                </TableRow>
                <TableRow sx={{ display: { md: 'none', xs: 'table-row' } }}>
                  <TableCell sx={{ width: '1%', px: 0 }}>
                    <Checkbox checked={isChk} size="small" onClick={() => chageChk()} />
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
          {arrData2.length !== 0 && (
            <Paper component={Container} variant="outlined" sx={{ minHeight: '74vh' }}>
              <Typography variant="h6" sx={{ fontFamily: 'monospace', fontWeight: '900' }}>
                Cộng giỏ hàng
              </Typography>
              <Table>
                <OrderCartHeading />
                <TableBody sx={BoderDotted}>
                  <OrderCartBody orders={arrData2} />
                </TableBody>
                <TableFooter sx={NoBoder}>
                  <OrderCartFotter
                    label="Tạm tính"
                    value={arrData2
                      .reduce((tong, e) => tong + e.gia, 0)
                      .toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}
                  />
                </TableFooter>
              </Table>
              <Button
                component={Link}
                to="/checkout"
                onClick={() => {
                  localStorage.setItem('checkout', JSON.stringify(arrData2))
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
