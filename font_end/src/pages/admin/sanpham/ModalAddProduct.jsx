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
        <b>
          <span style={{ color: 'red' }}>*</span>Tên sản phẩm
        </b>
        <TextField
          defaultValue={dataProduct.name}
          color="cam"
          className="search-field"
          size="small"
          fullWidth
          placeholder="Tên sản phẩm"
        />
      </div>
    </DialogAddUpdate>
  )
}
