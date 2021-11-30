import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import { Box, Paper } from '@mui/material';

import { User, Group, Message, GroupList } from '../commons/interfaces';
import { GlobalContext } from '../context/GlobalState';
import { COLORS } from '../commons/constants';

import './GroupSelector.css';

interface GroupSelectorProps {
    refresh: boolean,
    setGroupToDisplayMessagesFor: (arg0: string) => void
}

export default function GroupSelector(props: GroupSelectorProps) {
    // Set up variables
    const [groupList, setGroupList] = useState<GroupList>([] as GroupList);
    const { OAuthResponse } = useContext(GlobalContext);

    // Set up user's googleID
    const DEBUG_MODE = true;
    let defaultUserID: string;
    if (DEBUG_MODE)
    {
        defaultUserID = "2";
    }
    else if (!OAuthResponse.profileObj || !OAuthResponse.profileObj.googleId)
        defaultUserID = "";
    else defaultUserID = OAuthResponse.profileObj.googleId;

    const [userID, setUserID] = useState(defaultUserID);

    useEffect(() => {
        // Make sure that OAuthResponse actually exists
        if (!OAuthResponse)
            return;

        // Make sure the user has logged in and it is working
        if (OAuthResponse == {}) {
            console.error("There was an error with the Google OAuth JSON");
            return;
        }

        if (!OAuthResponse.profileObj || !OAuthResponse.profileObj.googleId) {
            console.error("There was an error with the Google OAuth JSON");
            return;
        }

        // Get user ID from global context
        if (!DEBUG_MODE) {
            let id = OAuthResponse.profileObj.googleId;
            setUserID(id);
        }

        // Retreive the user's list of groups from backend
        axios.get(`http://localhost:5000/sources/getGroupsOfUser/${userID}?timestamp=${(new Date()).getTime()}`).then(response => {
            setGroupList(response.data as GroupList);
        }).catch(err => console.error(err));
    }, [OAuthResponse]);

    if (groupList.length < 1)
        return <></>;
    else 
    {
        return(
            <CardsGenerator groupList={groupList} currentUserID={userID} displayMessageCallback={props.setGroupToDisplayMessagesFor} refresh={props.refresh}></CardsGenerator>);
    }
}

function CardsGenerator(props: {
        groupList: GroupList, 
        currentUserID: string, 
        displayMessageCallback: (arg0: string) => void,
        refresh: boolean
    }): JSX.Element {

    const [cardArray, setCardArray] = useState<JSX.Element[]>([]);

    useEffect(() => {
        // Create the array of cards for each group. Awaits for the request to finish before setting the card array, which triggers a render
        async function populateCardArray() {
            let newCardArray = [] as JSX.Element[];
            const sortedGroup = await sortGroup(props.groupList);
            for (let iterator of Object.keys(sortedGroup))
                await singleCardGenerator(sortedGroup[iterator as any], props.currentUserID, props.displayMessageCallback).then(card => newCardArray.push(card));
            
            setCardArray([...newCardArray]);
        }
        populateCardArray();
        setTimeout(populateCardArray, 500);
    }, [props.refresh]);

    if (cardArray.length < 1) {
        return (<p>No groups to show</p>);
    }
    else return (
    <div style={{margin: "3% 2% 3% 2%", overflow:"auto", maxHeight:"100%"}}>
        {cardArray}
    </div>);
}

function singleCardGenerator(group: Group, currentUserID: string, displayMessageCallback: (arg0: string) => void): Promise<JSX.Element> {
    // Generate group name and most recent message
    let groupName = groupnameGenerator(group.users, currentUserID);

    let mostRecentMessage = "";
    let mostRecentMessageTimestamp = "";

    return new Promise((resolve, reject) => {
        getMostRecentMessage(group).then(message => {
            mostRecentMessage = message.content;

            // For timestamp, show the time if same day as today, show date otherwise
            if (message.timestamp) {
                let mostRecentMessageTimestampDate = new Date(message.timestamp);
                if (mostRecentMessageTimestampDate.getDate() == new Date().getDate()) {
                    mostRecentMessageTimestamp = mostRecentMessageTimestampDate.getHours().toLocaleString(undefined, {minimumIntegerDigits: 2}) + ":" + mostRecentMessageTimestampDate.getMinutes().toLocaleString(undefined, {minimumIntegerDigits: 2});
                }
                else mostRecentMessageTimestamp = mostRecentMessageTimestampDate.getFullYear() + "/" + mostRecentMessageTimestampDate.getMonth() + "/" + mostRecentMessageTimestampDate.getDate();
            }

            // Generate card and return
            resolve(
            <div onClick={(e) => displayMessageCallback(group.groupID)}>
                <Box
                    sx={{
                        marginTop: "2%",
                        marginBottom: "2%"
                    }}
                    key={group.groupID}
                >
                    <Paper elevation={2} style={{padding: "2% 2% 2% 2%"}}>
                        <div className="group_card_first_line">
                            <p style={{color:"black"}}><b>{groupName}</b></p>
                            {!mostRecentMessageTimestamp || mostRecentMessageTimestamp == "0" ?    // Donn't place the timestamp if there was no most recent message
                                <></> : 
                                <p style={{color:"black"}}>{mostRecentMessageTimestamp}</p>
                            }
                        </div>
                        <p style={{color:"black", textAlign:"left"}}>{mostRecentMessage}</p>
                    </Paper>
                </Box>
            </div>);
        }).catch(err => reject(err));
    });
}

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

function getMostRecentMessage(group: Group): Promise<Message> {
    const defaultMessage = {
        messageID: "0",  
        groupID: group.groupID,    
        userID: "0",    
        timestamp: "0", 
        content: "There are no messages in this group"
    };

    return new Promise((resolve, reject) => {
        axios.get(`http://localhost:5000/sources/getLatestMessageByGroup/${group.groupID}`).then(response => {
            if (response.data == {})
                resolve({} as Message);
            else resolve(response.data as Message);
        }).catch(err => {
            console.error(err);
            reject({});
        });
    });
}
function sleep(milliseconds: number) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
  }
// Sort the groups based on how recent their most recent message was (more recent => earlier in the list)
function sortGroup(groupList: GroupList): Promise<GroupList> {
    return new Promise(async (resolve, reject) => {
        var intList: number[] = [];
        var sortedList: GroupList = [];
        for (let i = 0; i < groupList.length; i++)
        {
            await getMostRecentMessage(groupList[i]).then(message => {
                const timeStamp = message.timestamp;
                const timeString =  timeStamp.slice(0,4) + timeStamp.slice(5,7) 
                + timeStamp.slice(8,10) + timeStamp.slice(11,13) + timeStamp.slice(14, 16) + 
                timeStamp.slice(17,19) + timeStamp.slice(20, 23);
                const timeValue = parseInt(timeString);
                // TimeValue is the time as an int
                if (sortedList == [])
                {
                    intList.push(timeValue);
                    sortedList.push(groupList[i]); 
                }
                else
                {
                    let inserted = false;
                    for (let n = 0; n < sortedList.length; n++)
                    {
                        if (timeValue > intList[n])
                        {
                            intList.splice(n, 0, timeValue);
                            sortedList.splice(n, 0, groupList[i]);
                            inserted = true;
                            break;
                        }
                    }
                    if (inserted == false)
                    {
                        intList.push(timeValue);
                        sortedList.push(groupList[i]);
                    }
                }
            }).catch(err => {
                console.error(err);
                reject(groupList);
            });
        }
        // Returns GroupList objects sorted from newest to oldest
        resolve(sortedList);
        reject(groupList);
    });
}