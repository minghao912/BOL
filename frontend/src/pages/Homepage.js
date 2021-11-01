import 'bootstrap/dist/css/bootstrap.css';
import './Homepage.css';

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faUserFriends } from '@fortawesome/free-solid-svg-icons';

import Main from '../components/main.tsx';

function Homepage(props) {

    // ALL_SOURCES: 1, ADD_SOURCE: 2, EDIT_SOURCE: 3, DELETE_SOURCE: 4
    let [pageToLoad, setPageToLoad] = useState(1);  // Automatically start with all sources loaded
    let [sourceToEdit, setSourceToEdit] = useState(-1);

    // Gets rid of previous screen and renders the proper screen
    function renderPage() {
        switch (pageToLoad) {
        case 1:
            setPageToLoad(2);
            break;
        case 2:
            setPageToLoad(1);
            break;
        case 3:
            setPageToLoad(1);
            break;
        default:
            setPageToLoad(1);   // This shouldn't happen
            break;
        }
    }

    // Renders the edit page
    function renderSpecialPage(page, sourceID) {
        setSourceToEdit(sourceID);
        setPageToLoad(page);
    }

    // Get correct icon type
    function getIconType() {
        switch (pageToLoad) {
        case 1:
            return faPlus;
        case 2:
            return faUserFriends;
        case 3:
            return faUserFriends;
        default:
            return faUserFriends;   // This shouldn't happen
        }
    }

    return (<Container style={{alignContent: "center"}}>
        <header className={"text-center mt-4 mb-3"}>
            <h1>Sources</h1>
        </header>
        <Link to="/profile/minghao912">test</Link>
        <Button className={"float-bottom-right pointer-hover"} onClick={renderPage}>
            <FontAwesomeIcon icon={getIconType()} size={"2x"} className={"centered-item"} />
        </Button>
        <Main className="first-item-below-header" toLoad={pageToLoad} sourceToEdit={sourceToEdit} renderSpecialPage={(page, sourceID) => renderSpecialPage(page, sourceID)} />
    </Container>);
}

export default Homepage;