import AdBillDetail from "../../pages/admin/hoadon/AdBillDetail";
import AdBillPage from "../../pages/admin/hoadon/AdBillPage";

const adBillRoute = [
  { path: "/admin/bill", element: <AdBillPage /> },
  { path: "/admin/bill-detail/:id", element: <AdBillDetail /> },
];

export default adBillRoute;
