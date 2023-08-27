import { LogoutFirebase, loginInWithEmailPassword, registerUserWithEmailPassword, signInWithGoogle } from "../../../src/firebase/providers";
import { checkingCredentials, login, logout } from "../../../src/store/auth/authSlice";
import { checkingAuthentication, startCreatingUserWithEmailPassword, startGoogleSignIn, startLoginWithEmailPassword, startLogout } from "../../../src/store/auth/thunks";
import { clearNotesLogout } from "../../../src/store/journal/journalSlice";
import { demoUser } from "../../fixtures/authFixtures";

jest.mock('../../../src/firebase/providers')

describe('Pruebas en Auth Thunks', () => {
    const dispatchMock = jest.fn();

    beforeEach(() => jest.clearAllMocks());

    test('debe de invocar el checkingCredentials', async () => {
        const valor = checkingCredentials();
        await checkingAuthentication()(dispatchMock);

        expect(dispatchMock).toHaveBeenCalledWith(valor);
    });
    
    test('startGoogleSignIn debe de llamar checkingCredenteials y login', async () => {
        const loginData =  { ok: true, ...demoUser }
        // const valor = checkingCredentials();
        await signInWithGoogle.mockResolvedValue(loginData);

        await startGoogleSignIn()( dispatchMock );

        expect(dispatchMock).toHaveBeenCalledWith(checkingCredentials());
        expect(dispatchMock).toHaveBeenCalledWith(login( loginData ));
    });
    
    test('startGoogleSignIn debe de llamar checkingCredenteials y logout - Error', async () => {
        const loginData =  { ok: false, errorMessage: 'Un error en Google' }
        // const valor = checkingCredentials();
        await signInWithGoogle.mockResolvedValue(loginData);

        await startGoogleSignIn()( dispatchMock );

        expect(dispatchMock).toHaveBeenCalledWith(checkingCredentials());
        expect(dispatchMock).toHaveBeenCalledWith(logout( loginData.errorMessage ));
    });

    test('startCreatingUserWithEmailPassword debe de llamar checkingCredenteials y login', async () => {
        const loginData =  { ok: true, ...demoUser }
        const formData = { email: demoUser.email, password: '12345678', displayName: demoUser.displayName };
        
        await registerUserWithEmailPassword.mockResolvedValue(loginData);

        await startCreatingUserWithEmailPassword(formData)( dispatchMock );

        expect(dispatchMock).toHaveBeenCalledWith(checkingCredentials());
        expect(dispatchMock).toHaveBeenCalledWith(login( loginData ));
    });

    test('startLoginWithEmailPassword debe de llamar checkingCredenteials y login - Exito', async () => {
        const loginData =  { ok: true, ...demoUser }
        const formData = { email: demoUser.email, password: '12345678' };
        await loginInWithEmailPassword.mockResolvedValue(loginData);

        await startLoginWithEmailPassword(formData)( dispatchMock );

        expect(dispatchMock).toHaveBeenCalledWith(checkingCredentials());
        expect(dispatchMock).toHaveBeenCalledWith(login( loginData ));
    });
    
    test('startLoginWithEmailPassword debe de llamar checkingCredenteials y logout - Error', async () => {
        const loginData =  { ok: false, errorMessage: 'Un error con las credenciales' }
        const formData = { email: demoUser.email, password: '12345678' };
        await loginInWithEmailPassword.mockResolvedValue(loginData);

        await startLoginWithEmailPassword(formData)( dispatchMock );

        expect(dispatchMock).toHaveBeenCalledWith(checkingCredentials());
        expect(dispatchMock).toHaveBeenCalledWith(logout( loginData.errorMessage ));
    });

    test('startLogout debe de llamar LogoutFirebase, logout y clearNotesLogout', async () => {
        await startLogout()( dispatchMock );

        expect(LogoutFirebase).toHaveBeenCalled();
        expect(dispatchMock).toHaveBeenCalledWith(logout());
        expect(dispatchMock).toHaveBeenCalledWith(clearNotesLogout());
    });
})