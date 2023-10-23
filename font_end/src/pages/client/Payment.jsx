import { useEffect } from 'react'
import clientCheckoutApi from '../../api/client/clientCheckoutApi'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

export default function Payment() {
  const navigate = useNavigate()
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)

    const requestData = {}
    for (const [key, value] of urlParams) {
      requestData[key] = value
    }
    clientCheckoutApi
      .payment(requestData)
      .then((response) => {
        toast.error('Chưa dùng được đâu đừng thử !!!!!')
        navigate('/checkout')
      })
      .catch((error) => {
        console.error('Error:', error)
      })
  }, [])

  return null
}
