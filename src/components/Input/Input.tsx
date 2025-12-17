import type { InputProps } from './Input.types'
import styles from './Input.module.css'

export function Input({ icon: Icon, ...props }: InputProps) {
  return (
    <div className={`${styles.wrapper} ${Icon ? styles.withIcon : ''}`}>
      {Icon && (
        <span className={styles.icon} aria-hidden="true">
          <Icon width={18} height={18} />
        </span>
      )}

      <input className={styles.input} {...props} />
    </div>
  )
}
