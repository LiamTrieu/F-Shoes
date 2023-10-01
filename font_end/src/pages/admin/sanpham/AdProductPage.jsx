import React, { Fragment, useEffect, useState } from 'react'
import './index.css'
import {
  Button,
  Chip,
  Container,
  FormControlLabel,
  IconButton,
  InputAdornment,
  MenuItem,
  Pagination,
  Paper,
  Radio,
  RadioGroup,
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
import sanPhamApi from '../../../api/admin/sanpham/sanPhamApi'
import { Link } from 'react-router-dom'
import Empty from '../../../components/Empty'
import dayjs from 'dayjs'

export default function AdProductPage() {
  const [listProduct, setListProduct] = useState([])
  const [total, setTotal] = useState(0)
  const [filter, setFilter] = useState({
    status: '',
    name: '',
    size: 5,
    page: 1,
  })

  useEffect(() => {
    fetchData(filter)
  }, [filter])

  function fetchData(filter) {
    sanPhamApi.get(filter).then((response) => {
      setListProduct(response.data.data.data)
      setTotal(response.data.data.totalPages)
      if (filter.page > response.data.data.totalPages)
        if (response.data.data.totalPages > 0) {
          setFilter({ ...filter, page: response.data.data.totalPages })
        }
    })
  }

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
          <Button
            component={Link}
            to="/admin/product/add"
            color="cam"
            variant="outlined"
            className="them-moi">
            <AiOutlinePlusSquare style={{ marginRight: '5px', fontSize: '17px' }} />
            Thêm mới
          </Button>
        </Stack>
        <Stack my={2} direction="row" justifyContent="start" alignItems="center" spacing={1}>
          <div className="filter">
            <b>Trạng thái:</b>
          </div>
          <RadioGroup
            row
            aria-label="status"
            name="status"
            value={filter.status}
            onChange={(e) => {
              setFilter({ ...filter, status: e.target.value })
            }}>
            <FormControlLabel
              value={''}
              control={<Radio color="cam" size="small" />}
              label="Tất cả"
            />
            <FormControlLabel
              value={0}
              control={<Radio color="cam" size="small" />}
              label="Đang bán"
            />
            <FormControlLabel
              value={1}
              control={<Radio color="cam" size="small" />}
              label="Ngừng bán"
            />
          </RadioGroup>
        </Stack>
        {listProduct.length > 0 ? (
          <Fragment>
            <Table className="tableCss">
              <TableHead>
                <TableRow>
                  <TableCell align="center" width={'7%'}>
                    STT
                  </TableCell>
                  <TableCell width={'30%'}>Tên sản phẩm</TableCell>
                  <TableCell width={'15%'}>Ngày thêm</TableCell>
                  <TableCell align="center" width={'15%'}>
                    Số lượng
                  </TableCell>
                  <TableCell width={'10%'} align="center">
                    Trạng thái
                  </TableCell>
                  <TableCell width={'10%'} align="center">
                    Thao tác
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {listProduct.map((product) => {
                  return (
                    <TableRow key={product.id}>
                      <TableCell align="center">{product.stt}</TableCell>
                      <TableCell sx={{ maxWidth: '0px' }}>{product.name}</TableCell>
                      <TableCell>{dayjs(product.createdAt).format('DD-MM-YYYY')}</TableCell>
                      <TableCell align="center">{product.amount}</TableCell>
                      <TableCell align="center">
                        <Chip
                          className={
                            product.status === 0 ? 'chip-hoat-dong' : 'chip-khong-hoat-dong'
                          }
                          label={product.status === 0 ? 'Đang bán' : 'Ngừng bán'}
                          size="small"
                        />
                      </TableCell>
                      <TableCell align="center">
                        <IconButton
                          color="cam"
                          component={Link}
                          to={`/admin/product/${product.id}`}>
                          <TbEyeEdit fontSize={'25px'} />
                        </IconButton>
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
                  color="cam"
                  onChange={(e) => {
                    setFilter({ ...filter, size: e.target.value })
                  }}
                  sx={{ height: '25px', mx: 0.5 }}
                  size="small"
                  value={filter.size}>
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
