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
  const [valueTabsPublic, setValueTabsPublic] = useState(0)
  const [valueTabsPrivate, setValueTabsPrivate] = useState(0)
  const [voucherByCode, setVoucherByCode] = useState({})
  const [voucherPublicOldest, setVoucherPublicOldest] = useState([])
  const [voucherPublicLatest, setVoucherPublicLatest] = useState([])
  const [voucherPrivateOldest, setVoucherPrivateOldest] = useState([])
  const [voucherPrivateLatest, setVoucherPrivateLatest] = useState([])

  const handleChange = (event, newValue) => {
    setValueTabs(newValue)
    setValueTabsPublic(0)
    setValueTabsPrivate(0)
  }

  const handleChangePublic = (event, newValue) => {
    setValueTabsPublic(newValue)
  }

  const handleChangePrivate = (event, newValue) => {
    setValueTabsPrivate(newValue)
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

  const fetchVoucherPublicOldest = () => {
    ClientVoucherApi.getVoucherPublicMyProfileOldest()
      .then((respone) => {
        setVoucherPublicOldest(respone.data.data)
      })
      .catch(() => {
        toast.error('Vui lòng tải lại trang: ', {
          position: toast.POSITION.TOP_CENTER,
        })
      })
  }

  const fetchVoucherPublicLatest = () => {
    ClientVoucherApi.getVoucherPublicMyProfileLatest()
      .then((respone) => {
        setVoucherPublicLatest(respone.data.data)
      })
      .catch(() => {
        toast.error('Vui lòng tải lại trang: ', {
          position: toast.POSITION.TOP_CENTER,
        })
      })
  }

  const fetchVoucherPrivateOldest = () => {
    ClientVoucherApi.getVoucherPrivateMyProfileOldest()
      .then((respone) => {
        setVoucherPrivateOldest(respone.data.data)
      })
      .catch(() => {
        toast.error('Vui lòng tải lại trang: ', {
          position: toast.POSITION.TOP_CENTER,
        })
      })
  }
  const fetchVoucherPrivateLatest = () => {
    ClientVoucherApi.getVoucherPrivateMyProfileLatest()
      .then((respone) => {
        setVoucherPrivateLatest(respone.data.data)
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
    stompClient.subscribe('/topic/voucher-client-update', (message) => {
      if (message.body) {
        const data = JSON.parse(message.body)
        updateReal(data)
      }
    })
  }

  function updateReal(data) {
    const preVoucherPrivateLatest = [...voucherPrivateLatest]
    const index = preVoucherPrivateLatest.findIndex((voucher) => voucher.id === data.id)
    console.log(index)
    if (index !== -1) {
      preVoucherPrivateLatest[index] = data
      setVoucherPrivateLatest(preVoucherPrivateLatest)
    }
  }

  useEffect(() => {
    fetchVoucherPublicOldest()
    fetchVoucherPublicLatest()
    fetchVoucherPrivateOldest()
    fetchVoucherPrivateLatest()
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
            {valueTabs === 0 && (
              <Box sx={{ borderBottom: 1, borderColor: 'divider', mt: 1 }}>
                <Tabs
                  value={valueTabsPublic}
                  onChange={handleChangePublic}
                  textColor="secondary"
                  indicatorColor="secondary"
                  wrapped>
                  <Tab label="Mới nhất" wrapped />
                  <Tab label="Cũ nhất" wrapped />
                </Tabs>
              </Box>
            )}
            {valueTabs === 1 && (
              <Box sx={{ borderBottom: 1, borderColor: 'divider', mt: 1 }}>
                <Tabs
                  value={valueTabsPrivate}
                  onChange={handleChangePrivate}
                  textColor="secondary"
                  indicatorColor="secondary"
                  wrapped>
                  <Tab label="Mới nhất" wrapped />
                  <Tab label="Cũ nhất" wrapped />
                </Tabs>
              </Box>
            )}
            <CustomTabPanel value={valueTabs} index={0}>
              <CustomTabPanel value={valueTabsPublic} index={0}>
                <Grid container spacing={2}>
                  {voucherPublicLatest.length > 0 &&
                    voucherPublicLatest.map((v) => (
                      <Grid key={v.id} item xs={6}>
                        <Grid className="grid-radio-group-modal-voucher-my-voucher">
                          <Grid item xs={3} className="grid-name-voucher-my-voucher"></Grid>
                          <Grid item xs={9} className="grid-information-voucher-my-voucher">
                            <Stack
                              direction="row"
                              justifyContent="space-between"
                              alignItems="center">
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
                  {voucherPublicLatest.length < 1 && <Empty />}
                </Grid>
              </CustomTabPanel>
              <CustomTabPanel value={valueTabsPublic} index={1}>
                <Grid container spacing={2}>
                  {voucherPublicOldest.length > 0 &&
                    voucherPublicOldest.map((v) => (
                      <Grid key={v.id} item xs={6}>
                        <Grid className="grid-radio-group-modal-voucher-my-voucher">
                          <Grid item xs={3} className="grid-name-voucher-my-voucher"></Grid>
                          <Grid item xs={9} className="grid-information-voucher-my-voucher">
                            <Stack
                              direction="row"
                              justifyContent="space-between"
                              alignItems="center">
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
                  {voucherPublicOldest.length < 1 && <Empty />}
                </Grid>
              </CustomTabPanel>
            </CustomTabPanel>
            <CustomTabPanel value={valueTabs} index={1}>
              <CustomTabPanel value={valueTabsPrivate} index={0}>
                <Grid container spacing={2}>
                  {voucherPrivateLatest.length > 0 &&
                    voucherPrivateLatest.map((v) => (
                      <Grid key={v.id} item xs={6}>
                        <Grid className="grid-radio-group-modal-voucher-my-voucher">
                          <Grid item xs={3} className="grid-name-voucher-my-voucher"></Grid>
                          <Grid item xs={9} className="grid-information-voucher-my-voucher">
                            <Stack
                              direction="row"
                              justifyContent="space-between"
                              alignItems="center">
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
                  {voucherPrivateLatest.length < 1 && <Empty />}
                </Grid>
              </CustomTabPanel>
              <CustomTabPanel value={valueTabsPrivate} index={1}>
                <Grid container spacing={2}>
                  {voucherPrivateOldest.length > 0 &&
                    voucherPrivateOldest.map((v) => (
                      <Grid key={v.id} item xs={6}>
                        <Grid className="grid-radio-group-modal-voucher-my-voucher">
                          <Grid item xs={3} className="grid-name-voucher-my-voucher"></Grid>
                          <Grid item xs={9} className="grid-information-voucher-my-voucher">
                            <Stack
                              direction="row"
                              justifyContent="space-between"
                              alignItems="center">
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
                  {voucherPrivateOldest.length < 1 && <Empty />}
                </Grid>
              </CustomTabPanel>
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
