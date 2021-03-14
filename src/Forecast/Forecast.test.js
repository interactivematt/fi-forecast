import React from 'react';
import ReactDOM from 'react-dom';
import Forecast from './Forecast';
import ApiContext from '../ApiContext'

it('renders without crashing', () => {
  const div = document.createElement('div');
  const state = {
    forecast: {
      current_age: '',
      net_income: '',
      income_increase: '',
      current_spending: '',
      current_savings: '',
      future_spending: '',
      input_roi: '',
      input_withdrawal_rate: ''
    }
  }
  const value = {
    /* context of default forecast on load */
    forecast: state.forecast
  }
  ReactDOM.render(
    <ApiContext.Provider value={value}>
      <Forecast/>
    </ApiContext.Provider>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
