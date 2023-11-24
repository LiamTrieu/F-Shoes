import React, { useState } from 'react'
import { Box, Button, Divider, Grid, Modal, Typography } from '@mui/material'
import ghnAPI from '../../api/admin/ghn/ghnApi'
import DiaChiApi from '../../api/admin/khachhang/DiaChiApi'
import './ModalAddress.css'
import ClientAddressApi from '../../api/client/clientAddressApi'
import { toast } from 'react-toastify'

const styleModalAddress = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: '50vw', md: '45vw' },
  height: '650px',
  bgcolor: 'white',
}

export default function ModalAddress({
  open,
  setOpen,
  setRequest,
  setPhiShip,
  listAddress,
  setSelectedTinh,
  setSelectedHuyen,
  setSelectedXa,
  loadTinh,
  loadHuyen,
  loadXa,
  loadListAd,
  arrData,
  setTimeShip,
}) {
  const [selectedAddress, setSelectedAddress] = useState(null)

  const handleRadioChange = (id, isDefault) => {
    if (isDefault) {
      setSelectedAddress(id)
    } else {
      setSelectedAddress(id)
    }
  }
  const handleUpdateType = (idDC) => {
    ClientAddressApi.updateStatus(idDC).then(() => {
      loadListAd()
      toast.success('Xét địa chỉ mặc định thành công thành công', {
        position: toast.POSITION.TOP_RIGHT,
      })
    })
  }

  const handleDetailDiaChi = (idDiaChi) => {
    setOpen(false)
    DiaChiApi.getById(idDiaChi).then((response) => {
      const { idDiaChi, name, phoneNumber, specificAddress, provinceId, districtId, wardId, type } =
        response.data.data

      loadTinh()
      loadHuyen(provinceId)
      loadXa(districtId)

      const addressParts = specificAddress.split(', ')
      if (addressParts.length === 4) {
        const [address, xaDetail, huyenDetail, tinhDetail] = addressParts

        setSelectedTinh({ label: tinhDetail, id: provinceId })
        setSelectedHuyen({ label: huyenDetail, id: districtId })
        setSelectedXa({ label: xaDetail, id: wardId })

        setRequest({
          fullName: name,
          phone: phoneNumber,
          xa: xaDetail,
          huyen: huyenDetail,
          tinh: tinhDetail,
          address: address,
        })
        const filtelService = {
          shop_id: '3911708',
          from_district: '3440',
          to_district: districtId,
        }

        ghnAPI.getServiceId(filtelService).then((response) => {
          const serviceId = response.data.body.serviceId
          const filterTotal = {
            from_district_id: '3440',
            service_id: serviceId,
            to_district_id: districtId,
            to_ward_code: wardId,
            weight: arrData.reduce((totalWeight, e) => totalWeight + parseInt(e.weight), 0),
            insurance_value: '10000',
          }

          ghnAPI.getTotal(filterTotal).then((response) => {
            setPhiShip(response.data.body.total)

            const filtelTime = {
              from_district_id: '3440',
              from_ward_code: '13010',
              to_district_id: districtId,
              to_ward_code: wardId,
              service_id: serviceId,
            }
            ghnAPI.getime(filtelTime).then((response) => {
              setTimeShip(response.data.body.leadtime * 1000)
            })
          })
        })
      }
    })
  }

  const handleConfirm = () => {
    if (selectedAddress) {
      handleDetailDiaChi(selectedAddress)
      setOpen(false)
    }
  }

  return (
    <div className="client-modal-address">
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box sx={styleModalAddress}>
          <p style={{ marginLeft: '20px' }} className="hs-user">
            Địa Chỉ của tôi
          </p>
          <hr />
          <Grid
            container
            spacing={2}
            sx={{ mb: 2, ml: 1, mr: 1, width: '97%', height: '65%' }}
            className="gird-dcco">
            {listAddress.map((item, index) => (
              <React.Fragment key={index}>
                <Grid item xs={12} md={1}>
                  <label htmlFor={`address-${index}`}>
                    <input
                      type="radio"
                      style={{ marginTop: '35px' }}
                      id={`address-${index}`}
                      name="selectedAddress"
                      checked={selectedAddress === item.id}
                      onChange={() => handleRadioChange(item.id, item.type)}
                    />
                  </label>
                </Grid>
                <Grid item xs={12} md={6} style={{ display: 'flex' }}>
                  <label htmlFor={`address-${index}`}>
                    <Typography className="title-ac-name">{item.name}</Typography>
                    <Typography className="title-ac-ps">{item.phoneNumber}</Typography>
                    <Typography className="title-ac-ps1">{item.specificAddress}</Typography>
                    {item.type === true ? <span className="mac-dinh-ac">Mặc định</span> : ''}
                  </label>
                </Grid>
                <Grid item xs={12} md={5}>
                  <div className="btn-adr-ac" style={{ display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <Button className="btn-xoa-cn" onClick={() => handleDetailDiaChi(item.id)}>
                        Cập nhật
                      </Button>
                    </div>
                    <Button
                      disabled={item.type === true}
                      className="btn-mac-dinh-ad"
                      onClick={() => handleUpdateType(item.id)}>
                      Thiết lập mặc định
                    </Button>
                  </div>
                </Grid>
                {index < listAddress.length - 1 && (
                  <Grid item xs={12}>
                    <Divider sx={{ mt: 2, mb: 2 }} />
                  </Grid>
                )}
              </React.Fragment>
            ))}
          </Grid>
          <hr />
          <div className="btn-adck">
            <Button className="btn-xnck" disabled={!selectedAddress} onClick={handleConfirm}>
              Xác Nhận
            </Button>
            <Button className="btn-huyckad" onClick={() => setOpen(false)}>
              Hủy
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  )
}
