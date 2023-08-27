import { collection, deleteDoc, getDocs } from "firebase/firestore/lite";
import { addNewEmptyNode, savingNewNote, setActiveNode } from "../../../src/store/journal/journalSlice";
import { startNewNote } from "../../../src/store/journal/thunks";
import { FirebaseDB } from "../../../src/firebase/config";

jest.mock('../../../src/firebase/providers');

describe('Pruebas en Journal Thunks', () => {
    const dispatch = jest.fn();
    const getState = jest.fn();

    beforeEach(() => jest.clearAllMocks());

    test('startNewNote debe de crear una nota en blanco', async () => {
        const uid = 'TEST-UID';
        getState.mockReturnValue({ auth: { uid: uid }});
        
        await startNewNote()(dispatch, getState)

        expect(dispatch).toHaveBeenCalledWith(savingNewNote());
        expect(dispatch).toHaveBeenCalledWith(addNewEmptyNode({
            title: '',
            body: '',
            id: expect.any(String),
            date: expect.any(Number),
            imageUrls: []
        }));
        expect(dispatch).toHaveBeenCalledWith(setActiveNode({
            title: '',
            body: '',
            id: expect.any(String),
            date: expect.any(Number),
            imageUrls: []
        }));

        //Borrar toda la coleccion de firebase

        const collectionRef = collection(FirebaseDB, `${ uid }/journal/notes`);
        const docs = await getDocs(collectionRef);

        const deletePromises = [];

        docs.forEach(doc => deletePromises.push( deleteDoc(doc.ref) ));
        await Promise.all(deletePromises);
    });
})