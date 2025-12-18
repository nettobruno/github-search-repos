import { useCallback, useRef, useState } from 'react'
import axios from 'axios'
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

  const abortControllerRef = useRef<AbortController | null>(null)

  const fetchRepositories = useCallback(
    async (pageToFetch: number, reset = false) => {
      if (!query) return

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

        if (response.data.items.length === 0) {
          setError('Nenhum repositório encontrado para a busca informada. Tente uma busca diferente.')
          return
        }

        setRepositories((prev) =>
          reset ? response.data.items : [...prev, ...response.data.items],
        )

        setPage(pageToFetch + 1)
      } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
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
          setError('Erro inesperado. Tente novamente mais tarde.')
        }
      } finally {
        setLoading(false)
      }
    },
    [query],
  )

  const searchRepositories = useCallback(() => {
    setRepositories([])
    setPage(1)
    fetchRepositories(1, true)
  }, [fetchRepositories])

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
