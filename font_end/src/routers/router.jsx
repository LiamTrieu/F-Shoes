import { Navigate, Outlet, createBrowserRouter } from 'react-router-dom'
import adBillRoute from './adminroute/adbillroute'
import adCustomerRoute from './adminroute/adcustomerroute'
import adProductRoute from './adminroute/adproductroute'
import adPromotionRoute from './adminroute/adpromotionroute'
import adStaffRoute from './adminroute/adstaffroute'
import adVoucherRoute from './adminroute/advoucherroute'
import clientRoute from './clientroute'
import AppBarAdmin from '../layout/AppBarAdmin'
import Toast from '../components/Toast'
import adSizeRoute from './adminroute/adsizeroute'
import adSoleRoute from './adminroute/adsoleroute'
import adColorRoute from './adminroute/adcolorroute'
import adCategoryRoute from './adminroute/adcategoryroute'
import adMaterialRoute from './adminroute/admaterialroute'
import adBrandRoute from './adminroute/adbrandroute'
import adSellRoute from './adminroute/adsell'
import HeadingClient from '../layout/client/HeadingClient'
import FooterClient from '../layout/client/FooterClient'
import Dashboard from '../pages/admin/thongke/Dashboard'

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <>
        <HeadingClient />
        <Outlet />
        <FooterClient />
      </>
    ),
    children: [{ index: true, element: <Navigate to={'/home'} /> }, ...clientRoute],
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
      { path: '/admin/dashboard', element: <Dashboard /> },
    ],
  },
])

export default router
