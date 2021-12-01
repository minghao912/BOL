import React, {useState} from 'react';
import { Box, Button} from '@mui/material';

import './Homepage.css';
import BOL from '../images/BOL_light.png';
import ProfilePageButtonIcon from '../images/homepage-profile-icon-white.png';
import NewGroupButtonIcon from '../images/plus-square-regular-white.png';

import { COLORS } from '../commons/constants';
import GetMessages from '../components/GetMessages';
import GroupSelector from '../components/GroupSelector';
import { useHistory } from "react-router-dom";

interface HomepageProps {

}

export default function Homepage(props: HomepageProps) {
    const [groupToDisplayMessagesFor, setGroupToDisplayMessagesFor] = useState<string>("default" as string);
    const [refresh, setRefresh] = useState<boolean>(false); // For the message sender to change whenever it sends a message - forces rerender

    // For the redirect buttons:
    enum REDIRECT_DESTINATIONS {
        PROFILE_PAGE,
        NEW_GROUP_PAGE
    }

    const history = useHistory();
    const routeChange = (destination: REDIRECT_DESTINATIONS) => { 
        let path: string; 
        switch(destination) {
            case REDIRECT_DESTINATIONS.PROFILE_PAGE:
                path = "/profile";
                break;
            case REDIRECT_DESTINATIONS.NEW_GROUP_PAGE:
                path = "/creategroup";
                break;
            default:
                path = "/home";
        }
        
        history.push(path);
    }

    function forceUpdateCallback(): void {
        console.log("Forcing refresh of homepage");
        setRefresh(!refresh);
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
                    height: '73%',
                    paddingTop: '2%',
                }}
                className="homepage-chat-selection-bar"
            >
                <GroupSelector setGroupToDisplayMessagesFor={setGroupToDisplayMessagesFor} refresh={refresh} />
            </Box>
            <Box
                sx={{
                    width: '100%',
                    height: '8%',
                    paddingTop: '10%',
                    display: 'flex',
                    zIndex: '999'
                }}
                className="homepage-bottom-button-bar"
            >
                <Box
                    sx={{
                        width: '50%',
                        height: '100%',
                        padding: '0 0 0 0',
                    }}
                    className="homepage-profile-button-wrapper"
                    style = {{backgroundColor: COLORS.BACKGROUND4}}
                >
                    <Button 
                        sx={{
                            paddingTop: '0%'
                        }} 
                        onClick={(e) => {routeChange(REDIRECT_DESTINATIONS.PROFILE_PAGE)}}
                        style={{
                            height: '100%',
                            maxHeight:'100%',
                            margin:'0 auto',
                            display:'block'
                        }}
                    >
                        <img src={ProfilePageButtonIcon} alt = "" style={{maxHeight: '100%'}} />
                    </Button>
                </Box>
                <Box
                    sx={{
                        width: '50%',
                        height: '100%',
                        paddingTop: '1%',
                    }}
                    className="homepage-new-group-button-wrapper"
                    style = {{backgroundColor: COLORS.BACKGROUND4}}
                >
                    <Button 
                        sx={{
                            paddingTop: '0%'
                        }} 
                        onClick={(e) => {routeChange(REDIRECT_DESTINATIONS.NEW_GROUP_PAGE)}}
                        style={{
                            height: '100%',
                            maxHeight:'100%',
                            margin:'0 auto',
                            display:'block'
                        }}
                    >
                        <img src={NewGroupButtonIcon} alt = "" style={{maxHeight: '50%'}} />
                    </Button>
                </Box>
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
            <GetMessages groupID={groupToDisplayMessagesFor} refresh={refresh} forceUpdateCallback={forceUpdateCallback} />
        </Box>
    </Box>);
}