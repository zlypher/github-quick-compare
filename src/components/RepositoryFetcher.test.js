import React from 'react';
import ReactDOM from 'react-dom';
import RepositoryFetcher from './RepositoryFetcher';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const onChange = (name) => () => { };

  ReactDOM.render(<RepositoryFetcher owner="Owner" repo="Repo" onChange={onChange} />, div);
  ReactDOM.unmountComponentAtNode(div);
});