import {
  Box,
  Container,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  Tab,
  Tabs,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import SearchIcon from '@mui/icons-material/Search'
import './Order.css'
import ClientAccountApi from '../../../api/client/clientAccount'
import { getStatus } from '../../../services/constants/statusHoaDon'
import { Link } from 'react-router-dom'
import { TbEyeEdit } from 'react-icons/tb'

export default function Order() {
  const [getBill, setGetBill] = useState([])
  const [valueTabHD, setValueTabHD] = React.useState('all')
  const listSttHD = [0, 1, 2, 3, 4, 5, 6, 7]
  const [filter, setFilter] = useState({
    status: '',
    nameProductSearch: null,
  })

  const handleChangeTab = (event, newValue) => {
    setValueTabHD(newValue)
    const updatedFilter = { ...filter, status: newValue === 'all' ? '' : newValue }
    setFilter(updatedFilter)
  }

  useEffect(() => {
    ClientAccountApi.getAllBill(filter).then((response) => {
      setGetBill(response.data.data)
    })
  }, [filter])

  const data = Array.from({ length: 10 }).fill(null)
  return (
    <>
      <div className="order">
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={valueTabHD} onChange={handleChangeTab} className="tabSttHD">
            <Tab label={'Tất cả'} key={'tabSttHd all'} value={'all'}></Tab>
            {listSttHD.map((row, i) => (
              <Tab label={getStatus(row)} key={'tabSttHd' + i} value={row}></Tab>
            ))}
          </Tabs>
        </Box>
        <TextField
          sx={{ width: '100%', marginTop: '20px', border: 'none', backgroundColor: '#C0C0C0' }}
          placeholder="Tìm kiếm theo tên khuyến mại"
          size="small"
          onChange={(e) => setFilter({ ...filter, nameProduct: e.target.value })}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="cam" />
              </InputAdornment>
            ),
          }}
        />
        <div style={{ maxHeight: '500px', overflow: 'auto' }}>
          <Divider />
          {getBill.map((item, index) => (
            <React.Fragment key={index}>
              <Grid container spacing={2} style={{ marginTop: '5px', marginBottom: '20px' }}>
                <Grid item xs={2}>
                  <div style={{ width: '90px', height: '90px', backgroundColor: 'black' }}>
                    <img src={item.url} alt="error" style={{ width: '100%', height: '100%' }} />
                  </div>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="h6" fontFamily={'monospace'} fontWeight={'bolder'}>
                    {item.nameProduct + ' ' + item.material + ' ' + item.sole} "{item.color}"
                  </Typography>
                  <Typography>
                    Phân loại hàng: {item.category} - {item.size}
                  </Typography>
                  <Typography>X{item.quantity}</Typography>
                </Grid>

                <Grid
                  item
                  xs={4}
                  style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <div>
                    <span>
                      {item.price.toLocaleString('it-IT', {
                        style: 'currency',
                        currency: 'VND',
                      })}
                    </span>
                  </div>
                  <Link to={`/profile/get-by-idBill/${item.id}`}>
                    <Tooltip title="Xem chi tiết đơn hàng">
                      <IconButton sx={{ marginLeft: '30px' }} color="cam">
                        <TbEyeEdit />
                      </IconButton>
                    </Tooltip>
                  </Link>
                </Grid>
              </Grid>

              {index < data.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </div>
      </div>
    </>
  )
}
