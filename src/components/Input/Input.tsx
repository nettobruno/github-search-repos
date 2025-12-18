import type { InputProps } from './Input.types'
import styles from './Input.module.css'

/**
 * Reusable Input component with optional leading icon support.
 *
 * The icon is purely decorative and does not interfere with
 * input interactions or accessibility.
 */
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
