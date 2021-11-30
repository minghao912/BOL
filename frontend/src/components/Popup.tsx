import './Popup.css'
import { TextField } from '@mui/material';

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
            <div  className="text">
                <TextField
                id="first-name"
                label="User Bio"
                margin= "normal"
                // value={this.state.name}
                // onChange={this.handleChange('name')}
                />
            </div>
            <div className="submit" onClick = {() => props.setTrigger(false)}>
            <span style={{color:"#ffffff"}} > Submit </span>
            </div>
        </div>
    ) : <></>;
}

export default Popup