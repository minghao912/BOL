import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Paper } from '@mui/material';

import { Group, GroupList } from '../commons/interfaces';

interface GroupSelectorProps {
    setGroupToDisplay: (arg0: string) => void
}

export default function GroupSelector(props: GroupSelectorProps) {
    const [groupList, setGroupList] = useState<GroupList>({} as GroupList);

    // Retreive the user's list of groups from backend
    useEffect(() => {
        axios.get('temporaryURL').then(response => {
            setGroupList(response.data as GroupList);
        }).catch(err => console.error(err));
    }, []);

    return(
        <p style={{color:'white'}}>{JSON.stringify(groupList)}</p>
    );
}

function cardGenerator(group: Group): JSX.Element {
    return (<Paper>

    </Paper>);
}