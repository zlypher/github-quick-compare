import React, { Component } from 'react';
import './App.css';
import { Comparer } from './components/Comparer';

const getOwnerRepo = (id) => {
  if (!id) {
    return {
      owner: "",
      repo: "",
    };
  }

  const [owner, repo] = id.split("/");
  return { owner, repo };
}

class App extends Component {
  render() {
    const params = new URLSearchParams(window.location.search);

    const first = getOwnerRepo(params.get("first"));
    const second = getOwnerRepo(params.get("second"));
    return (
      <div className="App">
        <Comparer first={first} second={second} />
      </div>
    );
  }
}

export default App;
