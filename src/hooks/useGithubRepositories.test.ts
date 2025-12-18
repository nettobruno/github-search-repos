import { renderHook, act, waitFor } from '@testing-library/react'
import { useGithubRepositories } from './useGithubRepositories'
import { githubApi } from '../services/githubApi'

jest.mock('../services/githubApi', () => ({
  githubApi: {
    get: jest.fn(),
  },
}))

const mockRepositories = [
  {
    id: 1,
    name: 'react',
    full_name: 'facebook/react',
  },
]

describe('useGithubRepositories', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('fetches repositories successfully', async () => {
    ;(githubApi.get as jest.Mock).mockResolvedValueOnce({
      data: {
        items: mockRepositories,
      },
    })

    const { result } = renderHook(() =>
      useGithubRepositories({ query: 'react' }),
    )

    await act(async () => {
      result.current.searchRepositories()
    })

    await waitFor(() => {
      expect(result.current.repositories).toHaveLength(1)
    })

    expect(result.current.loading).toBe(false)
    expect(result.current.error).toBeNull()
  })

  it('handles 401 authentication error', async () => {
    ;(githubApi.get as jest.Mock).mockRejectedValueOnce({
      isAxiosError: true,
      response: {
        status: 401,
      },
    })

    const { result } = renderHook(() =>
      useGithubRepositories({ query: 'react' }),
    )

    await act(async () => {
      result.current.searchRepositories()
    })

    await waitFor(() => {
      expect(result.current.error).toBe(
        'Falha de autenticação com a API do GitHub. Verifique o token.',
      )
    })
  })

  it('handles 403 forbidden error', async () => {
    ;(githubApi.get as jest.Mock).mockRejectedValueOnce({
      isAxiosError: true,
      response: {
        status: 403,
      },
    })

    const { result } = renderHook(() =>
      useGithubRepositories({ query: 'react' }),
    )

    await act(async () => {
      result.current.searchRepositories()
    })

    await waitFor(() => {
      expect(result.current.error).toBe(
        'Acesso negado ou limite de requisições do GitHub atingido.',
      )
    })
  })

  it('appends repositories when fetching more', async () => {
    ;(githubApi.get as jest.Mock)
      .mockResolvedValueOnce({
        data: { items: mockRepositories },
      })
      .mockResolvedValueOnce({
        data: {
          items: [{ id: 2, name: 'vue', full_name: 'vuejs/vue' }],
        },
      })

    const { result } = renderHook(() =>
      useGithubRepositories({ query: 'react' }),
    )

    await act(async () => {
      result.current.searchRepositories()
    })

    await act(async () => {
      result.current.fetchMore()
    })

    await waitFor(() => {
      expect(result.current.repositories).toHaveLength(2)
    })
  })

  it('does not update state when request is cancelled', async () => {
    ;(githubApi.get as jest.Mock).mockRejectedValueOnce({
      isAxiosError: true,
      name: 'CanceledError',
    })

    const { result } = renderHook(() =>
      useGithubRepositories({ query: 'react' }),
    )

    await act(async () => {
      result.current.searchRepositories()
    })

    expect(result.current.repositories).toHaveLength(0)
    expect(result.current.error).toBeNull()
  })

  it('shows error message when no repositories are found', async () => {
    ;(githubApi.get as jest.Mock).mockResolvedValueOnce({
      data: {
        items: [],
      },
    })

    const { result } = renderHook(() =>
      useGithubRepositories({ query: 'react' }),
    )

    await act(async () => {
      result.current.searchRepositories()
    })

    await waitFor(() => {
      expect(result.current.error).toBe(
        'Nenhum repositório encontrado para a busca informada. Tente uma busca diferente.',
      )
    })

    expect(result.current.repositories).toHaveLength(0)
  })

  it('does not fetch repositories when query is empty', async () => {
    const { result } = renderHook(() => useGithubRepositories({ query: '' }))

    await act(async () => {
      result.current.searchRepositories()
    })

    expect(githubApi.get).not.toHaveBeenCalled()
    expect(result.current.repositories).toHaveLength(0)
    expect(result.current.error).toBeNull()
  })
})
