/**
 * Represents a partial GitHub repository object returned by the GitHub Search API.
 *
 * Only the fields used by the application are included here,
 * keeping the type definition simple and easier to maintain.
 */
export interface GithubRepository {
  id: number
  name: string
  full_name: string
  description: string | null
  html_url: string
  stargazers_count: number
  forks_count: number
  language: string | null
  updated_at: string
  owner: {
    avatar_url: string
  }
}
