import axios from 'axios';

import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

import { Source, UpdateProps } from './utils';

export default function DeleteSource(props: UpdateProps): JSX.Element {
    const classesFromParent = props.className as string;
    const sourceToDelete = props.sourceToEdit as number;

    const [source, setSource] = useState<Source>({} as Source);

    // Automatically get source information
    useEffect(() => {
        try {
            get(sourceToDelete);
        } catch(err) {}
    }, []);

    function get(id: number) {
        axios.get(`http://localhost:5000/sources/get/${id}`).then(response => {
            setSource(response.data as Source);
        }).catch(err => alert(err));
    }

    function submit() {
        axios.delete(`http://localhost:5000/sources/delete/${sourceToDelete}`).then(response => {
            console.log(`Your source with id ${sourceToDelete} has been deleted`);
            returnHome();
        })
    }

    function returnHome() {
        window.location.href = "/";
    }

    return (
        <Container className={classesFromParent}>
            <Row className="justify-content-md-center my-3">
                <Card style={{width: "100%"}}>
                    <Card.Header>
                        <Card.Title className="source-card-title">
                                <h2>{source.name}</h2>
                        </Card.Title>
                    </Card.Header>
                    <Card.Body style={{alignContent: "center"}}>
                        <p>Organization: {source.organization}</p>
                        <p>Email: {source.email}</p>
                        <p>Phone: {source.phone}</p>
                        <p>{source.remarks}</p>
                    </Card.Body>
                </Card>
            </Row>
            <Row className="mt-5 align-items-center center-align-children full-width">
                <Col style={{"textAlign": "center"}}>
                    <h3>Are you sure you want to delete this source?</h3>
                </Col>
            </Row>
            <Row className="mt-2 align-items-center center-align-children full-width">
                <Col style={{"textAlign": "center"}}>
                    <Button variant="danger" size="lg" style={{"width": "40%"}} onClick={submit}>
                            Delete Source
                    </Button>
                </Col>
                <Col style={{"textAlign": "center"}}>
                    <Button variant="success" size="lg" style={{"width": "40%"}} onClick={returnHome}>
                            Cancel
                    </Button>
                </Col>
            </Row>
        </Container>
    );
}