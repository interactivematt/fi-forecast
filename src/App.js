import { React, Component } from 'react';
import Forecast from './Forecast/Forecast'
import Welcome from './Welcome/Welcome'
import { Route } from 'react-router-dom'
import './App.css';


class App extends Component {

  renderPages(){
    return(
      <>
        <Route
          exact
          path='/'
          component={Welcome}
        />
        <Route
          path='/forecast'
          component={Forecast}
        />
      </>
    )
  }

  render(){
    return (
      <main className='App'>
        {/* content goes here */}
        <header><h1><a href="/">FI Forecast</a></h1></header>
        {this.renderPages()}
      </main>
    );
  }
}

export default App;