import React, { Fragment, useEffect, useState } from 'react'
import './index.css'
import {
  Box,
  Chip,
  Container,
  IconButton,
  InputAdornment,
  MenuItem,
  Pagination,
  Paper,
  Select,
  Slider,
  SliderThumb,
  Stack,
  Table,
  TableHead,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import { TbEyeEdit } from 'react-icons/tb'
import sanPhamApi from '../../../api/admin/sanpham/sanPhamApi'
import Empty from '../../../components/Empty'
import colorApi from '../../../api/admin/sanpham/colorApi'
import materialApi from '../../../api/admin/sanpham/materialApi'
import sizeApi from '../../../api/admin/sanpham/sizeApi'
import soleApi from '../../../api/admin/sanpham/soleApi'
import { useParams } from 'react-router-dom'
import { MdEditSquare } from 'react-icons/md'

import PropTypes from 'prop-types'

import BreadcrumbsCustom from '../../../components/BreadcrumbsCustom'
import styled from '@emotion/styled'
import ModalAddProduct from './ModalAddProduct'

const listBreadcrumbs = [{ name: 'Sản phẩm', link: '/admin/product' }]
function AirbnbThumbComponent(props) {
  const { children, ...other } = props
  return (
    <SliderThumb {...other}>
      {children}
      <span className="airbnb-bar" />
      <span className="airbnb-bar" />
      <span className="airbnb-bar" />
    </SliderThumb>
  )
}
const AirbnbSlider = styled(Slider)(({ theme }) => ({
  color: '#fc7c27',
  height: 3,
  padding: '13px 0',
  '& .MuiSlider-thumb': {
    height: 27,
    width: 27,
    backgroundColor: '#fff',
    border: '1px solid currentColor',
    '&:hover': {
      boxShadow: '0 0 0 8px rgba(58, 133, 137, 0.16)',
    },
    '& .airbnb-bar': {
      height: 9,
      width: 1,
      backgroundColor: '#fc7c27',
      marginLeft: 1,
      marginRight: 1,
    },
    '& .MuiSlider-valueLabel': {
      lineHeight: 1.2,
      fontSize: 12,
      backgroundColor: '#fc7c27',
    },
  },
}))

AirbnbThumbComponent.propTypes = {
  children: PropTypes.node,
}
export default function AdProductPageDetail() {
  const { id } = useParams()

  const [product, setProduct] = useState({})
  const [listColor, setListColor] = useState([])
  const [listMaterial, setListMaterial] = useState([])
  const [listSize, setListSize] = useState([])
  const [listSole, setListSole] = useState([])
  const [priceMax, setPriceMax] = useState(999999999)
  const [listProductDetail, setListProductDetail] = useState([])
  const [total, setTotal] = useState([])
  const [filter, setFilter] = useState({
    product: id,
    name: null,
    priceMin: 0,
    color: null,
    material: null,
    sizeFilter: null,
    sole: null,
    status: null,
    size: 5,
    page: 1,
  })
  const [openEditProduct, setOpenEditProduct] = useState(false)

  useEffect(() => {
    document.title = 'Admin - Sản phẩm chi tiết'
    sanPhamApi.getNameProduct(id).then((result) => {
      setProduct(result.data.data)
      setPriceMax(result.data.data.price)
    })
    colorApi.findAll().then((response) => {
      setListColor(response.data.data)
    })
    materialApi.findAll().then((response) => {
      setListMaterial(response.data.data)
    })
    sizeApi.findAll().then((response) => {
      setListSize(response.data.data)
    })
    soleApi.findAll().then((response) => {
      setListSole(response.data.data)
    })
  }, [id])

  useEffect(() => {
    sanPhamApi.getProductDetail({ ...filter, priceMax: priceMax }).then((response) => {
      setListProductDetail(response.data.data.data)
      setTotal(response.data.data.totalPages)
      if (filter.page > response.data.data.totalPages)
        if (response.data.data.totalPages > 0) {
          setFilter({ ...filter, page: response.data.data.totalPages })
        }
    })
  }, [filter, priceMax])

  return (
    <div className="san-pham">
      <ModalAddProduct
        dataProduct={product}
        title={'Cập nhập sản phẩm'}
        setOpen={setOpenEditProduct}
        open={openEditProduct}
      />
      <Stack direction="row">
        <BreadcrumbsCustom nameHere={product.name} listLink={listBreadcrumbs} />
        <Tooltip title="Chỉnh sửa">
          <IconButton
            color="warning"
            sx={{ mt: '-6px' }}
            onClick={() => {
              setOpenEditProduct(true)
            }}>
            <MdEditSquare style={{ fontSize: '18px' }} />
          </IconButton>
        </Tooltip>
      </Stack>
      <Container component={Paper} sx={{ py: 2 }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ paddingRight: '50px' }}>
          <TextField
            onChange={(e) => {
              setFilter({ ...filter, name: e.target.value })
            }}
            sx={{ width: '50%' }}
            className="search-field"
            size="small"
            color="cam"
            placeholder="Tìm kiếm sản phẩm"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="cam" />
                </InputAdornment>
              ),
            }}
          />
          <Box sx={{ width: '250px' }}>
            <b>0 VND</b>
            <b style={{ float: 'right' }}>{`${parseInt(product.price).toLocaleString('it-IT', {
              style: 'currency',
              currency: 'VND',
            })}`}</b>
            <AirbnbSlider
              onChangeCommitted={(_, value) => {
                setFilter({ ...filter, priceMin: value[0] })
                setPriceMax(value[1])
              }}
              min={0}
              max={product.price}
              valueLabelDisplay="auto"
              slots={{ thumb: AirbnbThumbComponent }}
              defaultValue={[filter.priceMin, priceMax]}
              valueLabelFormat={(value) =>
                `${value.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}`
              }
            />
          </Box>
        </Stack>
        <Stack my={2} direction="row" justifyContent="start" alignItems="center" spacing={1}>
          <div className="filter">
            <b>Màu sắc:</b>
            <Select
              displayEmpty
              size="small"
              value={filter.color}
              onChange={(e) => {
                setFilter({ ...filter, coloe: e.target.value })
              }}>
              <MenuItem value={null}>Tất cả</MenuItem>
              {listColor?.map((item) => (
                <MenuItem key={item?.id} value={item?.id}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
            <b style={{ marginLeft: '15px' }}>Chất liệu:</b>
            <Select
              displayEmpty
              size="small"
              value={filter.material}
              onChange={(e) => {
                setFilter({ ...filter, material: e.target.value })
              }}>
              <MenuItem value={null}>Tất cả</MenuItem>
              {listMaterial?.map((item) => (
                <MenuItem key={item?.id} value={item?.id}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
            <b style={{ marginLeft: '15px' }}>Kích cỡ:</b>
            <Select
              displayEmpty
              size="small"
              value={filter.sizeFilter}
              onChange={(e) => {
                setFilter({ ...filter, sizeFilter: e.target.value })
              }}>
              <MenuItem value={null}>Tất cả</MenuItem>
              {listSize?.map((item) => (
                <MenuItem key={item?.id} value={item?.id}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
            <b style={{ marginLeft: '15px' }}>Đế giày:</b>
            <Select
              displayEmpty
              size="small"
              value={filter.sole}
              onChange={(e) => {
                setFilter({ ...filter, sole: e.target.value })
              }}>
              <MenuItem value={null}>Tất cả</MenuItem>
              {listSole?.map((item) => (
                <MenuItem key={item?.id} value={item?.id}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
            <b style={{ marginLeft: '15px' }}>Trạng thái:</b>
            <Select
              displayEmpty
              size="small"
              value={filter.status}
              onChange={(e) => {
                setFilter({ ...filter, status: e.target.value })
              }}>
              <MenuItem value={null}>Tất cả</MenuItem>
              {[
                { id: 0, name: 'Đang bán' },
                { id: 1, name: 'Ngừng bán' },
              ].map((item) => (
                <MenuItem key={item?.id} value={item?.id}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </div>
        </Stack>
        {listProductDetail.length > 0 ? (
          <Fragment>
            <Table className="tableCss">
              <TableHead>
                <TableRow>
                  <TableCell align="center" width={'5%'}>
                    STT
                  </TableCell>
                  <TableCell>Mã</TableCell>
                  <TableCell>Màu sắc</TableCell>
                  <TableCell>Chất liệu</TableCell>
                  <TableCell>Size</TableCell>
                  <TableCell align="center">Cân nặng</TableCell>
                  <TableCell align="center">Số lượng</TableCell>
                  <TableCell align="center">Đơn giá</TableCell>
                  <TableCell>Trạng thái</TableCell>
                  <TableCell align="center">Thao tác</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {listProductDetail.map((product) => {
                  return (
                    <TableRow key={product.id}>
                      <TableCell align="center">{product.stt}</TableCell>
                      <TableCell sx={{ maxWidth: '0px' }}>{product?.code}</TableCell>
                      <TableCell>{product?.colorName}</TableCell>
                      <TableCell>{product?.material}</TableCell>
                      <TableCell>{product?.size}</TableCell>
                      <TableCell align="center">{product.weight}g</TableCell>
                      <TableCell align="center">{product.amount}</TableCell>
                      <TableCell align="center">{product.price}</TableCell>
                      <TableCell>
                        <Chip
                          className={
                            product.deleted === 0 ? 'chip-hoat-dong' : 'chip-khong-hoat-dong'
                          }
                          label={product.deleted === 0 ? 'Đang bán' : 'Ngừng bán'}
                          size="small"
                        />
                      </TableCell>
                      <TableCell align="center">
                        <TbEyeEdit fontSize={'25px'} color="#FC7C27" />
                      </TableCell>
                    </TableRow>
                  )
                })}
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
                  sản phẩm
                </Typography>
              </Typography>
              <Pagination
                variant="outlined"
                color="cam"
                count={total}
                page={filter.page}
                onChange={(e, value) => {
                  e.preventDefault()
                  setFilter({ ...filter, page: value })
                }}
              />
            </Stack>
          </Fragment>
        ) : (
          <Empty />
        )}
      </Container>
    </div>
  )
}
