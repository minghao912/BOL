import React, { useContext, useEffect, useState } from 'react';
import { Redirect, useParams } from 'react-router';
import { RouteChildrenProps } from 'react-router';
import { COLORS } from '../commons/constants';
import { User } from '../commons/interfaces';
import { GlobalContext } from "../context/GlobalState";
import "./EditProfilePage.css";
import BOL from '../images/BOL_light.png' //dimensions are 1280*511, keep logo in this aspect ratio
import axios from 'axios';
import { useHistory } from "react-router-dom";

export function EditProfilePage (){
    const {OAuthResponse} = useContext(GlobalContext);
    let [id, setId] = useState<string>("" as string);
    let [userId, setUserId] = useState<string>("" as string);
    let [name, setName] = useState<string>("" as string);
    let [bio, setBio] = useState<string>("" as string);
    let [pfp, setPfp] = useState<string>("" as string);

    let [new_name, setNewName] = useState<string>("" as string);
    let [new_bio, setNewBio] = useState<string>("" as string);
    let [showResults, setShowResults] = useState<boolean>(true);

    //console.log(OAuthResponse);
    const google_id: string = OAuthResponse.profileObj.googleId;
    const imageUrl:  string = OAuthResponse.profileObj.imageUrl;
    //console.log(new_bio);
    //console.log(new_name);


    axios.get('http://localhost:5000/sources/getUser/' + google_id).then(response => {
        let userObj = response.data as User;
        setId(userObj.id);
        setUserId(userObj.userID);
        setName(userObj.username);
        setBio(userObj.bio);
        setPfp(userObj.profilePicPath);
        
    }).catch(err => {
        console.log(err);
    }
    );

    
    //console.log(name);
    //console.log(bio);

    const history = useHistory();
    
    const routeChange = () =>{ 
        let path = "/home"; 
        history.push(path);
    }


    function saveChanges(){
        console.log("save changes clicked");
        axios.put('http://localhost:5000/sources/updateUser/' + google_id, {
            id: id,
            profilePicPath: pfp,
            userID: userId,
            username: new_name,
            bio: new_bio
        } as User).then(response => {
            console.log(response)
        }).catch(err => console.error(err));
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
                    <p><b>Edit Profile</b></p>
                </div>

                <div className="profilelogoContainer" style={{color: COLORS.FULL_WHITE}}>
                    <img id='123' src= {imageUrl} alt = "Profile Picture" width = "125" height = "125" />
                </div>

                <input type="text" id="message-box" value={new_name} 
                    className="username-change-bar" autoComplete="off"
                    placeholder="Enter a username here"
                    onChange={(e) => setNewName(e.target.value)}
                />

                <textarea rows={3} id="message-box" value={new_bio} 
                    className="bio-change-bar" autoComplete="off"
                    placeholder="Enter your bio here"
                    onChange={(e) => setNewBio(e.target.value)}
                ></textarea>

                <div className="profilefriendButton" onClick = {saveChanges} >
                    <span style={{color:"#ffffff"}} >Save Changes </span>
                </div>
            </div>
        </div>
    );
}

export default EditProfilePage;