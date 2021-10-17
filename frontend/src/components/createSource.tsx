import axios from 'axios';
import React, { useState } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';

import { SubProps } from './utils';

export default function CreateSource(props: SubProps) {
    const [name, setName] = useState("");
    const [organization, setOrganization] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [remarks, setRemarks] = useState("");

    let classesFromParent = props.className as string;

    // POSTs the source data to backend
    function submit() {
        axios.post("http://localhost:5000/sources/create/", {
            name: name,
            organization: organization,
            phone: phone,
            email: email,
            remarks: remarks
        }).then(response => {
            console.log(response);
            console.log(`Your new source has been added with ID ${response.data.id}`);
        }).catch(err => {
            alert(err);
        });
    }

    // Render input form
    return (
        <Row className={`${classesFromParent} align-items-center center-align-children full-width`}>
            <Form className="center-align-children full-width">
                <Form.Group>
                    <h2>Basic Information</h2>
                    <Form.Row className="mb-5">
                        <Form.Group as={Col}>
                            <Form.Label>Name *</Form.Label>
                            <Form.Control type="text" placeholder="e.g. Gojo Satoru" onChange={(e) => setName(e.target.value)} />
                        </Form.Group>

                        <Form.Group as={Col}>
                            <Form.Label>Organization *</Form.Label>
                            <Form.Control type="text" placeholder="e.g. Jujutsu Kousen" onChange={(e) => setOrganization(e.target.value)} />
                        </Form.Group>

                        <Form.Group as={Col}>
                            <Form.Label>Phone</Form.Label>
                            <Form.Control type="text" placeholder="e.g. +1 123 456 7890" onChange={(e) => setPhone(e.target.value)} />
                        </Form.Group>

                        <Form.Group as={Col}>
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="e.g. abc@example.com" onChange={(e) => setEmail(e.target.value)} />
                        </Form.Group>
                    </Form.Row>
                </Form.Group>

                <Form.Group>
                    <h2>Additional Information</h2>
                    <Form.Row className="mb-5">
                        <Form.Group as={Col}>
                            <Form.Control as="textarea" id="remarks-input" placeholder="Remarks" onChange={(e) => setRemarks(e.target.value)} />
                        </Form.Group>
                    </Form.Row>
                </Form.Group>

                <div className="text-center">
                    <Button variant="dark" size="lg" type="submit" onClick={submit}>
                        Add Source
                    </Button>
                </div>
            </Form>
        </Row>
    );
}