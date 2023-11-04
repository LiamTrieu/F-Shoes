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
  FormControl,
  FormControlLabel,
  InputAdornment,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Slider,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import Checkbox from '@mui/material/Checkbox'
import { Grid } from '@mui/material'
import './Product.css'
import { BiCategoryAlt, BiFontSize, BiSolidColorFill } from 'react-icons/bi'
import { GiBrandyBottle, GiMaterialsScience, GiBootPrints } from 'react-icons/gi'
import { GrMoney } from 'react-icons/gr'
import SearchIcon from '@mui/icons-material/Search'
import { ExpandLess, ExpandMore } from '@mui/icons-material'
import clientProductApi from '../../api/client/clientProductApi'
import FilterAltIcon from '@mui/icons-material/FilterAlt'
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff'

function valuetext(value) {
  return `${value}°C`
}

export default function Product() {
  const [openCategory, setOpenCategory] = useState(false)
  const [openBrand, setOpenBrand] = useState(false)
  const [openMaterial, setOpenMaterial] = useState(false)
  const [openSole, setOpenSole] = useState(false)
  const [openSize, setOpenSize] = useState(false)
  const [openColor, setOpenColor] = useState(false)
  const [openDrawer, setOpenDrawer] = useState(false)
  const [products, setProducts] = useState([])
  const [showMenuBar, setShowMenuBar] = useState(true)
  const [isMenuBarVisible, setIsMenuBarVisible] = useState(true)
  const [selectedFilter, setselectedFilter] = useState([])
  const [filter, setFilter] = useState({
    brand: [],
    material: [],
    color: [],
    sole: [],
    category: [],
    size: [],
    nameProductDetail: null,
  })

  const handleRowCheckboxChange = (event, customerId) => {
    const selectedIndex = selectedFilter.indexOf(customerId)
    let newSelectedIds = []

    if (selectedIndex === -1) {
      newSelectedIds = [...selectedFilter, customerId]
    } else {
      newSelectedIds = [
        ...selectedFilter.slice(0, selectedIndex),
        ...selectedFilter.slice(selectedIndex + 1),
      ]
    }

    setselectedFilter(newSelectedIds)
  }
  // -------------------------------------- Filter ----------------------------------

  const [listBrand, setListBrand] = useState([])
  const [listMaterial, setListMaterial] = useState([])
  const [listColor, setListColor] = useState([])
  const [listSole, setListSole] = useState([])
  const [listCategory, setListCategory] = useState([])
  const [listSize, setListSize] = useState([])

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
    clientProductApi.getSize().then((response) => {
      setListSize(response.data.data)
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

  const handleDrawerToggle = () => {
    setOpenDrawer(!openDrawer)
  }

  const [value1, setValue1] = React.useState([20, 37])

  const handleChange1 = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return
    }

    if (activeThumb === 0) {
      setValue1([Math.min(newValue[0], value1[1] - 10), value1[1]])
    } else {
      setValue1([value1[0], Math.max(newValue[1], value1[0] + 10)])
    }
  }

  const toggleMenuBar = () => {
    setShowMenuBar(!showMenuBar)

    setIsMenuBarVisible(!isMenuBarVisible)
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
                  <Checkbox
                    key={lf.id}
                    value={lf.id}
                    checked={selectedFilter.includes(lf.id)}
                    onClick={(e) => setFilter({ ...filter, category: e.target.value })}
                    onChange={(event) => handleRowCheckboxChange(event, lf.id)}
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
                  <Checkbox
                    key={lf.id}
                    value={lf.id}
                    checked={selectedFilter.includes(lf.id)}
                    onClick={(e) => setFilter({ ...filter, brand: e.target.value })}
                    onChange={(event) => handleRowCheckboxChange(event, lf.id)}
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
                  <Checkbox
                    key={lf.id}
                    value={lf.id}
                    checked={selectedFilter.includes(lf.id)}
                    onClick={(e) => setFilter({ ...filter, material: e.target.value })}
                    onChange={(event) => handleRowCheckboxChange(event, lf.id)}
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
                  <Checkbox
                    key={lf.id}
                    value={lf.id}
                    checked={selectedFilter.includes(lf.id)}
                    onClick={(e) => setFilter({ ...filter, sole: e.target.value })}
                    onChange={(event) => handleRowCheckboxChange(event, lf.id)}
                  />
                  <ListItemText primary={lf.name} key={lf.id} value={lf.id} />
                </ListItemButton>
              ))}
            </List>
          </Collapse>
          {/* --------------------------------------------- SIZE --------------------------------------------- */}
          {/* <ListItemButton onClick={() => setOpenSize(!openSize)} className="list-item-button">
            <BiFontSize className="icon-portfolio" />
            <ListItemText primary="Kích cỡ" />
            {openSize ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={openSize} timeout="auto" unmountOnExit className="collapse-portfolio">
            <List component="div" disablePadding>
              {listSize.map((lf) => (
                <ListItemButton key={lf.id}>
                  <Checkbox
                    key={lf.id}
                    value={lf.id}
                    checked={selectedFilter.includes(lf.id)}
                    onClick={(e) => setFilter({ ...filter, size: e.target.value })}
                    onChange={(event) => handleRowCheckboxChange(event, lf.id)}
                  />
                  <ListItemText primary={lf.size} key={lf.id} value={lf.id} />
                </ListItemButton>
              ))}
            </List>
          </Collapse> */}
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
                  <Grid items xs={4}>
                    <ListItemButton>
                      <FormControl>
                        <RadioGroup>
                          <FormControlLabel
                            value={lf.id}
                            control={<Radio style={{ color: `${lf.code}` }} />}
                            checked={filter.color.includes(lf.id)}
                            onClick={(e) => setFilter({ ...filter, color: e.target.value })}
                          />

                          {lf.name}
                        </RadioGroup>
                      </FormControl>
                    </ListItemButton>
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
          <ListItem>
            <Slider
              value={value1}
              onChange={handleChange1}
              valueLabelDisplay="auto"
              getAriaValueText={valuetext}
              className="slider-portfolio"
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
