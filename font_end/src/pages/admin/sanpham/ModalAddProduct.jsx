import React, { useEffect, useState } from 'react'
import DialogAddUpdate from '../../../components/DialogAddUpdate'
import { Autocomplete, Button, TextField } from '@mui/material'
import './index.css'
import categoryApi from '../../../api/admin/sanpham/categoryApi'
import bradApi from '../../../api/admin/sanpham/bradApi'

export default function ModalAddProduct({ open, setOpen }) {
  const [categorys, setCategorys] = useState([])
  const [brands, setBrands] = useState([])

  useEffect(() => {
    try {
      categoryApi.getList().then((result) => {
        if (result.data.success) {
          setCategorys(result.data.data)
        }
      })
      bradApi.getList().then((result) => {
        if (result.data.success) {
          setBrands(result.data.data)
        }
      })
    } catch (error) {
      console.error(error)
    }
  }, [])

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
          id="combo-box-category"
          options={categorys.map((category) => {
            return { label: category.name, value: category.id }
          })}
          renderInput={(params) => <TextField color="cam" {...params} label="Danh mục" />}
        />
        <Autocomplete
          popupIcon={null}
          fullWidth
          size="small"
          className="search-field mt-3"
          id="combo-box-brand"
          options={brands.map((brand) => {
            return { label: brand.name, value: brand.id }
          })}
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
