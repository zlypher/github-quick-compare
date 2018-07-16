import React from "react";
import './RepositoryFetcher.css';

export const RepositoryFetcher = (props) => {
  const { owner, repo, onChange } = props;

  return (
    <section className="repo-fetcher">
      <input type="text" className="repo-fetcher__input repo-fetcher__input--left" name="owner" placeholder="owner" value={owner} onChange={onChange("owner")} />
      <div className="repo-fetcher__separator">/</div>
      <input type="text" className="repo-fetcher__input repo-fetcher__input--right" name="repo" placeholder="repo" value={repo} onChange={onChange("repo")} />
    </section>
  );
};

export default RepositoryFetcher;