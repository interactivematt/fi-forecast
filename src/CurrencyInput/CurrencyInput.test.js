import React from 'react';
import ReactDOM from 'react-dom';
import CurrencyInput from './CurrencyInput'

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <CurrencyInput/>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
