import AdVoucherAdd from "../../pages/admin/voucher/AdVoucherAdd";
import AdVoucherPage from "../../pages/admin/voucher/AdVoucherPage";

const adVoucherRoute = [
  { path: "/admin/voucher", element: <AdVoucherPage /> },
  { path: "/admin/voucher/add", element: <AdVoucherAdd /> },
];

export default adVoucherRoute;
