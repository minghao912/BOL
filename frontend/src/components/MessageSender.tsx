import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import { Container, Box, TextField, Button, Paper, List } from '@mui/material';

import { Message, MessageList } from '../commons/interfaces';
import { GlobalContext } from '../context/GlobalState';

interface MessageSenderProps {
    groupID: string
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
    }

    function handleEnterPress(e: React.KeyboardEvent) {
        if(e.key === 'Enter'){
            send_msg()
          }
    }

    return (
        <div className="sub-container">
            <TextField id="message-box" label="Type message here..." variant="outlined" onChange={(e) => setContent(e.target.value)} onKeyDown={handleEnterPress} />
        </div>
    );
}