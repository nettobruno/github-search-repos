/**
 * Centralized environment variables access.
 *
 * This file exists to avoid direct usage of `import.meta.env`
 * across the application and to prevent issues when running
 * tests in environments like Jest.
 */
export const env = {
  githubApiUrl: import.meta.env.VITE_GITHUB_API_URL,
  githubToken: import.meta.env.VITE_GITHUB_TOKEN,
}
