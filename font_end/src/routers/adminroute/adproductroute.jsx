import AdProductAdd from '../../pages/admin/sanpham/AdProductAdd'
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
  {
    path: '/admin/product/add',
    element: <AdProductAdd />,
    loader: () => {
      document.title = 'Admin - Thêm sản phẩm'
      return null
    },
  },
]

export default adProductRoute
