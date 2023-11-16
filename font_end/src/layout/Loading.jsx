import React from 'react'
import './loading.css'

export default function Loading() {
  return (
    <div className="loading-container">
      <img
        className="loading-image"
        width={'120px'}
        src={require('../assets/image/logoweb.png')}
        alt="loading"
      />
    </div>
  )
}
