import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Box, Checkbox } from '@mui/material';


import { User, Friendship, NewGroup } from '../commons/interfaces';
import { GlobalContext } from '../context/GlobalState';
import { useHistory } from "react-router-dom";
import "./GroupCreator.css"

export default function GroupCreator(props: any): JSX.Element {
    const { OAuthResponse } = useContext(GlobalContext);
    const [currentUserID, setCurrentUserID] = useState<string>("");
    // List of users to be added to and removed from the group
    const [listOfUsersToAdd, setListOfUsersToAdd] = useState<User[]>([] as User[]);
    const [listOfUsersToRem, setListOfUsersToRem] = useState<User[]>([] as User[]);

    // redirect back to home page upon group creation
    const history = useHistory();
    
    const routeChange = () =>{ 
        let path = "/home"; 
        history.push(path);
    }


    useEffect(() => {
        setCurrentUserID(OAuthResponse.profileObj.googleId);
    }, [OAuthResponse])

    useEffect(() => {
        console.log("In state: ", listOfUsersToAdd, listOfUsersToRem);
    }, [listOfUsersToAdd, listOfUsersToRem])

    // Wait until the props are populated with values
    if (props.userID === "")
        return <></>;

    // Change the list of users, if add is true, add; if it is false, remove the passed user
    function changeUserList(friend: User, add: boolean): void {
        if (add) {
            if (!listOfUsersToAdd.includes(friend)) {
                let newListOfUsersToAdd = listOfUsersToAdd;
                newListOfUsersToAdd.push(friend);
                setListOfUsersToAdd([...newListOfUsersToAdd]);
            }
        } else {
            if (!listOfUsersToRem.includes(friend)) {
                let newListOfUsersToRem = listOfUsersToRem;
                newListOfUsersToRem.push(friend);
                setListOfUsersToRem([...newListOfUsersToRem]);
            }
        }
    }

    function createGroup(): void {
        // Create the final list of users to add
        // Do the actual db request
        let final_list: string[] = [];
        //console.log(listOfUsersToAdd);
        //console.log(listOfUsersToRem);
        for (var i = 0; i < listOfUsersToAdd.length; i++){
            final_list.push(listOfUsersToAdd[i].userID);
        }
        
        for (i = 0; i < listOfUsersToRem.length; i++){
            let rem_id: string = listOfUsersToRem[i].userID;
            for (var j = 0; j < final_list.length; j++){
                if (final_list[j] === rem_id){
                    final_list.splice(j,1);
                    break;
                }
            }
        }
        
        //console.log(final_list)
        final_list.push(currentUserID)
        axios.post('http://localhost:5000/sources/createNewGroup', {
            userIDs: final_list,
        } as NewGroup).then(response => {
            console.log(response)
            routeChange();
        }).catch(err => console.error(err));
        /*
        example json:
        {
            "userIDs": ["2", "123"]
        }
        */

    }

    return (<Box>
        <FriendDisplay userID={props.userID} addFriendToGroupCallback={changeUserList} />
        <div className="create-group-button" onClick={createGroup}> Create Group </div>
        </Box>
    );
}

function FriendDisplay(props: {
    userID: string,
    addFriendToGroupCallback: (friend: User, add: boolean) => void
}): JSX.Element {

    const [cardArray, setCardArray] = useState<JSX.Element[]>([]);

    useEffect(() => {
        // Create the array of cards for each message. Awaits for the request to finish before setting the card array, which triggers a render
        async function populateCardArray() {
            // Clear out old group messages
            let newCardArray = [] as JSX.Element[]

            await getFriendsList(props.userID).then(list => {
                for (let friend of list)
                    singleCardGenerator(friend, props.addFriendToGroupCallback).then(card => newCardArray.push(card));
            });

            setCardArray([...newCardArray]);
        }
        setTimeout(populateCardArray, 500); // Timeout to let the backend update first
    }, [props.userID, props.addFriendToGroupCallback]);

    if (cardArray.length < 1) {
        return (<p>You have no friends.</p>);
    }
    else return (
    <div style={{margin: "3% 2% 3% 2%", paddingTop: "2%", overflow:"auto", maxHeight:"100%"}}>
        {cardArray}
    </div>);
}

function singleCardGenerator(friend: User, addFriendToGroupCallback: (friend: User, add: boolean) => void): Promise<JSX.Element> {
    return new Promise((resolve, reject) => {
        resolve(
            <Box
                sx={{
                    width: '80%',
                    maxWidth: '90%',
                    display: 'flex',
                    marginBottom: '2%',
                    textAlign: 'left'
                }}
            >
                <Checkbox style={{color: "white"}} onChange={(e, checked) => addFriendToGroupCallback(friend, checked)} />
                <img id='123' src={friend.profilePicPath} alt="Profile" style={{maxWidth: '20%', marginLeft: '3%'}} />
                <div 
                    style={{
                        flex: '0 1 auto',
                        alignItems: 'flex-start',
                        justifyContent: 'flex-start',
                        alignSelf: 'flex-start',
                        marginLeft: '5%'
                    }}
                >
                    <p>{friend.username}</p>
                </div>
            </Box>
        );
    });
}

function getFriendsList(userID: string): Promise<User[]> {
    return new Promise((resolve, reject) => {
        axios.get(`http://localhost:5000/sources/getFriends/${userID}`).then(response => {
            let arrayOfFriends = [] as User[];

            for (let friendship of response.data)
                arrayOfFriends.push(getFriendObject(userID, friendship));

            resolve(arrayOfFriends);
        }).catch(err => reject(err));
    });
}

// Returns the "other person" in the friendship
function getFriendObject(currentUserID: string, friendship: Friendship): User {
    if (friendship.fromUser.userID === currentUserID)
        return friendship.toUser;
    else return friendship.fromUser;
}