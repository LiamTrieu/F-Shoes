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
  Pagination,
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

const listFake = [
  { id: 1, title: 'fake 1', code: '#0294D7' },
  { id: 2, title: 'fake 2', code: '#F6D716 ' },
  { id: 3, title: 'fake 3', code: '#3B3434' },
  { id: 4, title: 'fake 4', code: '#0DCF89' },
  { id: 5, title: 'fake 5', code: '#ED3123' },
]

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

  useEffect(() => {
    clientProductApi.get().then((result) => {
      const data = result.data.data
      setProducts(
        data.map((e) => {
          return {
            id: e.id,
            title: e.name,
            priceBefort: e.price,
            priceAfter: e.price,
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
  }, [])

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

  const MenuBar = () => {
    return (
      <List className="list-product-portfolio">
        <ListItem className="text-portfolio">
          <ListItemText
            primary="Danh mục sản phẩm"
            primaryTypographyProps={{
              className: 'custom-primary',
            }}
          />
        </ListItem>
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
              {listFake.map((lf) => (
                <ListItemButton key={lf.id}>
                  <Checkbox key={lf.id} />
                  <ListItemText primary={lf.title} />
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
              {listFake.map((lf) => (
                <ListItemButton key={lf.id}>
                  <Checkbox key={lf.id} />
                  <ListItemText primary={lf.title} />
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
              {listFake.map((lf) => (
                <ListItemButton key={lf.id}>
                  <Checkbox key={lf.id} />
                  <ListItemText primary={lf.title} />
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
              {listFake.map((lf) => (
                <ListItemButton key={lf.id}>
                  <Checkbox key={lf.id} />
                  <ListItemText primary={lf.title} />
                </ListItemButton>
              ))}
            </List>
          </Collapse>
          {/* --------------------------------------------- SIZE --------------------------------------------- */}
          <ListItemButton onClick={() => setOpenSize(!openSize)} className="list-item-button">
            <BiFontSize className="icon-portfolio" />
            <ListItemText primary="Kích cỡ" />
            {openSize ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={openSize} timeout="auto" unmountOnExit className="collapse-portfolio">
            <List component="div" disablePadding>
              {listFake.map((lf) => (
                <ListItemButton key={lf.id}>
                  <Checkbox key={lf.id} />
                  <ListItemText primary={lf.title} />
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
                {listFake.map((lf) => (
                  <Grid items xs={4}>
                    <ListItemButton>
                      <FormControl>
                        <RadioGroup>
                          <FormControlLabel
                            value={lf.id}
                            control={<Radio style={{ color: `${lf.code}` }} />}
                          />

                          {lf.title}
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
        <Grid item xs={2.5}>
          <Box sx={{ display: { xs: 'none', sm: 'none', md: 'block' } }}>
            <MenuBar />
          </Box>
          <IconButton
            color="inherit"
            aria-label="menu"
            onClick={handleDrawerToggle}
            edge="start"
            sx={{ display: { sm: 'block', md: 'none' } }} // Chỉ hiển thị icon menu trên màn hình sm
          >
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

        <Grid item xs={9.5}>
          <Box sx={{ width: '100%' }}>
            <Stack className="stack-filter-portfolio" direction="row">
              <TextField
                className="stack-input-filter"
                placeholder="Tìm sản phẩm"
                type="text"
                size="small"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <Typography className="stack-typography-portfolio" component="span" variant={'body2'}>
                <Typography sx={{ display: { xs: 'none', md: 'inline-block' } }}>
                  Sắp xếp
                </Typography>
                <Select className="stack-sort-portfolio" value={1}>
                  <MenuItem value={1}>Tùy chọn</MenuItem>
                  <MenuItem value={5}>Tăng dần</MenuItem>
                  <MenuItem value={10}>Giảm dần</MenuItem>
                </Select>
              </Typography>
            </Stack>
            <div className="cart-product-portfolio">
              {/* <LabelTitle text="Tất cả sản phẩm" /> */}
              <CartProduct products={products} colmd={4} collg={3} />
            </div>
            <Stack className="stack-product-portfolio" direction="row">
              <Typography className="stack-typography-portfolio" component="span" variant={'body2'}>
                <Typography sx={{ display: { xs: 'none', md: 'inline-block' } }}>Xem</Typography>
                <Select className="stack-select-portfolio" value={1}>
                  <MenuItem value={1}>1</MenuItem>
                  <MenuItem value={5}>5</MenuItem>
                  <MenuItem value={10}>10</MenuItem>
                  <MenuItem value={15}>15</MenuItem>
                  <MenuItem value={20}>20</MenuItem>
                </Select>
                <Typography sx={{ display: { xs: 'none', md: 'inline-block' } }}>
                  sản phẩm
                </Typography>
              </Typography>
              <Pagination count={10} variant="outlined" shape="rounded" />
            </Stack>
          </Box>
        </Grid>
      </Grid>
    </Container>
  )
}
