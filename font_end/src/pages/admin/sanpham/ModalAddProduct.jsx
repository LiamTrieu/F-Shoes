import React from 'react'
import DialogAddUpdate from '../../../components/DialogAddUpdate'
import { Button, TextField } from '@mui/material'
import './index.css'
import sanPhamApi from '../../../api/admin/sanpham/sanPhamApi'
import { toast } from 'react-toastify'

export default function ModalAddProduct({
  open,
  setOpen,
  title,
  dataProduct,
  nameProduct,
  setNameProduct,
}) {
  const handleUpdateNameProduct = (id, nameProduct) => {
    sanPhamApi
      .updateNameProduct(id, nameProduct)
      .then(() => {
        toast.success('cập nhật thành công', {
          position: toast.POSITION.TOP_RIGHT,
        })
      })
      .catch(() => {
        toast.error('cập nhật thất bại', {
          position: toast.POSITION.TOP_RIGHT,
        })
      })
    setOpen(false)
  }
  return (
    <DialogAddUpdate
      open={open}
      setOpen={setOpen}
      title={title}
      buttonSubmit={
        <Button
          onClick={() => handleUpdateNameProduct(dataProduct.id, nameProduct)}
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
          onChange={(e) => setNameProduct(e.target.value)}
        />
      </div>
    </DialogAddUpdate>
  )
}
