import React, { useContext, useEffect, useState } from 'react';
import { Redirect, useParams } from 'react-router';
import { RouteChildrenProps } from 'react-router';
import { COLORS } from '../commons/constants';
import { User } from '../commons/interfaces';
import { GlobalContext } from "../context/GlobalState";
import "./SearchPage.css";
import BOL from '../images/BOL_light.png' //dimensions are 1280*511, keep logo in this aspect ratio
import axios from 'axios';
import { useHistory } from "react-router-dom";

export function SearchPage (){
    const {OAuthResponse} = useContext(GlobalContext);
    let [name, setName] = useState<string>("" as string);
    let [showResults, setShowResults] = useState<boolean>(true);
    let [username, setUsername] = useState<string>("" as string);

    useEffect(() => {
        setUsername((OAuthResponse.profileObj.email).split("@")[0]);
    }, [OAuthResponse]);

    function handleEnterPress(e: React.KeyboardEvent) {
        if(e.key === 'Enter'){
            //GenerateResults();
            setShowResults(true);
        }
    }

    const history = useHistory();
    
    const routeChange = () =>{ 
        let path = "/home"; 
        history.push(path);
    }

    const routeChangeProfile = () =>{ 
        let path = "/profile/"+username; 
        history.push(path);
        history.go(0);
    }

    return (
        <div className="profileContainer">
            <div className="profileBox"> 
                <div className="homeButton" style={{float:"left"}} onClick = {routeChange} >
                    <span style={{color:"#ffffff"}} > Home </span>
                </div>
                <div className="profileSpace_top"></div>
                <div className="profilelogoContainer" > 
                    <img src={BOL} alt= 'BOL logo' width = "360" height = "153.3"/>
                </div>
                <div className="profile_space_Between_Logo_and_UserProfile">
                    <p><b>User Search</b></p>
                </div>
                <div className="sub-container" style={{backgroundColor:"silver", padding: "10px"}}>
                <input type="text" id="message-box" className="user-search-bar" autoComplete="off"
                    placeholder="Enter a username here"
                    onChange={(e) => setName(e.target.value)} onKeyDown={handleEnterPress}
                />
                </div>
                <div style={{margin: "2% 2% 2% 2%"}}>
                    {showResults ? <GenerateResults nameToSearch={name} /> : <></>}
                </div>
                <div className="profileSearchButton" onClick = {routeChangeProfile}>
                            <span style={{color:"#ffffff"}} > Back to Profile </span>
                </div>
            </div>
        </div>
    );
}

function GenerateResults(props: {nameToSearch: string}): JSX.Element {
    const [user_elements, set_user_elements] = useState<JSX.Element[]>([] as JSX.Element[]);

    // Only make background request and update if the nameToSearch changes
    useEffect(() => {
        // get a list of matching users to the search query
        getUsers(props.nameToSearch).then(user_list => {
            if (user_list.length < 1)
                set_user_elements([]);

            let new_user_elements: JSX.Element[] = [];
            // for each matching user, create an HTML entry and store it in an array
            for (var i = 0; i < user_list.length; i++){
                let cur_user = createEntry(user_list[i])
                new_user_elements.push(cur_user)
            }

            set_user_elements([...new_user_elements]);
        }).catch(err => {console.error(err); set_user_elements([])});
    }, [props.nameToSearch])

    // if that array is empty, we know there is no match
    if (props.nameToSearch == "")
        return (<div></div>);

    // otherwise render the list of elemments
    if (user_elements.length != 0){
        return (<div style={{margin: "3% 2% 3% 2%", overflow:"auto", maxHeight:"100%"}}> 
            {user_elements};
            </div>);
    }
    else {
        return (<div style={{textAlign: "center"}}> 
            <b> <h3 style={{fontFamily: "monospace", color: "white"}}>no user matches :(</h3> </b>
            </div>);
    }
}

// search for matching users
function getUsers(name: string): Promise<User[]> {
    return new Promise((resolve, reject) => {
        // If the user doesn't have a search, don't make the request
        if (name == "")
            resolve([]);
        else {  // Actually make the request
            axios.get(`http://localhost:5000/sources/searchUsers/${name}`).then(response => {
                resolve(response.data as User[]);
            }).catch(err => {console.error(err); reject([])});
        }
    });
}

// create HTML description for each matched user
// this contains the matched user's username and their profile link
function createEntry(match: User){
    let u_username : string;
    let u_userID: string;
    let u_userpic: string;
    let u_profile: string;
    u_username = match.username;
    u_userID = match.userID;
    u_userpic = match.profilePicPath;
    u_profile = "/profile/" + u_username;
    return (
        <div className="user-search-entry">
            <div className="user-search-image">
                <img src={u_userpic} alt ="Profile Picture" width = "40" height = "40"/>
            </div>
            <div className="user-search-name" >
                <span> {u_username} </span>
            </div>
            <div className="user-search-profile" >
                <a href={u_profile}> Profile </a>
            </div>
            
        </div>
    );
}

export default SearchPage;