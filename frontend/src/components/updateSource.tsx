import axios from 'axios';

import React, { useEffect, useState } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';

import { Source, UpdateProps } from './utils';

export default function UpdateSource(props: UpdateProps): JSX.Element {
    const sourceToEdit = props.sourceToEdit as number;
    const classesFromParent = props.className as string;

    const [source, setSource] = useState<Source>({} as Source);
    const [name, setName] = useState("");
    const [organization, setOrganization] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [remarks, setRemarks] = useState("");

    // Automatically get source information
    useEffect(() => {
        get(sourceToEdit);
    }, []);

    // Gets source to prepopulate values
    function get(id: number) {
        axios.get(`http://localhost:5000/sources/get/${id}`).then(response => {
            setData(response.data as Source);
        }).catch(err => {
            alert(err);
            throw(err);
        });
    }

    // Prepopulates form
    function prepopulate(info: string[]) {
        // Get all the fields in the form
        let formFields: HTMLInputElement[] = [];
        const form = document.querySelector("#input-form");
        form!.querySelectorAll(".form-control").forEach(e => formFields.push(e as HTMLInputElement));
        
        // Set their value
        for (const i in formFields) {
            formFields[i].value = info[i];
        }
    }

    // No source with ID found
    if (source === undefined)
        return <></>;

    function setData(s: Source) {
        let info = [s.name, s.organization, s.phone, s.email, s.remarks];
        setSource(s);
        setName(s.name);
        setOrganization(s.organization);
        setPhone(s.phone);
        setEmail(s.email);
        setRemarks(s.remarks);

        // Prepopulate form with the above info
        prepopulate(info); 
    }

    function submit() {
        console.log("Email is " + email);

        axios.put(`http://localhost:5000/sources/update/${source.id}`, {
            name: name,
            organization: organization,
            phone: phone,
            email: email,
            remarks: remarks
        }).then(response => {
            console.log(response);
            console.log(`Your new source has been updated with ID ${response.data.id}`);

            window.location.href = "/"; // Redirect to home page
        }).catch(err => {
            console.log(err);
        });
    }

    // Render input form
    return (
        <Row className={`${classesFromParent} align-items-center center-align-children full-width`}>
            <Form className="center-align-children full-width" id="input-form">
                <Form.Group>
                    <h2>Basic Information</h2>
                    <Form.Row className="mb-5">
                        <Form.Group as={Col}>
                            <Form.Label>Name *</Form.Label>
                            <Form.Control type="text" name="name" onChange={e => setName(e.target.value)} />
                        </Form.Group>

                        <Form.Group as={Col}>
                            <Form.Label>Organization *</Form.Label>
                            <Form.Control type="text" name="organization" onChange={e => setOrganization(e.target.value)} />
                        </Form.Group>

                        <Form.Group as={Col}>
                            <Form.Label>Phone</Form.Label>
                            <Form.Control type="text" name="phone" onChange={e => setPhone(e.target.value)} />
                        </Form.Group>

                        <Form.Group as={Col}>
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" name="email" onChange={e => setEmail(e.target.value)} />
                        </Form.Group>
                    </Form.Row>
                </Form.Group>

                <Form.Group>
                    <h2>Additional Information</h2>
                    <Form.Row className="mb-5">
                        <Form.Group as={Col}>
                            <Form.Control as="textarea" name="remarks" id="remarks-input" onChange={e => setRemarks(e.target.value)} />
                        </Form.Group>
                    </Form.Row>
                </Form.Group>

                <div className="text-center">
                    <Button variant="dark" size="lg" onClick={submit}>
                        Update Source
                    </Button>
                </div>
            </Form>
        </Row>
    );
}