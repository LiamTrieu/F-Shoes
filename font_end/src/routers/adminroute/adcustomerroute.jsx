import AdCustomerAdd from "../../pages/admin/khachhang/AdCustomerAdd";
import AdCustomerPage from "../../pages/admin/khachhang/AdCustomerPage";

const adCustomerRoute = [
  { path: "/admin/customer", element: <AdCustomerPage /> },
  { path: "/admin/customer/add", element: <AdCustomerAdd /> },
];

export default adCustomerRoute;
