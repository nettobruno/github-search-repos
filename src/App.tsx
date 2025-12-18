import { useState } from 'react'
import { Search } from 'lucide-react'

import { Button } from './components/Button/Button'
import { Input } from './components/Input/Input'
import { ItemList } from './components/ItemList/ItemList'
import { ViewDetails } from './components/ViewDetails/ViewDetails'

import { useGithubRepositories } from './hooks/useGithubRepositories'
import styles from './App.module.css'

function App() {
  const [search, setSearch] = useState('')
  const [selectedRepositoryId, setSelectedRepositoryId] = useState<
    number | null
  >(null)

  const { repositories, loading, error, searchRepositories, fetchMore } =
    useGithubRepositories({ query: search })

  const selectedRepository = repositories.find(
    (repo) => repo.id === selectedRepositoryId,
  )

  return (
    <div className={styles.container}>
      <h1>GitHub Repositories Explorer</h1>

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

      {error && <p>{error}</p>}

      <div className={styles.grid}>
        <div>
          <h2>Repositórios</h2>

          <div className={styles.list}>
            {repositories.map((repo) => (
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
            ))}
          </div>

          {repositories.length > 0 && (
            <div className={styles.loadMore}>
              <Button onClick={fetchMore} disabled={loading}>
                {loading ? 'Carregando...' : 'Carregar mais'}
              </Button>
            </div>
          )}
        </div>

        <div>
          <h2>Detalhes</h2>

          <div className={styles.sticky}>
            {selectedRepository ? (
              <ViewDetails
                image={selectedRepository.owner.avatar_url}
                title={selectedRepository.name}
                fullName={selectedRepository.full_name}
                description={
                  selectedRepository.description ?? 'Sem descrição disponível.'
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
  )
}

export default App
