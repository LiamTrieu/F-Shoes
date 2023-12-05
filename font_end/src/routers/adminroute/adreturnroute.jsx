import ReturnOrder from '../../pages/admin/return-order/ReturnOrder'
import ReturnOrderBill from '../../pages/admin/return-order/ReturnOrderBill'

const adReturnRoute = [
  { path: '/admin/return-order', element: <ReturnOrder /> },
  { path: '/admin/return-order/bill/:id', element: <ReturnOrderBill /> },
]

export default adReturnRoute
