import axios from 'axios';
import React, { useState, useEffect } from 'react';

interface GetMessagesProps {
    groupToDisplay: string
}

export default function GetMessages(props: GetMessagesProps): JSX.Element {
    return <p>{props.groupToDisplay}</p>
}