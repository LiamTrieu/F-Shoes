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
  Collapse,
  Container,
  InputAdornment,
  Radio,
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

export default function Product() {
  const [openCategory, setOpenCategory] = useState(false)
  const [openBrand, setOpenBrand] = useState(false)
  const [openMaterial, setOpenMaterial] = useState(false)
  const [openSole, setOpenSole] = useState(false)
  const [openColor, setOpenColor] = useState(false)
  const [openDrawer, setOpenDrawer] = useState(false)
  const [products, setProducts] = useState([])
  const [showMenuBar, setShowMenuBar] = useState(true)
  const [isMenuBarVisible, setIsMenuBarVisible] = useState(true)
  const [filter, setFilter] = useState({
    brand: null,
    material: null,
    color: null,
    sole: null,
    category: null,
    minPrice: 0,
    maxPrice: 0,
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
    clientProductApi.get(filter).then((result) => {
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
    clientProductApi.getMinMaxPrice().then((response) => {
      setMinMaxPrice(response.data.data)
      setFilter({
        ...filter,
        minPrice: response.data.data.minPrice,
        maxPrice: response.data.data.maxPrice,
      })
    })
  }, [])

  const handleDrawerToggle = () => {
    setOpenDrawer(!openDrawer)
  }

  const toggleMenuBar = () => {
    setShowMenuBar(!showMenuBar)
    setIsMenuBarVisible(!isMenuBarVisible)
  }

  const checkColor = (idColor) => {
    if (filter.color === idColor) {
      setFilter({ ...filter, color: null })
    } else {
      setFilter({ ...filter, color: idColor })
    }
  }

  const MenuBar = () => {
    return (
      <List className="list-product-portfolio">
        <div className="menubar-portfolio">
          {/* --------------------------------------------- CATEGORY --------------------------------------------- */}
          <ListItemButton
            onClick={() => setOpenCategory(!openCategory)}
            className="list-item-button">
            <BiCategoryAlt className="icon-portfolio" />
            <ListItemText primary="Loại giày" />
            {openCategory ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={openCategory} timeout="auto" unmountOnExit className="collapse-portfolio">
            <List component="div" disablePadding>
              {listCategory.map((lf) => (
                <ListItemButton key={lf.id}>
                  <Radio
                    key={lf.id}
                    value={lf.id}
                    checked={filter.category === lf.id}
                    onClick={(e) =>
                      filter.category === lf.id
                        ? setFilter({ ...filter, category: null })
                        : setFilter({ ...filter, category: e.target.value })
                    }
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
                <ListItemButton key={lf.id}>
                  <Radio
                    key={lf.id}
                    value={lf.id}
                    checked={filter.brand === lf.id}
                    onClick={(e) =>
                      filter.brand === lf.id
                        ? setFilter({ ...filter, brand: null })
                        : setFilter({ ...filter, brand: e.target.value })
                    }
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
                <ListItemButton key={lf.id}>
                  <Radio
                    key={lf.id}
                    value={lf.id}
                    checked={filter.material === lf.id}
                    onClick={(e) =>
                      filter.material === lf.id
                        ? setFilter({ ...filter, material: null })
                        : setFilter({ ...filter, material: e.target.value })
                    }
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
                <ListItemButton key={lf.id}>
                  <Radio
                    key={lf.id}
                    value={lf.id}
                    checked={filter.sole === lf.id}
                    onClick={(e) =>
                      filter.sole === lf.id
                        ? setFilter({ ...filter, sole: null })
                        : setFilter({ ...filter, sole: e.target.value })
                    }
                  />
                  <ListItemText primary={lf.name} key={lf.id} value={lf.id} />
                </ListItemButton>
              ))}
            </List>
          </Collapse>
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
                        onClick={() => checkColor(lf.id)}>
                        {filter.color === lf.id && <FaCheck color="white" />}
                      </div>
                    </ListItem>
                  </Grid>
                ))}
              </Grid>
            </List>
          </Collapse>
          {/* --------------------------------------------- PRICE --------------------------------------------- */}
          <ListItemButton className="list-item-button">
            <GrMoney className="icon-portfolio" />
            <ListItemText primary="Giá tiền" />
          </ListItemButton>
          <ListItem className="list-item">
            <AirbnbSlider
              onChangeCommitted={(_, value) =>
                setFilter({ ...filter, minPrice: value[0], maxPrice: value[1] })
              }
              min={minMaxPrice.minPrice}
              max={minMaxPrice.maxPrice}
              valueLabelDisplay="auto"
              slots={{ thumb: AirbnbThumbComponent }}
              value={[filter.minPrice, filter.maxPrice]}
              valueLabelFormat={(value) =>
                `${value.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}`
              }
            />
          </ListItem>
        </div>
      </List>
    )
  }

  return (
    <Container maxWidth="xl" className="container-portfolio">
      <Grid container spacing={1}>
        {isMenuBarVisible && (
          <Grid item xs={2.5} className="grid-drawer-portfolio">
            <Box sx={{ display: { xs: 'none', sm: 'none', md: 'block' } }}>
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
              <CartProduct products={products} colmd={6} collg={4} />
            </div>
          </Box>
        </Grid>
      </Grid>
    </Container>
  )
}
