import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Box } from "@mui/material";

import MessageSender from "./MessageSender";
import { Message, MessageList } from '../commons/interfaces';

interface GetMessagesProps {
    groupToDisplay: string,
    refresh: boolean,
    forceUpdateCallback: () => void
}

export default function GetMessages(props: GetMessagesProps): JSX.Element {
    let [groupID, setGroupID] = useState("");

    useEffect(() => {
        console.log("Group ID: " + props.groupToDisplay);
        setGroupID(props.groupToDisplay);
    }, [props.groupToDisplay, props.refresh])

    return (
    <Box
        sx={{
            width: '100%',
            height: '100%',
            paddingTop: '2%',
        }}
    >
        <Box
            sx={{
                width: '100%',
                height: '80%',
                paddingTop: '2%',
            }}
            className="get-messages-message-display"
        >
            <CardsGenerator groupID={groupID} refresh={props.refresh} />
        </Box>
        <Box
            sx={{
                width: '100%',
                height: '20%',
                paddingTop: '2%',
            }}
            className="get-messages-message-sender"
        >
            <MessageSender groupID={groupID} forceUpdateCallback={props.forceUpdateCallback} />
        </Box>
    </Box>
    );
}

function CardsGenerator(props: {groupID: string, refresh: boolean}): JSX.Element {
    const [cardArray, setCardArray] = useState<JSX.Element[]>([]);

    useEffect(() => {
        // Create the array of cards for each message. Awaits for the request to finish before setting the card array, which triggers a render
        async function populateCardArray() {
            // Clear out old group messages
            let newCardArray = [] as JSX.Element[]

            await getMessageList(props.groupID).then(list => {
                for (let message of list)
                    singleCardGenerator(message).then(card => newCardArray.push(card));
            });

            setCardArray([...newCardArray]);
        }
        setTimeout(populateCardArray, 500); // Timeout to let the backend update first
    }, [props.groupID, props.refresh]);

    if (cardArray.length < 1) {
        return (<p>There are no messages in this chat.</p>);
    }
    else return (
    <div style={{margin: "3% 2% 3% 2%", overflow:"auto", maxHeight:"100%"}}>
        {cardArray}
    </div>);
}

function singleCardGenerator(message: Message): Promise<JSX.Element> {
    return new Promise((resolve, reject) => {
        resolve(<p>{message.content}</p>);
    });
}

function getMessageList(groupID: string): Promise<MessageList>{
    return new Promise((resolve, reject) => {
        axios.get(`http://localhost:5000/sources/getMessagesOfGroup/${groupID}`).then(response => {
            console.log(response.data);
            resolve(response.data as MessageList);
        }).catch(err => {
            console.error(err);
            reject([] as MessageList);
        });
    });
}