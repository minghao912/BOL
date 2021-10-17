import React from 'react';

import GetAllSources from './getAllSources';
import CreateSoure from './createSource';
import UpdateSource from './updateSource';
import DeleteSource from './deleteSource';
import { MainProps, PagesToLoad } from './utils';

export default function Main(props: MainProps) {
    const pageToLoad = props.toLoad as PagesToLoad;
    const classesFromParent = props.className as string;

    console.log("Reloading, page to load is now " + pageToLoad);

    // ALL_SOURCES: 1, ADD_SOURCE: 2, EDIT_SOURCE: 3, DELETE_SOURCE: 4
    let page: JSX.Element;
    
    switch (pageToLoad) {
        case PagesToLoad.NONE:
            page = <p>Click the button</p>;
            break;
        case PagesToLoad.ALL_SOURCES:
            page = <GetAllSources className={classesFromParent} renderSpecialPage={props.renderSpecialPage} />;
            break;
        case PagesToLoad.ADD_SOURCE:
            page = <CreateSoure className={classesFromParent}/>;
            break;
        case PagesToLoad.EDIT_SOURCE:
            page = <UpdateSource className={classesFromParent} sourceToEdit={props.sourceToEdit} />;
            break;
        case PagesToLoad.DELETE_SOURCE:
            page = <DeleteSource className={classesFromParent} sourceToEdit={props.sourceToEdit} />;
            break;
        default:
            page = <p>Invalid page to load.</p>;
    }

    return page;
}