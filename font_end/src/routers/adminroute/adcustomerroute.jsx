import AdCustomerAdd from "../../pages/admin/khachhang/AdCustomerAdd";
import AdCustomerDetail from "../../pages/admin/khachhang/AdCustomerDetail";
import AdCustomerPage from "../../pages/admin/khachhang/AdCustomerPage";

const adCustomerRoute = [
  { path: "/admin/customer", element: <AdCustomerPage /> },
  { path: "/admin/customer/add", element: <AdCustomerAdd /> },
  { path: "/admin/customer/getOne/:id", element: <AdCustomerDetail /> },
];

export default adCustomerRoute;
