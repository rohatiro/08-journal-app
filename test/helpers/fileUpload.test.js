import { v2 as cloudinary} from 'cloudinary';
import { fileUpload } from "../../src/helpers/fileUpload";

cloudinary.config({
    cloud_name: 'df4motixy',
    api_key: '554399856114657',
    api_secret: 'gifxQXuyhhsOb2i3dt6y737Kmc4',
    secure: true
})

describe('Pruebas en fileUpload', () => {
    test('debe de subir el archivo correctamente a cloudinary', async () => {
        const imageUrl = 'https://pbs.twimg.com/profile_images/949787136030539782/LnRrYf6e_400x400.jpg';
        const response = await fetch(imageUrl);
        const blob = await response.blob();
        const file = new File([blob], 'foto.jpg');

        const url = await fileUpload(file);
        
        expect(typeof url).toBe('string');

        const segments = url.split('/');
        const imageID = segments[segments.length - 1].replace('.jpg', '');

        const folderName = 'journal-app';

        await cloudinary.api.delete_resources(`${ folderName }/${ imageID }`, { resource_type: 'image'});
    });

    test('debe de retornal null', async () => {
        const file = new File([], 'foto.jpg');

        const url = await fileUpload(file);
        
        expect(url).toBe(null);
    })
 })