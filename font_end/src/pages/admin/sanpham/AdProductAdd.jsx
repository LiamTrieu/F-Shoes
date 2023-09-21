import { Autocomplete, Button, Container, Paper, Stack, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import BreadcrumbsCustom from '../../../components/BreadcrumbsCustom'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import ModalAddProduct from './ModalAddProduct'
import './index.css'

const listBreadcrumbs = [{ name: 'Sản phẩm', link: '/admin/product' }]
export default function AdProductAdd() {
  const [open, setOpen] = useState(false)

  return (
    <div className="san-pham">
      <ModalAddProduct setOpen={setOpen} open={open} />
      <BreadcrumbsCustom nameHere={'Thêm sản phẩm'} listLink={listBreadcrumbs} />
      <Paper sx={{ py: 2 }}>
        <Container className="container">
          <Typography
            mb={3}
            textAlign={'center'}
            fontWeight={'600'}
            variant="h5"
            color={'GrayText'}>
            Thông tin sản phẩm
          </Typography>
          <Stack direction="row" spacing={1}>
            <Autocomplete
              popupIcon={null}
              fullWidth
              size="small"
              className="search-field"
              id="combo-box-demo"
              options={[
                { label: 'The Shawshank Redemption', year: 1994 },
                { label: 'The Godfather', year: 1972 },
              ]}
              renderInput={(params) => (
                <TextField color="cam" {...params} label="Nhập tên sản phẩm" />
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
        </Container>
      </Paper>
    </div>
  )
}
