import Google from "@mui/icons-material/Google"
import { Button, Grid, TextField, Typography, Link, Alert } from "@mui/material"
import { Link as RouterLink } from "react-router-dom"
import { AuthLayout } from "../layout/AuthLayout"
import { useForm } from "../../hooks"
import { useDispatch, useSelector } from "react-redux"
import { startGoogleSignIn, startLoginWithEmailPassword } from "../../store/auth"
import { useMemo } from "react"

const initialForm = {
  email: '',
  password: ''
};

export const LoginPage = () => {
  const { status, errorMessage } = useSelector( state => state.auth );
  
  const dispatch = useDispatch();

  const { email, password, onInputChange } = useForm(initialForm);

  const isAuthenticating = useMemo(() => status === 'checking', [ status ])

  const onSubmit = (e) => {
    e.preventDefault();

    dispatch(startLoginWithEmailPassword({ email, password }));
  };
  
  const onGoogleSignIn = () => {
    dispatch(startGoogleSignIn());
  };

  return (
    <AuthLayout title="Login">
      {/* <h1>Hola Mundo: { import.meta.env.VITE_PROPIEDAD_PRIVADA }</h1> */}
      <form className="animate__animated animate__fadeIn animate__faster" onSubmit={ onSubmit } aria-label="submit-form">
        <Grid container>
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
              inputProps={{
                'data-testid': 'password'
              }}
              value={ password }
              onChange={ onInputChange }
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
              sm={6}
            >
              <Button disabled={ isAuthenticating } type="submit" variant="contained" fullWidth>
                Login
              </Button>
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
            >
              <Button
                aria-label="google-btn"
                disabled={ isAuthenticating } onClick={ onGoogleSignIn } variant="contained" fullWidth>
                <Google />
                <Typography sx={{ ml: 1 }}>Google</Typography>
              </Button>
            </Grid>
          </Grid>
          <Grid
            container
            direction={"row"}
            justifyContent={"end"}
          >
            <Link component={RouterLink} color="inherit" to="/auth/register">
              Crear una cuenta
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  )
}
