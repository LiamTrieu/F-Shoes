import React, { useEffect, useState } from 'react'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Collapse from '@mui/material/Collapse'
import { Box } from '@mui/material'
import { Link } from 'react-router-dom'
import { AiOutlineDashboard } from 'react-icons/ai'
import { RiBillLine } from 'react-icons/ri'
import { CiMoneyBill } from 'react-icons/ci'
import { LiaMoneyCheckAltSolid } from 'react-icons/lia'
import { MdOutlineAssignmentReturn } from 'react-icons/md'
import { MdOutlineSell } from 'react-icons/md'
import { IoChevronForwardOutline } from 'react-icons/io5'
import { FiUsers } from 'react-icons/fi'
import { TbShoe } from 'react-icons/tb'

export default function AdminMenu() {
  const [isMenuProduct, setIsMenuProduct] = useState(
    localStorage.getItem('admin-menu-product') === 'true' ? true : false,
  )
  const [isMenuAccount, setIsMenuAccount] = useState(
    localStorage.getItem('admin-menu-account') === 'true' ? true : false,
  )

  const handleClickOpenMenuProduct = () => {
    localStorage.setItem('admin-menu-product', !isMenuProduct)
    setIsMenuProduct(!isMenuProduct)
  }
  const handleClickOpenMenuAccount = () => {
    localStorage.setItem('admin-menu-account', !isMenuAccount)
    setIsMenuAccount(!isMenuAccount)
  }

  useEffect(() => {
    localStorage.setItem('isShowProduct', isMenuProduct)
    localStorage.setItem('isShowAccountMenu', isMenuAccount)
  }, [isMenuProduct, isMenuAccount])

  return (
    <List component="nav" aria-labelledby="nested-list-subheader" className="admin-menu">
      <Box>
        <ListItemButton className="mt-3" component={Link} to="/admin/dashboard">
          <ListItemIcon sx={{ minWidth: '40px', color: 'black' }}>
            <Box component={AiOutlineDashboard} sx={{ fontSize: '25px' }} />
          </ListItemIcon>
          <ListItemText
            sx={{ m: 0, p: 0 }}
            primaryTypographyProps={{ color: 'black', fontWeight: '500 !important' }}
            primary="Thống kê"
          />
        </ListItemButton>
        <ListItemButton className="mt-3" component={Link} to="/admin/bill">
          <ListItemIcon sx={{ minWidth: '40px', color: 'black' }}>
            <Box component={RiBillLine} sx={{ fontSize: '25px' }} />
          </ListItemIcon>
          <ListItemText
            sx={{ m: 0, p: 0 }}
            primaryTypographyProps={{ color: 'black', fontWeight: '500 !important' }}
            primary="Quản lý đơn hàng"
          />
        </ListItemButton>
        <ListItemButton className="mt-3" component={Link} to="/admin/sell">
          <ListItemIcon sx={{ minWidth: '40px', color: 'black' }}>
            <Box component={CiMoneyBill} sx={{ fontSize: '25px' }} />
          </ListItemIcon>
          <ListItemText
            sx={{ m: 0, p: 0 }}
            primaryTypographyProps={{ color: 'black', fontWeight: '500 !important' }}
            primary="Bán hàng tại quầy"
          />
        </ListItemButton>
        <ListItemButton className="mt-3" sx={{ mb: 0 }} onClick={handleClickOpenMenuProduct}>
          <ListItemIcon sx={{ minWidth: '40px', color: 'black' }}>
            <Box component={TbShoe} sx={{ fontSize: '25px' }} />
          </ListItemIcon>
          <ListItemText
            sx={{ m: 0, p: 0 }}
            primaryTypographyProps={{ color: 'black', fontWeight: '500 !important' }}
            primary="Quản lý sản phẩm"
          />
          <Box
            component={IoChevronForwardOutline}
            sx={{
              transition: 'transform 0.3s ease',
              transform: `rotate(${isMenuProduct ? 0 : 90}deg)`,
            }}
          />
        </ListItemButton>
        <Collapse in={isMenuProduct} timeout={300}>
          <List component="div" disablePadding>
            <ListItemButton component={Link} to="/admin/product">
              <ListItemText
                sx={{ m: 0, p: 0 }}
                primaryTypographyProps={{ color: 'black', fontWeight: '500 !important' }}
                primary="&nbsp;	&bull; &nbsp; &nbsp; Sản phẩm"
              />
            </ListItemButton>

            <ListItemButton component={Link} to="/admin/sole">
              <ListItemText
                sx={{ m: 0, p: 0 }}
                primaryTypographyProps={{ color: 'black', fontWeight: '500 !important' }}
                primary="&nbsp;	&bull; &nbsp; &nbsp; Đế giày"
              />
            </ListItemButton>

            <ListItemButton component={Link} to="/admin/category">
              <ListItemText
                sx={{ m: 0, p: 0 }}
                primaryTypographyProps={{ color: 'black', fontWeight: '500 !important' }}
                primary="&nbsp;	&bull; &nbsp; &nbsp; Loại giày"
              />
            </ListItemButton>
            <ListItemButton component={Link} to="/admin/material">
              <ListItemText
                sx={{ m: 0, p: 0 }}
                primaryTypographyProps={{ color: 'black', fontWeight: '500 !important' }}
                primary="&nbsp;	&bull; &nbsp; &nbsp; Chất liệu"
              />
            </ListItemButton>

            <ListItemButton component={Link} to="/admin/brand">
              <ListItemText
                sx={{ m: 0, p: 0 }}
                primaryTypographyProps={{ color: 'black', fontWeight: '500 !important' }}
                primary="&nbsp;	&bull; &nbsp; &nbsp; Thương hiệu"
              />
            </ListItemButton>
          </List>
        </Collapse>
        <ListItemButton className="mt-3" component={Link} to="/admin/return-order">
          <ListItemIcon sx={{ minWidth: '40px', color: 'black' }}>
            <Box component={MdOutlineAssignmentReturn} sx={{ fontSize: '25px' }} />
          </ListItemIcon>
          <ListItemText
            sx={{ m: 0, p: 0 }}
            primaryTypographyProps={{ color: 'black', fontWeight: '500 !important' }}
            primary="Trả hàng"
          />
        </ListItemButton>
        <ListItemButton className="mt-3" component={Link} to="/admin/voucher">
          <ListItemIcon sx={{ minWidth: '40px', color: 'black' }}>
            <Box component={LiaMoneyCheckAltSolid} sx={{ fontSize: '25px' }} />
          </ListItemIcon>
          <ListItemText
            sx={{ m: 0, p: 0 }}
            primaryTypographyProps={{ color: 'black', fontWeight: '500 !important' }}
            primary="Voucher"
          />
        </ListItemButton>
        <ListItemButton className="mt-3" component={Link} to="/admin/promotion">
          <ListItemIcon sx={{ minWidth: '40px', color: 'black' }}>
            <Box component={MdOutlineSell} sx={{ fontSize: '25px' }} />
          </ListItemIcon>
          <ListItemText
            sx={{ m: 0, p: 0 }}
            primaryTypographyProps={{ color: 'black', fontWeight: '500 !important' }}
            primary="Khuyến mại"
          />
        </ListItemButton>
        <ListItemButton className="mt-3" sx={{ mb: 0 }} onClick={handleClickOpenMenuAccount}>
          <ListItemIcon sx={{ minWidth: '40px', color: 'black' }}>
            <Box component={FiUsers} sx={{ fontSize: '25px' }} />
          </ListItemIcon>
          <ListItemText
            sx={{ m: 0, p: 0 }}
            primaryTypographyProps={{ color: 'black', fontWeight: '500 !important' }}
            primary="Tài khoản"
          />
          <Box
            component={IoChevronForwardOutline}
            sx={{
              transition: 'transform 0.3s ease',
              transform: `rotate(${isMenuAccount ? 0 : 90}deg)`,
            }}
          />
        </ListItemButton>
        <Collapse in={isMenuAccount} timeout={300}>
          <List component="div" disablePadding>
            <ListItemButton component={Link} to="/admin/staff">
              <ListItemText
                sx={{ m: 0, p: 0 }}
                primaryTypographyProps={{ color: 'black', fontWeight: '500 !important' }}
                primary="&nbsp;	&bull; &nbsp; &nbsp; Nhân viên"
              />
            </ListItemButton>
            <ListItemButton sx={{ pb: 0 }} component={Link} to="/admin/customer">
              <ListItemText
                sx={{ m: 0, p: 0 }}
                primaryTypographyProps={{ color: 'black', fontWeight: '500 !important' }}
                primary="&nbsp;	&bull; &nbsp; &nbsp; Khách hàng"
              />
            </ListItemButton>
          </List>
        </Collapse>
      </Box>
    </List>
  )
}
