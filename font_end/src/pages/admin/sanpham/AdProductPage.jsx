import React, { useState } from 'react'
import './index.css'
import {
  Button,
  Chip,
  Container,
  InputAdornment,
  Paper,
  Stack,
  Table,
  TableHead,
  TextField,
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import { SelectFilter } from '../../../components/admin/sanpham/SanPham'
import { AiOutlinePlusSquare } from 'react-icons/ai'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import { TbEyeEdit } from 'react-icons/tb'

export default function AdProductPage() {
  const [category, setCategory] = useState('')
  const [brand, setBrand] = useState('')
  const [status, setStatus] = useState('')

  return (
    <div className="san-pham">
      <Container component={Paper} sx={{ py: 2 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <TextField
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
          <Button color="cam" variant="contained" className="them-moi">
            <AiOutlinePlusSquare style={{ marginRight: '5px', fontSize: '17px' }} />
            Thêm mới
          </Button>
        </Stack>
        <Stack my={2} direction="row" justifyContent="start" alignItems="center" spacing={1}>
          <SelectFilter
            value={category}
            setValue={setCategory}
            label={'Danh mục'}
            data={[{ id: 1, name: 'Thể thao' }]}
          />
          <SelectFilter
            value={brand}
            setValue={setBrand}
            label={'Thương hiệu'}
            data={[{ id: 2, name: 'Niked' }]}
          />
          <SelectFilter
            value={status}
            setValue={setStatus}
            label={'Trạng thái'}
            data={[{ id: 3, name: 'Đang bán' }]}
          />
        </Stack>
        <Table className="tableCss">
          <TableHead>
            <TableRow>
              <TableCell align="center" width={'5%'}>
                STT
              </TableCell>
              <TableCell align="center" width={'35%'}>
                Tên sản phẩm
              </TableCell>
              <TableCell align="center" width={'15%'}>
                Danh mục
              </TableCell>
              <TableCell align="center" width={'15%'}>
                Hãng
              </TableCell>
              <TableCell align="center" width={'10%'}>
                Số lượng
              </TableCell>
              <TableCell align="center" width={'10%'}>
                Trạng thái
              </TableCell>
              <TableCell align="center" width={'10%'}>
                Thao tác
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell align="center">999</TableCell>
              <TableCell align="center" sx={{ maxWidth: '0px' }}>
                Air Fore one
              </TableCell>
              <TableCell align="center">Giày nam</TableCell>
              <TableCell align="center">Adidas</TableCell>
              <TableCell align="center">100</TableCell>
              <TableCell align="center">
                <Chip className="chip-hoat-dong" label="Đang bán" size="small" />
              </TableCell>
              <TableCell align="center">
                <TbEyeEdit fontSize={'25px'} color="#FC7C27" />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Container>
    </div>
  )
}
