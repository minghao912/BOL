import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Box } from '@mui/material';

import './Homepage.css';
import { COLORS } from '../commons/constants';
import { MessageList } from '../commons/interfaces'
import GetMessages from '../components/GetMessages';

interface HomepageProps {

}

export default function Homepage(props: HomepageProps) {
    return (<>
        <GetMessages />
    </>);
}