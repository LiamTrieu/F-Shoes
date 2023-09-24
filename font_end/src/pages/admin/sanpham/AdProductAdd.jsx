import {
  Autocomplete,
  Box,
  Button,
  Container,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import BreadcrumbsCustom from '../../../components/BreadcrumbsCustom'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import ModalAddProduct from './ModalAddProduct'

import './index.css'
import sanPhamApi from '../../../api/admin/sanpham/sanPhamApi'
import soleApi from '../../../api/admin/sanpham/soleApi'
import materialApi from '../../../api/admin/sanpham/materialApi'
import colorApi from '../../../api/admin/sanpham/colorApi'
import sizeApi from '../../../api/admin/sanpham/sizeApi'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'

import { AiFillDelete } from 'react-icons/ai'

const listBreadcrumbs = [{ name: 'Sản phẩm', link: '/admin/product' }]

export default function AdProductAdd() {
  const [open, setOpen] = useState(false)
  const [products, setProducts] = useState([])
  const [soles, setSoles] = useState([])
  const [materials, setMaterials] = useState([])
  const [colors, setColors] = useState([])
  const [sizes, setSizes] = useState([])

  const [newProducts, setNewProducts] = useState({
    product: null,
    sole: [],
    material: [],
    color: [],
    size: [],
  })
  const [newProductDetails, setNewProductDetails] = useState([])

  useEffect(() => {
    sanPhamApi.getList().then(
      (result) => {
        if (result.data.success) {
          setProducts(result.data.data)
        }
      },
      (err) => console.error(err),
    )
    soleApi.getList().then(
      (result) => {
        if (result.data.success) {
          setSoles(result.data.data)
        }
      },
      (err) => console.error(err),
    )
    materialApi.getList().then(
      (result) => {
        if (result.data.success) {
          setMaterials(result.data.data)
        }
      },
      (err) => console.error(err),
    )
    colorApi.getList().then(
      (result) => {
        if (result.data.success) {
          setColors(result.data.data)
        }
      },
      (err) => console.error(err),
    )
    sizeApi.getList().then(
      (result) => {
        if (result.data.success) {
          setSizes(result.data.data)
        }
      },
      (err) => console.error(err),
    )
  }, [])

  const newProductIsUndefined = (newProducts) => {
    return (
      newProducts.product !== null &&
      newProducts.sole.length !== 0 &&
      newProducts.material.length !== 0 &&
      newProducts.color.length !== 0 &&
      newProducts.size.length !== 0
    )
  }

  const genNewProductDetail = (newProducts) => {
    const preNewProductDetails = []
    newProducts.sole.forEach((sole) => {
      newProducts.material.forEach((material) => {
        newProducts.size.forEach((size) => {
          preNewProductDetails.push({
            sole: sole,
            material: material,
            size: size,
            price: 100000,
            amount: 100,
          })
        })
      })
    })
    return preNewProductDetails
  }

  return (
    <div className="san-pham">
      <ModalAddProduct setOpen={setOpen} open={open} />
      <BreadcrumbsCustom nameHere={'Thêm sản phẩm'} listLink={listBreadcrumbs} />
      <Paper sx={{ py: 2 }}>
        <Container className="container" sx={{ paddingBottom: '10px' }}>
          <Typography
            mb={1}
            textAlign={'center'}
            fontWeight={'600'}
            variant="h6"
            color={'GrayText'}>
            Thông tin sản phẩm
          </Typography>
          <b>Tên sản phẩm</b>
          <Stack direction="row" spacing={1}>
            <Autocomplete
              popupIcon={null}
              fullWidth
              value={newProducts.product}
              isOptionEqualToValue={(option, value) => option.value === value.value}
              onChange={(_, e) => {
                setNewProducts({ ...newProducts, product: e })
              }}
              size="small"
              className="search-field"
              id="combo-box-demo"
              options={products.map((product) => {
                return { label: product.name, value: product.id }
              })}
              renderInput={(params) => (
                <TextField color="cam" {...params} placeholder="Nhập tên sản phẩm" />
              )}
            />
            <Button
              onClick={() => setOpen(true)}
              sx={{ minWidth: '30px' }}
              variant="contained"
              color="cam"
              size="small">
              <AddCircleIcon />
            </Button>
          </Stack>
          <Stack className="mt-5" direction="row" spacing={1}>
            <div style={{ width: '100%' }}>
              <b>Đế giày</b>
              <Autocomplete
                multiple
                size="small"
                fullWidth
                value={newProducts.sole}
                isOptionEqualToValue={(option, value) => option.value === value.value}
                onChange={(_, e) => {
                  setNewProducts({ ...newProducts, sole: e })
                }}
                className="search-field"
                id="combo-box-sole"
                options={soles.map((sole) => {
                  return { label: sole.name, value: sole.id }
                })}
                renderInput={(params) => (
                  <TextField color="cam" {...params} placeholder="Chọn đế giày" />
                )}
              />
            </div>
            <div style={{ width: '100%' }}>
              <b>Chất liệu</b>
              <Autocomplete
                multiple
                size="small"
                fullWidth
                className="search-field"
                id="combo-box-material"
                value={newProducts.material}
                isOptionEqualToValue={(option, value) => option.value === value.value}
                onChange={(_, e) => {
                  setNewProducts({ ...newProducts, material: e })
                }}
                options={materials.map((material) => {
                  return { label: material.name, value: material.id }
                })}
                renderInput={(params) => (
                  <TextField color="cam" {...params} placeholder="Chọn chất liệu" />
                )}
              />
            </div>
          </Stack>
          <Stack className="mt-5" direction="row" spacing={1}>
            <div style={{ width: '100%' }}>
              <b>Màu sắc</b>
              <Autocomplete
                multiple
                size="small"
                value={newProducts.color}
                isOptionEqualToValue={(option, value) => option.value === value.value}
                fullWidth
                onChange={(_, e) => {
                  setNewProducts({ ...newProducts, color: e })
                }}
                className="search-field"
                id="combo-box-color"
                options={colors.map((color) => {
                  return { label: color.name, value: color.id, code: color.code }
                })}
                renderOption={(props, option) => (
                  <li key={`color${option.value}`} {...props}>
                    <div
                      style={{
                        borderRadius: '50%',
                        width: '15px',
                        height: '15px',
                        backgroundColor: option.code,
                        marginRight: '5px',
                      }}
                    />
                    {option.label}
                  </li>
                )}
                renderInput={(params) => (
                  <TextField color="cam" {...params} placeholder="Chọn màu sắc" />
                )}
              />
            </div>
            <div style={{ width: '100%' }}>
              <b>Kích cỡ</b>
              <Autocomplete
                noOptionsText={
                  <Button
                    size="small"
                    fullWidth
                    variant="outlined"
                    color="den"
                    onClick={() => console.log('Add new')}>
                    Thêm mới
                  </Button>
                }
                multiple
                size="small"
                fullWidth
                value={newProducts.size}
                isOptionEqualToValue={(option, value) => option.value === value.value}
                onChange={(_, e) => {
                  setNewProducts({ ...newProducts, size: e })
                }}
                className="search-field"
                id="combo-box-size"
                options={sizes.map((size) => {
                  return { label: size.size.toString(), value: size.id }
                })}
                renderInput={(params) => (
                  <TextField color="cam" {...params} placeholder="Chọn kích cỡ" />
                )}
              />
            </div>
          </Stack>
        </Container>
      </Paper>
      {newProductIsUndefined(newProducts) &&
        newProducts.color.map((color, index) => {
          return (
            <Paper key={`papaerNewProduct${index}`} sx={{ py: 2, mt: 2 }}>
              <Container>
                <Typography
                  mb={2}
                  textAlign={'center'}
                  fontWeight={'600'}
                  variant="h7"
                  color={'GrayText'}>
                  Danh sách sản phẩm màu {color.label}
                </Typography>
                <Table className="tableCss">
                  <TableHead>
                    <TableRow>
                      <TableCell align="center" width={'10%'}>
                        STT
                      </TableCell>
                      <TableCell width={'35%'}>Sản phẩm</TableCell>
                      <TableCell width={'15%'}>Chất liệu</TableCell>
                      <TableCell width={'15%'}>Đế giày</TableCell>
                      <TableCell width={'15%'}>Size</TableCell>
                      <TableCell align="center" width={'10%'}>
                        Số lượng
                      </TableCell>
                      <TableCell width={'10%'} align="center">
                        Giá
                      </TableCell>
                      <TableCell width={'10%'} align="center">
                        Thao tác
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {genNewProductDetail(newProducts).map((productDetail, index) => {
                      return (
                        <TableRow>
                          <TableCell align="center">{index + 1}</TableCell>
                          <TableCell sx={{ maxWidth: '0px' }}>
                            {newProducts.product.label}
                          </TableCell>
                          <TableCell>{productDetail.material.label}</TableCell>
                          <TableCell>{productDetail.sole.label}</TableCell>
                          <TableCell>{productDetail.size.label}</TableCell>
                          <TableCell align="center">
                            <TextField
                              value={productDetail.amount}
                              inputProps={{ min: 1 }}
                              size="small"
                              sx={{
                                '& input': { p: 0, textAlign: 'center' },
                                '& fieldset': {
                                  border: 'none',
                                },
                              }}
                            />
                          </TableCell>
                          <TableCell align="center">{productDetail.price}</TableCell>
                          <TableCell align="center">
                            <AiFillDelete fontSize={'25px'} color="#FC7C27" />
                          </TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </Container>
            </Paper>
          )
        })}
    </div>
  )
}
