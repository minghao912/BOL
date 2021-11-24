import React from 'react';
import { Container, Box, TextField, Button, Paper, List } from '@mui/material';

// Default 404 Page Not Found page
class PageNotFoundPage extends React.Component<{history: any}> {
    routeChange=()=> {
        let path = '/';
        this.props.history.push(path);
    }
    render() {
        return(
            <Box style={{
                fontSize: 100, 
                color: "#FF0000", 
                textAlign: "center",
            }}>
                404 Page Not Found <br></br>
                <Button onClick={this.routeChange}>
                    Return to Homepage
                </Button>
            </Box>
        );
    }
}

export default PageNotFoundPage;