export interface ItemListProps {
  image: string
  title: string
  fullName: string
  language: string
  stars: number
  isSelected?: boolean
  onClick?: () => void
}
