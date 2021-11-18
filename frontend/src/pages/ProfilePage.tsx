import React, { useContext, useEffect, useState } from 'react';
import { Redirect, useParams } from 'react-router';
import { Route, Switch } from 'react-router-dom';
import { BrowserRouter} from 'react-router-dom';
import { RouteChildrenProps } from 'react-router';
import { COLORS } from '../commons/constants';
import { User } from '../commons/interfaces';
import { GlobalContext } from "../context/GlobalState";
import "./ProfilePage.css";
import BOL from '../images/BOL_light.png' //dimensions are 1280*511, keep logo in this aspect ratio
import profileIcon from '../images/homepage-profile-icon-white.png'
import Axios from 'axios';

interface RouteParams {
    //id from link that was passed by router
    googleID: string
}

interface ProfilepageProps{
    match: any,
    hasID: boolean
}

export function ProfilePage (props: ProfilepageProps, param: RouteParams){
    const {OAuthResponse} = useContext(GlobalContext);

    //image url from database
    let [imageUrl, setImageUrl] = useState<string>("" as string);

    //google id of person viewing page
    let [newGoogleID, setnewGoogleID] = useState<string>("" as string);

    //name of person on profile
    let [name, setName] = useState<string>("" as string);

    //nameof person viewing the page
    let [username, setUsername] = useState<string>("" as string);

    //google id of person on page
    let [profileID, setProfileID] = useState<string>("" as string);

    useEffect(() => {
        setImageUrl("not found");
        setnewGoogleID(OAuthResponse.profileObj.googleId);
        setUsername((OAuthResponse.profileObj.email).split("@")[0]);
        let s = 'http://localhost:5000/sources/getUserByUsername/' + props.match.params.googleID;
        Axios.get(s).then(response => {
            let userObj = response.data as User;
            setImageUrl(userObj.profilePicPath)
            setName(userObj.username)
            setProfileID(userObj.userID)
        }).catch(err => {
            //console.log("Reached error block");
            //console.error(err);
            setImageUrl("Error")
            return <Redirect to={{pathname: "/profile/"+username}} />;
        }
        );
    }, [OAuthResponse]);

    // console.log(props.match.params.googleID);
    // console.log("Reached redirect statement 1");
    // console.log(OAuthResponse.profileObj.googleId);
    // console.log(newGoogleID);

    console.log(imageUrl);
    if (imageUrl === "Error")
    {
        //return (<BrowserRouter path="/profile" render={(props) =>  <ProfilePage {...props} hasID={false} /> } /> );
        //console.log(imageUrl);
        
        //return (<BrowserRouter> <Redirect to ={"/profile/" + username} /> </BrowserRouter>);
        return(
        <div className="profileContainer">
            <div className="profileBox">
                <div className="profileSpace_top"></div>
                <div className="profilelogoContainer" >
                    <img src={BOL} alt= 'BOL logo' width = "360" height = "153.3"/>
                </div>
                <div className="profile_space_Between_Logo_and_UserProfile">
                    <p><b>User not found</b></p>
                </div>
                {/* <div className="profileSpaceSmall"></div> */}
                <div className="profilelogoContainer" style={{color: COLORS.FULL_WHITE}}>
                    <img id='123' src= {profileIcon} alt = "Profile Picture" width = "250" />
                </div>
                {/* <div className="profileBreak"> */}
                    {/* <p> {name} </p> */}
                {/* </div> */}
                {/* <div className="profileSpace_middle"></div> */}
                {/* <div className="profileBreak"> */}
                    {/* <p> Hi! I am {(props.match!.params as RouteParams).googleID} and I love BOL! </p> */}
                    {/* <p> Hi! I am {name} and I love BOL! </p> */}
                {/* </div> */}
                <div className="profile_space_Between_Logo_and_UserProfile"></div>
                <div className="profilefriendButton">
                <span style={{color:"#ffffff"}} >Home </span>
                </div>
                <div className="profileSpaceSmall"></div>
                <div className="profilefriendButton">
                <span style={{color:"#ffffff"}} >My Profile </span>
                </div>
            </div>
        </div>
        );

    }

    console.log(name);

    if (!props.hasID)
    {
        //console.log("Reached redirect statement 2");
        console.log(name);
        //return (<BrowserRouter> <Redirect to ={"/profile/" + username} /> </BrowserRouter>);
        
        return (
            <BrowserRouter>
                {/* <Switch> */}
                <Redirect to={{pathname: "/profile/"+username}} />
                {/* </Switch> */}
            </BrowserRouter>
        )
    }

    document.body.style.background = COLORS.BACKGROUND3;

    if(newGoogleID != profileID)
    {
        return (
            <div className="profileContainer">
                <div className="profileBox">
                    <div className="profileSpace_top"></div>
                    <div className="profilelogoContainer" >
                        <img src={BOL} alt= 'BOL logo' width = "360" height = "153.3"/>
                    </div>
                    <div className="profile_space_Between_Logo_and_UserProfile">
                        <p><b>User Profile</b></p>
                    </div>
                    <div className="profileSpaceSmall"></div>
                    <div className="profilelogoContainer" style={{color: COLORS.FULL_WHITE}}>
                        <img id='123' src= {imageUrl} alt = "Profile Picture" width = "150" height = "150" />
                    </div>
                    <div className="profileBreak">
                        <p> {name} </p>
                    </div>
                    <div className="profileSpace_middle"></div>
                    <div className="profileBreak">
                        {/* <p> Hi! I am {(props.match!.params as RouteParams).googleID} and I love BOL! </p> */}
                        <p> Hi! I am {name} and I love BOL! </p>
                    </div>
                    <div className="profileSpace_bottom"></div>
                    <div className="profilefriendButton">
                    <span style={{color:"#ffffff"}} >Add Friend </span>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="profileContainer">
            <div className="profileBox">
                <div className="profileSpace_top"></div>
                <div className="profilelogoContainer" >
                    <img src={BOL} alt= 'BOL logo' width = "360" height = "153.3"/>
                </div>
                <div className="profile_space_Between_Logo_and_UserProfile">
                    <p><b>User Profile</b></p>
                </div>
                <div className="profileSpaceSmall"></div>
                <div className="profilelogoContainer" style={{color: COLORS.FULL_WHITE}}>
                    <img id='123' src= {imageUrl} alt = "Profile Picture" width = "150" height = "150" />
                </div>
                <div className="profileBreak">
                    <p> {name} </p>
                </div>
                <div className="profileSpace_middle"></div>
                <div className="profileBreak">
                    {/* <p> Hi! I am {(props.match!.params as RouteParams).googleID} and I love BOL! </p> */}
                    <p> Hi! I am {name} and I love BOL! </p>
                </div>
                <div className="profileSpace_bottom"></div>
                <div className="profilefriendButton">
                <span style={{color:"#ffffff"}} >Home </span>
                </div>
            </div>
        </div>
    );
}

export default ProfilePage;