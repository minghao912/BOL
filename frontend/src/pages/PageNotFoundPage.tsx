import React from 'react';
import "./PageNotFoundPage.css";
import { Box, Button } from '@mui/material';

// Default 404 Page Not Found page
class PageNotFoundPage extends React.Component<{history: any}> {
    routeChange=()=> {
        let path = '/';
        this.props.history.push(path);
    }
    render() {
        return(
            <div className = "errorPage">
                <Box style={{
                    fontFamily: 'monospace',
                    fontSize: 90, 
                    color: "#FF0000", 
                    textAlign: "center",
                }}>
                    404 Page Not Found <br></br>
                    <Button onClick={this.routeChange} style = {{
                        fontFamily: 'monospace',
                        fontSize: 50,
                        color: "#7289DA",
                        textAlign: "center",
                        textTransform: "none",
                    }}>
                        <u> Return to Homepage </u>
                    </Button>
                </Box>
            </div>
        );
    }
}

export default PageNotFoundPage;