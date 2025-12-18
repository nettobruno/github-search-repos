/**
 * Shared types for the Button component.
 *
 * Defines a polymorphic button interface that allows rendering
 * different HTML elements while preserving proper typing.
 */
import type { ReactNode, ElementType, ComponentProps } from 'react'

export type PolymorphicProps<E extends ElementType> = {
  as?: E
  children?: ReactNode
} & Omit<ComponentProps<E>, 'as' | 'children'>

export type ButtonBaseProps = {
  disabled?: boolean
  children: ReactNode
  isFull?: boolean
}

export type ButtonProps<E extends ElementType = 'button'> = ButtonBaseProps &
  PolymorphicProps<E>
