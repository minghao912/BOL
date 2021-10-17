import axios from 'axios';

import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

import { Source, SubProps, PagesToLoad } from './utils';

export default function GetAllSources(props: SubProps) {
    let [data, setData] = useState<Source[]>([] as Source[]);
    let classesFromParent = props.className as string;

    useEffect(() => {
        axios.get(`http://localhost:5000/sources/get/all`).then(response => {
            setData(response.data as Source[]);
            
            console.log("Got all sources:\n" + JSON.stringify(data));
        }).catch(err => alert(err));
    }, []);

    return (
        <Container className={`${classesFromParent} justify-content-md-center`}>
            <Row className="justify-content-md-center my-3">
                <Col className="col-mx-4" id="source-cards">
                    <GetCardsForAllSources sources={data} renderSpecialPage={props.renderSpecialPage} />
                </Col>
            </Row>
        </Container>
    )
}

// Takes a bunch of sources and generates a bunch of cards
function GetCardsForAllSources(props: any): JSX.Element {
    let sourceData = props.sources as Source[];
    let cardHTML: JSX.Element[] = [];

    if (sourceData.length === 0)
        return <></>;

    for (const s of sourceData) {
        cardHTML.push(getCardFromSource(s, props.renderSpecialPage));
    }

    return (<div>
        {cardHTML}
    </div>)
}

// Generates one card for a source, also passes the special callback function
function getCardFromSource(source: Source, renderSpecialPage: (page: PagesToLoad, sourceID: number) => void): JSX.Element {
    console.log("Creating card for source " + source.id);

    return (<Row className={`row my-3`} id={`card-source-${source.id}`}>
        <Card style={{width: "100%"}}>
            <Card.Header>
                <Card.Title className="source-card-title">
                    <Row>
                        <Col>
                            <h2>{source.name}</h2>
                        </Col>
                        <Col style={{"textAlign": "right"}}>
                            <Button variant="light" id={`edit-button-${source.id}`} className={"float-edit-button pointer-hover"} onClick={(e) => renderEditScreen(e, renderSpecialPage)}>
                                <FontAwesomeIcon icon={faEdit} size={"1x"} className={"centered-item"} />
                            </Button>
                            <Button variant="light" id={`trash-button-${source.id}`} className={"float-edit-button pointer-hover"} onClick={(e) => renderTrashScreen(e, renderSpecialPage)}>
                                <FontAwesomeIcon icon={faTrash} size={"1x"} className={"centered-item"} />
                            </Button>
                        </Col>
                    </Row>
                </Card.Title>
            </Card.Header>
            <Card.Body style={{alignContent: "center"}}>
                <p>Organization: {source.organization}</p>
                <p>Email: {source.email}</p>
                <p>Phone: {source.phone}</p>
                {getRemarksSection(source)}
            </Card.Body>
        </Card>
    </Row>)
}

// Determines if a source has its "Remarks" section empty
function getRemarksSection(s: Source): JSX.Element {
    if (s.remarks === "")
        return <></>;   // Return empty
    else return <p className="mt-4">{s.remarks}</p>
}

// Renders the edit screen by calling setNewPageToLoad() which is passed down from the parents
function renderEditScreen(e: React.MouseEvent, renderSpecialPage: (page: PagesToLoad, sourceID: number) => void): void {
    let buttonID = parseInt(e.currentTarget.id.substr(e.currentTarget.id.lastIndexOf('-') + 1));
    renderSpecialPage(PagesToLoad.EDIT_SOURCE, buttonID);
}

// Renders the trash screen by calling setNewPageToLoad() which is passed down from the parents
function renderTrashScreen(e: React.MouseEvent, renderSpecialPage: (page: PagesToLoad, sourceID: number) => void): void {
    let buttonID = parseInt(e.currentTarget.id.substr(e.currentTarget.id.lastIndexOf('-') + 1));
    renderSpecialPage(PagesToLoad.DELETE_SOURCE, buttonID);
}