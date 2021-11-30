import { useState, useEffect, useContext } from 'react';
import { Box } from '@mui/material';

import GroupCreator from '../components/GroupCreator';
import { GlobalContext } from '../context/GlobalState';
import { useHistory } from "react-router-dom";
import "./CreateGroup.css";
import BOL from '../images/BOL_light.png' //dimensions are 1280*511, keep logo in this aspect ratio

export default function CreateGroup(props: any): JSX.Element {
    const { OAuthResponse } = useContext(GlobalContext);
    const [currentUserID, setCurrentUserID] = useState<string>("");    

    useEffect(() => {
        setCurrentUserID(OAuthResponse.profileObj.googleId);
    }, [OAuthResponse])

    const history = useHistory();
    
    const routeChange = () =>{ 
        let path = "/home"; 
        history.push(path);
    }

    return (
        <div className="profileContainer">
            <div className="profileBox" style={{overflow: "hidden"}}> 
                <div className="homeButton" style={{float:"left"}} onClick = {routeChange} >
                    <span style={{color:"#ffffff"}} > Home </span>
                </div>
                <div className="profileSpace_top"></div>
                <div className="profilelogoContainer" > 
                    <img src={BOL} alt= 'BOL logo' width = "360" height = "153.3"/>
                </div>
                <div className="profile_space_Between_Logo_and_UserProfile">
                    <p><b>Create New Group</b></p>
                </div>
                <Box
                    sx={{
                        height: '60%',
                        paddingLeft: '2%',
                        paddingRight: '2%',
                        backgroundColor: 'rgba(50,0,30,0.1)',
                        marginTop: '30px',

                    }}
                >
                    <GroupCreator userID={currentUserID}/>
                </Box>
            </div>
        </div>
    );
}