import React from 'react';
import ReactDOM from 'react-dom';
import ApiContext from '../ApiContext'
import Editor from './Editor';


it('renders without crashing', () => {
  const div = document.createElement('div');
  const state = {
    forecast: {
      ccurrent_age: 30,
      net_income: 65000,
      income_increase: 4,
      current_spending: 49000,
      current_savings: 52700,
      future_spending: 40000,
      input_roi: 8,
      input_withdrawal_rate: 4
    }
  }
  const value = {
    /* context of default forecast on load */
    forecast: state.forecast
  }
  ReactDOM.render(
    <ApiContext.Provider value={value}>
      <Editor forecast={state.forecast}/>
    </ApiContext.Provider>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
