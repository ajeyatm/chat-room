import React, { useState, useEffect } from 'react'
import queryString from 'query-string'
import io from 'socket.io-client'

import './Chat.css'

import InfoBar from '../infobar/Infobar'
import Input from '../input/Input'
import Messages from '../messages/Messages'
// import TextContainer from '../textContainer/TextContainer'
import onlineIcon from '../../icons/onlineIcon.png'

let socket

const Chat = ({ location, history }) => {
  const [name, setName] = useState('')
  const [room, setRoom] = useState('')
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])
  const [users, setUsers] = useState([])

  const ENDPOINT = 'https://ajeya-chat-room-backend.herokuapp.com/'

  useEffect(() => {
    const { name, room } = queryString.parse(location.search)

    socket = io(ENDPOINT)

    setName(name)
    setRoom(room)

    socket.emit('join', { name, room }, (error) => {
      if (error) {
        history.push('/')
        alert(error)
      }
    })
  }, [ENDPOINT, location.search, history])

  useEffect(
    () => {
      socket.on('message', (message) => {
        setMessages([...messages, message])
      })
      socket.on('roomData', ({ users }) => {
        setUsers(users)
      })
    },
    // eslint-disable-next-line
    [messages]
  )

  const sendMessage = (e) => {
    e.preventDefault()
    if (message) {
      socket.emit('sendMessage', message, () => setMessage(''))
    }
  }
  console.log(message, messages)
  return (
    <div className='outerContainer'>
      <div className='container'>
        <InfoBar room={room} />
        <div className='usersContainer'>
          {users.map(({ name }) => (
            <div key={name} className='user'>
              {name}
              <img alt='Online Icon' src={onlineIcon} />
            </div>
          ))}
        </div>
        <Messages messages={messages} name={name} />

        <Input
          setMessage={setMessage}
          sendMessage={sendMessage}
          message={message}
        />
      </div>
    </div>
  )
}

export default Chat
