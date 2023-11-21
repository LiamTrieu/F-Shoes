import React, { useState } from 'react'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Typography from '@mui/material/Typography'

import {
  Box,
  Button,
  Chip,
  IconButton,
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
import { Link, useParams } from 'react-router-dom'
import BreadcrumbsCustom from '../../../components/BreadcrumbsCustom'
import { TbEyeEdit } from 'react-icons/tb'
import Empty from '../../../components/Empty'

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
                <TableCell sx={{ maxWidth: '0px', fontWeight: '600' }}>
                  <span style={{ color: '#2874A6' }}>{bill.code}</span>
                </TableCell>
                <TableCell>{bill.name}</TableCell>
                <TableCell align="center">{bill.phone}</TableCell>
                <TableCell align="center">
                  <Chip label={formatCurrency(bill.total)} size="small" />
                </TableCell>
                <TableCell align="center">
                  <Button
                    component={Link}
                    to={`/admin/return-order/bill/${bill.id}`}
                    size="small"
                    variant="contained"
                    color="cam">
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

const TableReturn = ({ status }) => {
  const [returns, setReturns] = useState([])
  const [filter, setFilter] = useState({ text: '', page: 0, status: status })
  const [total, setTotal] = useState(1)

  useEffect(() => {
    returnApi.getReturn(filter).then((result) => {
      setTotal(result.data.data.totalPages)
      setReturns(result.data.data.data)
    })
  }, [filter])

  return (
    <>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="flex-start"
        spacing={1}
        style={{ marginBottom: '20px' }}>
        <TextField
          onChange={(e) => {
            setFilter({ ...filter, text: e.target.value })
          }}
          sx={{ width: '600px' }}
          id="hd-input-search"
          className="search-field"
          size="small"
          color="cam"
          placeholder="Tìm kiếm mã trả hàng, mã hóa đơn, khách hàng"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="cam" />
              </InputAdornment>
            ),
          }}
        />
      </Stack>
      {returns.length > 0 ? (
        <>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center" width={'5%'}>
                  <b>STT</b>
                </TableCell>
                <TableCell>
                  <b>Mã trả hàng</b>
                </TableCell>
                <TableCell>
                  <b>Mã hóa đơn</b>
                </TableCell>
                <TableCell>
                  <b>Thời gian</b>
                </TableCell>
                <TableCell>
                  <b>Số tiền</b>
                </TableCell>
                <TableCell>
                  <b>Trạng thái</b>
                </TableCell>
                <TableCell align="center">
                  <b>Chức năng</b>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {returns.map((data) => {
                return (
                  <TableRow
                    key={data.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell component="th" scope="row" align="center">
                      {data.stt}
                    </TableCell>
                    <TableCell>{data.code}</TableCell>
                    <TableCell>
                      <Link to={`/admin/bill-detail/${data.idBill}`}>{data.codeBill}</Link>
                    </TableCell>
                    <TableCell>{dayjs(data.date).format('DD-MM-YYYY HH:mm')}</TableCell>
                    <TableCell>
                      <Chip size="small" label={formatCurrency(data.total)} />
                    </TableCell>
                    <TableCell>
                      <Chip
                        className={
                          data.status === 0
                            ? 'chip-cho'
                            : data.status === 1
                            ? 'chip-hoat-dong'
                            : data.status === 2
                            ? 'chip-khong-hoat-dong'
                            : 'chip-dang'
                        }
                        size="small"
                        label={
                          data.status === 0
                            ? 'Chờ phê duyệt'
                            : data.status === 1
                            ? 'Hoàn thành'
                            : data.status === 2
                            ? 'Đã hủy'
                            : 'Đang xử lý'
                        }
                      />
                    </TableCell>
                    <TableCell align="center">
                      <IconButton
                        color="cam"
                        component={Link}
                        to={`/admin/return-order/detail/${data.id}`}>
                        <TbEyeEdit fontSize={'25px'} />
                      </IconButton>
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
        </>
      ) : (
        <Empty />
      )}
    </>
  )
}

const listBreadcrumbs = [{ name: 'Trả hàng', link: '/admin/return-order/0' }]
export default function ReturnOrder() {
  const { index } = useParams()

  const parsedIndex = parseInt(index, 10)

  const validTabValue = Math.min(3, Math.max(0, parsedIndex)) || 0

  const [tabValue, setTabValue] = useState(validTabValue)
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const handleChange = (event, newValue) => {
    setTabValue(newValue)
  }

  return (
    <div className="tra-hang">
      <BreadcrumbsCustom listLink={listBreadcrumbs} />
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
            <Tab label="Đang xử lý" />
            <Tab label="Từ chối trả hàng" />
            <Tab label="Trả hàng thành công" />
          </Tabs>

          <TabPanel value={tabValue} index={0}>
            <TableReturn status={0} />
          </TabPanel>

          <TabPanel value={tabValue} index={1}>
            <TableReturn status={3} />
          </TabPanel>

          <TabPanel value={tabValue} index={2}>
            <TableReturn status={2} />
          </TabPanel>

          <TabPanel value={tabValue} index={3}>
            <TableReturn status={1} />
          </TabPanel>
        </div>
      </Paper>
    </div>
  )
}

function TabPanel({ children, value, index }) {
  return (
    <div style={{ width: '100%' }}>
      {value === index && (
        <Typography component="div" sx={{ p: 2 }}>
          {children}
        </Typography>
      )}
    </div>
  )
}
