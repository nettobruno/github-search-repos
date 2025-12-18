import type { ButtonProps } from './Button.types'
import styles from './Button.module.css'

/**
 * Reusable polymorphic Button component.
 *
 * Supports rendering different HTML elements (e.g. button or anchor)
 * while handling accessibility concerns and disabled behavior consistently.
 */
export function Button<E extends React.ElementType = 'button'>({
  as,
  children,
  isFull = false,
  disabled = false,
  ...props
}: ButtonProps<E>) {
  // Determines which element should be rendered
  const PolymorphicComponent = as || 'button'
  const isLink = PolymorphicComponent === 'a'

  /**
   * Accessibility handling:
   * - Anchors do not support the disabled attribute
   * - When rendered as a link, disabled state is simulated
   *   using aria-disabled, tabIndex and click prevention
   */
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
