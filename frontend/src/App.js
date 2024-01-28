import gptImgLogo from './assets/chatgptLogo.svg'
import gptLogo from './assets/chatgpt.svg'
import userIcon from './assets/user-icon.png'

import React, { useEffect, useRef, useState } from 'react'
import { IoMdSend  } from "react-icons/io";
import { FaPlus } from "react-icons/fa";

 const App = () => {
  const [value,setValue]=useState(null)
  const [message,setMessage]=useState(null)
  const [previousChats,setPreviousChats]=useState([])

  //currentTitle is the first chat that goes into that message box
  const [currentTitle,setCurrentTitle]=useState(null)

  const msgEnd=useRef(null)


  //when we click on the prevchat title - all the previous chats related to it should load
  const handleClick=(uniqueTitle)=>{
    setCurrentTitle(uniqueTitle)
    setMessage(null)
    setValue("")

  }

   //for autoScrolling when every a message is updated
   useEffect(()=>{
    msgEnd.current.scrollIntoView();

  },[message])

  //creating new chat
  const createNewChat=()=>{
    setMessage(null)
    setValue("")
    setCurrentTitle(null)
  }


  const getMessages=async()=>{
    const options={
      method:"POST",
      //we need to wrap the message under JSON.stringify and pass it through
      body:JSON.stringify({
        
          message:value
        }),
        headers:{
          "Content-Type":"application/json"
        }

      
    }
    try {
      const response=await fetch('https://gptbackend-unah.onrender.com/completions',options)
      const data=await response.json()
      console.log(data)
      setMessage(data.choices[0].message)
      
    } catch (error) {
      console.log(error)
    }

  }
  // console.log(message)

  useEffect(()=>{
    // console.log(currentTitle,value,message)

    //if there is no currentTitle and if there is a value inside the input box and there is a message that we recieved from the api
    // then we can input the value on the input box to the currentTitle
    if(!currentTitle && value && message){
      setCurrentTitle(value)
    }

    if(currentTitle && value && message){
      setPreviousChats(prevChats=>(
        [...prevChats,
        {
          title:currentTitle,
          role:"user",
          content:value
        },
        {
          title:currentTitle,
          role:message.role,
          content:message.content

        }
      ]
      ))
    }


  },[message,currentTitle])
//then the message changes or when the currenttitle changes then this will run again


console.log(previousChats)

  //to get the current chat messages
  const currentChat = previousChats.filter(previousChat=>previousChat.title===currentTitle);
  const uniqueTitles=Array.from(new Set(previousChats.map(previousChat=>previousChat.title)))
  console.log(uniqueTitles)

   //function to handle on enter key
   const handleEnter=async(e)=>{
    if(e.key==='Enter'){
       getMessages();
    }
  }




  return (
    <div className="app">
      <section className='side-bar'>
        <button onClick={createNewChat}><FaPlus /> New Chat</button>
        {/* this is for the history of the */}
        <ul className="history">

          {/* ?.  - meaning - if the unique title exits we can map the uniqueTitles */}
          {uniqueTitles?.map((uniqueTitle,index)=><li key={index} className='history-btn' onClick={()=>handleClick(uniqueTitle)}>{uniqueTitle}</li>)}
        


        </ul>

        <nav>
          <p>Made by amal</p>
        </nav>
      </section>
      <section className='main'>
        {!currentTitle && <h1>chatGPT</h1>}
        <ul className='feed'>
          {currentChat.map((chatMessage,index)=>
            <li key={index}>
              {/* chatMessage.role */}
              <p className='role'>
              <img className='chatImg' src={chatMessage.role==="user"?userIcon:gptImgLogo} alt="" />
              </p>
              <p>{chatMessage.content}</p>
            </li>)}
            <div ref={msgEnd}/>

        </ul>

        <div className='bottom-section'>
          <div className='input-container'>
            <input  value={value} onKeyDown={handleEnter} onChange={(e)=>setValue(e.target.value)}/>
            <div onClick={getMessages} id='submit'><IoMdSend /></div>
          </div>

          <p className='info'>
          ChatGPT can make mistakes. Consider checking important information.
          </p>

        </div>
      </section>
    </div>
  )
}

export default App