import AdProductDetailPage from "../../pages/admin/sanpham/AdProductDetailPage";
import AdProductPage from "../../pages/admin/sanpham/AdProductPage";

const adProductRoute = [
  { path: "/admin/product", element: <AdProductPage /> },
  { path: "/admin/product/detail", element: <AdProductDetailPage /> },
];

export default adProductRoute;
