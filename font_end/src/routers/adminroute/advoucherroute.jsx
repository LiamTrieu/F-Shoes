import AdVoucherAdd from "../../pages/admin/voucher/AdVoucherAdd";
import AdVoucherDetail from "../../pages/admin/voucher/AdVoucherDetail";
import AdVoucherPage from "../../pages/admin/voucher/AdVoucherPage";

const adVoucherRoute = [
  { path: "/admin/voucher", element: <AdVoucherPage /> },
  { path: "/admin/voucher/add", element: <AdVoucherAdd /> },
  { path: "/admin/voucher/:id/detail", element: <AdVoucherDetail /> },
];

export default adVoucherRoute;
