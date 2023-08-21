import { GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";
import { FirebaseAuth } from "./config";

const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
    try {
        const result = await signInWithPopup(FirebaseAuth, googleProvider);
        // const credentials = GoogleAuthProvider.credentialFromResult( result );
        const user = result.user;

        const { displayName, email, photoURL, uid } = user;

        // console.log({ displayName, email, photoURL, uid });

        return {
            ok: true,
            displayName,
            email,
            photoURL,
            uid
        }
    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;

        return {
            ok: false,
            errorCode,
            errorMessage
        }
    }
};

export const loginInWithEmailPassword = async ({ email, password }) => {
    try {
        const response = await signInWithEmailAndPassword(FirebaseAuth, email, password);
        const { uid, photoURL, displayName } = response.user;

        return {
            ok: true,
            uid, photoURL, displayName, email
        }
    } catch (error) {
        console.log(error);

        return {
            ok: false,
            errorMessage: error.message
        }
    }
}

export const registerUserWithEmailPassword = async ({ email, password, displayName }) => {
    try {
        const response = await createUserWithEmailAndPassword(FirebaseAuth, email, password);
        const { uid, photoURL } = response.user;

        await updateProfile(FirebaseAuth.currentUser, {
            displayName
        } );
        
        return {
            ok: true,
            uid, photoURL, displayName, email
        }
    } catch (error) {
        console.log(error)
        return {
            ok: false,
            errorMessage: error.message
        }
    }
};

export const LogoutFirebase = async () => {
    return await FirebaseAuth.signOut();
}