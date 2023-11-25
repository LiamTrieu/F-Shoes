export const getStatus = (status) => {
  switch (status) {
    case 0:
      return 'Đã hủy'
    case 1:
      return 'Chờ xác nhận'
    case 2:
      return 'Đã xác nhận'
    case 3:
      return 'Đang vận chuyển'
    case 4:
      return 'Đã giao hàng'
    case 5:
      return 'Đã thanh toán'
    case 6:
      return 'Chờ thanh toán'
    case 7:
      return 'Hoàn thành'
    case 8:
      return 'Tạo đơn hàng'
    case 9:
      return 'Trả hàng'
    default:
      console.error('Trạng thái hóa đơn không hợp lệ')
      break
  }
}
