import React from 'react'

import closeIcon from '../../icons/closeIcon.png'

import './Infobar.css'

const Infobar = ({ room }) => (
  <div className='infoBar'>
    <div className='leftInnerContainer'>
      <h3>Chat-Room</h3>
    </div>
    <div className='rightInnerContainer'>
      <div className='room'>{room}</div>
      <a href='/'>
        <img src={closeIcon} alt='close icon' />
      </a>
    </div>
  </div>
)

export default Infobar
