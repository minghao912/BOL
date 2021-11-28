import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import { Container, Box, TextField, Button, Paper, List } from '@mui/material';

import { Message, MessageList } from '../commons/interfaces';
import { GlobalContext } from '../context/GlobalState';

import './MessageSender.css';

interface MessageSenderProps {
    groupID: string,
    forceUpdateCallback: () => void
}

export default function MessageSender(props: MessageSenderProps): JSX.Element {
    const { OAuthResponse } = useContext(GlobalContext);
    const [content, setContent] = useState<string>("");
    const [userIDtoSearch, setUserIDtoSearch] = useState<string>(OAuthResponse.profileObj.googleId);
    const [response, setResponse] = useState<MessageList>([] as MessageList);

/*  SAMPLE message
    {
        "groupID": "f06f0fd779f6491e8e3b74ca071484b7",
        "userID": "2",
        "timestamp": "2021-11-24T18:55:12Z",
        "content": "test sentence"
    }
*/

    function send_msg() {
        console.log(props.groupID)
        axios.post('http://localhost:5000/sources/addMessage', {
            groupID: props.groupID,
            userID: OAuthResponse.profileObj.googleId,
            timestamp: new Date().toISOString(),
            content: content
        } as Message).then(response => {
            console.log(response)
        }).catch(err => console.error(err));

        // Force the parent to rerender
        props.forceUpdateCallback();
    }

    function handleEnterPress(e: React.KeyboardEvent) {
        if(e.key === 'Enter'){
            send_msg();
            setContent("");
        }
    }

    return (
        <div className="sub-container" style={{backgroundColor:"gray", padding: "5px", height: "90px"}}>
            <input type="text" id="message-box" className="send-msg-box" value={content} 
                placeholder="Type message here... | Press Enter to send"
                onChange={(e) => setContent(e.target.value)} onKeyDown={handleEnterPress} />
        </div>
    );
}