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
const arrData = [
  {
    id: 2,
    name: 'Air Jordan 1 Mid - Neutral Grey',
    size: 40,
    gia: '100.000',
    soLuong: 1,
    image: 'https://shorturl.at/dfhyC',
    checked: false,
  },
  {
    id: 1,
    name: 'Air Jordan 1 Mid - Neutral Grey',
    size: 43,
    gia: '500.000',
    soLuong: 3,
    image: 'https://shorturl.at/dfhyC',
    checked: false,
  },
]

const arrData2 = [
  {
    id: 2,
    name: 'Air Jordan 1 Mid - Neutral Grey - 41 x 2',
    gia: 20000,
  },
  {
    id: 1,
    name: 'Air Jordan 1 Mid - Neutral Grey - 41 x 3',
    gia: 30000,
  },
]

export default function Cart() {
  const [product, setProduct] = useState([])
  const [isChk, setisChk] = useState(false)

  useEffect(() => {
    setProduct(arrData)
  }, [])

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
    setProduct(updatedProduct)
  }
  const onChangeSL = (id, num) => {
    const updatedProduct = product.map((cart) => {
      if (cart.id === id) {
        return {
          ...cart,
          soLuong: cart.soLuong + (cart.soLuong + num < 1 ? 0 : num),
        }
      }
      return cart
    })
    setProduct(updatedProduct)
  }

  const onInputChangeSL = (id, e) => {
    const parsedValue = parseInt(e.target.value)
    const updatedProduct = product.map((cart) => {
      if (cart.id === id) {
        return {
          ...cart,
          soLuong:
            e.target.value === '' ? 0 : isNaN(parsedValue) || parsedValue < 1 ? 1 : parsedValue,
        }
      }
      return cart
    })
    setProduct(updatedProduct)
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
                <b>{cart.gia}&#8363;</b>
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
            {cart.gia}&#8363;
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
              <IconButton onClick={() => onChangeSL(cart.id, -1)} sx={{ p: 0 }} size="small">
                <RemoveIcon fontSize="1px" />
              </IconButton>
              <TextField
                onChange={(e) => onInputChangeSL(cart.id, e)}
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
              <IconButton onClick={() => onChangeSL(cart.id, 1)} size="small" sx={{ p: 0 }}>
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
            {cart.gia * cart.soLuong}.000&#8363;
          </TableCell>
          <TableCell>
            <Button
              onClick={() => {
                const updatedProduct = product.filter((item) => item.id !== cart.id)
                setProduct(updatedProduct)
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
    setProduct(tempPrd)
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
                <OrderCartFotter label="Tạm tính" value={2000000} />
              </TableFooter>
            </Table>
            <Button
              component={Link}
              to="/checkout"
              size="sm"
              variant="contained"
              color="warning"
              sx={{ minWidth: '100%' }}>
              <PaidRoundedIcon />
              <b> Tiến hành thanh toán</b>
            </Button>
          </Paper>
        </Grid2>
      </Grid2>
    </Container>
  )
}
