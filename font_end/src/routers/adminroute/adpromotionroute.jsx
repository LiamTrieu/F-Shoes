import AdPromotionAdd from "../../pages/admin/khuyenmai/AdPromotionAdd";
import AdPromotionPage from "../../pages/admin/khuyenmai/AdPromotionPage";

const adPromotionRoute = [
  { path: "/admin/promotion", element: <AdPromotionPage /> },
  { path: "/admin/promotion/add", element: <AdPromotionAdd /> },
];

export default adPromotionRoute;
