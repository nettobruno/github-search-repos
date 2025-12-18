import { useCallback, useRef, useState } from 'react'
import axios from 'axios'
import { githubApi } from '../services/githubApi'
import type { GithubRepository } from '../types/github'

interface UseGithubRepositoriesParams {
  query: string
}

/**
 * Custom hook responsible for fetching GitHub repositories
 * based on a search query, handling pagination, loading state,
 * error handling and request cancellation.
 */
export function useGithubRepositories({ query }: UseGithubRepositoriesParams) {
  // Stores the list of fetched repositories
  const [repositories, setRepositories] = useState<GithubRepository[]>([])

  // Controls the current page used for pagination
  const [page, setPage] = useState(1)

  // Indicates whether a request is currently in progress
  const [loading, setLoading] = useState(false)

  // Stores any error message to be displayed to the user
  const [error, setError] = useState<string | null>(null)

  // Keeps track of the current AbortController to cancel in-flight requests
  const abortControllerRef = useRef<AbortController | null>(null)

  /**
   * Fetches repositories from the GitHub API.
   *
   * @param pageToFetch - The page number to be requested
   * @param reset - Indicates whether this is a new search or pagination
   */
  const fetchRepositories = useCallback(
    async (pageToFetch: number, reset = false) => {
      // Do not perform a request if there is no search query
      if (!query) return

      // Cancel any previous request to avoid race conditions
      abortControllerRef.current?.abort()
      const controller = new AbortController()
      abortControllerRef.current = controller

      try {
        setLoading(true)
        setError(null)

        const response = await githubApi.get('/search/repositories', {
          signal: controller.signal,
          params: {
            q: query,
            sort: 'stars',
            order: 'desc',
            per_page: 10,
            page: pageToFetch,
          },
        })

        // Handle successful responses with no results
        if (response.data.items.length === 0) {
          setError('Nenhum repositório encontrado para a busca informada. Tente uma busca diferente.')
          return
        }

        // Replace the list on a new search or append on pagination
        setRepositories((prev) =>
          reset ? response.data.items : [...prev, ...response.data.items],
        )

        // Increment page only after a successful request
        setPage(pageToFetch + 1)
      } catch (err: unknown) {
        // Handle Axios-specific errors
        if (axios.isAxiosError(err)) {
          // Ignore canceled requests
          if (err.name === 'CanceledError') return

          const status = err.response?.status

          if (status === 401) {
            setError(
              'Falha de autenticação com a API do GitHub. Verifique o token.',
            )
            return
          }

          if (status === 403) {
            setError(
              'Acesso negado ou limite de requisições do GitHub atingido.',
            )
            return
          }

          if (status === 422) {
            setError('A busca informada é inválida.')
            return
          }

          setError('Erro ao buscar repositórios. Tente novamente mais tarde.')
        } else {
          // Fallback for unexpected errors
          setError('Erro inesperado. Tente novamente mais tarde.')
        }
      } finally {
        setLoading(false)
      }
    },
    [query],
  )

  /**
   * Starts a new search by resetting state and fetching the first page.
   */
  const searchRepositories = useCallback(() => {
    setRepositories([])
    setPage(1)
    fetchRepositories(1, true)
  }, [fetchRepositories])

  /**
   * Fetches the next page of repositories (pagination).
   */
  const fetchMore = useCallback(() => {
    fetchRepositories(page)
  }, [fetchRepositories, page])

  return {
    repositories,
    loading,
    error,
    searchRepositories,
    fetchMore,
  }
}
