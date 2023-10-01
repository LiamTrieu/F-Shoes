import React from 'react'
import DialogAddUpdate from '../../../components/DialogAddUpdate'
import { Button, TextField } from '@mui/material'
import './index.css'

export default function ModalAddProduct({ open, setOpen, title, dataProduct }) {
  return (
    <DialogAddUpdate
      open={open}
      setOpen={setOpen}
      title={title}
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
          defaultValue={dataProduct.nameProduct}
          color="cam"
          className="search-field"
          size="small"
          fullWidth
          label="Tên sản phẩm"
        />
      </div>
    </DialogAddUpdate>
  )
}
