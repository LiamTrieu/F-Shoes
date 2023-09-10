import AdProductDetailAdd from '../../pages/admin/sanpham/AdProductDetailAdd'
import AdProductDetailUpdate from '../../pages/admin/sanpham/AdProductDetailUpdate'
import AdProductDetailList from '../../pages/admin/sanpham/AdProductDetailList'
import AdProductPage from '../../pages/admin/sanpham/AdProductPage'

const adProductRoute = [
  {
    path: '/admin/product',
    element: <AdProductPage />,
    loader: () => {
      document.title = 'Admin - Sản phẩm'
      return null
    },
  },
  { path: '/admin/product/detail/:idProduct', element: <AdProductDetailList /> },
  {
    path: '/admin/product/detail/:idProduct/edit/:idProductDetail',
    element: <AdProductDetailUpdate />,
  },
  { path: '/admin/product/detail/:idProduct/add', element: <AdProductDetailAdd /> },
]

export default adProductRoute
