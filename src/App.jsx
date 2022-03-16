import React, { useEffect, useState } from 'react'

import { MdDonutLarge, MdChat, MdOutlineMoreVert, MdSearch } from "react-icons/md";

import Api from './Api';

import Login from './components/Login';
import ChatListItem from './components/ChatListItem';
import ChatIntro from './components/ChatIntro';
import ChatWindow from './components/ChatWindow';
import NewChat from './components/NewChat';

import './App.css'

const App = () => {

  const [chatList, setChatList] = useState([])
  const [activeChat, setActiveChat] = useState({})

  const [user, setUser] = useState(null)

  const [showNewChat, setShowNewChat] = useState(false)

  useEffect(() => {
    if (user !== null) {
      let unsub = Api.onChatList(user.id, setChatList)

      return unsub
    }
  }, [user])

  function handleNewChat() {
    setShowNewChat(true)
  }

  async function handleLoginData(u) {
    let newUser = {
      id: u.uid,
      name: u.displayName,
      avatar: u.photoURL
    }

    await Api.addUser(newUser)
    setUser(newUser)
  }

  if (user === null) {
    return (<Login onReceive={handleLoginData} />)
  }

  return (
    <div className='app-window'>
      <div className="sidebar">

        <NewChat
          chatList={chatList}
          user={user}
          show={showNewChat}
          setShow={setShowNewChat}
        />

        <header>
          <img className='header-avatar' src={user.avatar} alt="Avatar do Usuário" />
          <div className="header-buttons">

            <div className="header-btn">
              <MdDonutLarge style={{ color: '#919191' }} />
            </div>

            <div className="header-btn" onClick={handleNewChat}>
              <MdChat style={{ color: '#919191' }} />
            </div>

            <div className="header-btn">
              <MdOutlineMoreVert style={{ color: '#919191' }} />
            </div>

          </div>
        </header>

        <div className="search">

          <div className="search-input">
            <MdSearch fontSize="small" style={{ color: '#919191' }} />
            <input type="search" placeholder='Procurar ou começar uma nova conversa' />
          </div>

        </div>

        <div className="chat-list">
          {
            chatList.map((item, key) => (
              <ChatListItem
                key={key}
                data={item}
                active={activeChat.chatId === chatList[key].chatId}
                onClick={() => setActiveChat(chatList[key])}
              />
            ))
          }
        </div>

      </div>
      <div className="content-area">

        {
          activeChat.chatId !== undefined ? (
            <ChatWindow
              user={user}
              data={activeChat}
            />
          ) : (
            <ChatIntro />
          )
        }

      </div>
    </div>
  )
}

export default App