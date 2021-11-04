import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Container, Box, TextField, Button } from '@mui/material';

import './Homepage.css';
import { COLORS } from '../commons/constants';
import { Message, MessageList } from '../commons/interfaces';
import { GlobalContext } from '../context/GlobalState';
import { setEnvironmentData } from 'worker_threads';

interface HomepageProps {

}

export default function DebugHomepage(props: HomepageProps) {
    const [content, setContent] = useState<string>("");
    const [userIDtoSearch, setUserIDtoSearch] = useState<string>("");
    const [response, setResponse] = useState<MessageList>({messages: []} as MessageList);
    const { OAuthResponse } = useContext(GlobalContext);

    function submit() {
        axios.post('http://localhost:5000/sources/addMessage', {
            messageID: "random-message-id",
            sender: OAuthResponse.profileObj.googleId,
            timestamp: new Date().toISOString(),
            content: content
        } as Message).then(response => {
            console.log(response)
        }).catch(err => console.error(err));
    }

    function getMessages() {
        axios.get(`http://localhost:5000/sources/getMessages/${userIDtoSearch}`).then(response => {
            setResponse(response.data);
        }).catch(err => console.log(err));
    }

    return (
    <Box
        sx={{
            bgcolor: COLORS.BACKGROUND,
            width: '100vw',
            height: '100vh',
            margin: '0 0 0 0',
            padding: '0 0 0 0',
            boxSizing: 'border-box',
            display: 'flex'
        }}
    >
        <div className="sub-container" style={{color:"white"}}>
            <TextField id="message-box" label="Type message here..." variant="outlined" onChange={(e) => setContent(e.target.value)} />
            <Button variant="contained" onClick={submit}>Send to Django</Button>
        </div>
        <div className="break"></div>
        <div className="sub-container" style={{color:"white"}}>
            <TextField id="userID-box" label="Enter user ID here" onChange={(e) => setUserIDtoSearch(e.target.value)} />
            <Button variant="contained" onClick={getMessages}>Get Messages</Button>
            <MessageOutputter messages={response} />
        </div>
    </Box>);
}

function MessageOutputter(props: any): JSX.Element {
    let out = [] as JSX.Element[];
    
    for (let i = 0; i < props.messages.length; i++) {
        out.push(<p>{i}: {JSON.stringify(props.messages[i])}</p>);
    }

    return (<>{out}</>);
}