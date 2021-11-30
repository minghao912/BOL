import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import { Box } from "@mui/material";
import { Card } from "@mui/material";
import { CardContent } from '@mui/material';
import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';
import { Typography } from '@mui/material';
import { useHistory } from "react-router-dom";

import MessageSender from "./MessageSender";
import { Message, MessageList, User } from '../commons/interfaces';
import { GlobalContext } from '../context/GlobalState';



interface GetMessagesProps {
    groupID: string,
    refresh: boolean,
    forceUpdateCallback: () => void
}

export default function GetMessages(props: GetMessagesProps): JSX.Element {
    let [groupID, setGroupID] = useState("");
    const history = useHistory();

    console.log("Getting Messages...")
    useEffect(() => {
        console.log("Group ID: " + props.groupID);
        setGroupID(props.groupID);
    }, [props.groupID, props.refresh]);

    const routeChangeReport = () =>{ 
        let path = "/report/"; 
        history.push(path);
        history.go(0);
    }

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
                paddingTop: '0%',
                paddingBottom: '3%'
            }}
            className="get-messages-message-display"
        >
            <GroupNameHeader groupID={groupID} />
            <CardsGenerator groupID={groupID} refresh={props.refresh} forceUpdateCallback={props.forceUpdateCallback} routeChangeCallback={routeChangeReport} />
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

function CardsGenerator(props: {groupID: string, refresh: boolean, forceUpdateCallback: () => void, routeChangeCallback: () => void}): JSX.Element {
    const [cardArray, setCardArray] = useState<JSX.Element[]>([]);
    const [localRefresh, setLocalRefresh] = useState<boolean>(false);
    const { OAuthResponse } = useContext(GlobalContext);
    const [currentUserID, setCurrentUserID] = useState<string>("");

    // Marks end of messages, automatically scroll here when all the messages are loaded
    function scrollToBottom() {
        let end = document.getElementById("bottom-of-message-display");
        if (end)
            end.scrollIntoView({ block: 'nearest' });
    }    

    useEffect(() => {
        setCurrentUserID(OAuthResponse.profileObj.googleId);
    }, [OAuthResponse])

    useEffect(() => {
        // Create the array of cards for each message. Awaits for the request to finish before setting the card array, which triggers a render
        async function populateCardArray() {
            // Clear out old group messages
            let newCardArray = [] as JSX.Element[]

            await getMessageList(props.groupID).then(async (list) => {
                for (let message of list) {
                    await singleCardGenerator(message, currentUserID, props.forceUpdateCallback, props.routeChangeCallback).then(async (card) => {
                        newCardArray.push(card);
                    }).catch(err => console.error(err));
                }
            }).catch(err => console.error("Error getting message list: " + err));

            setCardArray([...newCardArray]);

            scrollToBottom();
        }
        setTimeout(populateCardArray, 100); // Timeout to let the backend update first, adjusted so it works more consistently
    }, [props.groupID, props.refresh]);

    if (cardArray.length < 1) {
        return (<p>There are no messages in this chat.</p>);
    }
    else return (
    <div style={{margin: "3% 2% 3% 2%", overflow:"auto", maxHeight:"95%"}}>
        {cardArray}
        <div id="bottom-of-message-display" style={{maxWidth:"10%"}}></div>
    </div>);
}

function singleCardGenerator(message: Message, CurrentUser: string, forceUpdateCallback: () => void, routeChangeCallback: () => void): Promise<JSX.Element> {
    let userID = message.sender.userID;
    //let username:string = "DummyUsernameHere"; //Placeholder
    let isSameUser = false;
    if (CurrentUser == userID) {
        isSameUser = true;
    }
    return new Promise((resolve, reject) => {
        getUsernameOfSender(userID).then(username => {
            if (isSameUser) {
                resolve( 
                    <React.Fragment>
                        <Card sx={{ maxWidth: "98%", height: "20%", marginTop: "2%" }}>
                            <CardContent style ={{backgroundColor: "#06332c"}}>
                                <Typography variant="h6" display="inline" color="white">
                                    {username}{" "}
                                </Typography>
                                <Typography variant="subtitle2" display="inline" color="#858d99">
                                {splitTimestamp(message.timestamp)}{" "}
                                </Typography>
                                <Typography variant="body1" component="div" align='left' color="#c1cad9" style={{wordBreak: "break-all"}}>
                                    {message.content}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <input type="button" value="Copy" className="message-button"
                                    onClick={() =>  navigator.clipboard.writeText(message.content)}
                                />
                                <input type="button" value="Delete" className="message-button"
                                    onClick={() => delete_msg(message.messageID, forceUpdateCallback)}
                                />
                            </CardActions>
                        </Card>
                    </React.Fragment>
                );
            }
            else {
                resolve( 
                    <React.Fragment>
                        <Card sx={{ maxWidth: "98%", height: "20%", marginTop: "2%" }}>
                            <CardContent style ={{backgroundColor: "#06332c"}}>
                                <Typography variant="h6" display="inline" color="white">
                                    {username}{" "}
                                </Typography>
                                <Typography variant="subtitle2" display="inline" color="#858d99">
                                {splitTimestamp(message.timestamp)}{" "}
                                </Typography>
                                <Typography variant="body1" component="div" align='left' color="#c1cad9" style={{wordBreak: "break-all"}}>
                                    {message.content}
                                </Typography>
                            </CardContent>
                            <CardActions>
                            <input type="button" value="Copy" className="message-button"
                                    onClick={() =>  navigator.clipboard.writeText(message.content)}
                                />
                                <input type="button" value="Delete" className="message-button"
                                    onClick={() => delete_msg(message.messageID, forceUpdateCallback)}
                                />
                            </CardActions>
                        </Card>
                    </React.Fragment>
                );
            }
        });
    });
}

function delete_msg(messageID: string, forceUpdateCallback: () => void) {
    axios.delete(`http://localhost:5000/sources/deleteMessage/${messageID}`).then(response => {
        console.log(response);
        forceUpdateCallback();
    }).catch(err => console.error(err));
}

function GroupNameHeader(props: {groupID: string}): JSX.Element {
    const { OAuthResponse } = useContext(GlobalContext);
    const [groupName, setGroupName] = useState<string>("");

    function groupnameGenerator(users: User[], currentUserID: string): string {
        let groupname = "";
    
        // Get the usernames of everyone in the group except for the current user
        for (let user of users) {
            // Don't put the current user's username in the group ID
            if (user.userID === currentUserID)
                continue;
            
            groupname += user.username;
            groupname += ", ";
        }
    
        // Remove the last comma
        groupname = groupname.substr(0, groupname.lastIndexOf(","));
    
        return groupname;
    }

    useEffect(() => {
        async function getGroupAndSetName(groupID: string) {
            // Don't run this if there is no group selected
            if (!groupID || groupID == "default")
                return;

            let groupname = "";
            await axios.get(`http://localhost:5000/sources/getUsersInGroup/${groupID}`).then(response => {
                groupname = groupnameGenerator((response.data as User[]), OAuthResponse.profileObj.googleId);
            })
            setGroupName(groupname);
        }

        getGroupAndSetName(props.groupID);
    }, [props.groupID])

    return(
        <Box
            sx={{
                width: '100%',
                height: '5%',
                paddingLeft: '2%',
            }}
        >
            <h1 style={{color: "white"}}>{groupName}</h1>
        </Box>
    )
}

function getMessageList(groupID: string): Promise<MessageList>{
    return new Promise((resolve, reject) => {
        // Don't make request if no group selected
        if (!groupID || groupID == "default")
            reject([] as MessageList);

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
            // console.log(response.data);
            let userObj = (response.data) as User;
            resolve(userObj.username as string);
        }).catch(err => {
            console.error(err);
            reject("" as string);
        });
    });
}

function splitTimestamp(timestamp: string): string{
    let timestampObj = new Date(timestamp);
    let dateYMD = timestampObj.toLocaleDateString('zh-CN');
    let time24H = timestampObj.toLocaleTimeString('en-US', { hour12: false });

    //create final string
    var humanReadableTime:string = "on " + dateYMD + " at " + time24H.split(':').slice(0, 2).join(':');
    return humanReadableTime;
}   