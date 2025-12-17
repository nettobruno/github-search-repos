import type { ButtonProps } from './Button.types'
import styles from './Button.module.css'

export function Button({ children, ...props }: ButtonProps) {
  return (
    <button className={styles.button} {...props}>
      {children}
    </button>
  )
}
