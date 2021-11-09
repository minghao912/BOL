export interface Message {
    messageID: string,  
    group: string,      // Group ID
    sender: string,     // Google ID
    timestamp: string,  // Date in ISO format
    content: string     // Actual content
}

export interface MessageList {
    messages: Message[]
}

export interface GroupList {
    groups: Group[]
}

export interface User {
    id: string,                 // Google ID
    friendList: string[],       // List of Google IDs
    groupsList: string[]        // List of group IDs
}

export interface Group {
    memberIDs: string[]         // Array of Google IDs
    messageIDs: string[]        // Array of message IDs
}

export interface NewGroup {
    userIDs: string[]
}

export interface UpdateGroup {
    groupID: string,
    userIDs: string[]
}

export interface Friendship {
    fromUser: User,
    toUser: User
}