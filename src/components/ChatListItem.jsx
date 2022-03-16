import React, { useEffect, useState } from 'react'

import './ChatListItem.css'

const ChatListItem = ({ onClick, active, data }) => {

    const [time, setTime] = useState('')

    useEffect(() => {
        if (data.lastMessageDate > 0) {
            let d = new Date(data.lastMessageDate.seconds * 1000)
            let hours = d.getHours()
            let minutes = d.getMinutes()

            hours = hours < 10 ? '0'+hours : hours
            minutes = minutes < 10 ? '0'+minutes : minutes
            
            setTime(`${hours}:${minutes}`)
        }
    }, [data])

    return (
        <div className={`chat-list-item ${active ? 'active' : ''}`} onClick={onClick}>

            <img className='chat-list-item-avatar' src={data.image} alt="Avatar do Contato" />

            <div className="chat-list-item-lines">
                <div className="chat-list-item-line">
                    <div className="chat-list-item-name">
                        {data.title}
                    </div>
                    <div className="chat-list-item-date">
                        {time}
                    </div>
                </div>

                <div className="chat-list-item-line">
                    <div className="chat-list-item-lastmsg">
                        <p>{data.lastMessage}</p>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default ChatListItem