import { authSlice, checkingCredentials, login, logout } from "../../../src/store/auth/authSlice"
import { authenticatedState, checkingState, demoUser } from "../../fixtures/authFixtures";

describe('pruebas en AuthSlice', () => {
    test('debe de regresar el estado inicial y llamarse auth', () => {
        const state = authSlice.reducer(checkingState, {});
        
        expect(state).toEqual(checkingState);
        expect(authSlice.name).toBe('auth');
    });
    
    test('debe de realizar la autenticación', () => {
        const state = authSlice.reducer(checkingState, login(demoUser));
        
        expect(state).toEqual({
            status: 'authenticated',
            uid: demoUser.uid,
            email: demoUser.email,
            displayName: demoUser.displayName,
            photoURL: demoUser.photoURL,
            errorMessage: null
        });
    });

    test('debe de realizar el logout', () => {
        const state = authSlice.reducer(authenticatedState, logout());
        
        expect(state).toEqual({
            status: 'not-authenticated',
            uid: null,
            email: null,
            displayName: null,
            photoURL: null,
            errorMessage: undefined
        });
    });
    
    test('debe de realizar el logout y mostrar mensaje de error', () => {
        const errorMessage = 'Credenciales no son correctas';
        const state = authSlice.reducer(authenticatedState, logout(errorMessage));
        
        expect(state).toEqual({
            status: 'not-authenticated',
            uid: null,
            email: null,
            displayName: null,
            photoURL: null,
            errorMessage: errorMessage
        });
    });
    
    test('debe de cambiar el estatus a checking', () => {
        const state = authSlice.reducer(authenticatedState, checkingCredentials());
        
        expect(state).toEqual({
            status: 'checking',
            uid: '123ABC',
            email: 'demo@google.com',
            displayName: 'Demo User',
            photoURL: 'https://foo.jpg',
            errorMessage: null
        });
    });
 })