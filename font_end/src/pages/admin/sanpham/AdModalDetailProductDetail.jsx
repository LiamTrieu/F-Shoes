import {
  Autocomplete,
  Button,
  Checkbox,
  Container,
  Dialog,
  DialogContent,
  Grid,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import categoryApi from '../../../api/admin/sanpham/categoryApi'
import bradApi from '../../../api/admin/sanpham/bradApi'
import soleApi from '../../../api/admin/sanpham/soleApi'
import materialApi from '../../../api/admin/sanpham/materialApi'
import colorApi from '../../../api/admin/sanpham/colorApi'
import sizeApi from '../../../api/admin/sanpham/sizeApi'
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd'
import './index.css'
import sanPhamApi from '../../../api/admin/sanpham/sanPhamApi'
import { MdImageSearch } from 'react-icons/md'
import DialogAddUpdate from '../../../components/DialogAddUpdate'
import { RiImageAddFill } from 'react-icons/ri'
import { toast } from 'react-toastify'
import confirmSatus from '../../../components/comfirmSwal'

export default function AdModalDetailProductDetail({
  productDetail,
  open,
  setOpen,
  fetchData,
  filter,
  priceMax,
}) {
  const [categorys, setCategorys] = useState([])
  const [err, setErr] = useState({
    image: null,
    brand: null,
    category: null,
    sole: null,
    material: null,
    color: null,
    size: null,
    weight: null,
    amount: null,
    price: null,
  })
  const [openSelectImage, setOpenSelectImg] = useState(false)
  const [brands, setBrands] = useState([])
  const [soles, setSoles] = useState([])
  const [materials, setMaterials] = useState([])
  const [colors, setColors] = useState([])
  const [sizes, setSizes] = useState([])
  const [preProductDetail, setPreProductDetail] = useState({
    id: productDetail.id,
    image: productDetail.image,
    brand: { label: productDetail.brand.name, value: productDetail.brand.id },
    category: { label: productDetail.category.name, value: productDetail.category.id },
    sole: { label: productDetail.sole.name, value: productDetail.sole.id },
    material: { label: productDetail.material.name, value: productDetail.material.id },
    color: {
      label: productDetail.color.name,
      value: productDetail.color.id,
      code: productDetail.color.code,
    },
    size: { label: productDetail.size.size.toString(), value: productDetail.size.id },
    weight: productDetail.weight,
    amount: productDetail.amount,
    price: productDetail.price,
    description: productDetail.description,
  })
  const [images, setImages] = useState([])

  useEffect(() => {
    categoryApi.getList().then(
      (result) => {
        if (result.data.success) {
          setCategorys(result.data.data)
        }
      },
      (err) => console.error(err),
    )
    bradApi.getList().then(
      (result) => {
        if (result.data.success) {
          setBrands(result.data.data)
        }
      },
      (err) => console.error(err),
    )
    soleApi.getList().then(
      (result) => {
        if (result.data.success) {
          setSoles(result.data.data)
        }
      },
      (err) => console.error(err),
    )
    materialApi.getList().then(
      (result) => {
        if (result.data.success) {
          setMaterials(result.data.data)
        }
      },
      (err) => console.error(err),
    )
    colorApi.getList().then(
      (result) => {
        if (result.data.success) {
          setColors(result.data.data)
        }
      },
      (err) => console.error(err),
    )
    sizeApi.getList().then(
      (result) => {
        if (result.data.success) {
          setSizes(result.data.data)
        }
      },
      (err) => console.error(err),
    )
  }, [productDetail])

  useEffect(() => {
    if (preProductDetail.color) {
      sanPhamApi.getListImage(preProductDetail.color.value).then(
        (response) => {
          if (response.data.success) {
            setImages(response.data.data)
          }
        },
        (error) => {
          console.error(error)
        },
      )
    } else {
      setImages([])
    }
  }, [preProductDetail.color])

  const uploadImage = (event, nameFolder) => {
    const formData = new FormData()
    for (let index = 0; index < event.target.files.length; index++) {
      formData.append('listImage', event.target.files[index])
    }
    sanPhamApi
      .uploadImage(formData, nameFolder)
      .then((response) => {
        if (response.data.success) {
          const preImage = images
          setImages([
            ...preImage.map((img) => {
              if (img.idColor === nameFolder) {
                return { idColor: nameFolder, data: [...img.data, ...response.data.data] }
              } else {
                return img
              }
            }),
          ])
          toast.success('Tải ảnh lên thành công')
          document.getElementById('them-anh').value = ''
        }
      })
      .catch((error) => {
        console.error(error)
        toast.error('Tải lên ảnh thất bại')
      })
  }

  const [imageSelect, setImageSelect] = useState(productDetail.image)
  const ContentModal = ({ images }) => {
    const handleCheckboxChange = (event, index) => {
      const selectedImage = images[index]
      const preImageSelect = [...imageSelect]

      if (event.target.checked) {
        if (preImageSelect.length === 3) {
          toast.warning('Chỉ chọn tối đa 3 ảnh')
        } else {
          preImageSelect.push(selectedImage)
          setImageSelect((prevImages) => [...prevImages, selectedImage])
        }
      } else {
        const index = preImageSelect.findIndex((img) => img === selectedImage)
        if (index !== -1) {
          preImageSelect.splice(index, 1)
        }
        validate({ ...preProductDetail, image: preImageSelect })
        setImageSelect(preImageSelect)
      }
    }

    return (
      <div style={{ marginTop: '10px', textAlign: 'center' }}>
        {images?.length > 0 ? (
          <Grid
            className="hidden-scroll-bar mt-1"
            container
            spacing={1}
            style={{ maxHeight: '290px', overflow: 'auto' }}>
            {images.map((image, index) => (
              <Grid item xs={3} key={`selectImage${index}`} style={{ position: 'relative' }}>
                <Checkbox
                  checked={imageSelect?.includes(image)}
                  onChange={(event) => handleCheckboxChange(event, index)}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    color: '#FC7C27',
                    '&.MuiChecked': {
                      color: '#FC7C27',
                    },
                  }}
                />
                <img
                  style={{ border: '1px dashed #FC7C27', borderRadius: '5px' }}
                  height={'90px'}
                  width={'100%'}
                  src={image}
                  alt={`anh-${index}`}
                />
              </Grid>
            ))}
          </Grid>
        ) : (
          <img height={'90px'} src={require('../../../assets/image/no-data.png')} alt="no-data" />
        )}
      </div>
    )
  }

  function validate(product) {
    let preErr = {
      image: null,
      brand: null,
      category: null,
      sole: null,
      material: null,
      color: null,
      size: null,
      weight: null,
      amount: null,
      price: null,
    }
    let check = true
    if (product.image.length < 3) {
      preErr = { ...preErr, image: 'Ảnh sản phẩm phải là 3' }
      check = false
    }
    if (product.brand === null) {
      preErr = { ...preErr, brand: 'Thương hiệu không được trống' }
      check = false
    }
    if (product.category === null) {
      preErr = { ...preErr, category: 'Danh mục không được trống' }
      check = false
    }
    if (product.sole === null) {
      preErr = { ...preErr, sole: 'Đế giày không được trống' }
      check = false
    }
    if (product.material === null) {
      preErr = { ...preErr, material: 'Chất liệu không được trống' }
      check = false
    }
    if (product.color === null) {
      preErr = { ...preErr, color: 'Màu sắc không được trống' }
      check = false
    }
    if (product.size === null) {
      preErr = { ...preErr, size: 'Kích cỡ không được trống' }
      check = false
    }
    if (isNaN(product.price) || product.price <= 0 || product.price >= 100000000) {
      preErr = { ...preErr, price: 'Giá sản phẩm phải là một số dương và nhỏ hơn 100 triệu' }
      check = false
    }
    if (isNaN(product.amount) || product.amount <= 0 || product.amount >= 1000) {
      preErr = { ...preErr, amount: 'Số lượng sản phẩm phải là một số dương và nhỏ hơn 1000' }
      check = false
    }
    if (isNaN(product.weight) || product.weight <= 0 || product.weight >= 10000) {
      preErr = { ...preErr, weight: 'Trọng lượng sản phẩm phải là một số dương và nhỏ hơn 10000' }
      check = false
    }
    setErr(preErr)
    return check
  }

  function onSubmit() {
    const title = 'Xác nhận cập nhập sản phẩm?'
    const text = ''

    if (validate({ ...preProductDetail, image: imageSelect })) {
      confirmSatus(title, text).then((result) => {
        if (result.isConfirmed) {
          const newProductDetail = {
            id: preProductDetail.id,
            idSole: preProductDetail.sole.value,
            idBrand: preProductDetail.brand.value,
            idCategory: preProductDetail.category.value,
            idMaterial: preProductDetail.material.value,
            idSize: preProductDetail.size.value,
            idColor: preProductDetail.color.value,
            price: preProductDetail.price,
            amount: preProductDetail.amount,
            weight: preProductDetail.weight,
            description: preProductDetail.description,
            listImage: imageSelect,
          }
          sanPhamApi.updateProduct(newProductDetail).finally(() => {
            toast.success('Cập nhập sản phẩm thành công')
            setOpen(false)
            fetchData(filter, priceMax)
          })
        }
      })
    }
  }
  return (
    <Dialog
      fullWidth
      maxWidth="lg"
      open={open}
      onClose={() => {
        setOpen(false)
      }}>
      <DialogContent className="san-pham2">
        <Typography mb={2} textAlign={'center'} fontWeight={'600'} variant="h5" color={'GrayText'}>
          Cập nhập chi tiết sản phẩm
        </Typography>
        <Container className="container" sx={{ paddingBottom: '10px' }}>
          <Stack className="mt-3" direction="row" spacing={1}>
            <div style={{ width: '100%' }}>
              <b>
                <span style={{ color: 'red' }}>*</span>Danh mục
              </b>
              <Autocomplete
                size="small"
                fullWidth
                value={preProductDetail.category}
                isOptionEqualToValue={(option, value) => option.value === value.value}
                onChange={(_, e) => {
                  validate({ ...preProductDetail, category: e })
                  setPreProductDetail({ ...preProductDetail, category: e })
                }}
                className="search-field"
                id="combo-box-category"
                options={categorys.map((category) => {
                  return { label: category.name, value: category.id }
                })}
                renderInput={(params) => (
                  <TextField color="cam" {...params} placeholder={'Chọn danh mục'} />
                )}
              />
              {err.category && <span style={{ color: 'red' }}>{err.category}</span>}
            </div>
            <div style={{ width: '100%' }}>
              <b>
                <span style={{ color: 'red' }}>*</span>Thương hiệu
              </b>
              <Autocomplete
                size="small"
                fullWidth
                className="search-field"
                id="combo-box-brand"
                value={preProductDetail.brand}
                isOptionEqualToValue={(option, value) => option.value === value.value}
                onChange={(_, e) => {
                  validate({ ...preProductDetail, brand: e })
                  setPreProductDetail({ ...preProductDetail, brand: e })
                }}
                options={brands.map((brand) => {
                  return { label: brand.name, value: brand.id }
                })}
                renderInput={(params) => (
                  <TextField color="cam" {...params} placeholder={'Chọn thương hiệu'} />
                )}
              />
              {err.brand && <span style={{ color: 'red' }}>{err.brand}</span>}
            </div>
          </Stack>
          <Stack className="mt-3" direction="row" spacing={1}>
            <div style={{ width: '100%' }}>
              <b>
                <span style={{ color: 'red' }}>*</span>Đế giày
              </b>
              <Autocomplete
                size="small"
                fullWidth
                value={preProductDetail.sole}
                isOptionEqualToValue={(option, value) => option.value === value.value}
                onChange={(_, e) => {
                  validate({ ...preProductDetail, sole: e })
                  setPreProductDetail({ ...preProductDetail, sole: e })
                }}
                className="search-field"
                id="combo-box-sole"
                options={soles.map((sole) => {
                  return { label: sole.name, value: sole.id }
                })}
                renderInput={(params) => (
                  <TextField color="cam" {...params} placeholder={'Chọn đế giày'} />
                )}
              />
              {err.sole && <span style={{ color: 'red' }}>{err.sole}</span>}
            </div>
            <div style={{ width: '100%' }}>
              <b>
                <span style={{ color: 'red' }}>*</span>Chất liệu
              </b>
              <Autocomplete
                size="small"
                fullWidth
                className="search-field"
                id="combo-box-material"
                value={preProductDetail.material}
                isOptionEqualToValue={(option, value) => option.value === value.value}
                onChange={(_, e) => {
                  validate({ ...preProductDetail, material: e })
                  setPreProductDetail({ ...preProductDetail, material: e })
                }}
                options={materials.map((material) => {
                  return { label: material.name, value: material.id }
                })}
                renderInput={(params) => (
                  <TextField color="cam" {...params} placeholder={'Chọn chất liệu'} />
                )}
              />
              {err.material && <span style={{ color: 'red' }}>{err.material}</span>}
            </div>
          </Stack>
          <Stack className="mt-3 mb-2" direction="row" spacing={1}>
            <div style={{ width: '100%' }}>
              <b>
                <span style={{ color: 'red' }}>*</span>Màu sắc
              </b>
              <Autocomplete
                size="small"
                value={preProductDetail.color}
                isOptionEqualToValue={(option, value) => option.value === value.value}
                fullWidth
                onChange={(_, e) => {
                  validate({ ...preProductDetail, color: e })
                  setPreProductDetail({ ...preProductDetail, color: e })
                }}
                className="search-field"
                id="combo-box-color"
                options={colors.map((color) => {
                  return { label: color.name, value: color.id, code: color.code }
                })}
                renderOption={(props, option) => (
                  <li key={`color${option.value}`} {...props}>
                    <div
                      style={{
                        borderRadius: '50%',
                        width: '15px',
                        height: '15px',
                        backgroundColor: option.code,
                        marginRight: '5px',
                      }}
                    />
                    {option.label}
                  </li>
                )}
                renderInput={(params) => (
                  <TextField color="cam" {...params} placeholder={'Chọn màu sắc'} />
                )}
              />
              {err.color && <span style={{ color: 'red' }}>{err.color}</span>}
            </div>
            <div style={{ width: '100%' }}>
              <b>
                <span style={{ color: 'red' }}>*</span>Kích cỡ
              </b>
              <Autocomplete
                noOptionsText={
                  <Button size="small" fullWidth color="cam" onClick={() => console.log()}>
                    <PlaylistAddIcon />
                    Thêm mới
                  </Button>
                }
                size="small"
                fullWidth
                value={preProductDetail.size}
                isOptionEqualToValue={(option, value) => option.value === value.value}
                onChange={(_, e) => {
                  validate({ ...preProductDetail, size: e })
                  setPreProductDetail({ ...preProductDetail, size: e })
                }}
                className="search-field"
                id="combo-box-size"
                options={sizes.map((size) => {
                  return { label: size.size.toString(), value: size.id }
                })}
                renderInput={(params) => (
                  <TextField id="newSize" color="cam" {...params} placeholder={'Chọn kích cỡ'} />
                )}
              />
              {err.size && <span style={{ color: 'red' }}>{err.size}</span>}
            </div>
          </Stack>
          <Stack className="mt-3 mb-2" direction="row" spacing={1}>
            <div style={{ width: '100%' }}>
              <b>
                <span style={{ color: 'red' }}>*</span>Cân nặng
              </b>
              <TextField
                InputProps={{
                  style: { paddingRight: '4px' },
                  endAdornment: 'g',
                }}
                size="small"
                color="cam"
                value={preProductDetail.weight}
                onChange={(e) => {
                  validate({ ...preProductDetail, weight: e.target.value })
                  setPreProductDetail({ ...preProductDetail, weight: e.target.value })
                }}
                className="search-field"
                placeholder="Nhập cân nặng"
                variant="outlined"
                fullWidth
              />
              {err.weight && <span style={{ color: 'red' }}>{err.weight}</span>}
            </div>
            <div style={{ width: '100%' }}>
              <b>
                <span style={{ color: 'red' }}>*</span>Số lượng
              </b>
              <TextField
                size="small"
                color="cam"
                value={preProductDetail.amount}
                onChange={(e) => {
                  validate({ ...preProductDetail, amount: e.target.value })
                  setPreProductDetail({ ...preProductDetail, amount: e.target.value })
                }}
                className="search-field"
                placeholder="Nhập số lượng"
                variant="outlined"
                fullWidth
              />
              {err.amount && <span style={{ color: 'red' }}>{err.amount}</span>}
            </div>
            <div style={{ width: '100%' }}>
              <b>
                <span style={{ color: 'red' }}>*</span>Đơn giá
              </b>
              <TextField
                InputProps={{
                  style: { paddingRight: '4px' },
                  endAdornment: '₫',
                }}
                size="small"
                color="cam"
                value={preProductDetail.price}
                onChange={(e) => {
                  validate({ ...preProductDetail, price: e.target.value })
                  setPreProductDetail({ ...preProductDetail, price: e.target.value })
                }}
                className="search-field"
                placeholder="Nhập đơn giá"
                variant="outlined"
                fullWidth
              />
              {err.price && <span style={{ color: 'red' }}>{err.price}</span>}
            </div>
          </Stack>
          <b>Mô tả sản phẩm</b>
          <Stack spacing={1}>
            <TextField
              color="cam"
              value={preProductDetail.description}
              onChange={(e) => {
                setPreProductDetail({ ...preProductDetail, description: e.target.value })
              }}
              className="search-field"
              placeholder="Nhập mô tả sản phẩm"
              multiline
              rows={2}
              variant="outlined"
              fullWidth
            />
          </Stack>
          <Stack
            className="mt-2"
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={1}>
            {imageSelect.map((image) => {
              return (
                <img
                  key={`showImage${image}`}
                  width={'100px'}
                  height={'100px'}
                  style={{
                    border: '1px dashed #ccc',
                  }}
                  src={image}
                  alt="anh-san-pham"
                />
              )
            })}
            <div
              onClick={() => {
                setOpenSelectImg(true)
              }}
              style={{
                cursor: 'pointer',
                border: '1px dashed #ccc',
                width: '100px',
                height: '100px',
                textAlign: 'center',
                lineHeight: '100px',
              }}>
              <MdImageSearch
                fontSize={'20px'}
                style={{ marginBottom: '-3px', marginRight: '5px' }}
              />
              Ảnh
            </div>
            {err.image && <span style={{ color: 'red', textAlign: 'center' }}>{err.image}</span>}
          </Stack>
        </Container>
        <Stack mt={2} direction="row" justifyContent="center" alignItems="flex-start" spacing={2}>
          <Button
            onClick={() => {
              setOpen(false)
            }}
            color="error"
            disableElevation
            variant="contained"
            sx={{
              fontWeight: '600',
              letterSpacing: '1px',
              borderRadius: '10px',
              textTransform: 'none',
            }}>
            Đóng
          </Button>
          <Button
            onClick={onSubmit}
            color="cam"
            disableElevation
            variant="contained"
            sx={{
              fontWeight: '600',
              letterSpacing: '1px',
              borderRadius: '10px',
              textTransform: 'none',
            }}>
            Lưu thay đổi
          </Button>
        </Stack>
      </DialogContent>
      {preProductDetail.color && (
        <DialogAddUpdate open={openSelectImage} setOpen={setOpenSelectImg}>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <b>Danh sách ảnh màu {preProductDetail.color.label}</b>
            <Button
              onClick={() => {
                document.getElementById('them-anh').click()
              }}
              color="cam"
              variant="outlined"
              size="small">
              <RiImageAddFill fontSize={'16px'} />
              Thêm ảnh
            </Button>
            <input
              onChange={(event) => uploadImage(event, preProductDetail.color.value)}
              accept="image/*"
              hidden
              multiple
              type="file"
              id="them-anh"
            />
          </Stack>
          <ContentModal images={images} />
        </DialogAddUpdate>
      )}
    </Dialog>
  )
}
