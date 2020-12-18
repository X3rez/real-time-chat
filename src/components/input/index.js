import io from 'socket.io-client';
import React,{useEffect, useState} from 'react';
import './styles.css'

const socket = io('https://chat-aplication-xerez.herokuapp.com/');

const InputMessage = ()=>{
    let [messages,setMessages] = useState([])

    const handlerSubmit = (e)=>{
        e.preventDefault()
        const userName = e.target[0];
        const userMsj = e.target[1];
        socket.emit('mensaje',{username:userName.value, usermsj:userMsj.value})
        userName.value = '';
        userMsj.value = '';
    }

    useEffect(()=>{
        socket.on('mensajes',(data)=>{
            setMessages([...messages, data])
        })
        return ()=>socket.off()
    },[messages])

    return (
        <div className='chat-container'>
            <article className='messages'>
            {messages.map((men,index) =>{
                    return (
                    <div className='user' key={index}>
                    <h4 className='user__name'>{men.username || 'Desconocido'}</h4>
                    <h4 className='user__msj'>{men.usermsj}</h4>
                    </div>)
                })}
            </article>
            <form onSubmit={handlerSubmit} className='form'>
                <input type='text' className='form-input' placeholder='Your name' maxLength='15' required/>
                <input type='text' className='form-input' placeholder='Your Message' required/>
                <button className='form-button'>Send</button>
            </form>
        </div>
)
}


export default InputMessage