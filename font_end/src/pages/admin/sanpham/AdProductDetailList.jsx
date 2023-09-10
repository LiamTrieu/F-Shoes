import {
  Backdrop,
  Box,
  Button,
  Chip,
  CircularProgress,
  Container,
  IconButton,
  MenuItem,
  Pagination,
  Paper,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material'
import React, { Fragment, useEffect, useState } from 'react'
import BreadcrumbsCustom from '../../../components/BreadcrumbsCustom'
import { FaPlus } from 'react-icons/fa'
import { spButton } from './sanPhamStyle'
import { RxMagnifyingGlass } from 'react-icons/rx'
import { MdEditSquare, MdChangeCircle } from 'react-icons/md'
import { Link, useParams } from 'react-router-dom'
import chiTietSanPhamApi from '../../../api/admin/sanpham/chiTietSanPhamApi'
import sanPhamApi from '../../../api/admin/sanpham/sanPhamApi'

const listBreadcrumb = [{ name: 'Sản phẩm', link: '/admin/product' }]
export default function AdProductDetailList() {
  const params = useParams()

  const [isBackdrop, setIsBackdrop] = useState(false)

  const [product, setProduct] = useState({})
  const [listProductDetail, setListProuctDetail] = useState([])
  const [filter, setFilter] = useState({ page: 1, size: 5 })
  const [pageRespone, setPageRespone] = useState({ currentPage: 1, totalPages: 0 })

  useEffect(() => {
    fechData(filter, params.idProduct)
  }, [filter, params.idProduct])

  async function fechData(filter, idProduct) {
    setIsBackdrop(true)
    await sanPhamApi.getById(idProduct).then((response) => {
      setProduct(response.data.data)
    })
    await chiTietSanPhamApi
      .getById(idProduct, filter)
      .then((response) => {
        const res = response.data
        setListProuctDetail(res.data)
        setPageRespone({ currentPage: res.currentPage, totalPages: res.totalPages })
      })
      .catch((error) => {
        console.log(error)
      })
    setIsBackdrop(false)
  }

  return (
    <Box>
      <BreadcrumbsCustom nameHere={product.name} listLink={listBreadcrumb} />
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isBackdrop}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Container component={Paper} elevation={3} sx={{ py: 3, borderRadius: '10px' }}>
        <Stack
          sx={{ mb: 2 }}
          direction="row"
          justifyContent="space-between"
          alignItems="flex-start"
          spacing={12}>
          <TextField
            id="seachProductDetail"
            InputProps={{
              required: true,
              startAdornment: (
                <RxMagnifyingGlass style={{ marginRight: '5px', fontSize: '25px' }} />
              ),
            }}
            sx={{ mr: 0.5, width: '50%' }}
            inputProps={{ style: { height: '20px' } }}
            size="small"
            placeholder="Tìm mã sản phẩm"
          />
          <Button
            component={Link}
            to={`/admin/product/detail/${params.idProduct}/add`}
            disableElevation
            sx={{ ...spButton }}
            variant="outlined">
            <Box component={FaPlus} sx={{ mr: '3px', fontSize: '15px' }} />
            Thêm&nbsp;
            <Box sx={{ display: { xs: 'none', md: 'inline' } }} component={'span'}>
              mới
            </Box>
          </Button>
        </Stack>
        {listProductDetail.length === 0 ? (
          <Typography variant="h6" component="h5" textAlign={'center'}>
            {isBackdrop ? 'Đang tải dữ liệu...' : 'Không có dữ liệu'}
          </Typography>
        ) : (
          <Fragment>
            <Table aria-label="simple table">
              <TableHead sx={{ backgroundColor: 'sanPham.colorTable' }}>
                <TableRow>
                  <TableCell sx={{ fontWeight: '500' }} align="center">
                    Ảnh
                  </TableCell>
                  <TableCell sx={{ fontWeight: '500' }} align="center">
                    Mã
                  </TableCell>
                  <TableCell sx={{ fontWeight: '500' }} align="center">
                    Loại
                  </TableCell>
                  <TableCell sx={{ fontWeight: '500' }} align="center">
                    Thương hiệu
                  </TableCell>
                  <TableCell sx={{ fontWeight: '500' }} align="center">
                    Màu sắc
                  </TableCell>
                  <TableCell sx={{ fontWeight: '500' }} align="center">
                    Đế giày
                  </TableCell>
                  <TableCell sx={{ fontWeight: '500' }} align="center">
                    Size
                  </TableCell>
                  <TableCell sx={{ fontWeight: '500' }} align="center">
                    Trạng thái
                  </TableCell>
                  <TableCell sx={{ fontWeight: '500' }} align="center">
                    Chức năng
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {listProductDetail.map((row) => (
                  <TableRow
                    key={`chitietsanpham${row.id}`}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell align="center">
                      <img alt="anh" style={{ width: '50px' }} src={row.image} />
                    </TableCell>
                    <TableCell align="center">{row.id}</TableCell>
                    <TableCell align="center">{row.category}</TableCell>
                    <TableCell align="center">{row.brand}</TableCell>
                    <TableCell align="center">
                      <Stack justifyContent="center" alignItems="center">
                        <Box
                          sx={{
                            width: '25px',
                            height: '25px',
                            backgroundColor: row.color,
                            borderRadius: '50px',
                          }}
                        />
                      </Stack>
                    </TableCell>
                    <TableCell align="center">{row.sole}</TableCell>
                    <TableCell align="center">{row.size}</TableCell>
                    <TableCell align="center">
                      {row.deleted ? (
                        <Chip size="small" color="error" label="Ngừng bán" />
                      ) : (
                        <Chip size="small" color="success" label="Đang bán" />
                      )}
                    </TableCell>
                    <TableCell align="center">
                      <Tooltip title="Đổi trạng thái">
                        <IconButton color="primary">
                          <MdChangeCircle style={{ fontSize: '20px' }} />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Chỉnh sửa">
                        <IconButton color="warning">
                          <MdEditSquare style={{ fontSize: '18px' }} />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
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
                color="primary"
                count={pageRespone.totalPages}
                page={pageRespone.currentPage + 1}
                onChange={(e, value) => {
                  e.preventDefault()
                  setFilter({ ...filter, page: value })
                }}
              />
            </Stack>
          </Fragment>
        )}
      </Container>
    </Box>
  )
}
