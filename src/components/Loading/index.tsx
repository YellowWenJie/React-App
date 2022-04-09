import React, { useState } from 'react'
import './loading.scss'

function loading() {
  const [count, setCount] = useState(0)

  return (
    <div id="load">
      <div>G</div>
      <div>N</div>
      <div>I</div>
      <div>D</div>
      <div>A</div>
      <div>O</div>
      <div>L</div>
    </div>
  )
}

export default loading
