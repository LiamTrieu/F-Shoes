import Cart from '../pages/client/Cart'
import Login from '../pages/client/Login'
import Checkout from '../pages/client/Checkout'
import DetailProduct from '../pages/client/DetailProduct'
import Home from '../pages/client/Home'
import Product from '../pages/client/Product'
import News from '../pages/client/News'
import Contact from '../pages/client/Contact'
import AboutUs from '../pages/client/AboutUs'
import Profile from '../pages/client/profile/Profile'
import MyVoucher from '../pages/client/MyVoucher'
import UserProfile from '../pages/client/profile/UserProfile'
import AddressUser from '../pages/client/profile/AddressUser'
import Order from '../pages/client/profile/Order'
import OrderDetail from '../pages/client/profile/OrderDetail'
import Tracking from '../pages/client/Tracking'
import TrackingDetail from '../pages/client/TrackingDetail'
import ForgotPassword from '../pages/client/ForgotPassword'
import ChangePassword from '../pages/client/profile/ChangePassword'

const clientRoute = [
  { path: '/home', element: <Home />, index: true },
  { path: '/products', element: <Product /> },
  { path: '/news', element: <News /> },
  { path: '/contact', element: <Contact /> },
  { path: '/about-us', element: <AboutUs /> },
  { path: '/cart', element: <Cart /> },
  { path: '/login', element: <Login /> },
  { path: '/checkout', element: <Checkout /> },
  { path: '/profile', element: <Profile /> },
  { path: '/product/:id', element: <DetailProduct /> },
  { path: `/profile/get-by-idBill/:id`, element: <OrderDetail /> },
  { path: `/tracking/:code`, element: <TrackingDetail /> },
  { path: `/tracking`, element: <Tracking /> },
  { path: '/forgot-password', element: <ForgotPassword /> },
  {
    path: '/profile/change-password',
    element: (
      <Profile>
        <ChangePassword />
      </Profile>
    ),
  },

  {
    path: '/profile/user',
    element: (
      <Profile>
        <UserProfile />
      </Profile>
    ),
  },
  {
    path: '/profile/order',
    element: (
      <Profile>
        <Order />
      </Profile>
    ),
  },
  {
    path: '/profile/address',
    element: (
      <Profile>
        <AddressUser />
      </Profile>
    ),
  },

  {
    path: '/profile/my-voucher',
    element: (
      <Profile>
        <MyVoucher />
      </Profile>
    ),
  },
  {
    path: '/product/:id',
    element: <DetailProduct />,
  },
]

export default clientRoute
