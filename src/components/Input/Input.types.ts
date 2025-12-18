import type { InputHTMLAttributes, ComponentType } from 'react'
import type { LucideProps } from 'lucide-react'

/**
 * Props for the Input component.
 *
 * Extends native input attributes and optionally accepts
 * an icon component to be rendered inside the input field.
 */
export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: ComponentType<LucideProps>
}
