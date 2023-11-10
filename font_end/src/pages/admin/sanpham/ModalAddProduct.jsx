import React, { useState } from 'react'
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
  setProduct,
}) {
  const [err, setErr] = useState(null)
  const handleUpdateNameProduct = (id, nameProduct) => {
    if (nameProduct.trim().length > 0) {
      sanPhamApi
        .updateNameProduct(id, nameProduct.trim())
        .then(() => {
          toast.success('cập nhật thành công', {
            position: toast.POSITION.TOP_RIGHT,
          })
          setProduct({ ...dataProduct, name: nameProduct })
        })
        .catch(() => {
          toast.error('cập nhật thất bại', {
            position: toast.POSITION.TOP_RIGHT,
          })
        })
      setOpen(false)
    } else {
      setErr('Tên sản phẩm không được để trống')
    }
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
        {err && <span style={{ color: 'red', textAlign: 'center' }}>{err}</span>}
      </div>
    </DialogAddUpdate>
  )
}
