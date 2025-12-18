import type { ViewDetailsProps } from './ViewDetails.types'
import styles from './ViewDetails.module.css'
import { Star, GitFork } from 'lucide-react'

export function ViewDetails({
  image,
  title,
  fullName,
  description,
  language,
  stars,
  forks,
  lastUpdate,
  repositoryUrl,
}: ViewDetailsProps) {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.imageWrapper}>
          <img src={image} alt={title} className={styles.image} />
        </div>

        <div className={styles.headerContent}>
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.fullName}>{fullName}</p>
        </div>
      </div>

      <p className={styles.description}>{description}</p>

      <div className={styles.stats}>
        <div className={styles.statItem}>
          <span className={styles.statIcon}>
            <Star />
          </span>
          <span className={styles.statText}>
            {stars.toLocaleString('pt-BR')}
          </span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statIcon}>
            <GitFork />
          </span>
          <span className={styles.statText}>
            {forks.toLocaleString('pt-BR')}
          </span>
        </div>
      </div>

      <div className={styles.info}>
        <div className={styles.infoRow}>
          <span className={styles.infoLabel}>Language:</span>
          <span className={styles.infoValue}>
            {language || 'Não especificada'}
          </span>
        </div>
        <div className={styles.infoRow}>
          <span className={styles.infoLabel}>Última atualização:</span>
          <span className={styles.infoValue}>
            {new Date(lastUpdate).toLocaleDateString('pt-BR')}
          </span>
        </div>
      </div>

      <div className={styles.buttonContainer}>
        <a
          href={repositoryUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.linkButton}
        >
          Abrir repositório
        </a>
      </div>
    </div>
  )
}
