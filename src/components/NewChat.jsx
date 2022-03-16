import React, { useEffect, useState } from 'react'
import { MdArrowBack } from "react-icons/md";

import Api from '../Api';
 
import './NewChat.css'

const NewChat = ({ chatList, user, show, setShow }) => {

    const [list, setList] = useState([])

    useEffect(() => {
        const getList = async () => {
            if (user !== null) {
                let results = await Api.getContactList(user.id)

                setList(results)
            }
        }

        getList()
    }, [user])

    async function addNewChat(user2) {
        await Api.addNewChat(user, user2)

        handleClose()
    }

    function handleClose() {
        setShow(false)
    }

    return (
        <div className="newChat" style={{ left: show ? 0 : -415 }}>
            
            <div className="newChat--header">
                <div className="newChat--backbutton" onClick={handleClose}>
                    <MdArrowBack style={{color: '#fff', fontSize: 24}} />
                </div>
                <div className="newChat-headtitle">
                    Nova Conversa
                </div>
            </div>

            <div className="newChat--list">
                {
                    list.length > 0 && (
                        list.map((item, key) => (
                            <div onClick={() => addNewChat(item)} className="newChat--item" key={key}>
                                <img className="newChat--itemavatar" src={item.avatar} />
                                <div className="newChat--itemname">{item.name}</div>
                            </div>
                        ))
                    )
                }
            </div>
        </div>
    )
}

export default NewChat