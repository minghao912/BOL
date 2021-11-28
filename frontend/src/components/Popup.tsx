import React, { Component } from "react";
import './Popup.css'

interface PopupProps{
    trigger: boolean
    children: any
    setTrigger: any
}

export function Popup(props: PopupProps){
    return (props.trigger) ? (
        <div className="popup">
            <div className="close" onClick = {() => props.setTrigger(false)}>
            <span style={{color:"#ffffff"}} > x </span>
            </div>
            <div className="popupText">
            <span style={{color:"#ffffff"}} > Enter new Bio: </span>
            </div>
        </div>
    ) : <></>;
}

export default Popup