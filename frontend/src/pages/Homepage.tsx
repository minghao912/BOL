import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Box } from '@mui/material';

import './Homepage.css';
import BOL from '../images/BOL_light.png'

import { COLORS } from '../commons/constants';
import { MessageList } from '../commons/interfaces'
import GetMessages from '../components/GetMessages';
import GroupSelector from '../components/GroupSelector';

interface HomepageProps {

}

export default function Homepage(props: HomepageProps) {
    const [groupToDisplay, setGroupToDisplay] = useState<string>("default" as string);

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
            >
                <img src={BOL} alt= 'BOL logo' style={{maxWidth: '80%'}} />
            </Box>
            <Box
                sx={{
                    width: '100%',
                    height: '85%',
                    paddingTop: '2%',
                }}
            >
                <GroupSelector setGroupToDisplay={setGroupToDisplay} />
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
            style={{backgroundColor: COLORS.BACKGROUND2}}
        >
            <GetMessages groupToDisplay={groupToDisplay} />
        </Box>
    </Box>);
}