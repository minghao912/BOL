export interface Message {
    messageID: string,  
    group: Group,       // Group object
    sender: User,       // User object
    timestamp: string,  // Date in ISO format
    content: string     // Actual content
}

export interface MessageToSendBack {
    messageID: string,  
    groupID: string,    // group ID
    userID: string,     // google ID
    timestamp: string,  // Date in ISO format
    content: string     // Actual content
}

export type MessageList = Message[];

export type GroupList = Group[];

export interface User {
    id: string,
    profilePicPath: string,
    userID: string,
    username: string
}

export interface Group {
    groupID: string,
    users: User[]              // Array of users in the group
}

export interface NewGroup {
    userIDs: string[]
}

export interface UpdateGroup {
    groupID: string,
    userIDs: string[]
}

export interface Friendship {
    id: string,         // database id, don't use
    fromUser: User,
    toUser: User
}

export interface EmojiReaction {
    messageID: string,
    emojiReactionID: string,
    sender: string,
    timestamp: string,
    emoji: string
}