import './App.css';
import React, {Component, useState} from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Home from './Home/home'
import Pathfinder from './PathfindingComponents/Pathfinder/pathfinder'
import Sortingvis from './SortingComponents/Sortingvisualizer/Sortingvisualizer';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';


function App() {

  return (
    <div className="App">
        <Switch>
          <Route exact path = "/">
              <Redirect to= "/home"/>
          </Route>
          <Route exact path ="/home" component={Home} />
          <Route exact path ="/sorting" component={Sortingvis} />
          <Route exact path ="/pathfinding" component={Pathfinder} />
        </Switch>
        
    </div>
  );
}

export default App;
