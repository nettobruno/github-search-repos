import type { InputHTMLAttributes, ComponentType } from 'react'
import type { LucideProps } from 'lucide-react'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: ComponentType<LucideProps>
}
