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
        const result = await registerUserWithEmailPassword({ email, password, displayName });

        if(!result.ok) return dispatch( logout( result.errorMessage ));
        
        dispatch(login(result));
    };
};

export const startLoginWithEmailPassword = ({ email, password }) => {
    return async (dispatch) => {
        dispatch(checkingCredentials());

        const result = await loginInWithEmailPassword({ email, password });

        if(!result.ok) return dispatch( logout( result.errorMessage ));

        dispatch(login(result));
    }
};

export const startLogout = () => {
    return async (dispatch) => {
        await LogoutFirebase();

        dispatch(logout());
        dispatch(clearNotesLogout());
    }
};

