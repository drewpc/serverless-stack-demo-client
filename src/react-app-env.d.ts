/// <reference types="react-scripts" />

interface ApiNote {
    attachment?: string,
    content: string,
    createdAt: number,
    noteId: string,
    userId: string,
}

interface UxNote extends ApiNote {
    _visible: boolean,
}
