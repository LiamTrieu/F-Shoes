import AdStaffDetail from "../../pages/admin/nhanvien/AdStaffDetailP";
import AdStaffPage from "../../pages/admin/nhanvien/AdStaffPage";
import AdStaffAdd from "../../pages/admin/nhanvien/AdStaffAdd"

const adStaffRoute = [
    { path: "/admin/staff", element: <AdStaffPage /> },
    { path: "/admin/staff/detail/:id", element: <AdStaffDetail /> },
    { path: "/admin/staff/add", element: <AdStaffAdd /> },
];

export default adStaffRoute;
