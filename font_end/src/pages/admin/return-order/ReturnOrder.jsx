import React, { useState } from 'react'
import { Box, Button, InputAdornment, Modal, Paper, Stack, TextField } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import { FaCalendarPlus } from 'react-icons/fa'
import { MdOutlineDocumentScanner } from 'react-icons/md'
import returnApi from '../../../api/admin/return/returnApi'
import { useNavigate } from 'react-router-dom'
import BreadcrumbsCustom from '../../../components/BreadcrumbsCustom'
import { IoIosCreate } from 'react-icons/io'
import { toast } from 'react-toastify'
import Scanner from '../../../layout/Scanner'

const styleModal = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}

const listBreadcrumbs = [{ name: 'Trả hàng', link: '/admin/return-order' }]
export default function ReturnOrder() {
  const [code, setCode] = useState(null)
  const navigate = useNavigate()
  const [qrScannerVisible, setQrScannerVisible] = useState(false)

  function createReturn(code) {
    returnApi.getBill({ codeBill: code }).then((result) => {
      if (result.data.success) {
        navigate('/admin/return-order/bill/' + result.data.data)
        setQrScannerVisible(false)
      } else {
        toast.warning('Hóa đơn không tồn tại, hoặc không đủ điều kiện!')
      }
    })
  }

  return (
    <div className="tra-hang">
      <BreadcrumbsCustom listLink={listBreadcrumbs} />
      <Paper sx={{ p: 2 }}>
        <h4 style={{ marginTop: '0px', marginBottom: '20px' }}>
          <IoIosCreate fontSize={20} style={{ marginBottom: '-4px' }} /> Tạo hóa đơn trả hàng
        </h4>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Box width={'600px'}>
            <TextField
              onChange={(e) => {
                setCode(e.target.value)
              }}
              style={{ width: '400px' }}
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
            <Button
              onClick={() => {
                createReturn(code)
              }}
              color="cam"
              variant="contained"
              className="them-moi"
              sx={{ ml: 1 }}>
              <FaCalendarPlus style={{ marginRight: '5px', fontSize: '17px' }} />
              Tạo
            </Button>
          </Box>
          <Button
            onClick={() => {
              setQrScannerVisible(true)
            }}
            color="cam"
            variant="outlined"
            className="them-moi">
            <MdOutlineDocumentScanner style={{ marginRight: '5px', fontSize: '17px' }} />
            Quét mã
          </Button>
        </Stack>
        <Modal
          open={qrScannerVisible}
          onClose={() => {
            setQrScannerVisible(false)
          }}>
          <Box sx={styleModal}>
            <Scanner handleScan={createReturn} setOpen={setQrScannerVisible} />
          </Box>
        </Modal>
      </Paper>
    </div>
  )
}
