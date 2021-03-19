import React from 'react'

import ScrollToBottom from 'react-scroll-to-bottom'

import Msg from './msg/Msg'

import './Messages.css'

const Messages = ({ messages, name }) => (
  <ScrollToBottom className='messages'>
    {messages.map((message, i) => (
      <div key={i}>
        <Msg message={message} name={name} />
      </div>
    ))}
  </ScrollToBottom>
)

export default Messages
