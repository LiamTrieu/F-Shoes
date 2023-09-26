import { Navigate, Outlet, createBrowserRouter } from 'react-router-dom'
import adBillRoute from './adminroute/adbillroute'
import adCustomerRoute from './adminroute/adcustomerroute'
import adProductRoute from './adminroute/adproductroute'
import adPromotionRoute from './adminroute/adpromotionroute'
import adStaffRoute from './adminroute/adstaffroute'
import adVoucherRoute from './adminroute/advoucherroute'
import clientRoute from './clientroute'
import Home from '../pages/client/Home'
import AppBarAdmin from '../layout/AppBarAdmin'
import Toast from '../components/Toast'
import adSizeRoute from './adminroute/adsizeroute'
import adSoleRoute from './adminroute/adsoleroute'
import adColorRoute from './adminroute/adcolorroute'
import adCategoryRoute from './adminroute/adcategoryroute'
import adMaterialRoute from './adminroute/admaterialroute'
import adBrandRoute from './adminroute/adbrandroute'
import adSellRoute from './adminroute/adsell'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to={'/admin'} />,
    errorElement: <div>Trang này không tồn tại</div>,
    children: [{ index: true, element: <Home /> }, ...clientRoute],
  },
  {
    path: '/login',
    element: <div>Đây là trang Login</div>,
  },
  {
    path: '/admin',
    element: (
      <AppBarAdmin>
        <Toast />
        <Outlet />
      </AppBarAdmin>
    ),
    children: [
      { index: true, element: <Navigate to={'/admin/product'} /> },
      ...adBillRoute,
      ...adCustomerRoute,
      ...adProductRoute,
      ...adPromotionRoute,
      ...adStaffRoute,
      ...adVoucherRoute,
      ...adSizeRoute,
      ...adSoleRoute,
      ...adColorRoute,
      ...adCategoryRoute,
      ...adMaterialRoute,
      ...adBrandRoute,
      ...adSellRoute,
    ],
  },
])

export default router
