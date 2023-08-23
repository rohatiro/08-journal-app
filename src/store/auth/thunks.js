import { signInWithGoogle, registerUserWithEmailPassword, loginInWithEmailPassword, LogoutFirebase } from "../../firebase/providers";
import { clearNotesLogout } from "../journal/journalSlice";
import { checkingCredentials, login, logout } from "./";

export const checkingAuthentication = ( email, password ) => {
    return async (dispatch) => {
        dispatch( checkingCredentials() );
    }
};

export const startGoogleSignIn = () => {
    return async (dispatch) => {
        dispatch( checkingCredentials() );

        const result = await signInWithGoogle();

        if( !result.ok ) return dispatch( logout( result.errorMessage ));

        dispatch(login( result ));
    }
}

export const startCreatingUserWithEmailPassword = ({ email, password, displayName }) => {
    return async (dispatch) => {
        dispatch(checkingCredentials());
        const { ok, uid, photoURL, errorMessage } = await registerUserWithEmailPassword({ email, password, displayName });

        if(!ok) return dispatch( logout( errorMessage ));
        
        dispatch(login({ uid, email, displayName, photoURL }));
    };
};

export const startLoginWithEmailPassword = ({ email, password }) => {
    return async (dispatch) => {
        dispatch(checkingAuthentication());

        const { ok, uid, displayName, photoURL, errorMessage } = await loginInWithEmailPassword({ email, password });

        if(!ok) return dispatch( logout( errorMessage ));

        dispatch(login({ uid, email, displayName, photoURL }));
    }
};

export const startLogout = () => {
    return async (dispatch) => {
        await LogoutFirebase();

        dispatch(logout());
        dispatch(clearNotesLogout());
    }
};

