import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import { Box, Paper } from '@mui/material';

import { User, Group, Message, GroupList } from '../commons/interfaces';
import { GlobalContext } from '../context/GlobalState';
import { group } from 'console';

interface GroupSelectorProps {
    setGroupToDisplayMessagesFor: (arg0: string) => void
}

export default function GroupSelector(props: GroupSelectorProps) {
    // Set up variables
    const [groupList, setGroupList] = useState<GroupList>({} as GroupList);
    const { OAuthResponse } = useContext(GlobalContext);

    // Set up user's googleID
    const DEBUG_MODE = true;
    let defaultUserID: string;
    if (DEBUG_MODE)
        defaultUserID = "2";
    else if (!OAuthResponse.profileObj || !OAuthResponse.profileObj.googleId)
        defaultUserID = "";
    else defaultUserID = OAuthResponse.profileObj.googleId;

    const [userID, setUserID] = useState(defaultUserID);

    useEffect(() => {
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

    return(
        <CardsGenerator groupList={groupList} currentUserID={userID} displayMessageCallback={props.setGroupToDisplayMessagesFor}></CardsGenerator>
    );
}

function CardsGenerator(props: {
        groupList: GroupList, 
        currentUserID: string, 
        displayMessageCallback: (arg0: string) => void
    }): JSX.Element {

    // Sort the groups
    let sortedGroupList = sortGroup(props.groupList);

    // The resulting JSX elements, will be returned later
    let jsxArray = [];

    // For each group in the list, generate a card for it
    for (let iterator of Object.keys(sortedGroupList))
        jsxArray.push(singleCardGenerator(props.groupList[iterator as any], props.currentUserID, props.displayMessageCallback));

    return (
    <div style={{margin: "3% 2% 3% 2%", overflow:"auto", maxHeight:"100%"}}>
        {jsxArray}
    </div>);
}

function singleCardGenerator(group: Group, currentUserID: string, displayMessageCallback: (arg0: string) => void): JSX.Element {
    // Generate group name and most recent message
    let groupName = groupnameGenerator(group.users, currentUserID);
    let mostRecentMessage = "most recent chat message";

    return (
        <div onClick={(e) => displayMessageCallback(group.groupID)}>
            <Box
                sx={{
                    marginTop: "2%",
                    marginBottom: "2%"
                }}
                key={group.groupID}
            >
                <Paper elevation={2} style={{padding: "2% 2% 2% 2%"}}>
                    <b>{groupName}</b>
                    <p>{mostRecentMessage}</p>
                </Paper>
            </Box>
        </div>
    );
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

// Sort the groups based on how recent their most recent message was (more recent => earlier in the list)
function sortGroup(groupList: GroupList): GroupList {
    // CHANGE ME
    return groupList;
}