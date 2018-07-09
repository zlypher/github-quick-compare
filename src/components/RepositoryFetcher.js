import React, { Component } from "react";
import './RepositoryFetcher.css';

const getRepoUrl = (owner, repo) => `https://api.github.com/repos/${owner}/${repo}`;

const loadRepositoryInfo = async (owner, repo) => {
    const response = await fetch(getRepoUrl(owner, repo));
    return await response.json();
}

export default class RepositoryFetcher extends Component  {
    constructor(props) {
        super(props);
        this.state = {
            owner: "",
            repo: "",
        };

        this.onHandleOwnerChange = this.onHandleOwnerChange.bind(this);
        this.onHandleRepoChange = this.onHandleRepoChange.bind(this);
        this.onHandleUpdateClick = this.onHandleUpdateClick.bind(this);
    }

    render() {
        const { owner, repo } = this.state;

        return (
            <section className="repo-fetcher">
                <div>
                    <input name="owner" placeholder="owner" value={owner} onChange={this.onHandleOwnerChange} />
                    <span>/</span>
                    <input name="repo" placeholder="repo" value={repo} onChange={this.onHandleRepoChange} />
                </div>
                <input type="button" value="Update" onClick={this.onHandleUpdateClick} />
            </section>
        );
    }

    onHandleOwnerChange(evt) {
        this.setState({
            owner: evt.target.value,
        });
    }

    onHandleRepoChange(evt) {
        this.setState({
            repo: evt.target.value,
        });
    }

    async onHandleUpdateClick() {
        const { owner, repo } = this.state;
        const data = await loadRepositoryInfo(owner, repo);
        this.props.onFetch(data);
    }
};
