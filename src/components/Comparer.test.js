import React from 'react';
import ReactDOM from 'react-dom';
import Comparer from './Comparer';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Comparer />, div);
  ReactDOM.unmountComponentAtNode(div);
});