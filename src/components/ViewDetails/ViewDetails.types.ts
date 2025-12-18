/**
 * Props for the ViewDetails component.
 *
 * Represents the data required to display detailed
 * information about a GitHub repository.
 */
export interface ViewDetailsProps {
  image: string
  title: string
  fullName: string
  description: string
  language: string
  stars: number
  forks: number
  lastUpdate: string
  repositoryUrl: string
}
