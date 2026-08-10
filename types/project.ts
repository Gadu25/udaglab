export type ProjectStatus = 'live' | 'beta' | 'stale' | 'experiment'
export type ProjectCategory = 'web-app' | 'tool' | 'game' | 'experiment' | 'website'
export type LinkStatus = 'up' | 'down' | 'unknown'

export interface Project {
  name: string
  description: string
  url: string
  tech: string[]
  status: ProjectStatus
  category: ProjectCategory
  addedAt: string
  updatedAt: string
  githubUrl?: string
}

export interface ChangelogEntry {
  date: string
  title: string
  body: string
  project?: string
}