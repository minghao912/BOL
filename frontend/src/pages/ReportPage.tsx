import React from 'react';
import { Box } from "@mui/material";
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import { useHistory } from "react-router-dom";
import BOL from '../images/BOL_light.png';
import { COLORS } from '../commons/constants';


export default function ReportPage(props: any): JSX.Element {
    const history = useHistory();
    const routeChange = () => { 
        let path = "/home"; 
        history.push(path);
    }

    // Styling for buttons
    const buttonStyles = {
        backgroundColor: COLORS.BACKGROUND3, 
        color: 'white', 
        textTransform: 'none', 
        height: "100px", 
        marginBottom: "2%"
    } as React.CSSProperties;

    return (
        <div className="profileContainer">
            <div className="profileBox" style={{overflow: "hidden"}}> 
                <div className="homeButton" style={{float:"left"}} onClick={routeChange}>
                    <span style={{color:"#ffffff"}} > Home </span>
                </div>
                <div className="profileSpace_top"></div>
                <div className="profilelogoContainer" > 
                    <img src={BOL} alt= 'BOL logo' width = "360" height = "153.3"/>
                </div>
                <div className="profile_space_Between_Logo_and_UserProfile">
                    <p><b>Report a Message</b></p>
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
                    <Typography variant="subtitle1" align="center" color="white" sx={{marginTop: "10%", marginBottom: "4%"}}>
                        Please select the reason for your report
                    </Typography>
                    <Box textAlign='center'>
                        <Button fullWidth variant="outlined" style={buttonStyles}
                                onClick={() => alert('Your report has been received!')}>
                            This message contains racist, homophobic, sexist, or another form of discrimnatory speech.
                        </Button>
                        <Button fullWidth variant="outlined" style={buttonStyles}
                                onClick={() => alert('Your report has been received!')}>
                            This message is unkind or violates site speech policies.
                        </Button>
                        <Button fullWidth variant="outlined" style={buttonStyles}
                                onClick={() => alert('Your report has been received!')}>
                            This message contains targeted harassment or doxxing.
                        </Button>
                    </Box>
                </Box>
            </div>
        </div>
    );
}