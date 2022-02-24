import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Navbar from './components/statics/navbar/Navbar';
import Footer from './components/statics/footer/Footer';
import RegisterUser from './pages/register/Register';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import './App.css';
import ThemeList from './components/themes/themelist/ThemeList';
import PostsList from './components/posts/postslist/PostsList';


function App() {
  return (
  <Router>
    <Navbar/>
      <Switch>
        <div style={{minHeight: '100vh'}}>
          
          <Route exact path='/'>
            <Login/>
          </Route>

          <Route path='/login'>
            <Login/>
          </Route>

          <Route path='/home'>
            <Home/>
          </Route>

          <Route path='/cadastrar'>
            <RegisterUser/>
          </Route>

          <Route path='/temas'>
            <ThemeList/>
          </Route>

          <Route path='/posts'>
            <PostsList/>
          </Route>

        </div>
      </Switch>
    <Footer/>
  </Router>
  );
}

export default App;
