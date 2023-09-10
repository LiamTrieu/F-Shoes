import {
  Autocomplete,
  Backdrop,
  Box,
  Checkbox,
  CircularProgress,
  Container,
  Paper,
  Typography,
} from '@mui/material'
import React, { Fragment, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import BreadcrumbsCustom from '../../../components/BreadcrumbsCustom'
import TextField from '@mui/material/TextField'
import { TiTick } from 'react-icons/ti'
import { LuBoxSelect } from 'react-icons/lu'

import bradApi from '../../../api/admin/sanpham/bradApi'
import categoryApi from '../../../api/admin/sanpham/categoryApi'
import colorApi from '../../../api/admin/sanpham/colorApi'
import materialApi from '../../../api/admin/sanpham/materialApi'
import sizeApi from '../../../api/admin/sanpham/sizeApi'
import soleApi from '../../../api/admin/sanpham/soleApi'
import sanPhamApi from '../../../api/admin/sanpham/sanPhamApi'

// const productDetailRequest = {
//   idBard: '',
//   idSole: '',
//   idMaterial: '',
//   idCategory: '',
//   idProduct: '',
//   idSize: '',
//   idColor: '',
//   price: 0,
//   amount: 0,
//   indexDefault: -1,
// }
const icon = <LuBoxSelect style={{ fontSize: '20px', color: 'red' }} />
const checkedIcon = <TiTick style={{ fontSize: '20px', color: 'green' }} />
const SelectAttribute = (props) => {
  return (
    <Autocomplete
      sx={{ my: 3 }}
      onChange={props.onChange}
      size="small"
      multiple
      id={props.id}
      options={props.options}
      disableCloseOnSelect
      getOptionLabel={(option) => option[props.value]}
      renderOption={(propss, option, { selected }) => (
        <li {...propss} style={{ fontWeight: 600, fontSize: '13px' }}>
          {props.value !== 'code' ? (
            <Fragment>
              <Checkbox icon={icon} checkedIcon={checkedIcon} checked={selected} />
              {option[props.value]}
            </Fragment>
          ) : (
            <React.Fragment>
              <Checkbox icon={icon} checkedIcon={checkedIcon} checked={selected} />
              <Box sx={{ height: '20px', width: '100%', backgroundColor: option[props.value] }} />
            </React.Fragment>
          )}
        </li>
      )}
      renderInput={(params) => <TextField {...params} label={props.label} />}
    />
  )
}
export default function AdProductDetailAdd() {
  const params = useParams()

  const [isBackdrop, setIsBackdrop] = useState(true)

  const [listBrand, setListBrand] = useState([])
  const [listCaregory, setListCaregory] = useState([])
  const [listColor, setListColor] = useState([])
  const [listMaterial, setListMaterial] = useState([])
  const [listSize, setListSize] = useState([])
  const [listSole, setListSole] = useState([])
  const [product, setProduct] = useState({})

  const [listProductDetailRequest, setListProuctDetailRequest] = useState([])
  const [listProductDetail, setListProuctDetail] = useState([])

  const listBreadcrumb = [
    { name: 'Sản phẩm', link: '/admin/product' },
    { name: product.name, link: `/admin/product/detail/${params.idProduct}` },
  ]

  const [listAttribute, setListAttribute] = useState({
    brand: [],
    category: [],
    color: [],
    material: [],
    sole: [],
  })
  useEffect(() => {
    fetchData(params.idProduct)
  }, [params.idProduct])

  useEffect(() => {
    genProductDetail(listAttribute)
  }, [listAttribute])

  function genProductDetail(listAttribute) {
    const products = []
    if (
      listAttribute.brand.length > 0 &&
      listAttribute.category.length > 0 &&
      listAttribute.color.length > 0 &&
      listAttribute.sole.length > 0 &&
      listAttribute.material.length > 0
    ) {
      listAttribute.brand.forEach((brandItem) => {
        listAttribute.category.forEach((categoryItem) => {
          listAttribute.color.forEach((colorItem) => {
            listAttribute.sole.forEach((soleItem) => {
              listAttribute.material.forEach((materialItem) => {
                const newProduct = {
                  brand: brandItem,
                  category: categoryItem,
                  color: colorItem,
                  sole: soleItem,
                  material: materialItem,
                }
                products.push(newProduct)
              })
            })
          })
        })
      })
      console.log(products)
      setListProuctDetail(products)
    }
  }

  async function fetchData(idProduct) {
    setIsBackdrop(true)
    await sanPhamApi.getById(idProduct).then((response) => {
      setProduct(response.data.data)
    })
    await bradApi.getAll().then((response) => {
      setListBrand(response.data.data)
    })
    await categoryApi.getAll().then((response) => {
      setListCaregory(response.data.data)
    })
    await colorApi.getAll().then((response) => {
      setListColor(response.data.data)
    })
    await materialApi.getAll().then((response) => {
      setListMaterial(response.data.data)
    })
    await sizeApi.getAll().then((response) => {
      setListSize(response.data.data)
    })
    await soleApi.getAll().then((response) => {
      setListSole(response.data.data)
    })
    setIsBackdrop(false)
  }

  return (
    <Box>
      <BreadcrumbsCustom nameHere={'Thêm chi tiết sản phẩm'} listLink={listBreadcrumb} />
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isBackdrop}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Paper>
        <Container maxWidth="sm" sx={{ py: 2 }}>
          <Typography variant="h5" textAlign={'center'} fontWeight={'700'}>
            Thông tin sản phẩm
          </Typography>
          <Box>
            <SelectAttribute
              label="Thương hiệu"
              onChange={(e, value) => {
                setListAttribute({
                  ...listAttribute,
                  brand: value,
                })
              }}
              value="name"
              id={'select-brand'}
              options={listBrand}
            />
            <SelectAttribute
              label="Loại"
              onChange={(e, value) => {
                setListAttribute({
                  ...listAttribute,
                  category: value,
                })
              }}
              value="name"
              id={'select-category'}
              options={listCaregory}
            />
            <SelectAttribute
              onChange={(e, value) => {
                setListAttribute({
                  ...listAttribute,
                  color: value,
                })
              }}
              label="Màu"
              value="code"
              id={'select-color'}
              options={listColor}
            />
            <SelectAttribute
              onChange={(e, value) => {
                setListAttribute({
                  ...listAttribute,
                  material: value,
                })
              }}
              label="Chất liệu"
              value="name"
              id={'select-material'}
              options={listMaterial}
            />
            <SelectAttribute
              onChange={(e, value) => {
                setListAttribute({
                  ...listAttribute,
                  sole: value,
                })
              }}
              label="Đế giày"
              value="name"
              id={'select-sole'}
              options={listSole}
            />
          </Box>
        </Container>
      </Paper>
      {listProductDetail.length > 0 &&
        listProductDetail.map((productDetail) => {
          return (
            <Paper sx={{ mt: 4 }}>
              <Container sx={{ py: 2 }}>
                <Typography fontWeight={'700'} justifyContent={'center'} alignItems={'center'}>
                  {`${product.name} ${productDetail.brand.name} ${productDetail.category.name} 
                  ${productDetail.material.name} ${productDetail.sole.name} `}
                  <Box
                    sx={{
                      display: 'inline-block',
                      backgroundColor: productDetail.color.code,
                      width: '20px',
                      height: '20px',
                    }}
                  />
                </Typography>
                <SelectAttribute
                  onChange={() => {
                    console.log(productDetail)
                  }}
                  label="Size"
                  value="size"
                  id={'select-size'}
                  options={listSize}
                />
                <Box></Box>
              </Container>
            </Paper>
          )
        })}
    </Box>
  )
}
