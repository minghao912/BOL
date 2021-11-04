export interface GroupID {
    id: string
}

export interface UserID {
    id: string
}

export interface MessageID {
    id: string
}

export interface Message {
    messageID: string,
    sender: string,
    timestamp: string,
    content: string
}

export interface MessageList {
    messages: Message[]
}

export interface UserInfo {
    groups: GroupID[],
    user: User
}

export interface User {
    id: UserID,
    profilePicPath: string,
    username: string
}

export interface Group {
    members: UserID[],
    messages: MessageID[]
}