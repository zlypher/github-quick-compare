import React, { Component } from "react";
import RepositoryFetcher from "./RepositoryFetcher";
import { getRepositoryInfo } from "../services/github-service";
import './Comparer.css';

const dateFormat = new Intl.DateTimeFormat();

export class Comparer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      first: null,
      second: null,
      input: {
        first: { owner: "", repo: "" },
        second: { owner: "", repo: "" },
      },
    };

    this.onFetcherChange = this.onFetcherChange.bind(this);
    this.onCompareRepositories = this.onCompareRepositories.bind(this);
  }

  render() {
    const { first, second, input } = this.state;

    return (
      <section className="comparer">
        <h1>Comparer</h1>
        <div className="comparer__input">
          <h2>1. Select first repository</h2>
          <RepositoryFetcher owner={input.first.owner} repo={input.first.repo} onChange={this.onFetcherChange("first")} />
          <h2>2. Select second repository</h2>
          <RepositoryFetcher owner={input.second.owner} repo={input.second.repo} onChange={this.onFetcherChange("second")} />
          <button onClick={this.onCompareRepositories}>
            3. Compare!
          </button>
        </div>
        <div className="container comparer__wrapper">
          <table className="comparer__table">
            <thead>
              <tr>
                <th className="comparer__head">{first && first.name}</th>
                <th className="comparer__item--title comparer__head">Name</th>
                <th className="comparer__head">{second && second.name}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="comparer__item comparer__item--normal">{first && first.homepage}</td>
                <td className="comparer__item comparer__item--title">Homepage</td>
                <td className="comparer__item comparer__item--normal">{second && second.homepage}</td>
              </tr>
              <tr>
                <td className="comparer__item comparer__item--normal">{first && first.stargazers_count}</td>
                <td className="comparer__item comparer__item--title">Stars</td>
                <td className="comparer__item comparer__item--normal">{second && second.stargazers_count}</td>
              </tr>
              <tr>
                <td className="comparer__item comparer__item--normal">{first && first.watchers}</td>
                <td className="comparer__item comparer__item--title">Watchers</td>
                <td className="comparer__item comparer__item--normal">{second && second.watchers}</td>
              </tr>
              <tr>
                <td className="comparer__item comparer__item--normal">{first && first.forks}</td>
                <td className="comparer__item comparer__item--title">Forks</td>
                <td className="comparer__item comparer__item--normal">{second && second.forks}</td>
              </tr>
              <tr>
                <td className="comparer__item comparer__item--normal">{first && dateFormat.format(new Date(first.updated_at))}</td>
                <td className="comparer__item comparer__item--title">Last Update</td>
                <td className="comparer__item comparer__item--normal">{second && dateFormat.format(new Date(second.updated_at))}</td>
              </tr>
              <tr>
                <td className="comparer__item comparer__item--normal">{first && first.license && first.license.name}</td>
                <td className="comparer__item comparer__item--title">License</td>
                <td className="comparer__item comparer__item--normal">{second && second.license && second.license.name}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    );
  }

  onFetcherChange(type) {
    return (field) => (evt) => {
      this.setState({
        input: {
          ...this.state.input,
          [type]: {
            ...this.state.input[type],
            [field]: evt.target.value,
          },
        },
      });
    }
  }

  async onCompareRepositories() {
    const { input } = this.state;
    const [first, second] = await Promise.all([
      getRepositoryInfo(input.first.owner, input.first.repo),
      getRepositoryInfo(input.second.owner, input.second.repo),
    ]);

    this.setState({
      first,
      second,
    })
  }
};

export default Comparer;
