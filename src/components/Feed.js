import React from 'react'
import feed from '../assets/images/feed.png'

function Feed() {
  return (
    <div className='mt-5 d-flex align-items-center justify-content-center flex-column text-center'>
        <img src={feed} alt='Feed' className='img-fluid' /><br />
        <h4 className='fw-bold'>That's the end of the Feed ✨</h4>       
        <h4>Thanks for visiting the site!</h4>
    </div>
  )
}

export default Feed