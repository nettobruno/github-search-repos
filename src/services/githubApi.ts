import axios from 'axios'
import { env } from '../config/env'


/**
 * Axios instance configured specifically for GitHub API requests.
 *
 * Centralizes base URL and default headers, making the HTTP client
 * reusable and easier to maintain and test.
 */
export const githubApi = axios.create({
  baseURL: env.githubApiUrl,
  headers: {
    // Required header to use the GitHub REST API
    Accept: 'application/vnd.github+json',

    // Optional authentication token to increase rate limits
    Authorization: env.githubToken ? `Bearer ${env.githubToken}` : undefined,
  },
})
