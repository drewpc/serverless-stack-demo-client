import { API } from "aws-amplify";

export function deleteNote(id: string) {
    return API.del("notes", `/notes/${id}`, null);
}

export function loadNote(id: string) {
    return API.get("notes", `/notes/${id}`, null);
}

export function loadNotes() {
    return API.get("notes", "/notes", null);
}

export function saveNote(note: ApiNote) {
    return API.put("notes", `/notes/${note.noteId}`, {
        body: note
    });
}