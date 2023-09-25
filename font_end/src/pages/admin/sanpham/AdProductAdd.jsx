import {
  Autocomplete,
  Button,
  Checkbox,
  Container,
  Grid,
  Paper,
  Skeleton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import BreadcrumbsCustom from '../../../components/BreadcrumbsCustom'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import { LuSplitSquareVertical } from 'react-icons/lu'
import ModalAddProduct from './ModalAddProduct'

import './index.css'
import sanPhamApi from '../../../api/admin/sanpham/sanPhamApi'
import soleApi from '../../../api/admin/sanpham/soleApi'
import materialApi from '../../../api/admin/sanpham/materialApi'
import colorApi from '../../../api/admin/sanpham/colorApi'
import sizeApi from '../../../api/admin/sanpham/sizeApi'

import { RiDeleteBin2Line } from 'react-icons/ri'
import { MdImageSearch } from 'react-icons/md'
import { RiImageAddFill } from 'react-icons/ri'
import DialogAddUpdate from '../../../components/DialogAddUpdate'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const listBreadcrumbs = [{ name: 'Sản phẩm', link: '/admin/product' }]

export default function AdProductAdd() {
  const [open, setOpen] = useState(false)
  const [products, setProducts] = useState([])
  const [soles, setSoles] = useState([])
  const [materials, setMaterials] = useState([])
  const [colors, setColors] = useState([])
  const [sizes, setSizes] = useState([])
  const [modalOpen, setModalOpen] = useState(null)

  const [newProducts, setNewProducts] = useState({
    product: null,
    sole: [],
    material: [],
    color: [],
    size: [],
  })

  const [newProductDetails, setNewProductDetails] = useState([])
  const [images, setImages] = useState([])
  const [loadImage, setLoadImage] = useState(false)

  useEffect(() => {
    sanPhamApi.getList().then(
      (result) => {
        if (result.data.success) {
          setProducts(result.data.data)
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
  }, [])

  const newProductIsUndefined = (newProducts) => {
    return (
      newProducts.product !== null &&
      newProducts.sole.length !== 0 &&
      newProducts.material.length !== 0 &&
      newProducts.color.length !== 0 &&
      newProducts.size.length !== 0
    )
  }

  const updateNewProductDetail = (productDetail) => {
    setNewProductDetails((prevDetails) => {
      return prevDetails.map((detail) => {
        if (detail.key === productDetail.key) {
          return productDetail
        }
        return detail
      })
    })
  }

  const genNewProductDetail = (newProducts) => {
    setNewProducts(newProducts)
    if (newProductIsUndefined(newProducts)) {
      const preNewProductDetails = []
      newProducts.sole.forEach((sole) => {
        newProducts.material.forEach((material) => {
          newProducts.color.forEach((color) => {
            newProducts.size.forEach((size) => {
              preNewProductDetails.push({
                key: `${color.value}${size.value}${sole.value}${material.value}`,
                product: newProducts.product,
                color: color,
                sole: sole,
                material: material,
                size: size,
                price: 100000,
                amount: 100,
                weight: 500,
                images: [],
              })
            })
          })
        })
      })
      setNewProductDetails(
        preNewProductDetails.map((productDetail) => {
          const checkExists = newProductDetails.find((pd) => pd.key === productDetail.key)
          if (checkExists) return checkExists
          return productDetail
        }),
      )
    }
  }

  const closeModal = () => {
    setModalOpen(null)
  }

  const ContentModal = ({ images, color, sole, material }) => {
    const [imageSelect, setImageSelect] = useState(
      newProductDetails.find(
        (productDetail) =>
          productDetail.sole.value === sole &&
          productDetail.color.value === color &&
          productDetail.material.value === material,
      ).images,
    )

    const handleCheckboxChange = (event, index) => {
      const selectedImage = images[index]
      const preImageSelect = [...imageSelect]

      if (event.target.checked) {
        preImageSelect.push(selectedImage)
        setImageSelect((prevImages) => [...prevImages, selectedImage])
      } else {
        preImageSelect.splice(
          preImageSelect.indexOf((img) => img === selectedImage),
          1,
        )
        setImageSelect(preImageSelect)
      }

      setNewProductDetails((prevDetails) =>
        prevDetails.map((productDetail) => {
          if (
            productDetail.sole.value === sole &&
            productDetail.color.value === color &&
            productDetail.material.value === material
          ) {
            return { ...productDetail, images: preImageSelect }
          } else {
            return productDetail
          }
        }),
      )
    }
    return (
      <div style={{ marginTop: '10px', textAlign: 'center' }}>
        {loadImage ? (
          <Grid container spacing={1}>
            <Grid item xs={3}>
              <Skeleton variant="rounded" width={'100%'} height={130} />
            </Grid>
            <Grid item xs={3}>
              <Skeleton variant="rounded" width={'100%'} height={130} />
            </Grid>
            <Grid item xs={3}>
              <Skeleton variant="rounded" width={'100%'} height={130} />
            </Grid>
            <Grid item xs={3}>
              <Skeleton variant="rounded" width={'100%'} height={130} />
            </Grid>
          </Grid>
        ) : images?.length > 0 ? (
          <Grid container spacing={1}>
            {images.map((image, index) => (
              <Grid item xs={3} key={`selectImage${index}`} style={{ position: 'relative' }}>
                <Checkbox
                  checked={imageSelect.includes(image)}
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
                  height={'130px'}
                  width={'100%'}
                  src={image}
                  alt={`anh-${index}`}
                />
              </Grid>
            ))}
          </Grid>
        ) : (
          <img height={'130px'} src={require('../../../assets/image/no-data.png')} alt="no-data" />
        )}
      </div>
    )
  }

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
        }
      })
      .catch((error) => {
        console.error(error)
        toast.error('Tải lên ảnh thất bại')
      })
  }

  const navigator = useNavigate()
  const saveProductDetail = () => {
    try {
      newProductDetails.forEach((product) => {
        sanPhamApi.addProuct({
          idSole: product.sole.value,
          idMaterial: product.material.value,
          idProduct: product.product.value,
          idBrand: product.product.brandId,
          idCategory: product.product.categoryId,
          idSize: product.size.value,
          idColor: product.color.value,
          price: product.price,
          amount: product.amount,
          weight: product.weight,
          description: product.product.description,
          listImage: product.images,
        })
      })
      toast.success('Thêm sản phẩm thành công')
      navigator('/admin/product')
    } catch (error) {
      console.error(error)
      toast.error('Thêm sản phẩm thất bại')
    }
  }

  return (
    <div className="san-pham">
      <ModalAddProduct setOpen={setOpen} open={open} />
      <BreadcrumbsCustom nameHere={'Thêm sản phẩm'} listLink={listBreadcrumbs} />
      <Paper sx={{ py: 2 }}>
        <Container className="container" sx={{ paddingBottom: '10px' }}>
          <Typography
            mb={1}
            textAlign={'center'}
            fontWeight={'600'}
            variant="h6"
            color={'GrayText'}>
            Thông tin sản phẩm
          </Typography>
          <b>Tên sản phẩm</b>
          <Stack direction="row" spacing={1}>
            <Autocomplete
              popupIcon={null}
              fullWidth
              value={newProducts.product}
              isOptionEqualToValue={(option, value) => option.value === value.value}
              onChange={(_, e) => {
                genNewProductDetail({ ...newProducts, product: e })
              }}
              size="small"
              className="search-field"
              id="combo-box-demo"
              options={products.map((product) => {
                return {
                  label: product.name,
                  value: product.id,
                  category: product.category,
                  brand: product.brand,
                  categoryId: product.categoryId,
                  brandId: product.brandId,
                  description: product.description,
                }
              })}
              renderInput={(params) => (
                <TextField color="cam" {...params} placeholder="Nhập tên sản phẩm" />
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
          <Stack className="mt-5" direction="row" spacing={1}>
            <div style={{ width: '100%' }}>
              <b>Đế giày</b>
              <Autocomplete
                multiple
                size="small"
                fullWidth
                value={newProducts.sole}
                isOptionEqualToValue={(option, value) => option.value === value.value}
                onChange={(_, e) => {
                  genNewProductDetail({ ...newProducts, sole: e })
                }}
                className="search-field"
                id="combo-box-sole"
                options={soles.map((sole) => {
                  return { label: sole.name, value: sole.id }
                })}
                renderInput={(params) => (
                  <TextField
                    color="cam"
                    {...params}
                    placeholder={newProducts.sole.length > 0 ? '' : 'Chọn đế giày'}
                  />
                )}
              />
            </div>
            <div style={{ width: '100%' }}>
              <b>Chất liệu</b>
              <Autocomplete
                multiple
                size="small"
                fullWidth
                className="search-field"
                id="combo-box-material"
                value={newProducts.material}
                isOptionEqualToValue={(option, value) => option.value === value.value}
                onChange={(_, e) => {
                  genNewProductDetail({ ...newProducts, material: e })
                }}
                options={materials.map((material) => {
                  return { label: material.name, value: material.id }
                })}
                renderInput={(params) => (
                  <TextField
                    color="cam"
                    {...params}
                    placeholder={newProducts.material.length > 0 ? '' : 'Chọn chất liệu'}
                  />
                )}
              />
            </div>
          </Stack>
          <Stack className="mt-5" direction="row" spacing={1}>
            <div style={{ width: '100%' }}>
              <b>Màu sắc</b>
              <Autocomplete
                multiple
                size="small"
                value={newProducts.color}
                isOptionEqualToValue={(option, value) => option.value === value.value}
                fullWidth
                onChange={(_, e) => {
                  genNewProductDetail({ ...newProducts, color: e })
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
                  <TextField
                    color="cam"
                    {...params}
                    placeholder={newProducts.color.length > 0 ? '' : 'Chọn màu sắc'}
                  />
                )}
              />
            </div>
            <div style={{ width: '100%' }}>
              <b>Kích cỡ</b>
              <Autocomplete
                noOptionsText={
                  <Button
                    size="small"
                    fullWidth
                    variant="outlined"
                    color="den"
                    onClick={() => console.log('Add new')}>
                    Thêm mới
                  </Button>
                }
                multiple
                size="small"
                fullWidth
                value={newProducts.size}
                isOptionEqualToValue={(option, value) => option.value === value.value}
                onChange={(_, e) => {
                  genNewProductDetail({ ...newProducts, size: e })
                }}
                className="search-field"
                id="combo-box-size"
                options={sizes.map((size) => {
                  return { label: size.size.toString(), value: size.id }
                })}
                renderInput={(params) => (
                  <TextField
                    color="cam"
                    {...params}
                    placeholder={newProducts.size.length > 0 ? '' : 'Chọn kích cỡ'}
                  />
                )}
              />
            </div>
          </Stack>
        </Container>
      </Paper>
      {newProductIsUndefined(newProducts) &&
        newProducts.color.map((color, colorIndex) => {
          return newProducts.material.map((material, materialIndex) => {
            return newProducts.sole.map((sole, soleIndex) => {
              return (
                <Paper
                  key={`papaerNewProduct${colorIndex}${materialIndex}${soleIndex}`}
                  sx={{ py: 2, mt: 2 }}>
                  <Container>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <Typography
                        textAlign={'center'}
                        fontWeight={'600'}
                        variant="h7"
                        color={'GrayText'}>
                        Danh sách sản phẩm [ {sole.label} - {material.label} - {color.label} ]
                      </Typography>
                      <Button size="small" variant="outlined" color="cam">
                        <LuSplitSquareVertical />
                        Khôi phục
                      </Button>
                    </Stack>
                    <Table sx={{ mt: 1, mb: 1 }} className="tableCss">
                      <TableHead>
                        <TableRow>
                          <TableCell width={'30%'}>Sản phẩm</TableCell>
                          <TableCell width={'15%'}>Thương hiệu</TableCell>
                          <TableCell width={'15%'}>Danh mục</TableCell>
                          <TableCell width={'10%'}>Kích cỡ</TableCell>
                          <TableCell width={'10%'}>Cân nặng</TableCell>
                          <TableCell width={'10%'}>Số lượng</TableCell>
                          <TableCell width={'10%'}>Giá</TableCell>
                          <TableCell width={'5%'}></TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {newProductDetails
                          .filter(
                            (productDetail) =>
                              productDetail.color.value === color.value &&
                              productDetail.sole.value === sole.value &&
                              productDetail.material.value === material.value,
                          )
                          .map((productDetail) => {
                            return (
                              <TableRow key={productDetail.key}>
                                <TableCell sx={{ maxWidth: '0px' }}>
                                  {newProducts.product.label}
                                </TableCell>
                                <TableCell>{productDetail.product.brand}</TableCell>
                                <TableCell>{productDetail.product.category}</TableCell>
                                <TableCell>{productDetail.size.label}</TableCell>
                                <TableCell align="center">
                                  <TextField
                                    value={productDetail.weight}
                                    onChange={(e) => {
                                      updateNewProductDetail({
                                        ...productDetail,
                                        weight: e.target.value,
                                      })
                                    }}
                                    InputProps={{
                                      style: { paddingRight: '4px' },
                                      endAdornment: 'g',
                                    }}
                                    inputProps={{ min: 1 }}
                                    size="small"
                                    sx={{
                                      '& input': { p: 0, textAlign: 'center', fontSize: '14px' },
                                      '& fieldset': {
                                        fontSize: '14px',
                                      },
                                    }}
                                  />
                                </TableCell>
                                <TableCell align="center">
                                  <TextField
                                    value={productDetail.amount}
                                    onChange={(e) => {
                                      updateNewProductDetail({
                                        ...productDetail,
                                        amount: e.target.value,
                                      })
                                    }}
                                    inputProps={{ min: 1 }}
                                    size="small"
                                    sx={{
                                      '& input': { p: 0, textAlign: 'center', fontSize: '14px' },
                                      '& fieldset': {
                                        fontSize: '14px',
                                      },
                                    }}
                                  />
                                </TableCell>
                                <TableCell align="center">
                                  <TextField
                                    value={productDetail.price}
                                    inputProps={{ min: 1 }}
                                    size="small"
                                    InputProps={{
                                      style: { paddingRight: '4px' },
                                      endAdornment: '₫',
                                    }}
                                    onChange={(e) => {
                                      updateNewProductDetail({
                                        ...productDetail,
                                        price: e.target.value,
                                      })
                                    }}
                                    sx={{
                                      '& input': { p: 0, textAlign: 'center', fontSize: '14px' },
                                      '& fieldset': {
                                        fontSize: '14px',
                                      },
                                    }}
                                  />
                                </TableCell>
                                <TableCell align="center">
                                  <RiDeleteBin2Line
                                    style={{ cursor: 'pointer' }}
                                    fontSize={'20px'}
                                    color="#da0722"
                                  />
                                </TableCell>
                              </TableRow>
                            )
                          })}
                      </TableBody>
                    </Table>
                    <Stack direction="row" justifyContent="center" alignItems="center" spacing={1}>
                      {newProductDetails
                        .filter(
                          (productDetail) =>
                            productDetail.color.value === color.value &&
                            productDetail.sole.value === sole.value &&
                            productDetail.material.value === material.value,
                        )[0]
                        .images.map((image, index) => {
                          return (
                            <img
                              key={`showImage${colorIndex}${materialIndex}${soleIndex}${index}`}
                              width={'25%'}
                              height={'250px'}
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
                          if (images.findIndex((image) => image.idColor === color.value) < 0) {
                            setLoadImage(true)
                            sanPhamApi
                              .getListImage(color.value)
                              .then(
                                (response) => {
                                  if (response.data.success) {
                                    setImages([
                                      ...images,
                                      { idColor: color.value, data: response.data.data },
                                    ])
                                  }
                                },
                                (error) => {
                                  console.error(error)
                                },
                              )
                              .finally(() => {
                                setLoadImage(false)
                              })
                          }
                          setModalOpen(`papaerNewProduct${colorIndex}${materialIndex}${soleIndex}`)
                        }}
                        style={{
                          cursor: 'pointer',
                          border: '1px dashed #ccc',
                          width: '25%',
                          height: '250px',
                          textAlign: 'center',
                          lineHeight: '250px',
                        }}>
                        <MdImageSearch
                          fontSize={'20px'}
                          style={{ marginBottom: '-3px', marginRight: '5px' }}
                        />
                        Chỉnh ảnh
                      </div>
                    </Stack>
                  </Container>
                  <DialogAddUpdate
                    open={modalOpen === `papaerNewProduct${colorIndex}${materialIndex}${soleIndex}`}
                    setOpen={closeModal}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <b>Danh sách ảnh màu {color.label}</b>
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
                        onChange={(event) => uploadImage(event, color.value)}
                        accept="image/*"
                        hidden
                        multiple
                        type="file"
                        id="them-anh"
                      />
                    </Stack>
                    <ContentModal
                      color={color.value}
                      material={material.value}
                      sole={sole.value}
                      images={images.find((image) => image.idColor === color.value)?.data}
                    />
                  </DialogAddUpdate>
                </Paper>
              )
            })
          })
        })}
      <Button
        onClick={() => {
          saveProductDetail()
        }}
        color="cam"
        variant="contained"
        sx={{ mt: 2, float: 'right' }}>
        Lưu thay đổi
      </Button>
    </div>
  )
}
