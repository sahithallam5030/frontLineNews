import React from 'react'
import '../css/Loading.css'

function Loading() {
  return (
    <div>
      <div id="loader-box">   
        <div id="inner">
            <h1 className='mb-5 text-light text-center'>Loading...</h1>
            <div id="orbit">
                <div id="planet"></div>
                <div id="sun"></div>
            </div>
        </div>
    </div>
    </div>
  )
}

export default Loading
