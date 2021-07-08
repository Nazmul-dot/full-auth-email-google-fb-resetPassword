import { Switch, Route } from 'react-router-dom';
import './App.css';
import Home from './components/home/Home';
import SignIn from './components/login/SignIn';
import SignOut from './components/logout/SignOut';
import Navbar from './components/nav/Navbar';
import SignUp from './components/register/SignUp';
import CompletRegis from './components/completRegis/CompletRegis'
import SendEmail from './components/passforget/SendEmail'
import ForgetPass from './components/passforget/ForgetPass'
import { useSelector } from 'react-redux'
function App() {
  const { isAuthenticate } = useSelector(state => state.userData)
  return (
    <>
      <Navbar />
      <Switch>
        <Route exact path='/'>
          <Home />
        </Route>
        <Route exact path='/signout'>
          <SignOut />
        </Route>
        <Route exact path='/users/activate/:token'>
          <CompletRegis />
        </Route>
        <Route exact path='/sendemail'>
          <SendEmail />
        </Route>
        <Route exact path='/users/resetpass/:token'>
          <ForgetPass/>
        </Route>
        <Route exact path='/signin'>
          {isAuthenticate ? <Home /> : <SignIn />}
        </Route>
        <Route exact path='/signup'>
          {isAuthenticate ? <Home /> : <SignUp />}
        </Route>
      </Switch>
    </>
  );
}

export default App;
