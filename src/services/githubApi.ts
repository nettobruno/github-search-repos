import axios from 'axios'
import { env } from '../config/env'

export const githubApi = axios.create({
  baseURL: env.githubApiUrl,
  headers: {
    Accept: 'application/vnd.github+json',
    Authorization: env.githubToken ? `Bearer ${env.githubToken}` : undefined,
  },
})
