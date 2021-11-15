import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import { Box, Paper } from '@mui/material';

import { User, Group, GroupList } from '../commons/interfaces';
import { GlobalContext } from '../context/GlobalState';
import { group } from 'console';

interface GroupSelectorProps {
    setGroupToDisplay: (arg0: string) => void
}

export default function GroupSelector(props: GroupSelectorProps) {
    // Set up variables
    const [groupList, setGroupList] = useState<GroupList>({} as GroupList);
    const [userID, setUserID] = useState<string>("");
    const { OAuthResponse } = useContext(GlobalContext);

    useEffect(() => {
        // Get user ID from global context
        let id = OAuthResponse.profileObj.googleId;
        setUserID(id);

        // Retreive the user's list of groups from backend
        axios.get(`http://localhost:5000/sources/getGroupsOfUser/${id}`).then(response => {
            setGroupList(response.data as GroupList);
        }).catch(err => console.error(err));
    }, [OAuthResponse]);

    return(
        <CardsGenerator groupList={groupList} currentUserID={userID}></CardsGenerator>
    );
}

function CardsGenerator(props: {groupList: GroupList, currentUserID: string}): JSX.Element {
    let jsxArray = [];

    // For each group in the list, generate a card for it
    for (let iterator of Object.keys(props.groupList))
        jsxArray.push(singleCardGenerator(props.groupList[iterator as any], props.currentUserID));

    return (
    <div style={{margin: "3% 2% 3% 2%"}}>
        {jsxArray}
    </div>);
}

function singleCardGenerator(group: Group, currentUserID: string): JSX.Element {
    console.log(group);

    // Generate group name and most recent message
    let groupName = groupnameGenerator(group.users, currentUserID);
    let mostRecentMessage = "most recent chat message";

    return (
        <Box
            sx={{
            }}
        >
            <Paper elevation={2} style={{padding: "2% 2% 2% 2%"}}>
                <b>{groupName}</b>
                <p>{mostRecentMessage}</p>
            </Paper>
        </Box>
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