import axios from 'axios';
import React, { useState, useContext } from 'react';

import { MessageToSendBack } from '../commons/interfaces';
import { GlobalContext } from '../context/GlobalState';

import './MessageSender.css';
import './GetMessages.tsx'

interface MessageSenderProps {
    groupID: string,
    forceUpdateCallback: () => void
}

export default function MessageSender(props: MessageSenderProps): JSX.Element {
    const { OAuthResponse } = useContext(GlobalContext);
    const [content, setContent] = useState<string>("");

/*  SAMPLE message
    {
        "groupID": "f06f0fd779f6491e8e3b74ca071484b7",
        "userID": "2",
        "timestamp": "2021-11-24T18:55:12Z",
        "content": "test sentence"
    }
*/

    function send_msg() {
        console.log(props.groupID + " is message group")
        axios.post('http://localhost:5000/sources/addMessage', {
            groupID: props.groupID,
            userID: OAuthResponse.profileObj.googleId,
            timestamp: new Date().toISOString(),
            content: content
        } as MessageToSendBack).then(response => {
            console.log(response)
        }).catch(err => console.error(err));

        // Force the parent to rerender
        props.forceUpdateCallback();
    }

    function handleEnterPress(e: React.KeyboardEvent) {
        if(e.key === 'Enter'){
            send_msg();
            setContent("");
        }
    }

    return (
        <div className="sub-container" style={{backgroundColor:"gray", padding: "1%", height: "50%"}}>
            <input type="text" id="message-box" className="send-msg-box" value={content} 
                style={{paddingLeft:"1%"}} autoComplete="off"
                placeholder="Type message here... | Press Enter to send"
                onChange={(e) => setContent(e.target.value)} onKeyDown={handleEnterPress} />
        </div>
    );
}