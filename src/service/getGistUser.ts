import { Octokit } from "@octokit/rest";

export const getGithubUsers = async () => {
  const octokit = new Octokit({
    auth: "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",
  });
  const result = await octokit.request("GET /gists/public");

  return result.data.map((user) => user);
};

export const getGithubUsersByUserID = async (username: string) => {
  const octokit = new Octokit({
    auth: "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",
  });
  const result = await octokit.request(`GET /users/${username}/gists`);

  return result.data.map((user: any) => user);
};
