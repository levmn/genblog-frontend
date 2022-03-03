import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store';

import Home from './pages/home/Home';
import Login from './pages/login/Login';

import Navbar from './components/statics/navbar/Navbar';
import Footer from './components/statics/footer/Footer';
import RegisterUser from './pages/register/Register';
import ThemeList from './components/themes/themelist/ThemeList';
import PostList from './components/posts/postslist/PostList';
import RegisterPost from './components/posts/registerposts/RegisterPost';
import RegisterTheme from './components/themes/registertheme/RegisterTheme';
import DeletePost from './components/posts/deleteposts/DeletePost';
import DeleteTheme from './components/themes/deletetheme/DeleteTheme';
import './App.css';

function App() {
  return (
    <Provider store={store}>
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

              <Route path='/postagens'>
                <PostList/>
              </Route>

              <Route exact path='/formulariopost'>
                <RegisterPost/>
              </Route>

              <Route exact path='/formulariopost/:id'>
                <RegisterPost/>
              </Route>

              <Route exact path='/formulariotema'>
                <RegisterTheme/>
              </Route>

              <Route exact path='/formulariotema/:id'>
                <RegisterTheme/>
              </Route>

              <Route path='/deletarpost/:id'>
                <DeletePost/>
              </Route>

              <Route path='/deletartema/:id'>
                <DeleteTheme/>
              </Route>

            </div>
          </Switch>
        <Footer/>
      </Router>
  </Provider>
  );
}

export default App;
