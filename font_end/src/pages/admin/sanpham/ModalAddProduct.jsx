import * as React from 'react'
import DialogAddUpdate from '../../../components/DialogAddUpdate'
import { Autocomplete, Button, MenuItem, Select, TextField } from '@mui/material'
import './index.css'

export default function ModalAddProduct({ open, setOpen }) {
  return (
    <DialogAddUpdate
      open={open}
      setOpen={setOpen}
      title={'Thêm mới sản phẩm'}
      buttonSubmit={
        <Button
          style={{ boxShadow: 'none', textTransform: 'none', borderRadius: '8px' }}
          color="cam"
          variant="contained">
          Lưu
        </Button>
      }>
      <div className="san-pham">
        <TextField
          color="cam"
          className="search-field"
          size="small"
          fullWidth
          label="Tên sản phẩm"
        />
        <Autocomplete
          popupIcon={null}
          fullWidth
          size="small"
          className="search-field mt-3"
          id="combo-box-demo"
          options={[
            { label: 'The Shawshank Redemption', year: 1994 },
            { label: 'The Godfather', year: 1972 },
          ]}
          renderInput={(params) => <TextField color="cam" {...params} label="Danh mục" />}
        />
        <Autocomplete
          popupIcon={null}
          fullWidth
          size="small"
          className="search-field mt-3"
          id="combo-box-demo"
          options={[
            { label: 'The Shawshank Redemption', year: 1994 },
            { label: 'The Godfather', year: 1972 },
          ]}
          renderInput={(params) => <TextField color="cam" {...params} label="Thương hiệu" />}
        />
        <TextField
          color="cam"
          className="mt-3 search-field"
          label="Mô tả sản phẩm"
          multiline
          rows={2}
          variant="outlined"
          fullWidth
        />
      </div>
    </DialogAddUpdate>
  )
}
