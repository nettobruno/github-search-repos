import type { ItemListProps } from './ItemList.types'
import styles from './ItemList.module.css'

/**
 * ItemList component.
 *
 * Displays a summary of a GitHub repository including image,
 * title, metadata and selection state. Designed to be used
 * as a clickable item inside a list.
 */
export function ItemList({
  image,
  title,
  fullName,
  language,
  stars,
  isSelected = false,
  onClick,
}: ItemListProps) {
  return (
    <div
      className={`${styles.container} ${isSelected ? styles.selected : ''}`}
      onClick={onClick}
      role="button"
    >
      <div className={styles.imageWrapper}>
        <img src={image} alt={title} className={styles.image} />
      </div>

      <div className={styles.content}>
        <div className={styles.header}>
          <h3 className={styles.title}>{title}</h3>
          <p className={styles.fullName}>{fullName}</p>
        </div>

        <div className={styles.footer}>
          <div className={styles.infoItem}>
            <span className={styles.label}>Linguagem:</span>
            <span className={styles.value}>
              {language || 'Não especificada'}
            </span>
          </div>
          <div className={styles.infoItem}>
            <span className={styles.label}>⭐</span>
            <span className={styles.value}>
              {stars.toLocaleString('pt-BR')}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
