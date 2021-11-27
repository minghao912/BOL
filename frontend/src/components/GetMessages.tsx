import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Box } from "@mui/material";
import { Card } from "@mui/material";
import { CardContent } from '@mui/material';
import { Typography } from '@mui/material';

import MessageSender from "./MessageSender";
import { Message, MessageList, User } from '../commons/interfaces';

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
            padding: '0 0 0 0',
        }}
    >
        <Box
            sx={{
                width: '100%',
                height: '80%',
                paddingTop: '2%',
                paddingBottom: '2%'
            }}
            className="get-messages-message-display"
        >
            <CardsGenerator groupID={groupID} refresh={props.refresh} />
        </Box>
        <Box
            sx={{
                width: '100%',
                height: '20%',
                marginTop: '2%',
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
    let userID = message.userID;
    var username:string = "DummyUsernameHere"; //Placeholder
    getUsernameOfSender(userID).then(response => {(username = response)}); //Potential Issue
    return new Promise((resolve, reject) => {
        resolve( <React.Fragment>
                <Card sx={{ minWidth: 10 }}>
                    <CardContent style ={{backgroundColor: "black"}}>
                    <Typography sx={{ fontSize: 20 }} color="text.secondary" gutterBottom>
                        <p>{username} says:</p>
                    </Typography>
                    <Typography variant="h5" component="div">
                        <p>{message.content}</p>
                    </Typography>
                    <Typography variant="body2">
                        <p>{splitTimestamp(message.timestamp)}</p>
                    </Typography>
                </CardContent>
            </Card>
          </React.Fragment>
        );
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

function getUsernameOfSender(sender: string): Promise<string>{
    return new Promise((resolve, reject) => { //fix later
        axios.get(`http://localhost:5000/sources/getUser/${sender}`).then(response => {
            console.log(response.data);
            let userObj = (response.data) as User;
            resolve(userObj.username as string);
        }).catch(err => {
            console.error(err);
            reject("" as string);
        });
    });
}

function splitTimestamp(timestamp: string): string{
    //split the string into a manageable format
    var divTime:string = timestamp.replace("T", ".");
    let timestamps:string[] = divTime.split(".");

    //get the date and convert into human readable format
    let dateString:string = timestamps[0];
    let dateArray:string[] = dateString.split("-");
    let date:string = dateArray[1] + "/" + dateArray[2] + "/" + dateArray[0];

    //get the time and convert to AM/PM format
    let timeString:string = timestamps[1];
    let timeArray:string[] = timeString.split(":");

    //convert hour to a number
    var hour:number = Number(timeArray[0]);
    var timeSuffix:string = "AM";

    if (hour > 11) {
        timeSuffix = "PM";
        hour = hour - 12;
    }
    if (hour == 0) { //change 00 to 12 
        hour = 12;
    }
    var hourStr:string = hour.toString();
    let time:string = hourStr + ":" + timeArray[1];

    //create final string
    var humanReadableTime:string = date + " at " + time + timeSuffix;

    return humanReadableTime;
}