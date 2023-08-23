import { createSlice } from '@reduxjs/toolkit';

// active : {
//     id: 'ABC123',
//     title: '',
//     body: '',
//     date: 1234567,
//     imageUrls: [] // https://foo.jpg, https://foo2.jpg
// }

export const journalSlice = createSlice({
    name: 'journal',
    initialState: {
        isSaving: false,
        messageSaved: '',
        notes: [],
        active: null
    },
    reducers: {
        savingNewNote: (state, action) => {
            state.isSaving = true;
        },
        addNewEmptyNode: (state, action) => {
            state.notes.push( action.payload );
            state.isSaving = false;
        },
        setActiveNode: (state, action) => {
            state.active = action.payload;
            state.messageSaved = '';
        },
        setNotes: (state, action) => {
            state.notes = action.payload;
        },
        setSaving: (state, action) => {
            state.isSaving = true;
            state.messageSaved = '';
        },
        updateNote: (state, action) => {
            state.isSaving = false;
            state.notes = state.notes.map(note => {
                if(note.id === action.payload.id) {
                    return action.payload;
                }

                return note;
            });

            state.messageSaved = `${ action.payload.title }, actualizada correctamente`;
        },
        setPhotosToActiveNote: (state, action) => {
            state.active.imageUrls = [...state.active.imageUrls, ...action.payload];
            state.isSaving = false;
        },
        clearNotesLogout: (state, action) => {
            state.isSaving = false;
            state.messageSaved = '';
            state.notes = [];
            state.active = null;
        },
        deleteNoteById: (state, action) => {
            state.active = null;
            state.messageSaved = '';
            state.notes = state.notes.filter( note => note.id !== action.payload);
        },
    }
});

export const {
    addNewEmptyNode,
    setActiveNode,
    setNotes,
    updateNote,
    deleteNoteById,
    savingNewNote,
    setSaving,
    setPhotosToActiveNote,
    clearNotesLogout,
} = journalSlice.actions;