import React from 'react'
import Empty from '../../components/Empty'
import { Box, Button, Modal, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import ghnAPI from '../../api/admin/ghn/ghnApi'
import DiaChiApi from '../../api/admin/khachhang/DiaChiApi'

const styleModalAddress = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: '60vw', md: '50vw' },
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
  arrData,
  setTimeShip,
}) {
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
  return (
    <div className="client-modal-address">
      {console.log(listAddress)}
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box sx={styleModalAddress}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center" width={'7%'}>
                  STT
                </TableCell>
                <TableCell align="center" width={'25%'}>
                  Tên người nhận
                </TableCell>
                <TableCell align="center" width={'12%'}>
                  Số điện thoại
                </TableCell>
                <TableCell align="center" width={'15%'}>
                  Địa chỉ
                </TableCell>
                <TableCell align="center" width={'10%'}>
                  Thao tác
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {listAddress.map((row) => (
                <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell align="center">{row.stt}</TableCell>
                  <TableCell align="center">{row.name}</TableCell>
                  <TableCell align="center">{row.phoneNumber}</TableCell>
                  <TableCell align="center">{row.specificAddress}</TableCell>
                  <TableCell align="center">
                    <Button
                      variant="contained"
                      onClick={() => handleDetailDiaChi(row.id)}
                      color="success">
                      <b>chọn</b>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {!listAddress && <Empty />}
        </Box>
      </Modal>
    </div>
  )
}
