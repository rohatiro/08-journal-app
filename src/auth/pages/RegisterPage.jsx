import { Button, Grid, TextField, Typography, Link, Alert } from "@mui/material"
import { AuthLayout } from "../layout/AuthLayout"
import { Link as RouterLink } from "react-router-dom"
import { useForm } from "../../hooks"
import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startCreatingUserWithEmailPassword } from "../../store/auth";

const formData = {
  email: '',
  password: '',
  displayName: ''
};

const formValidations = {
  email: [(value) => value.includes('@'), 'El correo debe tener un @'],
  password: [(value) => value.length >= 6, 'El password debe dde tener mas de 6 letras.'],
  displayName: [(value) => value.length >= 1, 'El nombre es obligatorio.']
};

export const RegisterPage = () => {
  const dispatch = useDispatch();
  const [formSubmited, setFormSubmited] = useState(false);
  const { status, errorMessage } = useSelector(state => state.auth);

  const isCheckingAuthentication = useMemo(() => status === 'checking', [ status ])

  const {
    formState, displayName, email, password,
    onInputChange, displayNameValid, emailValid, passwordValid,
    isFormValid,
  } = useForm(formData, formValidations);

  const onSubmit = (e) => {
    e.preventDefault();
    setFormSubmited(true);
    if(!isFormValid) return;
    dispatch(startCreatingUserWithEmailPassword(formState));
  };

  return (
    <AuthLayout title="Crear Cuenta">
      <form className="animate__animated animate__fadeIn animate__faster" onSubmit={ onSubmit }>
        <Grid container>
          <Grid
            item
            xs={12}
            sx={{ mt: 2 }}
          >
            <TextField
              label="Nombre Completo"
              type="text"
              placeholder="John Doe"
              fullWidth
              name="displayName"
              value={ displayName }
              onChange={ onInputChange }
              error={ !!displayNameValid && formSubmited}
              helperText={ displayNameValid }
            ></TextField>
          </Grid>
          <Grid
            item
            xs={12}
            sx={{ mt: 2 }}
          >
            <TextField
              label="Correo"
              type="email"
              placeholder="roberto@email.com"
              fullWidth
              name="email"
              value={ email }
              onChange={ onInputChange }
              error={ !!emailValid && formSubmited}
              helperText={ emailValid }
            ></TextField>
          </Grid>
          <Grid
            item
            xs={12}
            sx={{ mt: 2 }}
          >
            <TextField
              label="Contraseña"
              type="password"
              placeholder="Contraseña"
              fullWidth
              name="password"
              value={ password }
              onChange={ onInputChange }
              error={ !!passwordValid && formSubmited}
              helperText={ passwordValid }
            ></TextField>
          </Grid>
          <Grid
            container
            spacing={2}
            sx={{ mb: 2, mt: 1 }}
          >
            {
              !!errorMessage &&
              <Grid
                item
                xs={12}
              >
                <Alert severity="error">{ errorMessage }</Alert>
              </Grid>
            }
            <Grid
              item
              xs={12}
            >
              <Button disabled={ isCheckingAuthentication } type="submit" variant="contained" fullWidth>
                Crear Cuenta
              </Button>
            </Grid>
          </Grid>
          <Grid
            container
            direction={"row"}
            justifyContent={"end"}
          >
            <Typography sx={{ mr: 1 }}>¿Ya tienes cuenta?</Typography>
            <Link component={RouterLink} color="inherit" to="/auth/login">
              Ingresar
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  )
}
