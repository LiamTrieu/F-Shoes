import AdStaffDetail from "../../pages/admin/nhanvien/AdStaffDetailP";
import AdStaffPage from "../../pages/admin/nhanvien/AdStaffPage";

const adStaffRoute = [
    { path: "/admin/staff", element: <AdStaffPage /> },
    { path: "/admin/staff/detail/:id", element: <AdStaffDetail /> },
];

export default adStaffRoute;
