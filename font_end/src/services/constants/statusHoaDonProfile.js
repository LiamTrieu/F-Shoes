export const getStatusProfile = (status) => {
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
      return 'Hoàn thành'
    case 5:
      return 'Trả hàng'
    default:
      console.error('Trạng thái hóa đơn không hợp lệ')
      break
  }
}
