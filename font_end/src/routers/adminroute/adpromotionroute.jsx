import AdPromotionAdd from "../../pages/admin/khuyenmai/AdPromotionAdd";
import AdPromotionPage from "../../pages/admin/khuyenmai/AdPromotionPage";
import AdPromotionDetail from "../../pages/admin/khuyenmai/AdpromotionDetail";

const adPromotionRoute = [
  { path: "/admin/promotion", element: <AdPromotionPage /> },
  { path: "/admin/promotion/add", element: <AdPromotionAdd /> },
  { path: "/admin/promotion/get-one/:id", element: <AdPromotionDetail /> },
];

export default adPromotionRoute;
