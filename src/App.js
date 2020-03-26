import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Flights from './containers/flights';
import Cars from './containers/cars';
import Buses from './containers/buses';
import Hotels from './containers/hotels';
import Trains from './containers/trains';
import Error from './containers/error';

import './App.scss';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/" component={Flights} exact/>
          <Route path="/flights" component={Flights}/>
          <Route path="/cars" component={Cars}/>
          <Route path="/hotels" component={Hotels}/>
          <Route path="/trains" component={Trains}/>
          <Route path="/buses" component={Buses}/>
          <Route component={Error}/>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
