import React, { Component } from "react";
import RepositoryFetcher from "./RepositoryFetcher";
import './Comparer.css';

const dateFormat = new Intl.DateTimeFormat();

export class Comparer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      first: null,
      second: null
    };

    this.onRepoFetch = this.onRepoFetch.bind(this);
  }

  render() {
    const { first, second } = this.state;

    return (
      <section className="comparer">
        <h1>Comparer</h1>
        <div className="comparer__input">
          <RepositoryFetcher onFetch={this.onRepoFetch("first")} />
          <RepositoryFetcher onFetch={this.onRepoFetch("second")} />
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

  onRepoFetch(type) {
    return (data) => {
      console.log(data);
      this.setState({
        [type]: data,
      });
    }
  }
};

export default Comparer;
