import React from 'react';
import { Layout } from 'antd';
import { Switch, Route } from 'react-router';
import Footer from './components/layout/footer';
import Header from './components/layout/header';

import Login from './components/login';
import Register from './components/register';
import TuTorRegister from './components/tutorRegister';
import './App.css';

const { Content } = Layout;
const App = () => {
  return (
    <div>
      <Header />
      <div className="App">
        <Content>
          <Switch>
            <Route exact path={`${process.env.PUBLIC_URL}/`}>
              <Login />
            </Route>
            <Route exact path={`${process.env.PUBLIC_URL}/login`}>
              <Login />
            </Route>
            <Route exact path={`${process.env.PUBLIC_URL}/register`}>
              <Register />
            </Route>
            <Route exact path={`${process.env.PUBLIC_URL}/tutorregister`}>
              <TuTorRegister />
            </Route>
          </Switch>
        </Content>
      </div>
      <Footer />
    </div>
  );
};

export default App;
