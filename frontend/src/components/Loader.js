import React from 'react'

const Loader = () => {
  return (
    <div
      className="loader"
      style={{
        width: '10vw',
        height: '10vw',
        margin: 'auto',
        display: 'block',
        position: 'fixed',
        top: '30%',
        left: '45%',
        zIndex: '10000',
      }}></div>
  )
}

export default Loader
