import React, { useEffect, useState } from 'react'
import './MyVoucher.css'
import { Box, Grid, Paper, Stack, Tab, Tabs, Typography } from '@mui/material'
import ClientVoucherApi from '../../api/client/ClientVoucherApi'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'
import ModalVoucherDetail from './ModalVoucherDetail'
import Empty from '../../components/Empty'
import SockJS from 'sockjs-client'
import { Stomp } from '@stomp/stompjs'

function CustomTabPanel(props) {
  const { children, value, index } = props

  return (
    <div hidden={value !== index}>
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}
var stompClient = null
export default function MyVoucher() {
  const [openModal, setOpenModal] = useState(false)
  const [valueTabs, setValueTabs] = useState(0)
  const [voucherByCode, setVoucherByCode] = useState({})
  const [voucherPublic, setVoucherPublic] = useState([])
  const [voucherPrivate, setVoucherPrivate] = useState([])

  const handleChange = (event, newValue) => {
    setValueTabs(newValue)
  }

  const handleOpenModal = (codeVoucher) => {
    ClientVoucherApi.voucherByCode(codeVoucher)
      .then((respone) => {
        setVoucherByCode(respone.data.data)
      })
      .catch(() => {
        toast.error('Vui lòng tải lại trang: ', {
          position: toast.POSITION.TOP_CENTER,
        })
      })
    setOpenModal(true)
  }

  const fetchVoucherPublic = () => {
    ClientVoucherApi.getVoucherPublicMyProfile()
      .then((respone) => {
        setVoucherPublic(respone.data.data)
      })
      .catch(() => {
        toast.error('Vui lòng tải lại trang: ', {
          position: toast.POSITION.TOP_CENTER,
        })
      })
  }

  const fetchVoucherPrivate = () => {
    ClientVoucherApi.getVoucherPrivateMyProfile()
      .then((respone) => {
        setVoucherPrivate(respone.data.data)
      })
      .catch(() => {
        toast.error('Vui lòng tải lại trang: ', {
          position: toast.POSITION.TOP_CENTER,
        })
      })
  }

  useEffect(() => {
    const socket = new SockJS('http://localhost:8080/shoes-websocket-endpoint')
    stompClient = Stomp.over(socket)
    stompClient.connect({}, onConnect)

    return () => {
      stompClient.disconnect()
    }
  }, [])

  const onConnect = () => {
    stompClient.subscribe('/topic/my-voucher-realtime', (message) => {
      if (message.body) {
        const data = JSON.parse(message.body)
        updateReal(data)
      }
    })
  }

  function updateReal(data) {
    const preVoucherPublic = [...voucherPublic]
    const preVoucherPrivate = [...voucherPrivate]
    const indexPublic = preVoucherPublic.findIndex((voucher) => voucher.id === data.id)
    const indexPrivate = preVoucherPrivate.findIndex((voucher) => voucher.id === data.id)
    if (indexPrivate !== -1) {
      preVoucherPrivate[indexPublic] = data
      setVoucherPrivate(preVoucherPrivate)
    }
    if (indexPublic !== -1) {
      preVoucherPublic[indexPublic] = data
      setVoucherPublic(preVoucherPublic)
    }
  }

  useEffect(() => {
    fetchVoucherPublic()
    fetchVoucherPrivate()
  }, [])

  return (
    <div>
      <Paper className="my-voucher" elevation={3} sx={{ p: 2 }}>
        <h1>Kho khyễn mãi</h1>
        <Grid container>
          <Box sx={{ width: '100%', mt: 2 }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={valueTabs} onChange={handleChange}>
                <Tab label="Công khai" />
                <Tab label="Cá nhân" />
              </Tabs>
            </Box>
            <CustomTabPanel value={valueTabs} index={0}>
              <Grid container spacing={2}>
                {voucherPublic.length > 0 &&
                  voucherPublic.map((v) => (
                    <Grid key={v.id} item xs={6}>
                      <Grid className="grid-radio-group-modal-voucher-my-voucher">
                        <Grid item xs={3} className="grid-name-voucher-my-voucher"></Grid>
                        <Grid item xs={9} className="grid-information-voucher-my-voucher">
                          <Stack direction="row" justifyContent="space-between" alignItems="center">
                            <div>
                              Giá trị: {v.typeValue === 0 ? v.value + ' %' : v.value + ' VNĐ'}
                              <br />
                              Tối đa: {v.maximumValue} VNĐ
                              <br />
                              Tối thiểu: {v.minimumAmount} VNĐ
                            </div>
                            <div>
                              <Link onClick={() => handleOpenModal(v.code)}>Xem</Link>
                            </div>
                          </Stack>
                        </Grid>
                      </Grid>
                    </Grid>
                  ))}
                {voucherPublic.length < 1 && <Empty />}
              </Grid>
            </CustomTabPanel>
            <CustomTabPanel value={valueTabs} index={1}>
              <Grid container spacing={2}>
                {voucherPrivate.length > 0 &&
                  voucherPrivate.map((v) => (
                    <Grid key={v.id} item xs={6}>
                      <Grid className="grid-radio-group-modal-voucher-my-voucher">
                        <Grid item xs={3} className="grid-name-voucher-my-voucher"></Grid>
                        <Grid item xs={9} className="grid-information-voucher-my-voucher">
                          <Stack direction="row" justifyContent="space-between" alignItems="center">
                            <div>
                              Giá trị: {v.typeValue === 0 ? v.value + ' %' : v.value + ' VNĐ'}
                              <br />
                              Tối đa: {v.maximumValue} VNĐ
                              <br />
                              Tối thiểu: {v.minimumAmount} VNĐ
                            </div>
                            <div>
                              <Link onClick={() => handleOpenModal(v.code)}>Xem</Link>
                            </div>
                          </Stack>
                        </Grid>
                      </Grid>
                    </Grid>
                  ))}
                {voucherPrivate.length < 1 && <Empty />}
              </Grid>
            </CustomTabPanel>
          </Box>
        </Grid>
      </Paper>
      <ModalVoucherDetail
        openModal={openModal}
        setOpenModal={setOpenModal}
        voucher={voucherByCode}
      />
    </div>
  )
}
