import React from 'react';
import './App.css';
import {Switch,Route,BrowserRouter as Router} from 'react-router-dom';
import {signInForm,  signUpForm,  ListOfCommanders,  ListOfSubdivisions,  ListOfLocations,  RedirectionToComponents,  ListOfActualData} from './index';

function App() {
  return (
    <Router>
       <Switch>
          <Route  path ='/signUp' component={signUpForm}/>
          <Route  path ='/signIn' component={signInForm}/>
          <Route path='/listOfCommanders' component={ListOfCommanders}/>
          <Route path='/listOfSubdivisions' component={ListOfSubdivisions}/>
          <Route path='/listOfLocations' component={ListOfLocations}/>
          <Route path='/listOfActualData' component={ListOfActualData}/>
      </Switch>
      <RedirectionToComponents/>
    </Router>
 
  );
}
export default App;
