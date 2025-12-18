/**
 * Props for the ItemList component.
 *
 * Represents the minimum set of repository data required
 * to render a clickable list item with basic metadata.
 */
export interface ItemListProps {
  image: string
  title: string
  fullName: string
  language: string
  stars: number
  isSelected?: boolean
  onClick?: () => void
}
