import { Autocomplete, Button, Container, Paper, Stack, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import BreadcrumbsCustom from '../../../components/BreadcrumbsCustom'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import ModalAddProduct from './ModalAddProduct'

import Empty from '../../../components/Empty'
import './index.css'
import sanPhamApi from '../../../api/admin/sanpham/sanPhamApi'
import soleApi from '../../../api/admin/sanpham/soleApi'
import materialApi from '../../../api/admin/sanpham/materialApi'
import colorApi from '../../../api/admin/sanpham/colorApi'
import sizeApi from '../../../api/admin/sanpham/sizeApi'

const listBreadcrumbs = [{ name: 'Sản phẩm', link: '/admin/product' }]

export default function AdProductAdd() {
  const [open, setOpen] = useState(false)
  const [products, setProducts] = useState([])
  const [soles, setSoles] = useState([])
  const [materials, setMaterials] = useState([])
  const [colors, setColors] = useState([])
  const [sizes, setSizes] = useState([])

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
                className="search-field"
                id="combo-box-demo"
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
                id="combo-box-demo"
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
                fullWidth
                className="search-field"
                id="combo-box-demo"
                options={colors.map((color) => {
                  return { label: color.name, value: color.id, code: color.code }
                })}
                renderOption={(props, option) => (
                  <li {...props}>
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
                multiple
                size="small"
                fullWidth
                className="search-field"
                id="combo-box-demo"
                options={sizes.map((size) => {
                  return { label: size.size, value: size.id }
                })}
                renderInput={(params) => (
                  <TextField color="cam" {...params} placeholder="Chọn kích cỡ" />
                )}
              />
            </div>
          </Stack>
        </Container>
      </Paper>
      <Paper sx={{ py: 2, mt: 2 }}>
        <Container className="container">
          <Typography
            mb={2}
            textAlign={'center'}
            fontWeight={'600'}
            variant="h6"
            color={'GrayText'}>
            Danh sách sản phẩm cùng loại
          </Typography>
          <Empty />
        </Container>
      </Paper>
    </div>
  )
}
