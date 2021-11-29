import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import { Box, Container } from "@mui/material";
import { Card } from "@mui/material";
import { CardContent } from '@mui/material';
import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';
import { Typography } from '@mui/material';
import { useHistory } from "react-router-dom";

export default function ReportPage(props: any): JSX.Element {
//html //buttons

return (

    <React.Fragment>
        <Container sx={{width: "100vw", height: "100vh", paddingLeft: "0px !important", paddingRight: "0px !important"}}>
            <Card sx={{ width: "100%", height: "100%", marginTop: "0%" }}>
                <CardContent style ={{backgroundColor: "#06332c", width: "100%", height: "100%"}}>
                    <Typography variant="h6" display="inline" color="white">
                        {}{" "}
                    </Typography>
                    <Typography variant="subtitle2" display="inline" color="#858d99">
                    {}{" "}
                    </Typography>
                    <Typography variant="body1" component="div" align='left' color="#c1cad9" style={{wordBreak: "break-all"}}>
                        {}
                    </Typography>
                </CardContent>
            </Card>
        </Container>
    </React.Fragment>
    
    )
}