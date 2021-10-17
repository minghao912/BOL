export interface Source {
    "id": number,
    "name": string,
    "organization": string,
    "phone": string,
    "email": string,
    "remarks": string
}

export enum PagesToLoad {
    NONE = 0,
    ALL_SOURCES = 1, 
    ADD_SOURCE = 2, 
    EDIT_SOURCE = 3,
    DELETE_SOURCE = 4
}

export interface MainProps {
    "toLoad": PagesToLoad,
    "className": string,
    "sourceToEdit": number,
    "renderSpecialPage": (page: PagesToLoad, sourceID: number) => void
}

export interface SubProps {
    "className": string,
    "renderSpecialPage"?: (page: number, sourceID: number) => void
}

export interface UpdateProps {
    "className": string,
    "sourceToEdit": number
}