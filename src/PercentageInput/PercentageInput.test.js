import React from 'react';
import ReactDOM from 'react-dom';
import PercentageInput from './PercentageInput'

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <PercentageInput/>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
