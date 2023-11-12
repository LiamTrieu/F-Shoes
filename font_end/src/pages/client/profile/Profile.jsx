import {
  Box,
  Container,
  Divider,
  Grid,
  List,
  ListItemButton,
  ListItemIcon,
  Typography,
} from '@mui/material'
import React from 'react'
import ListItemText from '@mui/material/ListItemText'
import Collapse from '@mui/material/Collapse'
import StarBorder from '@mui/icons-material/StarBorder'
import { RiBillLine } from 'react-icons/ri'
import { LiaMoneyCheckAltSolid } from 'react-icons/lia'
import { FiUsers } from 'react-icons/fi'
import EditIcon from '@mui/icons-material/Edit'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { GetUser } from '../../../services/slices/userSlice'
import './Order.css'

export default function Profile({ children }) {
  const [open, setOpen] = React.useState(true)

  const handleClick = () => {
    setOpen(!open)
  }
  const userLogin = useSelector(GetUser)
  return (
    <div className="profile">
      <Container maxWidth="xl">
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <List
              sx={{ width: '100%', maxWidth: 250, height: '100%', bgcolor: 'background.paper' }}
              component="nav"
              aria-labelledby="nested-list-subheader">
              <div style={{ display: 'flex', alignContent: 'center' }}>
                <div
                  style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    backgroundColor: 'black',
                    overflow: 'hidden',
                    marginBottom: '30px',
                    marginLeft: '10px',
                  }}>
                  <img src={userLogin?.avatar} alt="" style={{ width: '100%', height: '100%' }} />
                </div>

                <Typography style={{ marginLeft: '5px', marginTop: '5px', fontWeight: 700 }}>
                  {userLogin?.name}
                  <Typography>
                    {' '}
                    <EditIcon fontSize="small" /> Sửa hồ sơ
                  </Typography>
                </Typography>
              </div>
              <Divider />
              {/* ------------------------------------- === ------------------------------------- */}
              <ListItemButton onClick={handleClick}>
                <ListItemIcon sx={{ minWidth: '40px', color: 'black' }}>
                  <Box component={FiUsers} sx={{ fontSize: '25px' }} />
                </ListItemIcon>
                <ListItemText primary="Tài khoản của tôi" />
              </ListItemButton>
              <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItemButton component={Link} to="/profile" sx={{ pl: 4 }}>
                    <ListItemIcon>
                      <StarBorder />
                    </ListItemIcon>
                    <ListItemText primary="Hồ sơ" />
                  </ListItemButton>
                  <ListItemButton component={Link} to="/profile/address" sx={{ pl: 4 }}>
                    <ListItemIcon>
                      <StarBorder />
                    </ListItemIcon>
                    <ListItemText primary="Địa chỉ" />
                  </ListItemButton>
                </List>
              </Collapse>

              {/* ------------------------------------- === ------------------------------------- */}
              <ListItemButton component={Link} to="/profile/order">
                <ListItemIcon sx={{ minWidth: '40px', color: 'black' }}>
                  <Box component={RiBillLine} sx={{ fontSize: '24px' }} />
                </ListItemIcon>
                <ListItemText primary="Đơn mua" />
              </ListItemButton>
              {/* ------------------------------------- === ------------------------------------- */}
              <ListItemButton component={Link} to="/profile/my-voucher">
                <ListItemIcon sx={{ minWidth: '40px', color: 'black' }}>
                  <Box component={LiaMoneyCheckAltSolid} sx={{ fontSize: '24px' }} />
                </ListItemIcon>
                <ListItemText primary="Kho voucher" />
              </ListItemButton>
            </List>
          </Grid>

          <Grid item xs={9}>
            {children}
          </Grid>
        </Grid>
      </Container>
    </div>
  )
}
