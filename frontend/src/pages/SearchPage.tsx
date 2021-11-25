import React, { useContext, useEffect, useState } from 'react';
import { Redirect, useParams } from 'react-router';
import { RouteChildrenProps } from 'react-router';
import { COLORS } from '../commons/constants';
import { GlobalContext } from "../context/GlobalState";
import "./ProfilePage.css";
import BOL from '../images/BOL_light.png' //dimensions are 1280*511, keep logo in this aspect ratio
import axios from 'axios';

export function SearchPage (){
    const {OAuthResponse} = useContext(GlobalContext);
    let [name, setName] = useState<string>("" as string);
    
    function getUsers() {
        axios.get(`http://localhost:5000/sources/searchUsers/${name}`).then(response => {
            console.log(response)
        }).catch(err => console.error(err));
    }

    function handleEnterPress(e: React.KeyboardEvent) {
        if(e.key === 'Enter'){
            getUsers()
        }
    }

    return (
        <div className="profileContainer">
            <div className="profileBox"> 
                <div className="profileSpace_top"></div>
                <div className="profilelogoContainer" > 
                    <img src={BOL} alt= 'BOL logo' width = "360" height = "153.3"/>
                </div>
                <div className="profile_space_Between_Logo_and_UserProfile">
                    <p><b>User Search</b></p>
                </div>
                <div className="sub-container" style={{backgroundColor:"gray", padding: "10px"}}>
                <input id="message-box" 
                    style={{width: '80%', height:'25px', marginLeft:'40px', marginRight:'40px'}}
                    onChange={(e) => setName(e.target.value)} onKeyDown={handleEnterPress}
                />
                </div>
            </div>
        </div>
    );
}

export default SearchPage;