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
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd'

import './index.css'
import sanPhamApi from '../../../api/admin/sanpham/sanPhamApi'
import soleApi from '../../../api/admin/sanpham/soleApi'
import categoryApi from '../../../api/admin/sanpham/categoryApi'
import bradApi from '../../../api/admin/sanpham/bradApi'
import materialApi from '../../../api/admin/sanpham/materialApi'
import colorApi from '../../../api/admin/sanpham/colorApi'
import sizeApi from '../../../api/admin/sanpham/sizeApi'

import confirmSatus from '../../../components/comfirmSwal'
import { spButton } from '../sanpham/sanPhamStyle'

import { RiDeleteBin2Line } from 'react-icons/ri'
import { MdImageSearch } from 'react-icons/md'
import { RiImageAddFill } from 'react-icons/ri'
import DialogAddUpdate from '../../../components/DialogAddUpdate'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const listBreadcrumbs = [{ name: 'Sản phẩm', link: '/admin/product' }]

export default function AdProductAdd() {
  const [products, setProducts] = useState([])
  const [categorys, setCategorys] = useState([])
  const [brands, setBrands] = useState([])
  const [soles, setSoles] = useState([])
  const [materials, setMaterials] = useState([])
  const [colors, setColors] = useState([])
  const [sizes, setSizes] = useState([])
  const [modalOpen, setModalOpen] = useState(null)

  const [newProducts, setNewProducts] = useState({
    product: { label: '', value: '' },
    description: '',
    sole: [],
    category: [],
    brand: [],
    material: [],
    color: [],
    size: [],
  })

  const [newProductDetails, setNewProductDetails] = useState([])
  const [images, setImages] = useState([])
  const [loadImage, setLoadImage] = useState(false)
  const [openModalColor, setOpenModalColor] = useState(false)

  const [newCategory, setNewCategory] = useState({ name: '' })
  const [newBrand, setNewBrand] = useState({ name: '' })
  const [newSole, setNewSole] = useState({ name: '' })
  const [newMaterial, setNewMaterial] = useState({ name: '' })
  const [newColor, setNewColor] = useState({ code: '#000000', name: '' })
  const [newSize, setNewSize] = useState({ size: '' })

  useEffect(() => {
    sanPhamApi.getList().then(
      (result) => {
        if (result.data.success) {
          setProducts(result.data.data)
        }
      },
      (err) => console.error(err),
    )
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
  }, [])

  const newProductIsUndefined = (newProducts) => {
    return (
      newProducts.product !== null &&
      newProducts.product.label.trim() !== '' &&
      newProducts.sole.length !== 0 &&
      newProducts.category.length !== 0 &&
      newProducts.brand.length !== 0 &&
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
        newProducts.category.forEach((category) => {
          newProducts.brand.forEach((brand) => {
            newProducts.material.forEach((material) => {
              newProducts.color.forEach((color) => {
                newProducts.size.forEach((size) => {
                  preNewProductDetails.push({
                    key: `${sole.value}${category.value}${brand.value}${color.value}${size.value}${material.value}`,
                    category: category,
                    brand: brand,
                    sole: sole,
                    color: color,
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
        })
      })
      setNewProductDetails(
        preNewProductDetails.map((productDetail) => {
          const checkExists = newProductDetails.find((pd) => pd.key === productDetail.key)
          if (checkExists)
            return {
              ...checkExists,
              product: newProducts.product,
              description: newProducts.description,
            }
          return {
            ...productDetail,
            product: newProducts.product,
            description: newProducts.description,
          }
        }),
      )
    }
  }

  function deleteNewProduct(productDetail) {
    const preNewProductDetails = [...newProductDetails]
    preNewProductDetails.splice(preNewProductDetails.indexOf(productDetail), 1)
    setNewProductDetails(preNewProductDetails)
  }

  const closeModal = () => {
    setModalOpen(null)
  }

  const ContentModal = ({ images, color, sole, category, brand, material }) => {
    const [imageSelect, setImageSelect] = useState(
      newProductDetails.find(
        (productDetail) =>
          productDetail.category.value === category &&
          productDetail.brand.value === brand &&
          productDetail.sole.value === sole &&
          productDetail.color.value === color &&
          productDetail.material.value === material,
      ).images,
    )

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
        setImageSelect([...preImageSelect])
      }

      setNewProductDetails((prevDetails) =>
        prevDetails.map((productDetail) => {
          if (
            productDetail.sole.value === sole &&
            productDetail.category.value === category &&
            productDetail.brand.value === brand &&
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

  const navigator = useNavigate()
  const saveProductDetail = () => {
    try {
      const title = 'Xác nhận thêm sản phẩm?'
      const text = ''
      confirmSatus(title, text).then((result) => {
        if (result.isConfirmed) {
          sanPhamApi
            .addProuct(
              newProductDetails.map((product) => {
                return {
                  idSole: product.sole.value,
                  idBrand: product.brand.value,
                  idCategory: product.category.value,
                  idMaterial: product.material.value,
                  idSize: product.size.value,
                  idColor: product.color.value,
                  nameProduct: product.product.label,
                  idProduct: product.product.value,
                  price: product.price,
                  amount: product.amount,
                  weight: product.weight,
                  description: product.description,
                  listImage: product.images,
                }
              }),
            )
            .finally(() => {
              toast.success('Thêm sản phẩm thành công')
              navigator('/admin/product')
            })
        }
      })
    } catch (error) {
      console.error(error)
      toast.error('Thêm sản phẩm thất bại')
    }
  }

  function openSelectImage(color) {
    if (images.findIndex((image) => image.idColor === color) < 0) {
      setLoadImage(true)
      sanPhamApi
        .getListImage(color)
        .then(
          (response) => {
            if (response.data.success) {
              setImages([
                ...images,
                {
                  idColor: color,
                  data: response.data.data,
                },
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
  }

  const handleAddCategory = async (newCategory) => {
    try {
      if (newCategory.name === '') {
        toast.warning('Tên thể loại không được trống', {
          position: toast.POSITION.TOP_RIGHT,
        })
        return
      }

      const response = await categoryApi.getAllNameCategory()
      if (response.data && Array.isArray(response.data.data)) {
        const listNameCategory = response.data.data

        if (listNameCategory.includes(newCategory.name)) {
          toast.warning('Tên thể loại đã tồn tại', {
            position: toast.POSITION.TOP_RIGHT,
          })
          return
        }

        await categoryApi.addCategory(newCategory)
        toast.success('Thêm thể loại thành công', {
          position: toast.POSITION.TOP_RIGHT,
        })
      }
    } catch (error) {
      toast.error('Thêm thể loại thất bại', {
        position: toast.POSITION.TOP_RIGHT,
      })
    }
  }

  const handleAddBrand = async (newBrand) => {
    try {
      if (newBrand.name === '') {
        toast.warning('Tên thương hiệu không được trống', {
          position: toast.POSITION.TOP_RIGHT,
        })
        return
      }

      const response = await bradApi.getAllNameBrand()
      if (response.data && Array.isArray(response.data.data)) {
        const listNameBrand = response.data.data

        if (listNameBrand.includes(newBrand.name)) {
          toast.warning('Tên thương hiệu đã tồn tại', {
            position: toast.POSITION.TOP_RIGHT,
          })
          return
        }

        await bradApi.addBrand(newBrand)
        toast.success('Thêm thương hiệu thành công', {
          position: toast.POSITION.TOP_RIGHT,
        })
      }
    } catch (error) {
      toast.error('Thêm thương hiệu thất bại', {
        position: toast.POSITION.TOP_RIGHT,
      })
    }
  }
  const handleAddSole = async (newSole) => {
    try {
      if (newSole.name === '') {
        toast.warning('Tên đế giày không được trống', {
          position: toast.POSITION.TOP_RIGHT,
        })
        return
      }

      const response = await soleApi.getAllNameSole()
      if (response.data && Array.isArray(response.data.data)) {
        const listNameSole = response.data.data

        if (listNameSole.includes(newSole.name)) {
          toast.warning('Tên đế giày đã tồn tại', {
            position: toast.POSITION.TOP_RIGHT,
          })
          return
        }

        await soleApi.addSole(newSole)
        toast.success('Thêm đế giày thành công', {
          position: toast.POSITION.TOP_RIGHT,
        })
      }
    } catch (error) {
      toast.error('Thêm đế giày thất bại', {
        position: toast.POSITION.TOP_RIGHT,
      })
    }
  }

  const handleAddMaterial = async (newMaterial) => {
    try {
      if (newMaterial.name === '') {
        toast.warning('Tên chất liệu không được trống', {
          position: toast.POSITION.TOP_RIGHT,
        })
        return
      }

      const response = await materialApi.getAllNameMaterial()
      if (response.data && Array.isArray(response.data.data)) {
        const listNameMaterial = response.data.data

        if (listNameMaterial.includes(newMaterial.name)) {
          toast.warning('Tên chất liệu đã tồn tại', {
            position: toast.POSITION.TOP_RIGHT,
          })
          return
        }

        await materialApi.addMaterial(newMaterial)
        toast.success('Thêm chất liệu thành công', {
          position: toast.POSITION.TOP_RIGHT,
        })
      }
    } catch (error) {
      toast.error('Thêm chất liệu thất bại', {
        position: toast.POSITION.TOP_RIGHT,
      })
    }
  }

  const handleAddColor = async (newColor) => {
    try {
      if (newColor.code === '') {
        toast.warning('Mã màu không được trống', {
          position: toast.POSITION.TOP_RIGHT,
        })
        return
      }

      if (newColor.name === '') {
        toast.warning('Tên màu không được trống', {
          position: toast.POSITION.TOP_RIGHT,
        })
        return
      }

      const responseCode = await colorApi.getAllCodeColor()
      const responseName = await colorApi.getAllNameColor()
      if (
        responseCode.data &&
        Array.isArray(responseCode.data.data) &&
        responseName.data &&
        Array.isArray(responseName.data.data)
      ) {
        const listCodeColor = responseCode.data.data
        const listNameColor = responseName.data.data

        if (listCodeColor.includes(newColor.code)) {
          toast.warning('Mã màu đã tồn tại', {
            position: toast.POSITION.TOP_RIGHT,
          })
          return
        }

        if (listNameColor.includes(newColor.name)) {
          toast.warning('Tên màu đã tồn tại', {
            position: toast.POSITION.TOP_RIGHT,
          })
          return
        }

        await colorApi.addColor(newColor)
        toast.success('Thêm màu sắc thành công', {
          position: toast.POSITION.TOP_RIGHT,
        })
      }
      setOpenModalColor(false)
    } catch (error) {
      toast.error('Thêm màu sắc thất bại', {
        position: toast.POSITION.TOP_RIGHT,
      })
      setOpenModalColor(false)
    }
  }

  const handleAddSize = async (newSize) => {
    try {
      if (newSize.size === '') {
        toast.warning('Kích cỡ không được trống', {
          position: toast.POSITION.TOP_RIGHT,
        })
        return
      }

      if (isNaN(newSize.size) === true) {
        toast.warning('Tên kích cỡ phải là số', {
          position: toast.POSITION.TOP_RIGHT,
        })
      }

      const response = await sizeApi.getAllNameSize()
      if (response.data && Array.isArray(response.data.data)) {
        const listNameSize = response.data.data

        if (listNameSize.includes(newSize.size)) {
          toast.warning('Kích cỡ đã tồn tại', {
            position: toast.POSITION.TOP_RIGHT,
          })
          return
        }

        await sizeApi.addSize(newSize)
        toast.success('Thêm kích cỡ thành công', {
          position: toast.POSITION.TOP_RIGHT,
        })
      }
    } catch (error) {
      toast.error('Thêm kích cỡ thất bại', {
        position: toast.POSITION.TOP_RIGHT,
      })
    }
  }

  return (
    <div className="san-pham">
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
          <b>
            <span style={{ color: 'red' }}>*</span>Tên sản phẩm
          </b>
          <Stack direction="row" spacing={1}>
            <Autocomplete
              freeSolo
              size="small"
              fullWidth
              onChange={(_, e) => {
                genNewProductDetail({ ...newProducts, product: e })
              }}
              className="search-field"
              id="combo-box-product"
              options={products.map((product) => {
                return { label: product.name, value: product.id }
              })}
              renderInput={(params) => (
                <TextField
                  onChange={(e) => {
                    genNewProductDetail({
                      ...newProducts,
                      product: { label: e.target.value, value: '' },
                    })
                  }}
                  color="cam"
                  {...params}
                  placeholder="Nhập tên sản phẩm"
                />
              )}
            />
          </Stack>
          <Stack className="mt-3" direction="row" spacing={1}>
            <div style={{ width: '100%' }}>
              <b>
                <span style={{ color: 'red' }}>*</span>Danh mục
              </b>
              <Autocomplete
                noOptionsText={
                  <Button
                    size="small"
                    fullWidth
                    color="cam"
                    onClick={() => handleAddCategory(newCategory)}>
                    <PlaylistAddIcon />
                    Thêm mới
                  </Button>
                }
                multiple
                size="small"
                fullWidth
                value={newProducts.category}
                isOptionEqualToValue={(option, value) => option.value === value.value}
                onChange={(_, e) => {
                  genNewProductDetail({ ...newProducts, category: e })
                }}
                className="search-field"
                id="combo-box-category"
                options={categorys.map((category) => {
                  return { label: category.name, value: category.id }
                })}
                renderInput={(params) => (
                  <TextField
                    color="cam"
                    onChange={(e) => setNewCategory({ name: e.target.value })}
                    {...params}
                    placeholder={newProducts.category.length > 0 ? '' : 'Chọn danh mục'}
                  />
                )}
              />
            </div>
            <div style={{ width: '100%' }}>
              <b>
                <span style={{ color: 'red' }}>*</span>Thương hiệu
              </b>
              <Autocomplete
                noOptionsText={
                  <Button
                    size="small"
                    fullWidth
                    color="cam"
                    onClick={() => handleAddBrand(newBrand)}>
                    <PlaylistAddIcon />
                    Thêm mới
                  </Button>
                }
                multiple
                size="small"
                fullWidth
                className="search-field"
                id="combo-box-brand"
                value={newProducts.brand}
                isOptionEqualToValue={(option, value) => option.value === value.value}
                onChange={(_, e) => {
                  genNewProductDetail({ ...newProducts, brand: e })
                }}
                options={brands.map((brand) => {
                  return { label: brand.name, value: brand.id }
                })}
                renderInput={(params) => (
                  <TextField
                    color="cam"
                    onChange={(e) => setNewBrand({ name: e.target.value })}
                    {...params}
                    placeholder={newProducts.brand.length > 0 ? '' : 'Chọn thương hiệu'}
                  />
                )}
              />
            </div>
          </Stack>
          <Stack className="mt-3" direction="row" spacing={1}>
            <div style={{ width: '100%' }}>
              <b>
                <span style={{ color: 'red' }}>*</span>Đế giày
              </b>
              <Autocomplete
                noOptionsText={
                  <Button size="small" fullWidth color="cam" onClick={() => handleAddSole(newSole)}>
                    <PlaylistAddIcon />
                    Thêm mới
                  </Button>
                }
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
                    onChange={(e) => setNewSole({ name: e.target.value })}
                    {...params}
                    placeholder={newProducts.sole.length > 0 ? '' : 'Chọn đế giày'}
                  />
                )}
              />
            </div>
            <div style={{ width: '100%' }}>
              <b>
                <span style={{ color: 'red' }}>*</span>Chất liệu
              </b>
              <Autocomplete
                noOptionsText={
                  <Button
                    size="small"
                    fullWidth
                    color="cam"
                    onClick={() => handleAddMaterial(newMaterial)}>
                    <PlaylistAddIcon />
                    Thêm mới
                  </Button>
                }
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
                    onChange={(e) => setNewMaterial({ name: e.target.value })}
                    {...params}
                    placeholder={newProducts.material.length > 0 ? '' : 'Chọn chất liệu'}
                  />
                )}
              />
            </div>
          </Stack>
          <Stack className="mt-3 mb-3" direction="row" spacing={1}>
            <div style={{ width: '100%' }}>
              <b>
                <span style={{ color: 'red' }}>*</span>Màu sắc
              </b>
              <Autocomplete
                noOptionsText={
                  <Button
                    size="small"
                    fullWidth
                    color="cam"
                    onClick={() => setOpenModalColor(true)}>
                    <PlaylistAddIcon />
                    Thêm mới
                  </Button>
                }
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
                    onChange={(e) => setNewColor({ ...newColor, name: e.target.value })}
                    {...params}
                    placeholder={newProducts.color.length > 0 ? '' : 'Chọn màu sắc'}
                  />
                )}
              />
              {openModalColor && (
                <DialogAddUpdate
                  open={openModalColor}
                  setOpen={setOpenModalColor}
                  title={'Chọn màu sắc'}
                  buttonSubmit={
                    <Button
                      onClick={() => {
                        handleAddColor(newColor)
                      }}
                      color="primary"
                      disableElevation
                      sx={{ ...spButton }}
                      variant="contained">
                      Thêm
                    </Button>
                  }>
                  <TextField
                    type="color"
                    id={'nameInputAdd'}
                    onBlur={(e) => {
                      setNewColor({ ...newColor, code: e.target.value })
                    }}
                    defaultValue={newColor.code}
                    fullWidth
                    inputProps={{
                      required: true,
                    }}
                    size="small"
                  />
                </DialogAddUpdate>
              )}
            </div>
            <div style={{ width: '100%' }}>
              <b>
                <span style={{ color: 'red' }}>*</span>Kích cỡ
              </b>
              <Autocomplete
                noOptionsText={
                  <Button size="small" fullWidth color="cam" onClick={() => handleAddSize(newSize)}>
                    <PlaylistAddIcon />
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
                    id="newSize"
                    onChange={(e) => {
                      setNewSize({ size: e.target.value })
                    }}
                    color="cam"
                    {...params}
                    placeholder={newProducts.size.length > 0 ? '' : 'Chọn kích cỡ'}
                  />
                )}
              />
            </div>
          </Stack>
          <b>Mô tả sản phẩm</b>
          <Stack spacing={1}>
            <TextField
              color="cam"
              onChange={(e) => {
                genNewProductDetail({ ...newProducts, description: e.target.value })
              }}
              className="search-field"
              placeholder="Nhập mô tả sản phẩm"
              multiline
              rows={2}
              variant="outlined"
              fullWidth
            />
          </Stack>
        </Container>
      </Paper>
      {newProductIsUndefined(newProducts) &&
        newProducts.color.map((color, colorIndex) => {
          return newProducts.category.map((category, categoryIndex) => {
            return newProducts.brand.map((brand, brandIndex) => {
              return newProducts.material.map((material, materialIndex) => {
                return newProducts.sole.map((sole, soleIndex) => {
                  return (
                    <Paper
                      key={`papaerNewProduct${colorIndex}${materialIndex}${soleIndex}${categoryIndex}${brandIndex}`}
                      sx={{ py: 2, mt: 2 }}>
                      <Container>
                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                          <Typography
                            textAlign={'center'}
                            fontWeight={'600'}
                            variant="h7"
                            color={'GrayText'}>
                            Danh sách sản phẩm cùng loại [ {category.label} - {brand.label} -{' '}
                            {sole.label} - {material.label} - {color.label} ]
                          </Typography>
                        </Stack>
                        <Table sx={{ mt: 1, mb: 1 }} className="tableCss">
                          <TableHead>
                            <TableRow>
                              <TableCell align="center" width={'4%'}>
                                #
                              </TableCell>
                              <TableCell width={'20%'}>Sản phẩm</TableCell>
                              <TableCell width={'10%'}>Kích cỡ</TableCell>
                              <TableCell width={'10%'}>Cân nặng</TableCell>
                              <TableCell width={'10%'}>Số lượng</TableCell>
                              <TableCell width={'10%'}>Giá</TableCell>
                              <TableCell align="center" width={'40%'}>
                                Ảnh
                              </TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {newProductDetails
                              .filter(
                                (productDetail) =>
                                  productDetail.color.value === color.value &&
                                  productDetail.sole.value === sole.value &&
                                  productDetail.category.value === category.value &&
                                  productDetail.brand.value === brand.value &&
                                  productDetail.material.value === material.value,
                              )
                              .map((productDetail, index) => {
                                return (
                                  <TableRow key={productDetail.key}>
                                    <TableCell align="center">
                                      <RiDeleteBin2Line
                                        onClick={() => {
                                          deleteNewProduct(productDetail)
                                        }}
                                        style={{ cursor: 'pointer' }}
                                        fontSize={'20px'}
                                        color="#da0722"
                                      />
                                    </TableCell>
                                    <TableCell sx={{ maxWidth: '0px' }}>
                                      {newProducts.product.label}
                                    </TableCell>
                                    <TableCell>{productDetail.size.label}</TableCell>
                                    <TableCell>
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
                                          '& input': {
                                            p: 0,
                                            textAlign: 'center',
                                            fontSize: '14px',
                                          },
                                          '& fieldset': {
                                            fontSize: '14px',
                                          },
                                        }}
                                      />
                                    </TableCell>
                                    <TableCell>
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
                                          '& input': {
                                            p: 0,
                                            textAlign: 'center',
                                            fontSize: '14px',
                                          },
                                          '& fieldset': {
                                            fontSize: '14px',
                                          },
                                        }}
                                      />
                                    </TableCell>
                                    <TableCell>
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
                                          '& input': {
                                            p: 0,
                                            textAlign: 'center',
                                            fontSize: '14px',
                                          },
                                          '& fieldset': {
                                            fontSize: '14px',
                                          },
                                        }}
                                      />
                                    </TableCell>
                                    {index === 0 && (
                                      <TableCell align="center" rowSpan={newProductDetails.length}>
                                        <Stack
                                          direction="row"
                                          justifyContent="center"
                                          alignItems="center"
                                          spacing={1}>
                                          {newProductDetails
                                            .find(
                                              (productDetail) =>
                                                productDetail.color.value === color.value &&
                                                productDetail.sole.value === sole.value &&
                                                productDetail.category.value === category.value &&
                                                productDetail.brand.value === brand.value &&
                                                productDetail.material.value === material.value,
                                            )
                                            .images.map((image, index) => {
                                              return (
                                                <img
                                                  key={`showImage${colorIndex}${materialIndex}${soleIndex}${index}`}
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
                                              openSelectImage(color.value)
                                              setModalOpen(
                                                `papaerNewProduct${colorIndex}${materialIndex}${soleIndex}${categoryIndex}${brandIndex}`,
                                              )
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
                                        </Stack>
                                      </TableCell>
                                    )}
                                  </TableRow>
                                )
                              })}
                          </TableBody>
                        </Table>
                      </Container>
                      <DialogAddUpdate
                        open={
                          modalOpen ===
                          `papaerNewProduct${colorIndex}${materialIndex}${soleIndex}${categoryIndex}${brandIndex}`
                        }
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
                          category={category.value}
                          brand={brand.value}
                          images={images.find((image) => image.idColor === color.value)?.data}
                        />
                      </DialogAddUpdate>
                    </Paper>
                  )
                })
              })
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
