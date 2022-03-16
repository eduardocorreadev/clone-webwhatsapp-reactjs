import React, { useEffect, useRef, useState } from 'react'
import EmojiPicker from 'emoji-picker-react'
import { MdSearch, MdAttachFile, MdMoreVert, MdEmojiEmotions, MdOutlineClose, MdSend, MdMic, MdClose } from "react-icons/md"

import Api from '../Api'

import MessageItem from './MessageItem'

import './ChatWindow.css'

const ChatWindow = ({ user, data }) => {

    const body = useRef()

    let recognition = null
    const SpeechToText = window.SpeechRecognition || window.webkitSpeechRecognition

    if (SpeechToText !== undefined) {
        recognition = new SpeechToText();
    }

    const [showEmoji, setShowEmoji] = useState(false)
    const [text, setText] = useState('')
    const [listening, setListening] = useState(false)
    const [list, setList] = useState([])
    const [users, setUsers] = useState([])

    useEffect(() => {
        setList([])

        let unsub = Api.onChatContent(data.chatId, setList, setUsers)
        return unsub

    }, [data.chatId])

    useEffect(() => {
        if (body.current.scrollHeight > body.current.offsetHeight) {
            body.current.scrollTop = body.current.scrollHeight - body.current.offsetHeight
        }
    }, [list])

    function handleEmojiClick(e, emojiObject) {
        setText(text + emojiObject.emoji)
    }

    function handleSendClick() {
        if (text !== '') {
            Api.sendMessage(data, user.id, 'text', text, users)
            setText('')
            setShowEmoji(false)
        }
    }

    function handleInputOnKeyUp(e) {
        if (e.keyCode == 13) {
            handleSendClick()
        }
    }

    function handleMicClick() {
        if (recognition !== null) {

            recognition.onstart = () => {
                setListening(true)
            }

            recognition.onend = () => {
                setListening(false)
            }

            recognition.onresult = (e) => {
                setText(e.results[0][0].transcript)
            }

            recognition.start()
        }
    }

    return (
        <div className="chat-window">
            <div className="chat-window-header">

                <div className="chat-window-headerinfo">
                    <img className='chat-window-avatar' src={data.image} alt="Avatar do Usuário" />

                    <div className="chat-window-name">
                        {data.title}
                    </div>
                </div>

                <div className="chat-window-header-buttons">

                    <div className="chat-window-btn">
                        <MdSearch style={{ color: '#919191' }} />
                    </div>

                    <div className="chat-window-btn">
                        <MdAttachFile style={{ color: '#919191' }} />
                    </div>

                    <div className="chat-window-btn">
                        <MdMoreVert style={{ color: '#919191' }} />
                    </div>

                </div>

            </div>

            <div className="chat-window-body" ref={body}>
                {
                    list.map((item, key) => (
                        <MessageItem
                        key={key}
                        data={item}
                        user={user}
                        />
                    ))
                }
            </div>

            <div className="chat-window-emojiarea" style={{ height: showEmoji ? '250px' : '0px' }}>
                <EmojiPicker 
                    onEmojiClick={handleEmojiClick}
                    disableSearchBar
                    disableSkinTonePicker
                />
            </div>

            <div className="chat-window-footer">

                <div className="chat-window-pre">

                    <div className="chat-window-btn" onClick={() => !showEmoji ? setShowEmoji(true) : setShowEmoji(false)}>
                        {showEmoji ? <MdClose style={{ color: '#919191' }} /> : <MdEmojiEmotions style={{ color: '#919191' }} />}
                    </div>

                </div>

                <div className="chat-window-inputarea">
                    <input 
                        type="text" 
                        className='chat-window-input' 
                        placeholder='Digite uma mensagem' 
                        value={text}
                        onChange={e => setText(e.target.value)}
                        onKeyUp={handleInputOnKeyUp}
                        />
                </div>

                <div className="chat-window-pos">

                    <div className="chat-window-btn">
                        { 
                            text.length > 0 ? (
                                <MdSend style={{ color: '#919191' }} onClick={handleSendClick} />
                            ) : (
                                <MdMic style={{ color: listening ? '#126ece' : '#919191' }} onClick={handleMicClick} />
                            )
                        }
                    </div>

                </div>

            </div>
        </div>
    )
}

export default ChatWindow