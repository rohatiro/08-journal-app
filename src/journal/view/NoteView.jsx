import { DeleteOutline, SaveOutlined, UploadOutlined } from "@mui/icons-material"
import { Button, Grid, IconButton, TextField, Typography } from "@mui/material"
import { ImageGallery } from "../components"
import { useDispatch, useSelector } from "react-redux"
import { useForm } from "../../hooks/useForm"
import { useEffect, useMemo, useRef } from "react"
import { setActiveNode } from "../../store/journal/journalSlice"
import { startDeletingNote, startSavingNote, startUploadingFiles } from "../../store/journal/thunks"
import Swal from "sweetalert2"
import 'sweetalert2/dist/sweetalert2.css';

export const NoteView = () => {
    const dispatch = useDispatch();
    const { active, isSaving, messageSaved } = useSelector(state => state.journal);

    const { body, title, onInputChange, formState, date } = useForm( active );

    const dateString = useMemo(() => {
        const newDate = new Date(date);

        return newDate.toUTCString();
    }, [ date ]);

    const fileInputRef = useRef();

    useEffect(() => {
        dispatch(setActiveNode(formState));
    }, [ formState ])
    
    useEffect(() => {
        if(messageSaved.length > 0) {
            Swal.fire('Nota actualizada', messageSaved, 'success');
        }
    }, [ messageSaved ])

    const onFileInputChange = ({ target }) => {
        if(target.files.length === 0) return;

        dispatch(startUploadingFiles(target.files))
    };

    const onSaveNote = () => {
        dispatch(startSavingNote());
    };

    const onDelete = () => {
        dispatch(startDeletingNote());
    };

    return (
        <Grid
            className="animate__animated animate__fadeIn animate__faster"
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{ mb: 1 }}
        >
            <Grid item>
                <Typography fontSize={39} fontWeight="light" >{ dateString }</Typography>
            </Grid>
            <Grid item>
                <input
                    type="file"
                    multiple
                    onChange={ onFileInputChange }
                    style={{ display: 'none' }}
                    ref={ fileInputRef }
                />
                <IconButton
                    color="primary"
                    disabled={isSaving}
                    onClick={() => fileInputRef.current.click() }
                >
                    <UploadOutlined />
                </IconButton>
                <Button disabled={isSaving} onClick={ onSaveNote } color="primary" sx={{ padding: 2 }}>
                    <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
                    Guardar
                </Button>
            </Grid>
            <Grid container>
                <TextField
                    type="text"
                    variant="filled"
                    fullWidth
                    placeholder="Ingrese un titulo"
                    label="Titulo"
                    sx={{ border: 'none', mb: 1 }}
                    name="title"
                    value={ title }
                    onChange={ onInputChange }
                />
                <TextField
                    type="text"
                    variant="filled"
                    fullWidth
                    multiline
                    placeholder="¿Que suscedio el día de hoy?"
                    minRows={5}
                    name="body"
                    value={ body }
                    onChange={ onInputChange }
                />
            </Grid>
            <Grid container justifyContent='end'>
                <Button
                    sx={{ mt: 2 }}
                    color="error"
                    onClick={ onDelete }
                >
                    <DeleteOutline />
                    Borrar
                </Button>
            </Grid>

            {/* Image Gallery */}
            <ImageGallery images={ active.imageUrls } />
        </Grid>
    )
}
