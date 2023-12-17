import AdStaffDetail from '../../pages/admin/nhanvien/AdStaffDetailP'
import AdStaffPage from '../../pages/admin/nhanvien/AdStaffPage'
import AdStaffAdd from '../../pages/admin/nhanvien/AdStaffAdd'
import AdminInformation from '../../pages/admin/AdminInformation'

const adStaffRoute = [
  { path: '/admin/staff', element: <AdStaffPage /> },
  { path: '/admin/staff/detail/:id', element: <AdStaffDetail /> },
  { path: '/admin/staff/add', element: <AdStaffAdd /> },
  { path: '/admin/infomation/:id', element: <AdminInformation /> },
]

export default adStaffRoute
