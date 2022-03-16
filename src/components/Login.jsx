import React from 'react'
import Api from '../Api'

import './Login.css'

const Login = ({ onReceive }) => {

    async function handleFacebookLogin() {
        let result = await Api.fbPopup()

        if (result) {
            onReceive(result.user)
        } else {
            alert('Error')
        }
    }

    return (
        <div className='login'>
            <button onClick={handleFacebookLogin}>Logar com Facebook</button>
        </div>
    )
}

export default Login