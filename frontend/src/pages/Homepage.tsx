import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Box, Button} from '@mui/material';

import './Homepage.css';
import BOL from '../images/BOL_light.png';
import toProfilePage from '../images/homepage-profile-icon.png';

import { COLORS } from '../commons/constants';
import { MessageList } from '../commons/interfaces'
import GetMessages from '../components/GetMessages';
import GroupSelector from '../components/GroupSelector';
import { useHistory } from "react-router-dom";

interface HomepageProps {

}

export default function Homepage(props: HomepageProps) {
    const [groupToDisplayMessagesFor, setGroupToDisplayMessagesFor] = useState<string>("default" as string);
    // For the profile page redirect button:
    const history = useHistory();
    const routeChange = () =>{ 
        let path = "/profile"; 
        history.push(path);
    }
    return (
    <Box 
        sx={{
            width: '100vw',
            height: '100vh',
            margin: '0 0 0 0',
            padding: '0 0 0 0',
            boxSizing: 'border-box'
        }}
        className="homepage-container"
    >
        <Box 
            sx={{
                width: '20vw',
                height: '100vh',
                margin: '0 0 0 0',
                padding: '0 0 0 0',
                boxSizing: 'border-box',
                display: 'inline-block',
            }}
            className="left-sidebar" 
            style={{backgroundColor: COLORS.BACKGROUND3}}
        >
            <Box
                sx={{
                    width: '100%',
                    height: '15%',
                    paddingTop: '2%',
                    display: 'inline-block',
                }}
                style={{
                    backgroundColor: COLORS.OFF_BLACK,
                    alignItems: 'center'
                }}
                className="homepage-logo-box"
            >
                <img src={BOL} alt= 'BOL logo' style={{maxWidth: '80%'}} />
            </Box>
            <Box
                sx={{
                    width: '100%',
                    height: '77%',
                    paddingTop: '2%',
                }}
                className="homepage-chat-selection-bar"
            >
                <GroupSelector setGroupToDisplayMessagesFor={setGroupToDisplayMessagesFor} />
            </Box>
            <Box
                sx={{
                    width: '100%',
                    height: '8%',
                    paddingTop: '0%',
                }}
                className="homepage-profile-page-box"
                style = {{backgroundColor: COLORS.BACKGROUND4}}
            >
                <Button sx = {{paddingTop: '0%'}} onClick = {routeChange}>
                    <img src = {toProfilePage} style = {{maxWidth: '18%',}} />
                </Button>
            </Box>
        </Box>
        <Box 
            sx={{
                width: '80vw',
                height: '100vh',
                margin: '0 0 0 0',
                padding: '0 0 0 0',
                boxSizing: 'border-box',
                display: 'flex',
            }}
            className="right-sidebar"
            style={{backgroundColor: COLORS.BACKGROUND}}
        >
            <GetMessages groupToDisplay={groupToDisplayMessagesFor} />
        </Box>
    </Box>);
}