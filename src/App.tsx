import { useEffect, useState } from 'react'
import { Search } from 'lucide-react'
import { ToastContainer, toast } from 'react-toastify'

import { Button } from './components/Button/Button'
import { Input } from './components/Input/Input'
import { ItemList } from './components/ItemList/ItemList'
import { ViewDetails } from './components/ViewDetails/ViewDetails'

import { useGithubRepositories } from './hooks/useGithubRepositories'
import styles from './App.module.css'

/**
 * Main application component.
 *
 * Responsible for handling user interactions, coordinating data fetching,
 * managing selected repository state and rendering the main layout.
 */
function App() {
  // Stores the current search query typed by the user
  const [search, setSearch] = useState('')

  // Stores the ID of the currently selected repository
  const [selectedRepositoryId, setSelectedRepositoryId] = useState<
    number | null
  >(null)

  // Custom hook that handles GitHub repository fetching logic
  const { repositories, loading, error, searchRepositories, fetchMore } =
    useGithubRepositories({ query: search })

  // Finds the currently selected repository based on its ID
  const selectedRepository = repositories.find(
    (repo) => repo.id === selectedRepositoryId,
  )

  /**
   * Displays error messages using toast notifications
   * whenever an error is returned from the data fetching hook.
   */
  useEffect(() => {
    if (error) {
      toast.error(error)
    }
  }, [error])

  return (
    <>
      <div className={styles.container}>
        <h1 className={styles.title}>Explore repositórios no GitHub</h1>

        {/* Search input and action button */}
        <div className={styles.search}>
          <Input
            icon={Search}
            placeholder="Pesquisar repositórios..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Button onClick={searchRepositories} disabled={!search || loading}>
            Buscar
          </Button>
        </div>

        <div className={styles.grid}>
          {/* Repositories list section */}
          <div>
            <h2 className={styles.titleSection}>Repositórios</h2>

            <div className={styles.list}>
              {repositories.length > 0 ? (
                repositories.map((repo) => (
                  <ItemList
                    key={repo.id}
                    image={repo.owner.avatar_url}
                    title={repo.name}
                    fullName={repo.full_name}
                    language={repo.language ?? 'Não especificada'}
                    stars={repo.stargazers_count}
                    isSelected={selectedRepositoryId === repo.id}
                    onClick={() => setSelectedRepositoryId(repo.id)}
                  />
                ))
              ) : (
                <div className={styles.empty}>
                  Digite um termo e clique em buscar para listar repositórios
                </div>
              )}
            </div>

            {/* Load more button for pagination */}
            {repositories.length > 0 && (
              <div className={styles.loadMore}>
                <Button isFull onClick={fetchMore} disabled={loading}>
                  {loading ? 'Carregando...' : 'Carregar mais'}
                </Button>
              </div>
            )}
          </div>

          {/* Repository details section */}
          <div>
            <h2 className={styles.titleSection}>Detalhes</h2>

            <div className={styles.sticky}>
              {selectedRepository ? (
                <ViewDetails
                  image={selectedRepository.owner.avatar_url}
                  title={selectedRepository.name}
                  fullName={selectedRepository.full_name}
                  description={
                    selectedRepository.description ??
                    'Sem descrição disponível.'
                  }
                  language={selectedRepository.language ?? 'Não especificada'}
                  stars={selectedRepository.stargazers_count}
                  forks={selectedRepository.forks_count}
                  lastUpdate={selectedRepository.updated_at}
                  repositoryUrl={selectedRepository.html_url}
                />
              ) : (
                <div className={styles.empty}>
                  Selecione um repositório para ver os detalhes
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Toast container used to display feedback messages */}
      <ToastContainer />
    </>
  )
}

export default App
