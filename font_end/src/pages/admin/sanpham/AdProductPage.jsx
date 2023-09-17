import React, { useState } from 'react'
import './index.css'
import {
  Button,
  Container,
  InputAdornment,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import { SelectFilter } from '../../../components/admin/sanpham/SanPham'
import { SiMicrosoftexcel } from 'react-icons/si'
import { AiOutlinePlusSquare } from 'react-icons/ai'

export default function AdProductPage() {
  const [category, setCategory] = useState('')
  const [brand, setBrand] = useState('')
  const [material, setMaterial] = useState('')
  const [sole, setSole] = useState('')
  return (
    <div className="san-pham">
      <Container component={Paper} sx={{ py: 2 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <TextField
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
          <Button color="success" variant="contained" className="them-moi">
            <SiMicrosoftexcel style={{ marginRight: '5px' }} />
            Export excel
          </Button>
        </Stack>
        <Stack mt={2} direction="row" justifyContent="start" alignItems="center" spacing={1}>
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
            value={material}
            setValue={setMaterial}
            label={'Chất liệu'}
            data={[{ id: 3, name: 'Da con vịt' }]}
          />
          <SelectFilter
            value={sole}
            setValue={setSole}
            label={'Đế giày'}
            data={[{ id: 4, name: 'Đế đinh' }]}
          />
        </Stack>
      </Container>
      <Paper sx={{ mt: 2 }}>
        <Stack
          sx={{ p: 2, pb: 0 }}
          direction="row"
          justifyContent="space-between"
          alignItems="center">
          <Typography fontWeight={500}>Danh sánh sản phẩm hiện có</Typography>
          <Button color="cam" variant="contained" className="them-moi">
            <AiOutlinePlusSquare style={{ marginRight: '5px', fontSize: '17px' }} />
            Thêm mới
          </Button>
        </Stack>
      </Paper>
    </div>
  )
}
