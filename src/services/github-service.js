const getRepoUrl = (owner, repo) => `https://api.github.com/repos/${owner}/${repo}`;

export const getRepositoryInfo = async (owner, repo) => {
  const response = await fetch(getRepoUrl(owner, repo));
  if (!response.ok) {
    return {
      success: false,
    };
  }

  return {
    success: true,
    data: await response.json(),
  };
}
