import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
// import axios from 'axios'
import { UserLogin, googleLogin, facebookLogin } from '../redux/user/userAction'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { Paper } from '@material-ui/core';
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  FacebookLogin: {
    width: '200px',
    padding: '40px',
    color: 'red'
  }
}));
const inital = {

  email: '',
  password: '',

}
export default function SignIn() {
  const classes = useStyles();
  const history = useHistory()
  const dispatch = useDispatch()
  const [data, setdata] = useState(inital)
  const handlechange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setdata({ ...data, [name]: value })
  }
  const { email, password } = data
  const submit = async (e) => {
    e.preventDefault()
    //  const result=await axios.get('/test')
    dispatch(UserLogin(data))
    setdata(inital)
    // history.push('/')
    console.log(data)
  }

  // for google success function
  const responseSuccessGoogle = (response) => {
    console.log(response)
    dispatch(googleLogin(response.tokenId))
  }
  const responseFaulGoogle = (response) => {
    console.log(response)
  }

  // login in facebook
  const responseFacebook = (response) => {
    console.log(response)
    const { userID, accessToken } = response
    dispatch(facebookLogin({ userID, accessToken }))
  }
  return (
    <Container component={Paper} maxWidth="xs">
      <CssBaseline />
      <Box className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            onChange={handlechange}
            id="email"
            label="Email Address"
            name="email"
            value={email}
            autoComplete="email"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            onChange={handlechange}
            name="password"
            value={password}
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          {/* 230599958091-ssvq3h8e45q8ldh78tpadp6mcbl56i19.apps.googleusercontent.com */}
          <GoogleLogin
            //google cloud auth id er code ekhane boshate hoi
            clientId="230599958091-ssvq3h8e45q8ldh78tpadp6mcbl56i19.apps.googleusercontent.com"
            buttonText="login in google"
            onSuccess={responseSuccessGoogle}
            onFailure={responseFaulGoogle}
            cookiePolicy={'single_host_origin'}
            render={renderProps => (
              <Button color='secondary' variant='contained' onClick={renderProps.onClick} style={{ width: '100%', marginTop: '20px',marginBottom:'20px' }}>
                Login with google</Button>
            )}
          />
          <FacebookLogin
            // className={classes.FacebookLogin}
            // facebook create app id
            appId="1650179098512926"
            autoLoad={false}
            callback={responseFacebook}
            size='small'

          // render={renderProps => (
          //   <Button color='secondary' variant='contained' size='small' fullWidth onClick={renderProps.onClick}
          //   >Login  facebook</Button>
          // )}
          />
          
          <Button
            type="submit"
            fullWidth
            onClick={submit}
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link to='/sendemail' variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link to="/signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </Box>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}