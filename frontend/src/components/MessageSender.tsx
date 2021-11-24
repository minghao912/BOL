import axios from 'axios';
import React, { useState, useEffect } from 'react';

interface MessageSenderProps {
    groupID: string
}

export default function MessageSender(props: MessageSenderProps): JSX.Element {
    return (
        <p>{props.groupID}</p>
    );
}