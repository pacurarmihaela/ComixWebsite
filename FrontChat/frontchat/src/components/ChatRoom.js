import React, { useEffect, useState } from 'react'
import {over} from 'stompjs';
import SockJS from 'sockjs-client';

var stompClient =null; // Variable to hold the STOMP client connection

//Component for the Chat Room
const ChatRoom = () => {
    // State variables for managing chat data
    // State for private chats
    const [privateChats, setPrivateChats] = useState(new Map());     
     // State for public chats
    const [publicChats, setPublicChats] = useState([]);
    //State for active tab 
    const [tab,setTab] =useState("CHATROOM");
    // State for user data
    const [userData, setUserData] = useState({
        username: '',
        receivername: '',
        connected: false,
        message: ''
      });

     // Effect hook to log user data changes
    useEffect(() => {
      console.log(userData);
    }, [userData]);

     // Function to establish WebSocket connection
    const connect =()=>{
        let Sock = new SockJS('http://localhost:8096/ws'); // Creating SockJS client
        stompClient = over(Sock); // Creating STOMP client over SockJS
        stompClient.connect({},onConnected, onError); // Connecting to WebSocket server
    }

    // Function to handle successful connection
    const onConnected = () => {
        setUserData({...userData,"connected": true}); // Updating user data
        stompClient.subscribe('/chatroom/public', onMessageReceived); // Subscribing to public chat
        stompClient.subscribe('/user/'+userData.username+'/private', onPrivateMessage); // Subscribing to private chat
        userJoin(); // Sending user join message
    }

    // Function to send user join message
    const userJoin=()=>{
          var chatMessage = {
            senderName: userData.username,
            status:"JOIN"
          };
          stompClient.send("/app/message", {}, JSON.stringify(chatMessage)); // Sending join message
    }

    // Function to handle public message received
    const onMessageReceived = (payload)=>{
        var payloadData = JSON.parse(payload.body); // Parsing payload data
        switch(payloadData.status){
            case "JOIN":
                if(!privateChats.get(payloadData.senderName)){
                    privateChats.set(payloadData.senderName,[]); // Creating private chat if not exists
                    setPrivateChats(new Map(privateChats)); // Updating private chats state
                }
                break;
            case "MESSAGE":
                publicChats.push(payloadData); // Adding message to public chats
                setPublicChats([...publicChats]); // Updating public chats state
                break;
        }
    }
    
    // Function to handle private message received
    const onPrivateMessage = (payload)=>{
        console.log(payload);
        var payloadData = JSON.parse(payload.body); // Parsing payload data
        if(privateChats.get(payloadData.senderName)){
            privateChats.get(payloadData.senderName).push(payloadData); // Adding message to private chat
            setPrivateChats(new Map(privateChats));// Updating private chats state
        }else{
            let list =[];
            list.push(payloadData);
            privateChats.set(payloadData.senderName,list); // Creating new private chat
            setPrivateChats(new Map(privateChats)); // Updating private chats state
        }
    }

     // Function to handle connection error
    const onError = (err) => {
        console.log(err);
        
    }

    // Function to handle message input change
    const handleMessage =(event)=>{
        const {value}=event.target;
        setUserData({...userData,"message": value}); // Updating message in user data
    }

    // Function to send public message
    const sendValue=()=>{
            if (stompClient) {
              var chatMessage = {
                senderName: userData.username,
                message: userData.message,
                status:"MESSAGE"
              };
              console.log(chatMessage); // Logging message to console
              stompClient.send("/app/message", {}, JSON.stringify(chatMessage)); // Sending message
              setUserData({...userData,"message": ""}); // Clearing message input
            }
    }

    // Function to send private message
    const sendPrivateValue=()=>{
        if (stompClient) {
          var chatMessage = {
            senderName: userData.username,
            receiverName:tab,
            message: userData.message,
            status:"MESSAGE"
          };
          
          if(userData.username !== tab){
            privateChats.get(tab).push(chatMessage);  // Adding message to private chat
            setPrivateChats(new Map(privateChats)); // Updating private chats state
          }
          stompClient.send("/app/private-message", {}, JSON.stringify(chatMessage)); // Sending private message
          setUserData({...userData,"message": ""});  // Clearing message input
        }
    }

     // Function to handle username input change
    const handleUsername=(event)=>{
        const {value}=event.target;
        setUserData({...userData,"username": value});
    }

     // Function to register and connect user
    const registerUser=()=>{
        connect();
    }
    return (
    <div className="container">
        {/* Check if user is connected */}
        {userData.connected?
        <div className="chat-box">
             {/* Display member list */}
            <div className="member-list">
                <ul>
                      {/* Tab for chatroom */}
                    <li onClick={()=>{setTab("CHATROOM")}} className={`member ${tab==="CHATROOM" && "active"}`}>Chatroom</li>
                     {/* Display private chat tabs */}
                    {[...privateChats.keys()].map((name,index)=>(
                        <li onClick={()=>{setTab(name)}} className={`member ${tab===name && "active"}`} key={index}>{name}</li>
                    ))}
                </ul>
            </div>
             {/* Display chat content for chatroom */}
            {tab==="CHATROOM" && <div className="chat-content">
                <ul className="chat-messages">
                   {/* Display public chat messages */}
                    {publicChats.map((chat,index)=>(
                        <li className={`message ${chat.senderName === userData.username && "self"}`} key={index}>
                             {/* Display sender avatar */}
                            {chat.senderName !== userData.username && <div className="avatar">{chat.senderName}</div>}
                             {/* Display message */}
                            <div className="message-data">{chat.message}</div>
                             {/* Display self avatar */}
                            {chat.senderName === userData.username && <div className="avatar self">{chat.senderName}</div>}
                        </li>
                    ))}
                </ul>
                 {/* Input field for sending message */}
                <div className="send-message">
                    <input type="text" className="input-message" placeholder="enter the message" value={userData.message} onChange={handleMessage} /> 
                    <button type="button" className="send-button" onClick={sendValue}>send</button>
                </div>
            </div>}
            {/* Display chat content for private chat */}
            {tab!=="CHATROOM" && <div className="chat-content">
                <ul className="chat-messages">
                     {/* Display private chat messages */}
                    {[...privateChats.get(tab)].map((chat,index)=>(
                        <li className={`message ${chat.senderName === userData.username && "self"}`} key={index}>
                              {/* Display sender avatar */}
                            {chat.senderName !== userData.username && <div className="avatar">{chat.senderName}</div>}
                            {/* Display message */}
                            <div className="message-data">{chat.message}</div>
                            {/* Display self avatar */}
                            {chat.senderName === userData.username && <div className="avatar self">{chat.senderName}</div>}
                        </li>
                    ))}
                </ul>
                {/* Input field for sending private message */}        
                <div className="send-message">
                    <input type="text" className="input-message" placeholder="enter the message" value={userData.message} onChange={handleMessage} /> 
                    <button type="button" className="send-button" onClick={sendPrivateValue}>send</button>
                </div>
            </div>}
        </div>
        :
        <div className="register">
            {/* Input field for entering username */}
            <input
                id="user-name"
                placeholder="Enter your name"
                name="userName"
                value={userData.username}
                onChange={handleUsername}
                margin="normal"
              />
             {/* Button to connect and register user */}
              <button type="button" onClick={registerUser}>
                    connect
              </button> 
        </div>}
    </div>
    )
}

export default ChatRoom