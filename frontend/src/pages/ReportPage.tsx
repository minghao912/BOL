import React from 'react';
import { Box, Container } from "@mui/material";
import { Card } from "@mui/material";
import { CardContent } from '@mui/material';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';


export default function ReportPage(props: any): JSX.Element {
//html //buttons

return (
    <React.Fragment>
        <Container sx={{width: "100vw", height: "100vh", paddingLeft: "0px !important", paddingRight: "0px !important"}}>
            <Card sx={{ width: "100%", height: "100%", marginTop: "0%" }}>
                <CardContent style ={{backgroundColor: "#503a5c", width: "100%", height: "100%"}}>
                    <Typography variant="h6" display="inline" color="white">
                        {}{" "}
                    </Typography>
                    <Typography variant="subtitle2" display="inline" color="#858d99">
                    {}{" "}
                    </Typography>
                    <Typography variant="body1" component="div" align='left' color="#c1cad9" style={{wordBreak: "break-all"}}>
                        {}
                    </Typography>
                    <Typography variant="h3" align="center" color="white" sx={{marginBottom: "4%"}}>Please state the reason for your report:</Typography>
                    <div>
                    <Box textAlign='center'>
                    <Button fullWidth variant="outlined" style={{backgroundColor: '#06332c', fontSize: '40px', color: 'white', maxWidth: '97%', maxHeight: '100%', minWidth: '97%', minHeight: '100%', marginBottom: '30px', marginTop: '30px'}}
                            onClick={() =>  alert('Your report has been received!')}>
                        This message contains racist, homophobic, sexist, or another form of discrimnatory speech.
                    </Button>
                    </Box>
                    </div>
                    <div>
                    <Button fullWidth variant="outlined" style={{backgroundColor: '#06332c', fontSize: '40px', color: 'white', maxWidth: '97%', maxHeight: '100%', minWidth: '97%', minHeight: '100%', marginBottom: '30px', marginTop: '30px'}}
                            onClick={() =>  alert('Your report has been received!')}>
                        This message is unkind or violates site speech policies.
                    </Button>
                    </div>
                    <div>
                    <Button fullWidth variant="outlined" style={{backgroundColor: '#06332c', fontSize: '40px', color: 'white', maxWidth: '97%', maxHeight: '100%', minWidth: '97%', minHeight: '100%', marginBottom: '30px', marginTop: '30px'}}
                            onClick={() =>  alert('Your report has been received!')}>
                        This message contains targetted harassment or doxxing.
                    </Button>
                    </div>
                </CardContent>   
            </Card>
        </Container>
    </React.Fragment>
    )
}