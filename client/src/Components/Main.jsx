import React from 'react'
import cover from '../assets/cover.mp4'

function Main() {
  return (
    <div style={{ backgroundColor: "black", paddingBottom: "30px" }}>
      <video src={cover} autoPlay loop muted style={{ width: "100%" }} />
    </div>
  )
}

export default Main