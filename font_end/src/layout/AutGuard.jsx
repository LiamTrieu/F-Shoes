import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import authenticationAPi from '../api/authentication/authenticationAPi'
import { addUserAdmin, removeUserAdmin } from '../services/slices/userAdminSlice'
import { getCookie, removeCookie } from '../services/cookie'
import { Navigate } from 'react-router-dom'

export default function AutGuard({ children }) {
  const [loading, setLoading] = useState(false)
  const [check, setCheck] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    const token = getCookie('AdminToken')
    authenticationAPi
      .getAdmin(token)
      .then(
        (response) => {
          if (response.data.success && response.data.data.role !== 2) {
            dispatch(addUserAdmin(response.data.data))
            setCheck(true)
          } else {
            removeCookie('AdminToken')
            dispatch(removeUserAdmin())
          }
        },
        () => {
          removeCookie('AdminToken')
          dispatch(removeUserAdmin())
        },
      )
      .finally(() => {
        setLoading(true)
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [children])

  return loading && (check ? children : <Navigate to={'/admin/login'} />)
}
