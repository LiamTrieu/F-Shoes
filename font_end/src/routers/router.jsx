import { Navigate, Outlet, createBrowserRouter } from "react-router-dom";
import adBillRoute from "./adminroute/adbillroute";
import adCustomerRoute from "./adminroute/adcustomerroute";
import adProductRoute from "./adminroute/adproductroute";
import adPromotionRoute from "./adminroute/adpromotionroute";
import adStaffRoute from "./adminroute/adstaffroute";
import adVoucherRoute from "./adminroute/advoucherroute";
import clientRoute from "./clientroute";
import Home from "../pages/client/Home";
import AdminHeader from "../layout/AdminHeader";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Outlet />,
    errorElement: <div>Trang này không tồn tại</div>,
    children: [{ index: true, element: <Home /> }, ...clientRoute],
  },
  {
    path: "/login",
    element: <div>Đây là trang Login</div>,
  },
  {
    path: "/admin",
    element: (
      <AdminHeader>
        <Outlet />
      </AdminHeader>
    ),
    children: [
      { index: true, element: <Navigate to={"/admin/product"} /> },
      ...adBillRoute,
      ...adCustomerRoute,
      ...adProductRoute,
      ...adPromotionRoute,
      ...adStaffRoute,
      ...adVoucherRoute,
    ],
  },
]);

export default router;
