import ReturnOrder from '../../pages/admin/return-order/ReturnOrder'
import ReturnOrderBill from '../../pages/admin/return-order/ReturnOrderBill'
import ReturnOrderDetail from '../../pages/admin/return-order/ReturnOrderDetail'

const adReturnRoute = [
  { path: '/admin/return-order/:index', element: <ReturnOrder /> },
  { path: '/admin/return-order/bill/:id', element: <ReturnOrderBill /> },
  { path: '/admin/return-order/detail/:id', element: <ReturnOrderDetail /> },
]

export default adReturnRoute
