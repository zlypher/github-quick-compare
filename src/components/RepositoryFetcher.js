import React, { Component } from "react";
import './RepositoryFetcher.css';

const getRepoUrl = (owner, repo) => `https://api.github.com/repos/${owner}/${repo}`;

const loadRepositoryInfo = async (owner, repo) => {
  const response = await fetch(getRepoUrl(owner, repo));
  return await response.json();
}

export default class RepositoryFetcher extends Component {
  constructor(props) {
    super(props);
    this.state = {
      owner: "",
      repo: "",
    };

    this.onHandleChange = this.onHandleChange.bind(this);
    this.onHandleUpdateClick = this.onHandleUpdateClick.bind(this);
  }

  render() {
    const { owner, repo } = this.state;

    return (
      <section className="repo-fetcher">
        <div>
          <input className="repo-fetcher__input" name="owner" placeholder="owner" value={owner} onChange={this.onHandleChange} />
          <span>/</span>
          <input className="repo-fetcher__input" name="repo" placeholder="repo" value={repo} onChange={this.onHandleChange} />
        </div>
        <input type="button" value="Update" onClick={this.onHandleUpdateClick} />
      </section>
    );
  }

  onHandleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  }

  async onHandleUpdateClick() {
    const { owner, repo } = this.state;
    const data = await loadRepositoryInfo(owner, repo);
    this.props.onFetch(data);
  }
};
