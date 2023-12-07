import React, { useEffect, useState } from 'react'
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Button,
  Stack,
  Rating,
  Tooltip,
  IconButton,
} from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import './productHome.css'
import Carousel from 'react-material-ui-carousel'
import { useDispatch } from 'react-redux'
import clientProductApi from '../../api/client/clientProductApi'
import { addCart } from '../../services/slices/cartSlice'
import { toast } from 'react-toastify'
import ModalAddProductToCart from '../../pages/client/ModalAddProductToCart'
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag'
import { FaCheck } from 'react-icons/fa'
import { isColorDark } from '../../services/common/isColorDark'

export default function CartSellingProduct({ products, colmd, collg }) {
  const [openModalCart, setOpenModalCart] = useState(false)
  const handleOpenModalCart = () => setOpenModalCart(true)
  const handleCloseModalCart = () => setOpenModalCart(false)
  const calculateDiscountedPrice = (originalPrice, discountPercentage) => {
    const discountAmount = (discountPercentage / 100) * originalPrice
    const discountedPrice = originalPrice - discountAmount
    return discountedPrice
  }
  const [isCartHovered, setIsCartHovered] = useState(false)
  const [isCartChange, setIsCartChange] = useState(false)
  const [product, setProduct] = useState({ image: [], price: '' })

  const dispatch = useDispatch()
  const addProductToCart = (id) => {
    clientProductApi.getById(id).then((response) => {
      console.log(response.data.data)
      setProduct({
        ...response.data.data,
        image: response.data.data.image.split(','),
      })
      const newItem = {
        id: id,
        idProduct: response.data.data.idProduct,
        name: response.data.data.name,
        gia: response.data.data.price,
        weight: response.data.data.weight,
        image: response.data.data.image.split(','),
        soLuong: parseInt(1),
        size: response.data.data.size,
      }
      dispatch(addCart(newItem))
      handleOpenModalCart()
      toast.success('Thêm sản phẩm thành công')
    })
  }
  const processArray = (inputArray, fields) => {
    const groupedItems = {}

    inputArray.forEach((item) => {
      const key = fields.map((field) => item[field]).join('-')
      if (!groupedItems[key]) {
        groupedItems[key] = { ...item, duplicates: [item] }
      } else {
        groupedItems[key].duplicates.push(item)
      }
    })

    Object.values(groupedItems).forEach((group) => {
      const colorGroups = {}
      group.duplicates.forEach((duplicate) => {
        const colorKey = duplicate.idColor
        const nameColor = duplicate.nameColor
        const codeColor = duplicate.codeColor
        if (!colorGroups[colorKey]) {
          colorGroups[colorKey] = {
            idColor: colorKey,
            codeColor: codeColor,
            nameColor: nameColor,
            sizes: [],
          }
        }
        colorGroups[colorKey].sizes.push(duplicate)
      })
      group.duplicates = Object.values(colorGroups)
    })

    return Object.values(groupedItems)
  }
  const [arrMap, setArrMap] = useState([])
  useEffect(() => {
    const uniqueFields = ['idProduct', 'idSole', 'idCategory', 'idBrand', 'idMaterial']
    const processedArray = processArray(products, uniqueFields).map((product) => {
      return {
        ...product,
        duplicate: product.duplicates[0],
        ...product.duplicates[0].sizes[0],
      }
    })
    console.log(processedArray)
    setArrMap(processedArray)
  }, [products])

  let navigate = useNavigate()
  console.log(arrMap, '==========')
  return (
    <>
      <Grid container rowSpacing={1} columnSpacing={3}>
        {arrMap.map((product, i) => {
          const discountValue = product.value || 0

          const red = [255, 0, 0]
          const green = [255, 255, 0]
          const interpolatedColor = [
            Math.round((1 - discountValue / 100) * green[0] + (discountValue / 100) * red[0]),
            Math.round((1 - discountValue / 100) * green[1] + (discountValue / 100) * red[1]),
            Math.round((1 - discountValue / 100) * green[2] + (discountValue / 100) * red[2]),
          ]
          return (
            <Grid
              key={i}
              item
              xs={6}
              sm={6}
              md={colmd}
              lg={collg}
              mt={1}
              width={'100%'}
              onMouseEnter={() => setIsCartHovered(i)}
              onMouseLeave={() => setIsCartHovered(null)}
              onClick={() => {
                if (!isCartChange) {
                  navigate(`/product/${product.id}`)
                }
              }}
              className="cart-product-hover">
              <Card sx={{ width: '100%', height: '520px' }}>
                <Box
                  sx={{
                    position: 'relative',
                    width: '100%',
                    paddingBottom: '100%',
                    overflow: 'hidden',
                  }}>
                  {product.value && (
                    <div
                      className="discount-badge"
                      style={{
                        backgroundColor: `rgb(${interpolatedColor[0]}, ${interpolatedColor[1]}, ${interpolatedColor[2]})`,
                      }}>{`${discountValue ? discountValue : ''}%`}</div>
                  )}
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Carousel
                      indicators={false}
                      sx={{ width: '100%', height: '100%' }}
                      navButtonsAlwaysInvisible>
                      {product.image.map((item, i) => (
                        // component={Link}
                        // to={`/product/${product.id}`}

                        <CardMedia
                          to={`/product/${product.id}`}
                          component="img"
                          alt="Product"
                          image={item}
                          sx={{
                            minWidth: '100%',
                            minHeight: '100%',
                            objectFit: 'contain',
                          }}
                        />
                      ))}
                    </Carousel>
                    {isCartHovered === i && (
                      <div
                        onMouseEnter={() => setIsCartChange(true)}
                        onMouseLeave={() => setIsCartChange(false)}
                        style={{
                          position: 'absolute',
                          zIndex: 2,
                          top: '5px',
                          right: '5px',
                        }}>
                        <Tooltip title="Thêm vào giỏ hàng">
                          <IconButton color="cam" onClick={() => addProductToCart(product.id)}>
                            <ShoppingBagIcon />
                          </IconButton>
                        </Tooltip>
                      </div>
                    )}
                  </Box>
                </Box>

                <CardContent>
                  {isCartHovered !== i && (
                    <span style={{ color: '#F48A42' }}>{product.nameBrand}</span>
                  )}
                  {isCartHovered === i && (
                    <Stack
                      direction="row"
                      spacing={1}
                      useFlexGap
                      flexWrap="wrap"
                      onMouseEnter={() => setIsCartChange(true)}
                      onMouseLeave={() => setIsCartChange(false)}>
                      {product.duplicates.map((color) => {
                        return (
                          <Tooltip title={color.nameColor}>
                            <div
                              onClick={() => {
                                let preArrMap = [...arrMap]
                                preArrMap[i] = { ...preArrMap[i], ...color.sizes[0] }
                                preArrMap[i].duplicate = color
                                setArrMap(preArrMap)
                              }}
                              style={{
                                float: 'right',
                                height: '25px',
                                width: '25px',
                                borderRadius: '50%',
                                border: isColorDark(color.codeColor)
                                  ? `1px solid ${color.codeColor}`
                                  : '1px solid black',
                                backgroundColor: color.codeColor,
                                textAlign: 'center',
                                margin: '10px 0px',
                              }}>
                              {product.idColor === color.idColor && (
                                <FaCheck
                                  style={{
                                    height: '25px',
                                    color: isColorDark(color.codeColor) ? 'white' : 'black',
                                  }}
                                  fontSize={'15px'}
                                />
                              )}
                            </div>
                          </Tooltip>
                        )
                      })}
                    </Stack>
                  )}
                  <Typography
                    className="title"
                    gutterBottom
                    component="div"
                    sx={{ textTransform: 'none', color: 'black' }}>
                    {product.title}
                  </Typography>
                  {/* {isCartHovered !== i && (
                      <span style={{ color: 'gray' }}>{product.nameCate}</span>
                    )} */}
                  <Typography gutterBottom component="div">
                    <span>
                      {' '}
                      {product.value ? (
                        <div style={{ display: 'flex' }}>
                          <div className="promotion-price">{`${product.priceBefort.toLocaleString(
                            'it-IT',
                            { style: 'currency', currency: 'VND' },
                          )} `}</div>{' '}
                          <div>
                            <span style={{ color: 'red', fontWeight: 'bold' }}>
                              {`${calculateDiscountedPrice(
                                product.priceBefort,
                                product.value,
                              ).toLocaleString('it-IT', {
                                style: 'currency',
                                currency: 'VND',
                              })} `}
                            </span>{' '}
                          </div>
                        </div>
                      ) : (
                        <span style={{ color: 'black' }}>{`${product.priceBefort.toLocaleString(
                          'it-IT',
                          {
                            style: 'currency',
                            currency: 'VND',
                          },
                        )} `}</span>
                      )}
                    </span>
                  </Typography>

                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="flex-end"
                    spacing={1}>
                    <Typography
                      className="title"
                      gutterBottom
                      component="div"
                      sx={{ textTransform: 'none', color: 'black' }}>
                      Đã bán: {product.amount}
                    </Typography>
                    <div>
                      <Stack
                        direction="row"
                        spacing={1}
                        useFlexGap
                        flexWrap="wrap"
                        onMouseEnter={() => setIsCartChange(true)}
                        onMouseLeave={() => setIsCartChange(false)}>
                        {product.duplicate.sizes
                          .sort((a, b) => a.size - b.size)
                          .map((size) => {
                            return (
                              <div
                                onClick={() => {
                                  let preArrMap = [...arrMap]
                                  preArrMap[i] = { ...preArrMap[i], ...size }
                                  setArrMap(preArrMap)
                                }}
                                style={{
                                  transform: 'scale(1.03)',
                                  padding: '2px',
                                  border: '1px solid black',
                                }}>
                                <div
                                  style={{
                                    height: '20px',
                                    width: '30px',
                                    lineHeight: '22px',
                                    fontSize: '10px',
                                    fontWeight: 'bold',
                                    textAlign: 'center',
                                    color: product.size === size.size ? 'white' : 'black',
                                    backgroundColor: product.size === size.size ? 'black' : 'white',
                                  }}>
                                  {size.size}
                                </div>
                              </div>
                            )
                          })}
                      </Stack>
                    </div>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          )
        })}
        {openModalCart && (
          <ModalAddProductToCart
            openModal={openModalCart}
            handleCloseModal={handleCloseModalCart}
            product={product}
          />
        )}
      </Grid>
    </>
  )
}
