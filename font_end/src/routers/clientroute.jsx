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
import UserProfile from '../pages/client/profile/UserProfile'

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
  { path: '/profile/user', element: <UserProfile /> },
  { path: '/product/:id', element: <DetailProduct /> },
]

export default clientRoute
