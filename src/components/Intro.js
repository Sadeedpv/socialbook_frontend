import React from 'react'
import {BsInstagram} from 'react-icons/bs'

function Intro() {
  return (
    <div className='d-flex align-items-center justify-content-center min-vh-100 position-absolute top-50 start-50 translate-middle bg-white z w-100'>
        <BsInstagram size={125} color={'#fb3958'} style={{
            marginTop: '-9em',
            zIndex: '1',
        }}/>
    </div>
  )
}

export default Intro