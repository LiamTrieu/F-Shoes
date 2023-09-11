import { Box, Button, Container, Grid, Paper, Stack, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import Modal from '@mui/material/Modal'
// import Menu from "@mui/joy/Menu";

// import ArrowDropDown from "@mui/icons-material/ArrowDropDown";
// import Dropdown from "@mui/joy/Dropdown";
// import MenuButton from "@mui/joy/MenuButton/MenuButton";
import { DataGrid } from '@mui/x-data-grid'
import { useNavigate, useParams } from 'react-router-dom'
import khuyenMaiApi from '../../../api/admin/khuyenmai/khuyenMaiApi'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import dayjs from 'dayjs'
import Swal from 'sweetalert2'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'firstName', headerName: 'First name', width: 130 },
  { field: 'lastName', headerName: 'Last name', width: 130 },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    width: 90,
  },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (params) => `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  },
]

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
]

export default function AdPromotionDetail() {
  const [age, setAge] = React.useState('')

  let navigate = useNavigate()
  const { id } = useParams()
  const [updatePromotion, setUpdatePromotion] = useState({
    name: '',
    value: '',
    type: false,
    status: '0',
    timeStart: '',
    timeEnd: '',
  })

  const { name, value, timeStart, timeEnd } = updatePromotion

  const onSubmit = (e, id) => {
    khuyenMaiApi
      .UpdayePromotion(e, id)
      .then(() => {
        Swal.fire('update thành công', 'You clicked the button!', 'success')
        navigate('/admin/promotion')
      })
      .catch(() => {
        alert('update thất bại')
      })
  }

  const detail = (id) => {
    khuyenMaiApi.getById(id).then((response) => {
      const formattedStartDate = dayjs(response.data.data.timeStart).format('DD-MM-YYYY HH:mm:ss')
      const formattedEndDate = dayjs(response.data.data.timeEnd).format('DD-MM-YYYY HH:mm:ss')

      setUpdatePromotion({
        ...response.data.data,
        timeStart: formattedStartDate,
        timeEnd: formattedEndDate,
      })
      console.log(response.data)
    })
  }
  useEffect(() => {
    detail(id)
  }, [id])

  const handleChange = (event) => {
    setAge(event.target.value)
  }

  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  return (
    <Container>
      <Paper elevation={3} sx={{ mt: 2, mb: 2, padding: 2, width: '97%' }}>
        <Box sx={{ pt: 4 }}>
          <Typography sx={{ fontSize: '30px', fontWeight: 1000 }}>Khuyến Mại</Typography>
          <Grid container spacing={2} sx={{ pl: 10, pr: 10, mt: 3 }}>
            <Grid item xs={12} md={6}>
              <TextField
                id="outlined-basic"
                variant="outlined"
                size="large"
                sx={{ width: '100%' }}
                name="name"
                value={updatePromotion?.name}
                onChange={(e) => setUpdatePromotion({ ...updatePromotion, name: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                id="outlined-basic"
                variant="outlined"
                size="large"
                sx={{ width: '100%' }}
                name="value"
                value={updatePromotion?.value}
                onChange={(e) => setUpdatePromotion({ ...updatePromotion, value: e.target.value })}
              />
            </Grid>
          </Grid>

          <Grid container spacing={2} sx={{ pl: 10, pr: 10, mt: 3 }}>
            <Grid item xs={12} md={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DateTimePicker']}>
                  <DateTimePicker
                    label="từ ngày"
                    size="large"
                    format={'DD-MM-YYYY HH:mm:ss'}
                    sx={{ width: '100%' }}
                    name="timeStart"
                    value={dayjs(updatePromotion?.timeStart, 'DD-MM-YYYY HH:mm:ss')}
                    onChange={(e) => {
                      setUpdatePromotion({
                        ...updatePromotion,
                        timeStart: dayjs(e).format('DD-MM-YYYY HH:mm:ss'),
                      })
                    }}
                  />
                </DemoContainer>
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} md={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DateTimePicker']}>
                  <DateTimePicker
                    label="Đến ngày"
                    format={'DD-MM-YYYY HH:mm:ss'}
                    size="large"
                    sx={{ width: '100%' }}
                    name="timeEnd"
                    value={dayjs(updatePromotion?.timeEnd, 'DD-MM-YYYY HH:mm:ss')}
                    onChange={(e) => {
                      setUpdatePromotion({
                        ...updatePromotion,
                        timeEnd: dayjs(e).format('DD-MM-YYYY HH:mm:ss'),
                      })
                    }}
                  />
                </DemoContainer>
              </LocalizationProvider>
            </Grid>
          </Grid>

          <Grid container spacing={2} sx={{ pl: 10, pr: 10, mt: 3 }}>
            <Grid item xs={6}>
              <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Quyền sử dụng</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={age}
                    label="Quyền sử dụng"
                    onChange={handleChange}>
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Grid>

            <Grid item xs={6}>
              <Button
                variant="contained"
                color="success"
                sx={{ float: 'left' }}
                onClick={handleOpen}>
                Chọn
              </Button>
            </Grid>
          </Grid>

          <Grid container spacing={2} sx={{ pl: 10, pr: 10, mt: 3 }}>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="success"
                sx={{ float: 'right' }}
                onClick={() => onSubmit(updatePromotion, id)}>
                Tạo Mới
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description">
          <Box sx={style}>
            <TextField id="standard-basic" label="Search" variant="standard" />
            <Stack
              direction="row"
              justifyContent="center"
              alignItems="center"
              spacing={2}
              sx={{ mt: 3, mb: 3 }}>
              <Typography>Trạng Thái:</Typography>
              {/* <Dropdown>
                  <MenuButton
                    // endDecorator={<ArrowDropDown />}
                    sx={{ border: "none" }}>
                    Size
                  </MenuButton>
                  <Menu
                    sx={{ minWidth: 160, "--ListItemDecorator-size": "24px" }}>
                    <MenuItem>Smaller</MenuItem>
                    <MenuItem>Larger</MenuItem>
                  </Menu>
                </Dropdown> */}
              <TextField
                sx={{ mt: 2, width: '30%' }}
                id="outlined-basic"
                label="Từ ngày"
                type="date"
                variant="outlined"
                size="small"
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                sx={{ mt: 2, width: '30%' }}
                id="outlined-basic"
                label="Từ ngày"
                type="date"
                variant="outlined"
                size="small"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Stack>
            <div style={{ height: 400, width: '100%' }}>
              <DataGrid
                rows={rows}
                columns={columns}
                initialState={{
                  pagination: {
                    paginationModel: { page: 0, pageSize: 5 },
                  },
                }}
                pageSizeOptions={[5, 10]}
                checkboxSelection
              />
            </div>
          </Box>
        </Modal>
      </div>
    </Container>
  )
}
