import React, { Component } from "react";
import RepositoryFetcher from "./RepositoryFetcher";
import { getRepositoryInfo } from "../services/github-service";
import './Comparer.css';

const dateFormat = new Intl.DateTimeFormat();

const getShareUrl = (first, second) => {
  const { origin, pathname } = window.location;

  const firstId = `${first.owner}/${first.repo}`;
  const secondId = `${second.owner}/${second.repo}`;

  return `${origin}${pathname}?first=${firstId}&second=${secondId}`;
};

const hasPrefilledInput = (input) => {
  const { first, second } = input;

  if (first.owner !== "" && first.repo !== "") {
    return true;
  }

  if (second.owner !== "" && second.repo !== "") {
    return true;
  }

  return false;
}

export class Comparer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      first: null,
      second: null,
      input: {
        first: props.first || { owner: "", repo: "" },
        second: props.second || { owner: "", repo: "" },
      },
    };

    this.onFetcherChange = this.onFetcherChange.bind(this);
    this.onCompareRepositories = this.onCompareRepositories.bind(this);
  }

  componentDidMount() {
    const { input } = this.state;
    if (hasPrefilledInput(input)) {
      this.onCompareRepositories();
    }
  }

  render() {
    const { first, second, input } = this.state;
    const hasResult = !!first || !!second;
    const shareUrl = hasResult ? getShareUrl(input.first, input.second) : null;

    return (
      <section className="comparer">
        <div className="comparer__input">
          <h2>1. Select first repository</h2>
          <RepositoryFetcher owner={input.first.owner} repo={input.first.repo} onChange={this.onFetcherChange("first")} />
          <h2>2. Select second repository</h2>
          <RepositoryFetcher owner={input.second.owner} repo={input.second.repo} onChange={this.onFetcherChange("second")} />
          <button className="comparer__button" onClick={this.onCompareRepositories}>
            3. Compare!
          </button>
        </div>
        <div className="container comparer__wrapper">
          <table className="comparer__table">
            <thead>
              <tr>
                <th className="comparer__head">
                  {first && (
                    <a href={first.homepage} target="_blank">
                      {first.name}
                    </a>
                  )}
                </th>
                <th className="comparer__item--title comparer__head">Name</th>
                <th className="comparer__head">
                  {second && (
                    <a href={second.homepage} target="_blank">
                      {second.name}
                    </a>
                  )}
                </th>
              </tr>
            </thead>
            <tbody>
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
                <td className="comparer__item comparer__item--normal">{first && first.forks + 123456}</td>
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
        {shareUrl && (
          <div>Share this compare view via <a href={shareUrl} target="_blank">{shareUrl}</a></div>
        )}
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

    const newState = {};

    if (first.success) {
      newState.first = first.data;
    }

    if (second.success) {
      newState.second = second.data;
    }

    this.setState(newState);
  }
};

export default Comparer;
