import { collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import { addNewEmptyNode, savingNewNote, setActiveNode, setNotes, setSaving, updateNote, setPhotosToActiveNote, deleteNoteById } from "./journalSlice";
import { fileUpload, loadNotes } from "../../helpers";

export const startNewNote = () => {
    return async (dispatch, getState) => {
        dispatch(savingNewNote());

        const { uid } = getState().auth;

        const newNote = {
            title: '',
            body: '',
            imageUrls: [],
            date: new Date().getTime()
        };

        const newDoc = doc(collection(FirebaseDB, `/${ uid }/journal/notes`))

        const setDocResponse = await setDoc(newDoc, newNote);

        newNote.id = newDoc.id;

        dispatch(addNewEmptyNode( newNote ));
        dispatch(setActiveNode( newNote ));
    };
};

export const startLoadingNotes = () => {
    return async (dispatch, getState) => {
        const { uid } = getState().auth;

        if(!uid) throw new Error('El UID del usuario no existe');

        const notes = await loadNotes(uid);

        console.log(notes);

        dispatch(setNotes(notes));
    };
};

export const startSavingNote = () => {
    return async (dispatch, getState) => {
        dispatch(setSaving());

        const { uid } = getState().auth;
        const { active } = getState().journal;

        if(!uid) throw new Error('El UID del usuario no existe');

        const { id, ...noteToFireStore } = active;

        const docRef = doc(FirebaseDB, `${ uid }/journal/notes/${ id }`);
        const response = await setDoc( docRef, noteToFireStore, { merge: true });

        dispatch(updateNote(active));
    };
};

export const startUploadingFiles = ( files = [] ) => {
    return async (dispatch, getState) => {
        dispatch(setSaving());

        // await fileUpload(files[0]);
        const fileUploadPromises = [];
        for(const file of files) {
            fileUploadPromises.push(fileUpload(file));
        }

        const photoUrls = await Promise.all(fileUploadPromises);

        dispatch(setPhotosToActiveNote(photoUrls))
    };
};

export const startDeletingNote = () => {
    return async (dispatch, getState) => {
        const { uid } = getState().auth;
        const { active } = getState().journal;

        const docRef = doc(FirebaseDB, `${ uid }/journal/notes/${ active.id }`);

        const response = await deleteDoc(docRef);

        console.log(response);

        dispatch(deleteNoteById(active.id));
     }
}