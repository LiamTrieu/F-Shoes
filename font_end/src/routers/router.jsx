import { Navigate, Outlet, createBrowserRouter } from 'react-router-dom'
import adBillRoute from './adminroute/adbillroute'
import ScrollToTop from '../components/ScrollToTop'
import adCustomerRoute from './adminroute/adcustomerroute'
import adProductRoute from './adminroute/adproductroute'
import adPromotionRoute from './adminroute/adpromotionroute'
import adStaffRoute from './adminroute/adstaffroute'
import adVoucherRoute from './adminroute/advoucherroute'
import clientRoute from './clientroute'
import AppBarAdmin from '../layout/AppBarAdmin'
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
import Payment from '../pages/client/Payment'
import AutGuard from '../layout/AutGuard'
import AutGuardClient from '../layout/AutGuardClient'
import AdminLogin from '../pages/admin/AdminLogin'
import Forbidden403 from '../pages/httpstatus/Forbidden403'

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <AutGuardClient>
        <HeadingClient />
        <ScrollToTop />
        <Outlet />
        <FooterClient />
      </AutGuardClient>
    ),
    children: [{ index: true, element: <Navigate to={'/home'} /> }, ...clientRoute],
  },
  {
    path: '/admin',
    element: (
      <AutGuard>
        <AppBarAdmin>
          <Outlet />
        </AppBarAdmin>
      </AutGuard>
    ),
    children: [
      { index: true, element: <Navigate to={'/admin/dashboard'} /> },
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
  { path: '/vnpay-payment', element: <Payment /> },
  { path: '/admin/login', element: <AdminLogin /> },
  { path: '/not-authorization', element: <Forbidden403 /> },
])

export default router
