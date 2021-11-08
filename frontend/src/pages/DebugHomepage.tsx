import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Container, Box, TextField, Button, Paper, List } from '@mui/material';

import './Homepage.css';
import { COLORS } from '../commons/constants';
import { Message, MessageList } from '../commons/interfaces';
import { GlobalContext } from '../context/GlobalState';

interface HomepageProps {

}

export default function DebugHomepage(props: HomepageProps) {
    const { OAuthResponse } = useContext(GlobalContext);
    const [content, setContent] = useState<string>("");
    const [userIDtoSearch, setUserIDtoSearch] = useState<string>(OAuthResponse.profileObj.googleId);
    const [response, setResponse] = useState<MessageList>({messages: []} as MessageList);

    // Sends content of text field to backend
    function submit() {
        axios.post('http://localhost:5000/sources/addMessage', {
            messageID: "random-message-id",
            sender: OAuthResponse.profileObj.googleId,
            timestamp: new Date().toISOString(),
            content: content,
            isImage: false
        } as Message).then(response => {
            console.log(response)
        }).catch(err => console.error(err));
    }

    // Gets all the messages that were made by userID
    function getMessages() {
        axios.get(`http://localhost:5000/sources/getMessages/${userIDtoSearch}`).then(response => {
            setResponse(response.data);
        }).catch(err => console.log(err));
    }

    return (
    <Box
        sx={{
            width: '100vw',
            height: '100vh',
            margin: '0 0 0 0',
            padding: '0 0 0 0',
            boxSizing: 'border-box',
            display: 'flex'
        }}
        className="container"
    >
        <div className="sub-container">
            <TextField id="message-box" label="Type message here..." variant="outlined" onChange={(e) => setContent(e.target.value)} />
            <Button style={{marginLeft:"10px"}} variant="contained" onClick={submit}>Send to Django</Button>
        </div>
        <div className="break"></div>
        <div className="sub-container">
            <TextField 
                id="userID-box" 
                label="Enter user ID here" 
                defaultValue={OAuthResponse.profileObj.googleId} 
                onClick={(e) => setUserIDtoSearch((e.target as any).value)} 
                onChange={(e) => setUserIDtoSearch(e.target.value)} 
            />
            <Button style={{marginLeft:"10px"}} variant="contained" onClick={getMessages}>Get Messages</Button>
            <div className="break"></div>
            <Paper style={{minWidth:"50vw", height:"50vh", overflow:"auto", padding:"20px 20px 20px 20px"}}>
                <MessageOutputter messages={response} />
            </Paper>
        </div>
    </Box>);
}

function MessageOutputter(props: any): JSX.Element {
    let out = [] as JSX.Element[];
    let messages = {messages: props.messages} as MessageList;
    
    // Loops through array of messages and formats each one
    for (let i = 0; i < messages.messages.length; i++) {
        const message = messages.messages[i];

        let dt = new Date(message.timestamp)
        let datestamp = dt.toLocaleDateString('zh-CN')
        let timestamp = dt.toLocaleTimeString('en-GB')

        out.push(<><div className="break"></div><p><b>{datestamp + " " + timestamp}</b><br />{message.content}</p></>);
    }

    return (<List>{out}</List>);
}