import axios from 'axios'

export const githubApi = axios.create({
  baseURL: import.meta.env.VITE_GITHUB_API_URL,
  headers: {
    Accept: 'application/vnd.github+json',
    Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
  },
})
