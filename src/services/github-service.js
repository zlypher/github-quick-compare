const getRepoUrl = (owner, repo) => `https://api.github.com/repos/${owner}/${repo}`;

export const getRepositoryInfo = async (owner, repo) => {
  const response = await fetch(getRepoUrl(owner, repo));
  return await response.json();
}
