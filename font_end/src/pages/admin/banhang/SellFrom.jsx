import React, { useEffect, useState } from 'react'
import {
  Autocomplete,
  Box,
  Button,
  Chip,
  Container,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  Modal,
  Paper,
  Radio,
  RadioGroup,
  Stack,
  Switch,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TextField,
  Toolbar,
  Typography,
} from '@mui/material'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import CloseIcon from '@mui/icons-material/Close'
import Person4Icon from '@mui/icons-material/Person4'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import Grid2 from '@mui/material/Unstable_Grid2/Grid2'
import { LocalShipping } from '@mui/icons-material'
import sellApi from '../../../api/admin/sell/SellApi'
import dayjs from 'dayjs'
import './sell.css'
import ModelSell from './ModelSell'
import ghnAPI from '../../../api/admin/ghn/ghnApi'
import DiaChiApi from '../../../api/admin/khachhang/DiaChiApi'
import voucherApi from '../../../api/admin/voucher/VoucherApi'
import { toast } from 'react-toastify'
import Empty from '../../../components/Empty'
import khachHangApi from '../../../api/admin/khachhang/KhachHangApi'
import { useTheme } from '@emotion/react'
import confirmSatus from '../../../components/comfirmSwal'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

const styleModalProduct = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: '90vw', md: '80vw' },
  height: '600px',
  bgcolor: 'white',
  borderRadius: 1.5,
  boxShadow: 24,
}
const styleModalAddCustomer = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: '85vw', sm: '65vw', md: '55vw', lg: '45vw' },
  height: '500px',
  bgcolor: 'white',
  borderRadius: 1.5,
  boxShadow: 24,
}

export default function SellFrom({ idBill, getAllBillTaoDonHang, setSelectBill }) {
  const theme = useTheme()
  const [giaoHang, setGiaoHang] = useState(false)
  const [isShowCustomer, setIsShowCustomer] = useState(false)
  const [isShowVoucher, setIsShowVoucher] = useState(false)
  const [isShowDiaChi, setIsShowDiaChi] = useState(false)
  const [isShowAddCustomer, setIsShowAddCustomer] = useState(false)
  const [quantityBillDetail, setQuantityBillDetail] = useState({
    quantity: 0,
  })
  const [isShowAddDiaChi, setIsShowAddDiaChi] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [initPage, setInitPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)

  const [listKhachHang, setlistKhachHang] = useState([])
  const [listVoucher, setListVoucher] = useState([])
  const [listProductDetailBill, setListProductDetailBill] = useState([])
  const [listDiaChiDetail, setListDiaChiDetail] = useState([])

  const [codeVoucher, setCodeVoucher] = useState('')
  const [idFillVoucher, setIdFIllVoucher] = useState('')
  const [shipTotal, setShipTotal] = useState('')
  const [timeShip, setTimeShip] = useState('')
  const [list, setList] = useState([])

  const [khachHang, setKhachHang] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    dateBirth: '',
    role: 2,
    gender: '',
    avatar: null,
    note: '',
  })
  const [diaChi, setDiaChi] = useState({
    name: '',
    phoneNumber: '',
    specificAddress: '',
    type: true,
    provinceId: null,
    districtId: null,
    wardId: null,
    idCustomer: '',
  })
  const [errors, setErrors] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    dateBirth: '',
    provinceId: '',
    districtId: '',
    wardId: '',
    specificAddress: '',
  })

  const openAddProductModal = () => {
    setShowModal(true)
  }
  useEffect(() => {
    fectchProductBillSell(idBill)
  }, [idBill])

  const fectchProductBillSell = (id) => {
    sellApi.getProductDetailBill(id).then((response) => {
      setListProductDetailBill(response.data.data)
    })
  }

  const fecthDataCustomer = () => {
    sellApi.getAllCustomer().then((response) => {
      setlistKhachHang(response.data.data.data)
    })
  }
  const fecthDataVoucher = () => {
    voucherApi.getAllVoucherBystatus().then((response) => {
      setListVoucher(response.data.data)
    })
  }

  const rollBackQuantityProductDetail = (idBill, idPrDetail) => {
    sellApi
      .rollBackQuantityProductDetail(idBill, idPrDetail)
      .then((response) => {
        toast.success('Bạn đã bỏ sản phẩm ra thành công', { position: toast.POSITION.TOP_CENTER })
        fectchProductBillSell(idBill)
      })
      .catch((error) => {
        toast.error('Bạn đã bỏ sản phẩm ra thất bại', { position: toast.POSITION.TOP_CENTER })
      })
  }

  const increaseQuantityBillDetail = (idBillDetail, idPrDetail) => {
    sellApi.increaseQuantityBillDetail(idBillDetail, idPrDetail).then((response) => {
      toast.success('Tăng số lượng sản phẩm thành công', { position: toast.POSITION.TOP_CENTER })
      fectchProductBillSell(idBill)
    })
  }

  const decreaseQuantityBillDetail = (idBillDetail, idPrDetail) => {
    sellApi.decreaseQuantityBillDetail(idBillDetail, idPrDetail).then((response) => {
      toast.success('Giảm số lượng sản phẩm thành công', { position: toast.POSITION.TOP_CENTER })
      fectchProductBillSell(idBill)
    })
  }

  const inputQuantityBillDetail = (idBillDetail, idPrDetail, quantity) => {
    sellApi.inputQuantityBillDetail(idBillDetail, idPrDetail, quantity).then((response) => {
      toast.success('Thay đổi số lượng sản phẩm thành công', {
        position: toast.POSITION.TOP_CENTER,
      })
      fectchProductBillSell(idBill)
      console.log(quantity)
    })
  }

  useEffect(() => {
    fecthDataCustomer()
    fecthDataVoucher()
    loadTinh()
    loadList()

    const fecthDataVoucherByIdCustomer = () => {
      if (idFillVoucher !== '') {
        voucherApi.getAllVoucherByIdCustomer(idFillVoucher).then((response) => {
          const newVouchers = response.data.data
          setListVoucher((prevVouchers) => [...prevVouchers, ...newVouchers])
        })
      }
    }
    if (idFillVoucher !== '') {
      fecthDataVoucherByIdCustomer()
    }
  }, [idFillVoucher])

  const loadDiaChi = (initPage, idCustomer) => {
    DiaChiApi.getAll(initPage - 1, idCustomer).then((response) => {
      setListDiaChiDetail(response.data.data.content)
      setTotalPages(response.data.data.totalPages)
    })
  }

  const calculateDiscountedPrice = (originalPrice, discountPercentage) => {
    const discountAmount = (discountPercentage / 100) * originalPrice
    const discountedPrice = originalPrice - discountAmount
    return discountedPrice
  }

  const formatPrice = (price) => {
    return price.toLocaleString('vi-VN', {
      style: 'currency',
      currency: 'VND',
    })
  }

  const [tinh, setTinh] = useState([])
  const [huyen, setHuyen] = useState([])
  const [xa, setXa] = useState([])

  const loadList = () => {
    khachHangApi.getAll().then((response) => {
      setList(response.data)
    })
  }

  const loadTinh = () => {
    ghnAPI.getProvince().then((response) => {
      setTinh(response.data)
    })
  }

  const loadHuyen = (idProvince) => {
    ghnAPI.getDistrict(idProvince).then((response) => {
      setHuyen(response.data)
    })
  }

  const loadXa = (idDistrict) => {
    ghnAPI.getWard(idDistrict).then((response) => {
      setXa(response.data)
    })
  }

  const [selectedTinh, setSelectedTinh] = useState(null)
  const [selectedHuyen, setSelectedHuyen] = useState(null)
  const [selectedXa, setSelectedXa] = useState(null)
  const handleTinhChange = (_, newValue) => {
    setSelectedTinh(newValue)
    setSelectedHuyen(null)
    if (newValue) {
      loadHuyen(newValue.id)
      setTinhName(newValue.label)
      setDiaChi({ ...diaChi, provinceId: newValue.id })
      setDetailDiaChi({ ...detailDiaChi, provinceId: newValue.id })
      setNewDiaChi({ ...newDiaChi, provinceId: { id: newValue.id, label: newValue.label } })
    } else {
      setHuyen([])
      setDiaChi({ ...diaChi, provinceId: null })
      setNewDiaChi({ ...newDiaChi, provinceId: { id: '', label: '' } })
      setDetailDiaChi({ ...detailDiaChi, provinceId: '' })
    }
  }

  const handleHuyenChange = (_, newValue) => {
    setSelectedHuyen(newValue)
    setSelectedXa(null)
    if (newValue) {
      loadXa(newValue.id)
      setDiaChi({ ...diaChi, districtId: newValue.id })
      setNewDiaChi({ ...newDiaChi, districtId: { id: newValue.id, label: newValue.label } })
      setHuyenName(newValue.label)
      setDetailDiaChi({ ...detailDiaChi, districtId: newValue.id })
    } else {
      setXa([])
      setNewDiaChi({ ...newDiaChi, districtId: { id: '', label: '' } })
      setDetailDiaChi({ ...detailDiaChi, districtId: '' })
    }
  }

  const handleXaChange = (_, newValue) => {
    if (newValue) {
      setSelectedXa(newValue)
      setDiaChi({ ...diaChi, wardId: newValue?.id })
      setDetailDiaChi({ ...detailDiaChi, wardId: newValue.id })
      setNewDiaChi({ ...newDiaChi, wardId: { id: newValue.id, label: newValue.label } })
    } else {
      setDetailDiaChi({ ...detailDiaChi, wardId: '' })
      setNewDiaChi({ ...newDiaChi, wardId: { id: '', label: '' } })
    }
  }
  const updateDiaChi = () => {
    setDiaChi({
      ...diaChi,
      name: khachHang.fullName,
      phoneNumber: khachHang.phoneNumber,
      type: true,
    })
  }
  const handleGenderChange = (event) => {
    setKhachHang({ ...khachHang, gender: event.target.value })
  }

  const isPhoneNumberDuplicate = (phoneNumber) => {
    return list.some((customer) => customer.phoneNumber === phoneNumber)
  }

  const isEmailDuplicate = (email) => {
    return list.some((customer) => customer.email === email)
  }
  const [detailDiaChi, setDetailDiaChi] = useState({
    name: '',
    phoneNumber: '',
    email: '',
    specificAddress: '',
    type: 0,
  })
  const [xaName, setXaName] = useState('')
  const [huyenName, setHuyenName] = useState('')
  const [tinhName, setTinhName] = useState('')

  const onSubmit = (khachHang) => {
    const newErrors = {}
    let check = 0

    if (!khachHang.fullName) {
      newErrors.fullName = 'Vui lòng nhập Họ và Tên.'
      check++
    } else if (khachHang.fullName.length > 100) {
      newErrors.fullName = 'Họ và Tên không được quá 100 kí tự.'
      check++
    } else {
      newErrors.fullName = ''
    }

    if (!khachHang.email) {
      newErrors.email = 'Vui lòng nhập Email.'
      check++
    } else {
      const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
      if (!emailRegex.test(khachHang.email)) {
        newErrors.email = 'Vui lòng nhập một địa chỉ email hợp lệ.'
        check++
      } else if (khachHang.email.length > 50) {
        newErrors.email = 'Email không được quá 50 kí tự.'
        check++
      } else if (isEmailDuplicate(khachHang.email)) {
        newErrors.email = 'Email đã tồn tại trong danh sách.'
        check++
      } else {
        newErrors.email = ''
      }
    }

    if (!khachHang.phoneNumber) {
      newErrors.phoneNumber = 'Vui lòng nhập Số điện thoại.'
      check++
    } else {
      const phoneNumberRegex = /^(0[1-9][0-9]{8})$/
      if (!phoneNumberRegex.test(khachHang.phoneNumber)) {
        newErrors.phoneNumber = 'Vui lòng nhập một số điện thoại hợp lệ (VD: 0987654321).'
        check++
      } else if (isPhoneNumberDuplicate(khachHang.phoneNumber)) {
        newErrors.phoneNumber = 'Số điện thoại đã tồn tại trong danh sách.'
        check++
      } else {
        newErrors.phoneNumber = ''
      }
    }

    if (!khachHang.dateBirth) {
      newErrors.dateBirth = 'Vui lòng chọn Ngày sinh.'
      check++
    } else {
      newErrors.dateBirth = ''
    }

    if (!selectedTinh) {
      newErrors.provinceId = 'Vui lòng chọn Tỉnh/Thành phố.'
      check++
    } else {
      newErrors.provinceId = ''
    }

    if (!selectedHuyen) {
      newErrors.districtId = 'Vui lòng chọn Quận/Huyện.'
      check++
    } else {
      newErrors.districtId = ''
    }

    if (!selectedXa) {
      newErrors.wardId = 'Vui lòng chọn Xã/Phường/Thị trấn.'
      check++
    } else {
      newErrors.wardId = ''
    }

    if (check > 0) {
      setErrors(newErrors)
      return
    }
    const title = 'Xác nhận Thêm mới khách hàng?'
    const text = ''
    confirmSatus(title, text, theme).then((result) => {
      if (result.isConfirmed) {
        khachHangApi.addKhachHang(khachHang).then((response) => {
          let khachHangId = response.data.data.id
          const obj = {
            name: diaChi.name,
            phoneNumber: diaChi.phoneNumber,
            specificAddress: diaChi.specificAddress,
            type: true,
            idCustomer: khachHangId,
            provinceId: diaChi.provinceId,
            districtId: diaChi.districtId,
            wardId: diaChi.wardId,
          }
          DiaChiApi.add(obj).then(() => {
            toast.success('Thêm khách hàng thành công', {
              position: toast.POSITION.TOP_RIGHT,
            })
            setIsShowAddCustomer(false)
            fecthDataCustomer()
            setSelectedTinh(null)
            setSelectedHuyen(null)
            setSelectedXa(null)
          })
        })
      }
    })
  }

  const fillDetailDiaChi = (idCustomer) => {
    DiaChiApi.getAddressDefault(idCustomer).then((response) => {
      const {
        idDiaChi,
        name,
        email,
        phoneNumber,
        specificAddress,
        provinceId,
        districtId,
        wardId,
        type,
      } = response.data.data

      loadTinh()
      loadHuyen(provinceId)
      loadXa(districtId)
      const addressParts = specificAddress.split(', ')
      if (addressParts.length === 4) {
        const [address, xaDetail, huyenDetail, tinhDetail] = addressParts
        setXaName(xaDetail)
        setHuyenName(huyenDetail)
        setTinhName(tinhDetail)

        setDetailDiaChi({
          id: idDiaChi,
          name: name,
          type: type,
          phoneNumber: phoneNumber,
          email: email,
          specificAddress: address,
          provinceId: provinceId,
          districtId: districtId,
          wardId: wardId,
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
            weight: '200',
            insurance_value: '10000',
          }

          ghnAPI.getTotal(filterTotal).then((response) => {
            setShipTotal(response.data.body.total)

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

  const handleDetailDiaChi = (idDiaChi) => {
    setIsShowDiaChi(false)
    DiaChiApi.getById(idDiaChi).then((response) => {
      const {
        idDiaChi,
        name,
        email,
        phoneNumber,
        specificAddress,
        provinceId,
        districtId,
        wardId,
        type,
      } = response.data.data

      loadTinh()
      loadHuyen(provinceId)
      loadXa(districtId)
      const addressParts = specificAddress.split(', ')
      if (addressParts.length === 4) {
        const [address, xaDetail, huyenDetail, tinhDetail] = addressParts
        setXaName(xaDetail)
        setHuyenName(huyenDetail)
        setTinhName(tinhDetail)

        setDetailDiaChi({
          id: idDiaChi,
          name: name,
          type: type,
          phoneNumber: phoneNumber,
          email: email,
          specificAddress: address,
          provinceId: provinceId,
          districtId: districtId,
          wardId: wardId,
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
            weight: '200',
            insurance_value: '10000',
          }

          ghnAPI.getTotal(filterTotal).then((response) => {
            setShipTotal(response.data.body.total)

            const filtelTime = {
              from_district_id: '3440',
              from_ward_code: '13010',
              to_district_id: districtId,
              to_ward_code: wardId,
              service_id: serviceId,
            }
            ghnAPI.getime(filtelTime).then((response) => {
              console.log(response.data.body.leadtime)
              setTimeShip(response.data.body.leadtime * 1000)
            })
          })
        })
      }
    })
  }

  const [newDiaChi, setNewDiaChi] = useState({
    name: '',
    phoneNumber: '',
    specificAddress: '',
    provinceId: { id: '', label: '' },
    districtId: { id: '', label: '' },
    wardId: { id: '', label: '' },
    type: null,
    idCustomer: '',
  })
  const [errorsAA, setErrorsAA] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    provinceId: '',
    districtId: '',
    wardId: '',
    specificAddress: '',
  })

  const handleDiaChi = (idCustomer) => {
    setIsShowCustomer(false)
    loadDiaChi(initPage, idCustomer)
    fillDetailDiaChi(idCustomer)
    setIdFIllVoucher(idCustomer)
    setNewDiaChi({
      ...newDiaChi,
      idCustomer: idCustomer,
    })
  }

  const onCreateDiaChi = (newDiaChi) => {
    const newErrors = {}
    let checkAA = 0

    if (!newDiaChi.name.trim()) {
      newErrors.name = 'Tên người nhận không được để trống'
      checkAA++
    } else if (newDiaChi.name.trim().length > 100) {
      newErrors.fullName = 'Tên người nhận không được quá 100 kí tự.'
      checkAA++
    } else {
      newErrors.name = ''
    }

    if (!newDiaChi.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Vui lòng nhập Số điện thoại.'
      checkAA++
    } else {
      const phoneNumberRegex = /^(0[1-9][0-9]{8})$/
      if (!phoneNumberRegex.test(newDiaChi.phoneNumber.trim())) {
        newErrors.phoneNumber = 'Vui lòng nhập một số điện thoại hợp lệ (VD: 0987654321).'
        checkAA++
        // } else if (isPhoneNumberDuplicate(khachHang.phoneNumber)) {
        //   newErrors.phoneNumber = 'Số điện thoại đã tồn tại trong danh sách.'
        //   check++
      } else {
        newErrors.phoneNumber = ''
      }
    }

    if (!selectedTinh) {
      newErrors.provinceId = 'Vui lòng chọn Tỉnh/Thành phố.'
      checkAA++
    } else {
      newErrors.provinceId = ''
    }

    if (!selectedHuyen) {
      newErrors.districtId = 'Vui lòng chọn Quận/Huyện.'
      checkAA++
    } else {
      newErrors.districtId = ''
    }

    if (!selectedXa) {
      newErrors.wardId = 'Vui lòng chọn Xã/Phường/Thị trấn.'
      checkAA++
    } else {
      newErrors.wardId = ''
    }
    if (checkAA > 0) {
      setErrorsAA(newErrors)
      return
    }

    const title = 'Xác nhận Thêm mới địa chỉ?'
    const text = ''
    const obj = {
      name: newDiaChi.name,
      phoneNumber: newDiaChi.phoneNumber,
      email: newDiaChi.email,
      provinceId: selectedTinh ? selectedTinh.id : null,
      districtId: selectedHuyen ? selectedHuyen.id : null,
      wardId: selectedXa ? selectedXa.id : null,
      specificAddress:
        newDiaChi.specificAddress +
        (selectedXa ? `, ${selectedXa.label}` : '') +
        (selectedHuyen ? `, ${selectedHuyen.label}` : '') +
        (selectedTinh ? `, ${selectedTinh.label}` : ''),
      type: 0,
      idCustomer: newDiaChi.idCustomer,
    }
    confirmSatus(title, text, theme).then((result) => {
      if (result.isConfirmed) {
        DiaChiApi.add(obj).then(() => {
          loadDiaChi(initPage, obj.idCustomer)
          toast.success('Thêm địa chỉ thành công', {
            position: toast.POSITION.TOP_RIGHT,
          })
          setIsShowAddDiaChi(false)
        })
      }
    })
  }

  const [voucher, setVoucher] = useState({
    id: '',
    code: '',
    name: '',
    value: '',
    maximumValue: '',
    minimumAmount: '',
    type: '',
    startDate: '',
    endDate: '',
  })

  const handleVoucher = (idVoucher) => {
    setIsShowVoucher(false)
    voucherApi
      .getOneVoucherById(idVoucher)
      .then((response) => {
        setVoucher(response.data.data)
        setCodeVoucher(response.data.data.code)
      })
      .catch(() => {
        toast.error(`Không tồn tại khuyến mãi với id : ${idVoucher}`, {
          position: toast.POSITION.TOP_RIGHT,
        })
      })
  }
  const addBill = (id) => {
    const data = {
      fullName: detailDiaChi.name ? detailDiaChi.name : '',
      phoneNumber: detailDiaChi.phoneNumber ? detailDiaChi.phoneNumber : '',
      idVourcher: voucher.id ? voucher.id : null,
      idCustomer: newDiaChi.idCustomer ? newDiaChi.idCustomer : null,
      address: detailDiaChi.specificAddress ? detailDiaChi.specificAddress : '',
      note: khachHang.note ? khachHang.note : '',
      moneyShip: giaoHang ? shipTotal : 0,
      moneyReduce: totalMoneyReduce ? totalMoneyReduce : '',
      totalMoney: totalPriceCart ? totalPriceCart : '',
      moneyAfter: totalPrice ? totalPrice : '',
      type: giaoHang === true ? 1 : 0,
    }

    console.log(data)
    const title = 'Xác nhận đặt hàng ?'
    const text = ''
    confirmSatus(title, text, theme).then((result) => {
      if (result.isConfirmed) {
        sellApi.addBill(data, id).then((response) => {
          toast.success(' xác nhận thành công', {
            position: toast.POSITION.TOP_CENTER,
          })
          getAllBillTaoDonHang()
          setSelectBill('')
        })
      }
    })
  }

  const totalSum = listProductDetailBill.reduce((sum, cart) => {
    const productTotalPrice = calculateDiscountedPrice(cart.price, cart.value) * cart.quantity
    return sum + productTotalPrice
  }, 0)

  const totalPriceCart = totalSum
  const ShipingFree = giaoHang ? shipTotal : 0
  // const moneyReducedVoucher = 0

  const totalMoneyReduce = (voucher.value * totalPriceCart) / 100

  const totalPrice = totalPriceCart + ShipingFree - totalMoneyReduce
  return (
    <>
      <TableContainer component={Paper} variant="elevation" sx={{ mb: 4 }}>
        <Box p={2} sx={{ borderBottom: '1px dotted gray' }}>
          <Typography fontWeight={'bold'} variant="h6" display={'inline'}>
            Sản phẩm
          </Typography>

          <Button
            onClick={openAddProductModal}
            sx={{ float: 'right', borderRadius: '8px' }}
            size="small"
            variant="outlined"
            color="cam">
            <AddIcon fontSize="small" /> Thêm sản phẩm
          </Button>
        </Box>

        <ModelSell
          load={fectchProductBillSell}
          idBill={idBill}
          open={showModal}
          setOPen={setShowModal}
        />

        <Box>
          <Box sx={{ maxHeight: '55vh', overflow: 'auto' }}>
            {listProductDetailBill.length > 0 ? (
              listProductDetailBill.map((cart, index) => (
                <Table>
                  <TableRow sx={{ border: 0 }} key={cart.id}>
                    <TableCell sx={{ px: 0 }} width={'5%'}>
                      <IconButton
                        color="error"
                        onClick={() => rollBackQuantityProductDetail(idBill, cart.id)}>
                        <CloseIcon />
                      </IconButton>
                    </TableCell>
                    <TableCell style={{ verticalAlign: 'middle' }} sx={{ px: 0 }} width={'70%'}>
                      <Box
                        component="span"
                        display={{ sm: 'inline', xs: 'none' }}
                        style={{ position: 'relative' }}>
                        <img
                          alt="error"
                          src={cart.image}
                          style={{
                            minHeight: '200px',
                            height: '200px',
                            width: '200px',
                            verticalAlign: 'middle',
                          }}
                        />
                        {cart.value && (
                          <div
                            style={{
                              position: 'absolute',
                              top: '-530%',
                              right: '0',
                              backgroundColor:
                                cart.value >= 1 && cart.value <= 50
                                  ? '#66CC00'
                                  : cart.value >= 51 && cart.value <= 80
                                  ? '#FF9900'
                                  : '#FF0000',
                              color: 'white',
                              padding: '6px 5px',
                              borderRadius: '0 0 0 10px',
                            }}
                            className="discount">
                            {cart.value}% OFF
                          </div>
                        )}
                      </Box>
                      <span
                        style={{
                          display: 'inline-block',
                          verticalAlign: 'middle',
                          marginLeft: '10px',
                          maxWidth: '70%',
                        }}>
                        <p style={{ margin: 0 }}>
                          <b>{cart.nameProduct}</b>
                        </p>
                        <p style={{ color: 'red', margin: '5px 0' }}>
                          {/* <b>{cart.price}.000&#8363;</b> */}
                          {cart.promotion ? (
                            <div>
                              <div className="promotion-price">{`${formatPrice(cart.price)}đ`}</div>{' '}
                              <div>
                                <span style={{ color: 'red', fontWeight: 'bold' }}>
                                  {`${formatPrice(
                                    calculateDiscountedPrice(cart.price, cart.value),
                                  )}`}
                                </span>{' '}
                              </div>
                            </div>
                          ) : (
                            <span>{`${cart.price}₫`}</span>
                          )}
                        </p>
                        <p style={{ margin: 0 }}>size:{cart.size}</p>
                      </span>
                    </TableCell>
                    <TableCell sx={{ px: 0 }} width={'5%'}>
                      <Box
                        width={'65px'}
                        display="flex"
                        alignItems="center"
                        sx={{
                          border: '1px solid gray',
                          borderRadius: '20px',
                        }}
                        p={'3px'}>
                        <IconButton
                          sx={{ p: 0 }}
                          size="small"
                          onClick={() => decreaseQuantityBillDetail(cart.idBillDetail, cart.id)}>
                          <RemoveIcon fontSize="1px" />
                        </IconButton>
                        <TextField
                          value={cart.quantity}
                          inputProps={{ min: 1 }}
                          size="small"
                          sx={{
                            width: '30px ',
                            '& input': { p: 0, textAlign: 'center' },
                            '& fieldset': {
                              border: 'none',
                            },
                          }}
                          onChange={(e) => {
                            inputQuantityBillDetail(cart.idBillDetail, cart.id, e.target.value)
                          }}
                        />
                        <IconButton
                          size="small"
                          sx={{ p: 0 }}
                          onClick={() => increaseQuantityBillDetail(cart.idBillDetail, cart.id)}>
                          <AddIcon fontSize="1px" />
                        </IconButton>
                      </Box>
                    </TableCell>
                    <TableCell
                      sx={{
                        color: 'red',
                        fontWeight: 'bold',
                      }}
                      width={'20%'}
                      align="right">
                      {formatPrice(
                        calculateDiscountedPrice(cart.price, cart.value) * cart.quantity,
                      )}
                    </TableCell>
                  </TableRow>
                </Table>
              ))
            ) : (
              <Empty />
            )}
          </Box>
          <Stack
            m={2}
            direction="row"
            justifyContent="space-between"
            alignItems="flex-start"
            spacing={2}>
            <Typography fontWeight={'bold'}>Tổng tiền</Typography>
            <Box>
              <Typography fontWeight={'bold'} style={{ color: 'red' }}>
                {formatPrice(totalSum)}
              </Typography>
            </Box>
          </Stack>
        </Box>
        {/* ) : (
          'Không có sản phẩm nào '
        )} */}
      </TableContainer>
      <Paper sx={{ mb: 7 }}>
        <Box p={2} sx={{ borderBottom: '1px dotted gray' }}>
          <Typography fontWeight={'bold'} variant="h6" display={'inline'}>
            Khách hàng
          </Typography>
          <Button
            onClick={() => {
              setIsShowCustomer(true)
            }}
            sx={{ float: 'right', borderRadius: '8px' }}
            size="small"
            variant="outlined"
            color="cam">
            <Person4Icon fontSize="small" /> Chọn khách hàng
          </Button>
          <Modal
            open={isShowCustomer}
            onClose={() => {
              setIsShowCustomer(false)
            }}>
            <Box sx={styleModalProduct}>
              <Toolbar sx={{ mb: 1 }}>
                <Box
                  sx={{
                    color: 'black',
                    flexGrow: 1,
                  }}>
                  <Typography variant="h6" component="div">
                    Tìm kiếm khách hàng
                  </Typography>
                </Box>
                <IconButton
                  onClick={() => {
                    setIsShowCustomer(false)
                  }}
                  aria-label="close"
                  color="error"
                  style={{
                    boxShadow: '1px 2px 3px 1px rgba(0,0,0,.05)',
                  }}>
                  <CloseIcon />
                </IconButton>
              </Toolbar>
              <Container>
                <Box>
                  <TextField
                    sx={{
                      width: '50%',
                      '.MuiInputBase-input': { py: '7.5px' },
                    }}
                    size="small"
                    variant="outlined"
                    placeholder="Tìm khách hàng"
                  />
                  <Button sx={{ ml: 2 }} variant="contained">
                    Tìm kiếm
                  </Button>
                  <Button
                    onClick={() => {
                      setIsShowAddCustomer(true)
                    }}
                    sx={{ ml: 2 }}
                    variant="contained"
                    color="success">
                    Thêm
                  </Button>
                </Box>
                <Box
                  sx={{
                    mt: 3,
                    maxHeight: '400px',
                    overflow: 'auto',
                  }}></Box>
                <Modal
                  open={isShowAddCustomer}
                  onClose={() => {
                    setIsShowAddCustomer(false)
                  }}>
                  <Box sx={styleModalAddCustomer}>
                    <Toolbar>
                      <Box
                        sx={{
                          color: 'black',
                          flexGrow: 1,
                        }}>
                        <Typography variant="h6" component="div">
                          Thêm khách hàng
                        </Typography>
                      </Box>
                      <IconButton
                        onClick={() => {
                          setIsShowAddCustomer(false)
                        }}
                        aria-label="close"
                        color="error"
                        style={{
                          boxShadow: '1px 2px 3px 1px rgba(0,0,0,.05)',
                        }}>
                        <CloseIcon />
                      </IconButton>
                    </Toolbar>
                    <Container>
                      <TextField
                        sx={{ mt: 2 }}
                        label="Tên khách hàng"
                        id="outlined-basic"
                        variant="outlined"
                        type="text"
                        size="small"
                        fullWidth
                        onChange={(e) => {
                          setKhachHang({ ...khachHang, fullName: e.target.value.trim() })
                          updateDiaChi()
                          setErrors({ ...errors, fullName: '' })
                        }}
                      />
                      <Typography variant="body2" color="error">
                        {errors.fullName}
                      </Typography>
                      <TextField
                        sx={{ mt: 2 }}
                        label="Email"
                        id="outlined-basic"
                        variant="outlined"
                        type="text"
                        size="small"
                        fullWidth
                        onChange={(e) => {
                          setKhachHang({ ...khachHang, email: e.target.value.trim() })
                          updateDiaChi()
                          setErrors({ ...errors, email: '' })
                        }}
                      />
                      <Typography variant="body2" color="error">
                        {errors.email}
                      </Typography>
                      <TextField
                        sx={{ mt: 2 }}
                        label="Số điện thoại"
                        id="outlined-basic"
                        variant="outlined"
                        type="text"
                        size="small"
                        fullWidth
                        onChange={(e) => {
                          setKhachHang({ ...khachHang, phoneNumber: e.target.value.trim() })
                          updateDiaChi()
                          setErrors({ ...errors, phoneNumber: '' })
                        }}
                      />
                      <Typography variant="body2" color="error">
                        {errors.phoneNumber}
                      </Typography>

                      <Grid container spacing={2} sx={{ mt: 2 }}>
                        <Grid item xs={8}>
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['DatePicker']}>
                              <DatePicker
                                label="Ngày sinh"
                                sx={{ width: '100%' }}
                                className="small-datepicker"
                                onChange={(e) =>
                                  setKhachHang({
                                    ...khachHang,
                                    dateBirth: dayjs(e).format('DD-MM-YYYY'),
                                  })
                                }
                              />
                            </DemoContainer>
                          </LocalizationProvider>
                          <Typography variant="body2" color="error">
                            {errors.dateBirth}
                          </Typography>
                        </Grid>
                        <Grid item xs={4}>
                          <FormControl size="small">
                            <RadioGroup
                              label
                              row
                              value={khachHang.gender}
                              onChange={handleGenderChange}>
                              <FormControlLabel
                                name="genderUpdate"
                                value="true"
                                control={<Radio />}
                                label="Nam"
                              />
                              <FormControlLabel
                                name="genderUpdate"
                                value="false"
                                control={<Radio />}
                                label="Nữ"
                              />
                            </RadioGroup>
                          </FormControl>
                          <Typography variant="body2" color="error">
                            {errors.gender}
                          </Typography>
                        </Grid>
                      </Grid>
                      <Grid container spacing={2} sx={{ mt: 2 }}>
                        <Grid item xs={4}>
                          <Box sx={{ minWidth: 120 }}>
                            <Autocomplete
                              popupIcon={null}
                              fullWidth
                              size="small"
                              className="search-field"
                              id="combo-box-demo"
                              value={selectedTinh}
                              onChange={handleTinhChange}
                              options={tinh.map((item) => ({
                                label: item.provinceName,
                                id: item.provinceID,
                              }))}
                              getOptionLabel={(options) => options.label}
                              renderInput={(params) => (
                                <TextField placeholder="Tỉnh/thành phố" color="cam" {...params} />
                              )}
                            />
                          </Box>
                          <Typography variant="body2" color="error">
                            {errors.provinceId}
                          </Typography>
                        </Grid>
                        <Grid item xs={4}>
                          <Box sx={{ minWidth: 120 }}>
                            <Autocomplete
                              popupIcon={null}
                              fullWidth
                              size="small"
                              className="search-field"
                              id="huyen-autocomplete"
                              value={selectedHuyen}
                              onChange={handleHuyenChange}
                              options={huyen.map((item) => ({
                                label: item.districtName,
                                id: item.districtID,
                              }))}
                              getOptionLabel={(options) => options.label}
                              renderInput={(params) => (
                                <TextField placeholder="Quận/huyện" color="cam" {...params} />
                              )}
                            />
                          </Box>
                          <Typography variant="body2" color="error">
                            {errors.districtId}
                          </Typography>
                        </Grid>
                        <Grid item xs={4}>
                          <Box sx={{ minWidth: 120 }}>
                            <Autocomplete
                              popupIcon={null}
                              fullWidth
                              size="small"
                              className="search-field"
                              id="xa-autocomplete"
                              value={selectedXa}
                              onChange={handleXaChange}
                              options={xa.map((item) => ({
                                label: item.wardName,
                                id: item.wardCode,
                              }))}
                              getOptionLabel={(options) => options.label}
                              renderInput={(params) => (
                                <TextField
                                  placeholder="Xã/phường/thị trấn"
                                  color="cam"
                                  {...params}
                                />
                              )}
                            />
                          </Box>
                          <Typography variant="body2" color="error">
                            {errors.wardId}
                          </Typography>
                        </Grid>
                      </Grid>
                      <TextField
                        sx={{ mt: 2 }}
                        label="Địa chỉ"
                        id="outlined-basic"
                        variant="outlined"
                        type="text"
                        size="small"
                        fullWidth
                        onChange={(e) =>
                          setDiaChi({
                            ...diaChi,
                            specificAddress:
                              e.target.value.trim() +
                              ', ' +
                              selectedXa.label +
                              ', ' +
                              selectedHuyen.label +
                              ', ' +
                              selectedTinh.label,
                          })
                        }
                        disabled={!selectedXa}
                      />
                      <Stack
                        mt={2}
                        direction="row"
                        justifyContent="flex-end"
                        alignItems="flex-end"
                        spacing={2}>
                        <Button
                          onClick={() => onSubmit(khachHang)}
                          variant="contained"
                          color="success">
                          <b>Thêm</b>
                        </Button>
                      </Stack>
                    </Container>
                  </Box>
                </Modal>
              </Container>
              <Container>
                <Table className="tableCss mt-5">
                  <TableHead>
                    <TableRow>
                      <TableCell align="center" width={'7%'}>
                        STT
                      </TableCell>
                      <TableCell align="center" width={'25%'}>
                        Email
                      </TableCell>
                      <TableCell align="center" width={'12%'}>
                        Họ tên
                      </TableCell>
                      <TableCell align="center" width={'15%'}>
                        Ngày sinh
                      </TableCell>
                      <TableCell align="center" width={'15%'}>
                        Số điện thoại
                      </TableCell>
                      <TableCell align="center" width={'15%'}>
                        Giới tính
                      </TableCell>
                      <TableCell align="center" width={'15%'}>
                        Trạng thái
                      </TableCell>
                      <TableCell align="center" width={'10%'}>
                        Thao tác
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {listKhachHang.map((row) => (
                      <TableRow
                        key={row.id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <TableCell align="center">{row.stt}</TableCell>
                        <TableCell align="center">{row.email}</TableCell>
                        <TableCell align="center">{row.fullName}</TableCell>
                        <TableCell align="center">
                          {dayjs(row.dateBirth).format('MM/DD/YYYY')}
                        </TableCell>
                        <TableCell align="center">{row.phoneNumber}</TableCell>
                        <TableCell align="center">{row.gender ? 'Nam' : 'Nữ'}</TableCell>
                        <TableCell align="center">
                          {row.status === 0 ? (
                            <Chip
                              // onClick={() => deleteKhachHang(row.id)}
                              className="chip-hoat-dong"
                              size="small"
                              label="Hoạt động"
                            />
                          ) : (
                            <Chip
                              className="chip-khong-hoat-dong"
                              size="small"
                              label="Không hoạt động"
                            />
                          )}
                        </TableCell>
                        <TableCell align="center">
                          <Button
                            variant="contained"
                            onClick={() => handleDiaChi(row.id)}
                            color="success">
                            <b>chọn</b>
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Container>
            </Box>
          </Modal>
        </Box>
        <Box p={2}>
          <Box display={'inline'}>
            <b>Tên Khách hàng </b>
            <span
              style={{
                padding: '5px 10px',
                borderRadius: '50px',
                marginLeft: '20px',
                backgroundColor: 'rgb(240,240,240)',
              }}>
              {newDiaChi.name || 'khách lẻ'}
            </span>
            <Button
              sx={{ py: '6.7px', ml: 1 }}
              variant="outlined"
              onClick={() => setIsShowDiaChi(true)}>
              <b>Chọn Địa chỉ</b>
            </Button>
            <Modal
              open={isShowDiaChi}
              onClose={() => {
                setIsShowDiaChi(false)
              }}>
              <Box sx={styleModalProduct}>
                <Toolbar sx={{ mb: 1 }}>
                  <Box
                    sx={{
                      color: 'black',
                      flexGrow: 1,
                    }}>
                    <Typography variant="h6" component="div">
                      Danh sách Địa chỉ
                    </Typography>
                  </Box>
                  <IconButton
                    onClick={() => {
                      setIsShowDiaChi(false)
                    }}
                    aria-label="close"
                    color="error"
                    style={{
                      boxShadow: '1px 2px 3px 1px rgba(0,0,0,.05)',
                    }}>
                    <CloseIcon />
                  </IconButton>
                </Toolbar>
                <Container>
                  <Table className="tableCss mt-5">
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
                      {listDiaChiDetail.map((row) => (
                        <TableRow
                          key={row.id}
                          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                          <TableCell align="center">{}</TableCell>
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
                  <Button
                    variant="outlined"
                    color="cam"
                    sx={{ mt: 3 }}
                    onClick={() => {
                      setIsShowAddDiaChi(true)
                    }}>
                    Thêm địa chỉ
                  </Button>
                  <Box
                    sx={{
                      mt: 3,
                      maxHeight: '400px',
                      overflow: 'auto',
                    }}></Box>
                  <Modal
                    open={isShowAddDiaChi}
                    onClose={() => {
                      setIsShowAddDiaChi(false)
                    }}>
                    <Box sx={styleModalAddCustomer}>
                      <Toolbar>
                        <Box
                          sx={{
                            color: 'black',
                            flexGrow: 1,
                          }}>
                          <Typography variant="h6" component="div">
                            Thêm địa chỉ
                          </Typography>
                        </Box>
                        <IconButton
                          onClick={() => {
                            setIsShowAddDiaChi(false)
                          }}
                          aria-label="close"
                          color="error"
                          style={{
                            boxShadow: '1px 2px 3px 1px rgba(0,0,0,.05)',
                          }}>
                          <CloseIcon />
                        </IconButton>
                      </Toolbar>
                      <Container>
                        <Grid container spacing={2} sx={{ mt: 3 }}>
                          <Grid item xs={12} md={6}>
                            <Typography>
                              <span className="required"> *</span>Tên người nhận
                            </Typography>
                            <TextField
                              id="outlined-basic"
                              variant="outlined"
                              type="text"
                              size="small"
                              name="name"
                              fullWidth
                              onChange={(e) => {
                                setNewDiaChi({ ...newDiaChi, name: e.target.value })
                              }}
                            />
                            <Typography variant="body2" color="error">
                              {errorsAA.name}
                            </Typography>
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <Typography>
                              <span className="required"> *</span>Số điện thoại
                            </Typography>
                            <TextField
                              id="outlined-basic"
                              variant="outlined"
                              type="text"
                              size="small"
                              name="phoneNumber"
                              fullWidth
                              onChange={(e) => {
                                setNewDiaChi({ ...newDiaChi, phoneNumber: e.target.value })
                              }}
                            />
                            <Typography variant="body2" color="error">
                              {errorsAA.phoneNumber}
                            </Typography>
                          </Grid>
                        </Grid>
                        <Grid container spacing={2} sx={{ mt: 3 }}>
                          <Grid item xs={12} md={4}>
                            <Typography>
                              <span className="required"> *</span>Tỉnh/thành phố
                            </Typography>
                            <Box sx={{ minWidth: 120 }}>
                              <Autocomplete
                                popupIcon={null}
                                fullWidth
                                size="small"
                                className="search-field"
                                id="combo-box-demo"
                                value={selectedTinh}
                                onChange={handleTinhChange}
                                options={
                                  tinh &&
                                  tinh.map((item) => ({
                                    label: item.provinceName,
                                    id: item.provinceID,
                                  }))
                                }
                                getOptionLabel={(options) => options.label}
                                renderInput={(params) => (
                                  <TextField placeholder="nhập tên tỉnh" color="cam" {...params} />
                                )}
                              />
                            </Box>
                            <Typography variant="body2" color="error">
                              {errorsAA.provinceId}
                            </Typography>
                          </Grid>

                          <Grid item xs={12} md={4}>
                            <Typography>
                              <span className="required"> *</span>Quận/huyện
                            </Typography>
                            <Box sx={{ minWidth: 120 }}>
                              <Autocomplete
                                popupIcon={null}
                                fullWidth
                                size="small"
                                className="search-field"
                                id="huyen-autocomplete"
                                value={selectedHuyen}
                                onChange={handleHuyenChange}
                                options={
                                  huyen &&
                                  huyen.map((item) => ({
                                    label: item.districtName,
                                    id: item.districtID,
                                  }))
                                }
                                getOptionLabel={(options) => options.label}
                                renderInput={(params) => (
                                  <TextField placeholder="nhập tên huyện" color="cam" {...params} />
                                )}
                              />
                            </Box>
                            <Typography variant="body2" color="error">
                              {errorsAA.districtId}
                            </Typography>
                          </Grid>
                          <Grid item xs={12} md={4}>
                            <Typography>
                              <span className="required"> *</span>Xã/phường/thị trấn
                            </Typography>
                            <Box sx={{ minWidth: 120 }}>
                              <Autocomplete
                                popupIcon={null}
                                fullWidth
                                size="small"
                                className="search-field"
                                id="xa-autocomplete"
                                value={selectedXa}
                                onChange={handleXaChange}
                                options={
                                  xa &&
                                  xa.map((item) => ({ label: item.wardName, id: item.wardCode }))
                                }
                                getOptionLabel={(options) => options.label}
                                renderInput={(params) => (
                                  <TextField placeholder="nhập tên Xã" color="cam" {...params} />
                                )}
                              />
                            </Box>
                            <Typography variant="body2" color="error">
                              {errorsAA.wardId}
                            </Typography>
                          </Grid>
                        </Grid>
                        <Grid container spacing={2} sx={{ mt: 3 }}>
                          <Typography>
                            <span className="required"> *</span>Địa chỉ cụ thể
                          </Typography>
                          <Grid item xs={12} md={12}>
                            <TextField
                              id="outlined-basic"
                              variant="outlined"
                              type="text"
                              size="small"
                              fullWidth
                              onChange={(e) =>
                                setNewDiaChi({
                                  ...newDiaChi,
                                  specificAddress: e.target.value,
                                })
                              }
                              disabled={!selectedXa}
                            />
                          </Grid>
                        </Grid>

                        <Grid container spacing={2} sx={{ mt: 3 }}>
                          <Grid item xs={12}>
                            <Button
                              onClick={() => onCreateDiaChi(newDiaChi)}
                              variant="outlined"
                              color="cam"
                              sx={{ float: 'right' }}>
                              Tạo Mới
                            </Button>
                          </Grid>
                        </Grid>
                      </Container>
                    </Box>
                  </Modal>
                </Container>
              </Box>
            </Modal>
          </Box>
          <Box display={'inline'} sx={{ float: 'right' }}>
            <b>Giao hàng</b>
            <Switch
              onChange={() => {
                setGiaoHang(!giaoHang)
              }}
              color="secondary"
              checked={giaoHang}
              size="small"
            />
          </Box>
        </Box>
        <Grid2 container spacing={2}>
          <Grid2 md={7} xs={12} p={0}>
            <Box p={3} pt={0} pb={2}>
              <TextField
                id="outlined-basic"
                variant="outlined"
                label="Tên người nhận"
                type="text"
                size="small"
                sx={{ mt: 1, width: '48%' }}
                name="name"
                value={detailDiaChi.name}
                // onChange={(e) => {
                //   setDetailDiaChi({ ...detailDiaChi, name: e.target.value })
                // }}
              />
              <TextField
                id="outlined-basic"
                variant="outlined"
                label="Số điện thoại"
                type="text"
                size="small"
                sx={{ mt: 1, width: '48%', float: 'right' }}
                name="phoneNumber"
                value={detailDiaChi.phoneNumber}
                // onChange={(e) => {
                //   setDetailDiaChi({ ...detailDiaChi, phoneNumber: e.target.value })
                // }}
              />
              <Grid container spacing={2} sx={{ mb: 3 }}>
                <Grid item xs={4}>
                  <Autocomplete
                    popupIcon={null}
                    sx={{ mt: 1, width: '100%' }}
                    size="small"
                    className="search-field"
                    id="combo-box-demo"
                    value={{ label: tinhName, id: detailDiaChi.provinceId }}
                    onChange={handleTinhChange}
                    options={
                      tinh &&
                      tinh.map((item) => ({
                        label: item.provinceName,
                        id: item.provinceID,
                      }))
                    }
                    getOptionLabel={(options) => options.label}
                    renderInput={(params) => (
                      <TextField
                        placeholder="nhập tên tỉnh"
                        label="Tỉnh/thành phố"
                        color="cam"
                        {...params}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={4}>
                  <Autocomplete
                    popupIcon={null}
                    sx={{ mt: 1, width: '100%' }}
                    size="small"
                    className="search-field"
                    value={{ label: huyenName, id: detailDiaChi.districtId }}
                    onChange={handleHuyenChange}
                    options={
                      huyen &&
                      huyen.map((item) => ({
                        label: item.districtName,
                        id: item.districtID,
                      }))
                    }
                    getOptionLabel={(option) => option.label}
                    renderInput={(params) => (
                      <TextField
                        placeholder="Chọn huyện"
                        label="Quận/huyện"
                        color="cam"
                        {...params}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={4}>
                  <Autocomplete
                    popupIcon={null}
                    sx={{ mt: 1, width: '100%' }}
                    size="small"
                    className="search-field"
                    value={{ label: xaName, id: detailDiaChi.wardId }}
                    onChange={handleXaChange}
                    options={xa && xa.map((item) => ({ label: item.wardName, id: item.wardCode }))}
                    getOptionLabel={(option) => option.label}
                    renderInput={(params) => (
                      <TextField
                        placeholder="Chọn xã"
                        label="Xã/phường/thị trấn"
                        color="cam"
                        {...params}
                      />
                    )}
                  />
                </Grid>
              </Grid>
              <TextField
                id="outlined-basic"
                variant="outlined"
                label="Địa chỉ cụ thể"
                type="text"
                size="small"
                sx={{ mt: 1, width: '48%' }}
                name="specificAddress"
                value={detailDiaChi.specificAddress}
                onChange={(e) => {
                  const updatedDetailDiaChi = { ...detailDiaChi }
                  updatedDetailDiaChi.specificAddress = e.target.value
                  setDetailDiaChi(updatedDetailDiaChi)
                }}
              />
              <TextField
                disabled={!giaoHang}
                sx={{ mt: 1, width: '48%', float: 'right' }}
                label="Ghi chú"
                size="small"
                onChange={(e) => setKhachHang({ ...khachHang, note: e.target.value })}
              />
            </Box>
            <Box ml={3} color={!giaoHang ? '#E0E0E0' : ''}>
              <LocalShipping sx={{ mb: '-5px', mr: '5px' }} />
              <b>Đơn vị vận chuyển: </b>
              <b style={{ color: !giaoHang ? '#E0E0E0' : 'rgb(20, 95, 227)' }}>Giao hàng nhanh</b>
            </Box>
            <Box ml={3} color={!giaoHang ? '#E0E0E0' : ''}>
              <LocalShipping sx={{ mb: '-5px', mr: '5px' }} />
              <b>Thời gian dự kiến: </b>
              <b style={{ color: !giaoHang ? '#E0E0E0' : 'rgb(20, 95, 227)' }}>
                {' '}
                {timeShip !== '' ? dayjs(timeShip).format('DD/MM/YYYY') : ''}
              </b>
            </Box>
          </Grid2>
          <Grid2 md={5} xs={12} p={0}>
            <Box sx={{ m: 1, ml: 3 }}>
              <TextField label="Mã giảm giá" value={voucher?.code} size="small" disabled />
              <Button
                sx={{ py: '6.7px', ml: 1 }}
                variant="outlined"
                onClick={() => setIsShowVoucher(true)}>
                <b>Chọn mã giảm giá</b>
              </Button>
              <Modal
                open={isShowVoucher}
                onClose={() => {
                  setIsShowVoucher(false)
                }}>
                <Box sx={styleModalProduct}>
                  <Toolbar sx={{ mb: 1 }}>
                    <Box
                      sx={{
                        color: 'black',
                        flexGrow: 1,
                      }}>
                      <Typography variant="h6" component="div">
                        Danh sách mã khuyến mãi
                      </Typography>
                    </Box>
                    <IconButton
                      onClick={() => {
                        setIsShowVoucher(false)
                      }}
                      aria-label="close"
                      color="error"
                      style={{
                        boxShadow: '1px 2px 3px 1px rgba(0,0,0,.05)',
                      }}>
                      <CloseIcon />
                    </IconButton>
                  </Toolbar>
                  <Container>
                    <Box>
                      <TextField
                        sx={{
                          width: '50%',
                          '.MuiInputBase-input': { py: '7.5px' },
                        }}
                        size="small"
                        variant="outlined"
                        placeholder="Tìm khuyến mãi"
                      />
                      <Button sx={{ ml: 2 }} variant="contained">
                        Tìm kiếm
                      </Button>
                    </Box>
                    <Box
                      sx={{
                        mt: 3,
                        maxHeight: '400px',
                        overflow: 'auto',
                      }}></Box>
                  </Container>
                  <Container>
                    <Table className="tableCss mt-5">
                      <TableHead>
                        <TableRow>
                          <TableCell align="center" width={'5%'}>
                            STT
                          </TableCell>
                          <TableCell align="center" width={'25%'}>
                            Mã
                          </TableCell>
                          <TableCell align="center" width={'12%'}>
                            Tên
                          </TableCell>
                          <TableCell align="center" width={'15%'}>
                            Giá trị
                          </TableCell>
                          <TableCell align="center" width={'15%'}>
                            Giá trị tối đa
                          </TableCell>
                          <TableCell align="center" width={'15%'}>
                            Điều kiện
                          </TableCell>
                          <TableCell align="center" width={'10%'}>
                            Kiểu
                          </TableCell>
                          <TableCell align="center" width={'15%'}>
                            Ngày bắt đầu
                          </TableCell>
                          <TableCell align="center" width={'10%'}>
                            Ngày kết thúc
                          </TableCell>
                          <TableCell align="center" width={'10%'}>
                            Thao tác
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {listVoucher.map((row) => (
                          <TableRow
                            key={row.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell align="center">{row.stt}</TableCell>
                            <TableCell align="center">{row.code}</TableCell>
                            <TableCell align="center">{row.name}</TableCell>
                            <TableCell align="center">{row.value}%</TableCell>
                            <TableCell align="center">{row.maximumValue}</TableCell>
                            <TableCell align="center">{row.minimumAmount}</TableCell>
                            <TableCell align="center">
                              {row.type === 0 ? (
                                <Chip className="chip-tat-ca" size="small" label="Công khai" />
                              ) : (
                                <Chip className="chip-gioi-han" size="small" label="Cá nhân" />
                              )}
                            </TableCell>
                            <TableCell align="center">
                              {dayjs(row.startDate).format('DD/MM/YYYY HH:mm')}
                            </TableCell>
                            <TableCell align="center">
                              {dayjs(row.endDate).format('DD/MM/YYYY HH:mm')}
                            </TableCell>
                            <TableCell align="center">
                              <Button
                                variant="contained"
                                onClick={() => handleVoucher(row.id)}
                                color="success">
                                <b>chọn</b>
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </Container>
                </Box>
              </Modal>
            </Box>
            <Box sx={{ m: 1, ml: 3, mr: 3 }}>
              <Stack sx={{ my: '29px' }} direction={'row'} justifyContent={'space-between'}>
                <Typography>Tiền hàng</Typography>
                <Typography>{formatPrice(totalSum)}</Typography>
              </Stack>
              <Stack sx={{ my: '29px' }} direction={'row'} justifyContent={'space-between'}>
                <Typography>Phí vận chuyển</Typography>
                <Typography>{giaoHang ? `${shipTotal} ₫` : '0 ₫'}</Typography>
              </Stack>
              <Stack sx={{ my: '29px' }} direction={'row'} justifyContent={'space-between'}>
                <Typography>Giảm giá</Typography>
                <Typography>{formatPrice(totalMoneyReduce)}</Typography>
              </Stack>
              <Stack sx={{ my: '29px' }} direction={'row'} justifyContent={'space-between'}>
                <Typography>
                  <b>Tổng số tiền</b>
                </Typography>
                <Typography color={'red'}>
                  <b>{formatPrice(totalPrice)}</b>
                </Typography>
              </Stack>
            </Box>
          </Grid2>
        </Grid2>
        <Box p={2}>
          <Stack direction={'row'} justifyContent={'right'}>
            <Button
              variant="outlined"
              style={{ borderRadius: '8px' }}
              color="cam"
              onClick={() => addBill(idBill)}>
              Xác nhận đặt hàng
            </Button>
          </Stack>
        </Box>
      </Paper>
    </>
  )
}
