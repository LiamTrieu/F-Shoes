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
]

export default adProductRoute
