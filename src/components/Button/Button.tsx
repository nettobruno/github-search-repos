import type { ButtonProps } from './Button.types'
import styles from './Button.module.css'

export function Button({ children, isFull = false, ...props }: ButtonProps) {
  return (
    <button className={`${styles.button} ${isFull ? styles.full : ''}`} {...props}>
      {children}
    </button>
  )
}
