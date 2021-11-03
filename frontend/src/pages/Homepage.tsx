import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Box } from '@mui/material';

import './Homepage.css';
import { COLORS } from '../commons/constants';
import { MessageList } from '../commons/interfaces'

interface HomepageProps {

}

export default function Homepage(props: HomepageProps) {
    const messageListInitializer = {
        messages: ["a", "b", "c"]
    } as MessageList;
    const [messages, setMessages] = useState<MessageList>(messageListInitializer);

    // Get data
    useEffect(() => {
        axios.get('http://localhost:5000/sources/getMessages').then(response => {
            let responseMessageList = {
                messages: response.data!.payload
            }

            setMessages(responseMessageList as MessageList);
        }).catch(err => console.error(err));
    }, []);

    return(
    <React.Fragment>
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
            <CardGenerator messages={messages} />
        </Box>
    </React.Fragment>
    );
}

function CardGenerator(props: any): JSX.Element {
    let messages = props.messages as MessageList;
    let jsx = [] as JSX.Element[]

    console.log(messages.messages);

    for (const m of messages.messages) {
        jsx.push(<p>{m}</p>);
    }

    return (<>{jsx}</>);
}