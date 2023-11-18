import React from 'react'

export default function Loading() {
  return (
    <div className="loading-container">
      <img
        className="loading-image"
        width={'300px'}
        src={require('../assets/gif/loading.gif')}
        alt="loading"
      />
    </div>
  )
}
