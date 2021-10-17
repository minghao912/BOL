import axios from 'axios';
import React, { useState } from 'react';

// NOT USED
export default function GetSource(props: any) { //: JSON {
    const [id, setID] = useState(NaN);
    const [name, setName] = useState("");
    const [organization, setOrganization] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [remarks, setRemarks] = useState("");

    function get() {
        axios.get(`http://localhost:5000/sources/get/${id}`).then(response => {
            setName(response.data.name);
            setOrganization(response.data.organization);
            setPhone(response.data.phone);
            setEmail(response.data.email);
            setRemarks(response.data.remarks);
        }).catch(err => alert(err));
    }

    return (
        <div>
            <label>ID: </label>  <input onChange={(e) => setID(parseInt(e.target.value))} />
            <button onClick={get}>Get</button>
            <br />
            <p>Your source with ID {isNaN(id) ? "" : id}:</p>
            <p>Name: {name}</p>
            <p>Organization: {organization}</p>
            <p>Phone: {phone}</p>
            <p>Email: {email}</p>
            <p>Remarks: {remarks}</p>
        </div>
    );
}