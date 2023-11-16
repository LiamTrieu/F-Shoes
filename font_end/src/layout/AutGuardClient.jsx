import { useEffect } from 'react'
import { getCookie } from '../services/cookie'
import authenticationAPi from '../api/authentication/authenticationAPi'
import { useDispatch } from 'react-redux'
import { addUser } from '../services/slices/userSlice'
import ThemeAdmin from '../services/theme/ThemeAdmin'

export default function AutGuardClient({ children }) {
  const dispatch = useDispatch()
  useEffect(() => {
    if (getCookie('ClientToken')) {
      authenticationAPi.getClient().then((response) => {
        dispatch(addUser(response.data.data))
      })
    }
  }, [dispatch])

  return <ThemeAdmin>{children}</ThemeAdmin>
}
