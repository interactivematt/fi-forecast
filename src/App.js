import { React, Component } from 'react';
import Forecast from './Forecast/Forecast'
import Welcome from './Welcome/Welcome'
import { Route } from 'react-router-dom'
import './App.css';
import ApiContext from './ApiContext';
import config from './config'


class App extends Component {

  state = {
    forecast: {
      current_age: 30,
      net_income: 65000,
      income_increase: 4,
      current_spending: 49000,
      current_savings: 52700,
      future_spending: 40000,
      input_roi: 8,
      input_withdrawal_rate: 4
    }
  }

  componentDidMount(){
    Promise.all([
      fetch(`${config.API_ENDPOINT}/forecasts/1`, {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
          'Authorization': `Bearer ${config.API_KEY}`
        }
      })
    ])
      .then(([forecastsRes]) => {
        if(!forecastsRes.ok) {
          return forecastsRes.json().then(e => Promise.reject(e))
        }
        return Promise.all([forecastsRes.json()])
      })
      .then(([forecast]) => {
        this.setState({ forecast })
      })
      .catch(error => {
        console.error({ error })
        this.setState({ error })
      })
  }

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

    const value = {
      /* context of default forecast on load */
      forecast: this.state.forecast
    }
    return (
      <ApiContext.Provider value={value}>
        <main className='App'>
          {/* content goes here */}
          <header>
            <div className="container">
              <h3 className='title'><a href="/">FI Forecast</a></h3>
            </div>
          </header>
          {this.renderPages()}
        </main>
      </ApiContext.Provider>
    );
  }
}

export default App;