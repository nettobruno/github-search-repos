import type { ButtonProps } from './Button.types'
import styles from './Button.module.css'

export function Button<E extends React.ElementType = 'button'>({
  as,
  children,
  isFull = false,
  disabled = false,
  ...props
}: ButtonProps<E>) {
  const PolymorphicComponent = as || 'button'
  const isLink = PolymorphicComponent === 'a'

  const accessibilityProps = isLink
    ? {
        'aria-disabled': disabled,
        role: 'link',
        tabIndex: disabled ? -1 : 0,
        onClick: (e: React.MouseEvent) => {
          if (disabled) {
            e.preventDefault()
            return
          }
          if (props.onClick) props.onClick(e)
        },
      }
    : { role: 'button', disabled }

  return (
    <PolymorphicComponent
      {...props}
      {...accessibilityProps}
      className={`${styles.button} ${isFull ? styles.full : ''}`}
    >
      {children}
    </PolymorphicComponent>
  )
}
