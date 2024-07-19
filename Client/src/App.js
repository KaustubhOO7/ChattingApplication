import React from 'react';
import { Route,Switch } from 'react-router-dom';
import AcceptingForm from './components/FormSubmit';
import Signup from './components/CreateUser';
import ChatApp from './components/Chatting';

function App() {
  return (
    <div>
      <Switch>
      <Route path='/' exact component={AcceptingForm} />
      <Route path='/signup' exact component={Signup} />
      <Route path='/login' exact component={ChatApp}/>
      </Switch>
    </div>
  );
}

export default App;
