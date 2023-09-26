import React, { Fragment, useEffect, useState } from 'react'
import './index.css'
import {
  Button,
  Chip,
  Container,
  InputAdornment,
  MenuItem,
  Pagination,
  Paper,
  Select,
  Stack,
  Table,
  TableHead,
  TextField,
  Typography,
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import { AiOutlinePlusSquare } from 'react-icons/ai'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import { TbEyeEdit } from 'react-icons/tb'
import bradApi from '../../../api/admin/sanpham/bradApi'
import categoryApi from '../../../api/admin/sanpham/categoryApi'
import sanPhamApi from '../../../api/admin/sanpham/sanPhamApi'
import Empty from '../../../components/Empty'
import colorApi from '../../../api/admin/sanpham/colorApi'
import materialApi from '../../../api/admin/sanpham/materialApi'
import sizeApi from '../../../api/admin/sanpham/sizeApi'
import soleApi from '../../../api/admin/sanpham/soleApi'
import { useParams } from 'react-router-dom'

export default function AdProductPageDetail() {
  const { id } = useParams()

  const [listColor, setListColor] = useState([])
  const [listMaterial, setListMaterial] = useState([])
  const [listSize, setListSize] = useState([])
  const [listSole, setListSole] = useState([])
  const [listProductDetail, setListProductDetail] = useState([])
  const [total, setTotal] = useState([])
  const [filter, setFilter] = useState({
    product: id,
    priceMin: 0,
    priceMax: 0,
    size: 5,
    page: 1,
  })

  useEffect(() => {
    document.title = 'Admin - Sản phẩm chi tiết'
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
  }, [])

  useEffect(() => {
    sanPhamApi.getProductDetail(filter).then((response) => {
      setListProductDetail(response.data.data.data)
      setTotal(response.data.data.totalPages)
      if (filter.page > response.data.data.totalPages)
        if (response.data.data.totalPages > 0) {
          setFilter({ ...filter, page: response.data.data.totalPages })
        }
    })
  }, [filter])

  return (
    <div className="san-pham">
      <Container component={Paper} sx={{ py: 2 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <TextField
            onChange={(e) => {
              console.log(e.target.value)
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
        </Stack>
        <Stack my={2} direction="row" justifyContent="start" alignItems="center" spacing={1}>
          <div className="filter">
            <b>Màu sắc:</b>
            <Select
              displayEmpty
              size="small"
              value={filter.color}
              onChange={(e) => {
                setFilter({ ...filter, category: e.target.value })
              }}>
              <MenuItem value={null}>Tất cả</MenuItem>
              {listColor?.map((item) => (
                <MenuItem key={item?.id} value={item?.id}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
            <b>Chất liệu:</b>
            <Select
              displayEmpty
              size="small"
              value={filter.material}
              onChange={(e) => {
                setFilter({ ...filter, brand: e.target.value })
              }}>
              <MenuItem value={null}>Tất cả</MenuItem>
              {listMaterial?.map((item) => (
                <MenuItem key={item?.id} value={item?.id}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
            <b>Kích cỡ:</b>
            <Select
              displayEmpty
              size="small"
              value={filter.sizeFilter}
              onChange={(e) => {
                setFilter({ ...filter, brand: e.target.value })
              }}>
              <MenuItem value={null}>Tất cả</MenuItem>
              {listSize?.map((item) => (
                <MenuItem key={item?.id} value={item?.id}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
            <b>Đế giày:</b>
            <Select
              displayEmpty
              size="small"
              value={filter.sole}
              onChange={(e) => {
                setFilter({ ...filter, brand: e.target.value })
              }}>
              <MenuItem value={null}>Tất cả</MenuItem>
              {listSole?.map((item) => (
                <MenuItem key={item?.id} value={item?.id}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
            <b>Trạng thái:</b>
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
                  <TableCell width={'35%'}>Tên sản phẩm</TableCell>
                  <TableCell width={'15%'}>Danh mục</TableCell>
                  <TableCell width={'15%'}>Thương hiệu</TableCell>
                  <TableCell align="center" width={'10%'}>
                    Số lượng
                  </TableCell>
                  <TableCell width={'10%'}>Trạng thái</TableCell>
                  <TableCell width={'10%'} align="center">
                    Thao tác
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {listProductDetail.map((product) => {
                  return (
                    <TableRow>
                      <TableCell align="center">{product.stt}</TableCell>
                      <TableCell sx={{ maxWidth: '0px' }}>{product?.name}</TableCell>
                      <TableCell>{product?.category}</TableCell>
                      <TableCell>{product?.brand}</TableCell>
                      <TableCell align="center">{product.amount}</TableCell>
                      <TableCell>
                        <Chip
                          className={
                            product.status === 0 ? 'chip-hoat-dong' : 'chip-khong-hoat-dong'
                          }
                          label={product.status === 0 ? 'Đang bán' : 'Ngừng bán'}
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
