import { useCallback, useState } from 'react'
import { githubApi } from '../services/githubApi'
import type { GithubRepository } from '../types/github'

interface UseGithubRepositoriesParams {
  query: string
}

export function useGithubRepositories({ query }: UseGithubRepositoriesParams) {
  const [repositories, setRepositories] = useState<GithubRepository[]>([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchRepositories = useCallback(
    async (reset = false) => {
      if (!query) return

      try {
        setLoading(true)
        setError(null)

        const response = await githubApi.get('/search/repositories', {
          params: {
            q: query,
            sort: 'stars',
            order: 'desc',
            per_page: 10,
            page: reset ? 1 : page,
          },
        })

        setRepositories((prev) =>
          reset ? response.data.items : [...prev, ...response.data.items],
        )

        setPage((prev) => prev + 1)
      } catch {
        setError('Erro ao buscar repositórios')
      } finally {
        setLoading(false)
      }
    },
    [query, page],
  )

  const searchRepositories = () => {
    setPage(1)
    setRepositories([])
    fetchRepositories(true)
  }

  return {
    repositories,
    loading,
    error,
    searchRepositories,
    fetchMore: () => fetchRepositories(),
  }
}
