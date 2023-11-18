import React, { useState } from 'react'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Typography from '@mui/material/Typography'

import {
  Box,
  Button,
  Chip,
  InputAdornment,
  Modal,
  Pagination,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
} from '@mui/material'
import { AiOutlinePlusSquare } from 'react-icons/ai'
import SearchIcon from '@mui/icons-material/Search'
import dayjs from 'dayjs'
import { MdOutlineDocumentScanner } from 'react-icons/md'
import { useEffect } from 'react'
import returnApi from '../../../api/admin/return/returnApi'
import { formatCurrency } from '../../../services/common/formatCurrency '

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 900,
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: '10px',
  p: 4,
}

const ContentModal = () => {
  const [filter, setFilter] = useState({ codeBill: '', page: 0 })
  const [total, setTotal] = useState(1)
  const [bills, setBills] = useState([])
  useEffect(() => {
    returnApi.getBill(filter).then((result) => {
      setTotal(result.data.data.totalPages)
      setBills(result.data.data.data)
    })
  }, [filter])
  return (
    <div>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <TextField
          onChange={(e) => {
            setFilter({ ...filter, codeBill: e.target.value })
          }}
          sx={{ width: '50%' }}
          className="search-field"
          size="small"
          color="cam"
          placeholder="Nhập mã hóa đơn cần trả hàng..."
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="cam" />
              </InputAdornment>
            ),
          }}
        />
        <Button color="cam" variant="outlined" className="them-moi">
          <MdOutlineDocumentScanner style={{ marginRight: '5px', fontSize: '17px' }} />
          Quét mã
        </Button>
      </Stack>
      <Table className="tableCss">
        <TableHead>
          <TableRow>
            <TableCell align="center" width={'7%'}>
              STT
            </TableCell>
            <TableCell width={'15%'}>Mã hóa đơn</TableCell>
            <TableCell width={'15%'}>Khách hàng</TableCell>
            <TableCell align="center" width={'15%'}>
              Số điện thoại
            </TableCell>
            <TableCell width={'20%'} align="center">
              Tổng tiền
            </TableCell>
            <TableCell width={'10%'} align="center">
              Thao tác
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {bills.map((bill) => {
            return (
              <TableRow>
                <TableCell align="center">{bill.stt}</TableCell>
                <TableCell sx={{ maxWidth: '0px' }}>{bill.code}</TableCell>
                <TableCell>{bill.name}</TableCell>
                <TableCell align="center">{bill.phone}</TableCell>
                <TableCell align="center">
                  <Chip label={formatCurrency(bill.total)} size="small" />
                </TableCell>
                <TableCell align="center">
                  <Button size="small" variant="contained" color="cam">
                    Chọn
                  </Button>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
      <Stack mt={2} direction="row" justifyContent="center" alignItems="center" spacing={0}>
        <Pagination
          variant="outlined"
          color="cam"
          count={total}
          page={filter.page + 1}
          onChange={(_, value) => {
            setFilter({ ...filter, page: value - 1 })
          }}
        />
      </Stack>
    </div>
  )
}

export default function ReturnOrder() {
  const [tabValue, setTabValue] = useState(0)
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const handleChange = (event, newValue) => {
    setTabValue(newValue)
  }

  return (
    <div className="tra-hang">
      <h3>Trả hàng</h3>
      <Paper sx={{ p: 2 }}>
        <Button onClick={handleOpen} color="cam" variant="outlined" className="them-moi">
          <AiOutlinePlusSquare style={{ marginRight: '5px', fontSize: '17px' }} />
          Tạo mới
        </Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description">
          <Box sx={style}>
            <ContentModal />
          </Box>
        </Modal>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          <Tabs value={tabValue} onChange={handleChange}>
            <Tab label="Chờ xác nhận trả hàng" />
            <Tab label="Từ chối trả hàng" />
            <Tab label="Trả hàng thành công" />
          </Tabs>

          <TabPanel value={tabValue} index={0}>
            {/* Nội dung cho tab "Chờ xác nhận" */}
            <Typography>Chờ xác nhận</Typography>
          </TabPanel>

          <TabPanel value={tabValue} index={1}>
            {/* Nội dung cho tab "Đã hủy" */}
            <Typography>Đã hủy</Typography>
          </TabPanel>

          <TabPanel value={tabValue} index={2}>
            {/* Nội dung cho tab "Trả hàng thành công" */}
            <Typography>Trả hàng thành công</Typography>
          </TabPanel>
        </div>
      </Paper>
    </div>
  )
}

function TabPanel({ children, value, index }) {
  return (
    <div>
      {value === index && (
        <Typography component="div" sx={{ p: 2 }}>
          {children}
        </Typography>
      )}
    </div>
  )
}
