import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import Drawer from '@mui/material/Drawer'
import CartProduct from '../../layout/client/CartProduct'
import {
  Button,
  Checkbox,
  Collapse,
  Container,
  InputAdornment,
  Slider,
  SliderThumb,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { Grid } from '@mui/material'
import './Product.css'
import { BiCategoryAlt, BiSolidColorFill } from 'react-icons/bi'
import { GiBrandyBottle, GiMaterialsScience, GiBootPrints } from 'react-icons/gi'
import { FaCheck } from 'react-icons/fa'
import { GrMoney } from 'react-icons/gr'
import SearchIcon from '@mui/icons-material/Search'
import { ExpandLess, ExpandMore } from '@mui/icons-material'
import clientProductApi from '../../api/client/clientProductApi'
import FilterAltIcon from '@mui/icons-material/FilterAlt'
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff'
import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import CancelIcon from '@mui/icons-material/Cancel'
import { formatCurrency } from '../../services/common/formatCurrency '
import SockJS from 'sockjs-client'
import { Stomp } from '@stomp/stompjs'
import { socketUrl } from '../../services/url'
function AirbnbThumbComponent(props) {
  const { children, ...other } = props
  return <SliderThumb {...other}>{children}</SliderThumb>
}

const AirbnbSlider = styled(Slider)(() => ({
  color: '#fc7c27',
  height: 1,
  padding: '13px 0',
  '& .MuiSlider-thumb': {
    height: 20,
    width: 20,
    backgroundColor: '#fff',
    border: '1px solid currentColor',
    '&:hover': {
      boxShadow: '0 0 0 8px rgba(58, 133, 137, 0.16)',
    },
    '& .airbnb-bar': {
      height: 1,
      width: 1,
      backgroundColor: '#fc7c27',
      marginLeft: 1,
      marginRight: 1,
    },
    '& .MuiSlider-valueLabel': {
      lineHeight: 1.2,
      fontSize: 12,
      backgroundColor: '#fc7c27',
    },
  },
}))

AirbnbThumbComponent.propTypes = {
  children: PropTypes.node,
}

var stompClient = null
export default function Product() {
  const [products, setProducts] = useState([])

  const [priceMax, setPriceMax] = useState(999999999)
  const [openCategory, setOpenCategory] = useState(true)
  const [openBrand, setOpenBrand] = useState(true)
  const [openMaterial, setOpenMaterial] = useState(true)
  const [openSole, setOpenSole] = useState(true)
  const [openColor, setOpenColor] = useState(true)
  const [openDrawer, setOpenDrawer] = useState(false)
  const [showMenuBar, setShowMenuBar] = useState(true)
  const [isMenuBarVisible, setIsMenuBarVisible] = useState(true)
  const [filter, setFilter] = useState({
    brand: [],
    material: [],
    color: [],
    sole: [],
    category: [],
    minPrice: null,
    maxPrice: null,
    nameProductDetail: null,
  })
  const [minMaxPrice, setMinMaxPrice] = useState({})
  // -------------------------------------- Filter ----------------------------------
  const [listBrand, setListBrand] = useState([])
  const [listMaterial, setListMaterial] = useState([])
  const [listColor, setListColor] = useState([])
  const [listSole, setListSole] = useState([])
  const [listCategory, setListCategory] = useState([])

  useEffect(() => {
    clientProductApi.getBrand().then((response) => {
      setListBrand(response.data.data)
    })
    clientProductApi.getMaterial().then((response) => {
      setListMaterial(response.data.data)
    })
    clientProductApi.getColor().then((response) => {
      setListColor(response.data.data)
    })
    clientProductApi.getSole().then((response) => {
      setListSole(response.data.data)
    })
    clientProductApi.getCategory().then((response) => {
      setListCategory(response.data.data)
    })
  }, [])

  useEffect(() => {
    clientProductApi.getAllProduct(filter).then((result) => {
      const data = result.data.data
      setProducts(
        data.map((e) => {
          return {
            id: e.id,
            title: e.name,
            priceBefort: e.price,
            priceAfter: e.price,
            value: e.value,
            promotion: e.promotion,
            statusPromotion: e.statusPromotion,
            image: e.image.split(','),
            idProduct: e.idProduct,
            idColor: e.idColor,
            idMaterial: e.idMaterial,
            idSole: e.idSole,
            idCategory: e.idCategory,
            idBrand: e.idBrand,
          }
        }),
      )
    })
  }, [filter])

  useEffect(() => {
    const socket = new SockJS(socketUrl)
    stompClient = Stomp.over(socket)
    stompClient.debug = () => {}
    stompClient.connect({}, onConnect)

    return () => {
      stompClient.disconnect()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [products])

  const onConnect = () => {
    stompClient.subscribe('/topic/realtime-san-pham-client', (message) => {
      if (message.body) {
        const data = JSON.parse(message.body)
        updateRealTimeProductClient(data)
      }
    })
  }

  function updateRealTimeProductClient(data) {
    const preProduct = [...products]
    const index = preProduct.findIndex((product) => product.id === data.id)
    if (index !== -1) {
      preProduct[index] = {
        id: data.id,
        title: data.name,
        priceBefort: data.price,
        priceAfter: data.price,
        value: data.value,
        promotion: data.promotion,
        statusPromotion: data.statusPromotion,
        image: data.image.split(','),
        idProduct: data.idProduct,
        idColor: data.idColor,
        idMaterial: data.idMaterial,
        idSole: data.idSole,
        idCategory: data.idCategory,
        idBrand: data.idBrand,
      }
      setProducts(preProduct)
    }
  }

  useEffect(() => {
    clientProductApi.getMinMaxPrice().then((response) => {
      setMinMaxPrice(response.data.data)
      setFilter({
        ...filter,
        minPrice: response.data.data.minPrice,
        maxPrice: response.data.data.maxPrice,
      })
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleDrawerToggle = () => {
    setOpenDrawer(!openDrawer)
  }

  const toggleMenuBar = () => {
    setShowMenuBar(!showMenuBar)
    setIsMenuBarVisible(!isMenuBarVisible)
  }
  // -------------------------------------- select checked ----------------------------------
  const [selectCategory, setSelectCategory] = useState([])
  const [selectBrand, setSelectBrand] = useState([])
  const [selectMaterial, setSelectMaterial] = useState([])
  const [selectSole, setSelectSole] = useState([])
  const [selectColor, setSelectColor] = useState([])

  const handleCheckBoxCategory = (event, id) => {
    const selectedIndex = selectCategory.indexOf(id)
    let newSelectedIds = []

    if (selectedIndex === -1) {
      newSelectedIds = [...selectCategory, id]
    } else {
      newSelectedIds = [
        ...selectCategory.slice(0, selectedIndex),
        ...selectCategory.slice(selectedIndex + 1),
      ]
    }
    setSelectCategory(newSelectedIds)
    setFilter({ ...filter, category: newSelectedIds })
  }

  const handleCheckBoxBrand = (event, id) => {
    const selectedIndex = selectBrand.indexOf(id)
    let newSelectedIds = []

    if (selectedIndex === -1) {
      newSelectedIds = [...selectBrand, id]
    } else {
      newSelectedIds = [
        ...selectBrand.slice(0, selectedIndex),
        ...selectBrand.slice(selectedIndex + 1),
      ]
    }
    setSelectBrand(newSelectedIds)
    setFilter({ ...filter, brand: newSelectedIds })
  }

  const handleCheckBoxMaterial = (event, id) => {
    const selectedIndex = selectMaterial.indexOf(id)
    let newSelectedIds = []

    if (selectedIndex === -1) {
      newSelectedIds = [...selectMaterial, id]
    } else {
      newSelectedIds = [
        ...selectMaterial.slice(0, selectedIndex),
        ...selectMaterial.slice(selectedIndex + 1),
      ]
    }
    setSelectMaterial(newSelectedIds)
    setFilter({ ...filter, material: newSelectedIds })
  }

  const handleCheckBoxSole = (event, id) => {
    const selectedIndex = selectSole.indexOf(id)
    let newSelectedIds = []

    if (selectedIndex === -1) {
      newSelectedIds = [...selectSole, id]
    } else {
      newSelectedIds = [
        ...selectSole.slice(0, selectedIndex),
        ...selectSole.slice(selectedIndex + 1),
      ]
    }
    setSelectSole(newSelectedIds)
    setFilter({ ...filter, sole: newSelectedIds })
  }

  const handleCheckBoxColor = (event, id) => {
    const selectedIndex = selectColor.indexOf(id)
    let newSelectedIds = []

    if (selectedIndex === -1) {
      newSelectedIds = [...selectColor, id]
    } else {
      newSelectedIds = [
        ...selectColor.slice(0, selectedIndex),
        ...selectColor.slice(selectedIndex + 1),
      ]
    }
    setSelectColor(newSelectedIds)
    setFilter({ ...filter, color: newSelectedIds })
  }

  const MenuBar = () => {
    return (
      <List
        className="list-product-portfolio"
        component="nav"
        aria-labelledby="nested-list-subheader">
        <div className="menubar-portfolio">
          {/* --------------------------------------------- COLOR --------------------------------------------- */}
          <ListItemButton onClick={() => setOpenColor(!openColor)} className="list-item-button">
            <BiSolidColorFill className="icon-portfolio" />
            <ListItemText primary="Màu sắc" />
            {openColor ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={openColor} timeout="auto" unmountOnExit className="collapse-portfolio">
            <List component="div" disablePadding>
              <Grid container>
                {listColor.map((lf) => (
                  <Grid items xs={4} key={lf.id}>
                    <ListItem>
                      <div
                        style={{ backgroundColor: `${lf.code}` }}
                        className="radio-color"
                        onClick={(e) => handleCheckBoxColor(e, lf.id)}>
                        {/* {filter.color === lf.id && <FaCheck color="white" />} */}
                        {selectColor.includes(lf.id) && <FaCheck color="white" />}
                      </div>
                    </ListItem>
                  </Grid>
                ))}
              </Grid>
            </List>
          </Collapse>
          {/* --------------------------------------------- CATEGORY --------------------------------------------- */}
          <ListItemButton
            onClick={() => setOpenCategory(!openCategory)}
            className="list-item-button">
            <BiCategoryAlt className="icon-portfolio" />
            <ListItemText
              style={{ fontSize: '20px !important', fontWeight: 700, color: 'green !important' }}
              primary="Loại giày"
            />
            {openCategory ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={openCategory} timeout="auto" unmountOnExit className="collapse-portfolio">
            <List component="div" disablePadding>
              {listCategory.map((lf) => (
                <ListItemButton key={lf.id} onClick={(e) => handleCheckBoxCategory(e, lf.id)}>
                  <Checkbox
                    key={lf.id}
                    checked={selectCategory.includes(lf.id)}
                    size="small"
                    style={{ color: selectCategory.indexOf(lf.id) !== -1 ? 'black' : 'black' }}
                  />
                  <ListItemText primary={lf.name} key={lf.id} value={lf.id} />
                </ListItemButton>
              ))}
            </List>
          </Collapse>
          {/* --------------------------------------------- BRAND --------------------------------------------- */}
          <ListItemButton onClick={() => setOpenBrand(!openBrand)} className="list-item-button">
            <GiBrandyBottle className="icon-portfolio" />
            <ListItemText primary="Thương hiệu" />
            {openBrand ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={openBrand} timeout="auto" unmountOnExit className="collapse-portfolio">
            <List component="div" disablePadding>
              {listBrand.map((lf) => (
                <ListItemButton key={lf.id} onClick={(e) => handleCheckBoxBrand(e, lf.id)}>
                  <Checkbox
                    key={lf.id}
                    checked={selectBrand.includes(lf.id)}
                    size="small"
                    style={{ color: selectCategory.indexOf(lf.id) !== -1 ? 'black' : 'black' }}
                  />
                  <ListItemText primary={lf.name} key={lf.id} value={lf.id} />
                </ListItemButton>
              ))}
            </List>
          </Collapse>
          {/* --------------------------------------------- MATERIAL --------------------------------------------- */}
          <ListItemButton
            onClick={() => setOpenMaterial(!openMaterial)}
            className="list-item-button">
            <GiMaterialsScience className="icon-portfolio" />
            <ListItemText primary="Chất liệu" />
            {openMaterial ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={openMaterial} timeout="auto" unmountOnExit className="collapse-portfolio">
            <List component="div" disablePadding>
              {listMaterial.map((lf) => (
                <ListItemButton key={lf.id} onClick={(e) => handleCheckBoxMaterial(e, lf.id)}>
                  <Checkbox
                    key={lf.id}
                    checked={selectMaterial.includes(lf.id)}
                    size="small"
                    style={{ color: selectCategory.indexOf(lf.id) !== -1 ? 'black' : 'black' }}
                  />
                  <ListItemText primary={lf.name} key={lf.id} value={lf.id} />
                </ListItemButton>
              ))}
            </List>
          </Collapse>
          {/* --------------------------------------------- SOLE --------------------------------------------- */}
          <ListItemButton onClick={() => setOpenSole(!openSole)} className="list-item-button">
            <GiBootPrints className="icon-portfolio" />
            <ListItemText primary="Đế giày" />
            {openSole ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={openSole} timeout="auto" unmountOnExit className="collapse-portfolio">
            <List component="div" disablePadding>
              {listSole.map((lf) => (
                <ListItemButton key={lf.id} onClick={(e) => handleCheckBoxSole(e, lf.id)}>
                  <Checkbox
                    key={lf.id}
                    checked={selectSole.includes(lf.id)}
                    size="small"
                    style={{ color: selectCategory.indexOf(lf.id) !== -1 ? 'black' : 'black' }}
                  />
                  <ListItemText primary={lf.name} key={lf.id} value={lf.id} />
                </ListItemButton>
              ))}
            </List>
          </Collapse>

          {/* --------------------------------------------- PRICE --------------------------------------------- */}
          <ListItemButton className="list-item-button">
            <GrMoney className="icon-portfolio" />
            <ListItemText primary="Giá tiền (Giá gốc)" />
          </ListItemButton>
          <ListItem className="list-item">
            <AirbnbSlider
              onChangeCommitted={(_, value) => {
                setFilter({ ...filter, minPrice: value[0], maxPrice: value[1] })
                setPriceMax(value[1])
              }}
              min={minMaxPrice.minPrice}
              max={minMaxPrice.maxPrice}
              valueLabelDisplay="auto"
              slots={{ thumb: AirbnbThumbComponent }}
              defaultValue={[filter.minPrice, priceMax]}
              valueLabelFormat={(value) => formatCurrency(value)}
            />
          </ListItem>
        </div>
      </List>
    )
  }

  const handleResetFilter = () => {
    setFilter({
      brand: [],
      material: [],
      color: [],
      sole: [],
      category: [],
      minPrice: minMaxPrice.minPrice,
      maxPrice: minMaxPrice.maxPrice,
      nameProductDetail: null,
    })
    setOpenBrand(false)
    setOpenCategory(false)
    setOpenColor(false)
    setOpenMaterial(false)
    setOpenSole(false)
    setPriceMax(minMaxPrice.maxPrice)
    setSelectBrand([])
    setSelectCategory([])
    setSelectColor([])
    setSelectMaterial([])
    setSelectSole([])
  }

  return (
    <Container maxWidth="xl" className="container-portfolio">
      <Grid container spacing={1}>
        {isMenuBarVisible && (
          <Grid item xs={2.5} className="grid-drawer-portfolio">
            <Box sx={{ display: { xs: 'none', sm: 'none', md: 'block' } }}>
              <div
                style={{
                  padding: '10px',
                }}>
                <Stack
                  display="flex"
                  direction="row"
                  justifyContent="space-between"
                  alignItems="flex-start"
                  sx={{ marginLeft: '16px', marginRight: '16px' }}>
                  <span>
                    <b>Danh mục sản phẩm</b>
                  </span>
                  <Button
                    color="cam"
                    sx={{
                      border: '1px solid #F37622',
                      height: '20px',
                      width: '30px',
                    }}
                    onClick={() => handleResetFilter()}>
                    <CancelIcon sx={{ width: '15px', height: '15px', marginRight: '5px' }} />
                    <span style={{ fontSize: '10px' }}>Xóa</span>
                  </Button>
                </Stack>
              </div>
              <MenuBar />
            </Box>
            <IconButton
              color="inherit"
              aria-label="menu"
              onClick={handleDrawerToggle}
              edge="start"
              sx={{ display: { sm: 'block', md: 'none' } }}>
              <MenuIcon />
            </IconButton>
            <Drawer
              PaperProps={{
                className: 'drawer-portfolio',
              }}
              anchor="left"
              open={openDrawer}
              onClose={handleDrawerToggle}>
              <MenuBar />
            </Drawer>
          </Grid>
        )}
        <Grid item xs={isMenuBarVisible ? 9.5 : 12}>
          <Box sx={{ width: '100%' }}>
            <Stack className="stack-filter-portfolio" direction="row">
              <TextField
                className="stack-input-filter"
                placeholder="Tìm sản phẩm"
                type="text"
                size="small"
                onChange={(e) => setFilter({ ...filter, nameProductDetail: e.target.value })}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <Typography className="stack-typography-portfolio" component="span" variant={'body2'}>
                <Typography
                  onClick={toggleMenuBar}
                  sx={{ display: { xs: 'none', md: 'inline-block' } }}>
                  {showMenuBar ? 'Ẩn bộ lọc' : 'Hiện bộ lọc'}
                  {showMenuBar ? <FilterAltIcon /> : <FilterAltOffIcon />}
                </Typography>
              </Typography>
            </Stack>
            <div className="cart-product-portfolio">
              <CartProduct products={products} colmd={6} collg={isMenuBarVisible ? 3 : 3} />
            </div>
          </Box>
        </Grid>
      </Grid>
    </Container>
  )
}
