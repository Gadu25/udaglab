import { describe, it, expect } from 'vitest'
import { filterProjects } from '../utils/filterProjects'
import type { Project } from '../types/project'

const base: Project[] = [
  {
    name: 'API-Hub',
    description: 'Integrates multiple public APIs',
    url: 'https://api-hub-seven.vercel.app/',
    tech: ['Nuxt', 'Tailwind', 'Sass'],
    status: 'stale',
    category: 'web-app',
    addedAt: '2024-06-01',
    updatedAt: '2024-07-15',
  },
  {
    name: 'CatchThemAll',
    description: 'Pokemon-themed catching app',
    url: 'https://catch-them-all-eta.vercel.app/',
    tech: ['Nuxt', 'Tailwind', 'Sass'],
    status: 'beta',
    category: 'web-app',
    addedAt: '2024-07-01',
    updatedAt: '2024-08-10',
  },
  {
    name: 'Passkeep',
    description: 'A secure password manager',
    url: 'https://passkeep-five.vercel.app/',
    tech: ['Next.js', 'Tailwind', 'Firebase'],
    status: 'live',
    category: 'tool',
    addedAt: '2024-05-01',
    updatedAt: '2024-08-01',
  },
]

describe('filterProjects', () => {
  it('returns all projects when no filters are supplied', () => {
    expect(filterProjects(base, {})).toHaveLength(3)
  })

  it('filters by status', () => {
    expect(filterProjects(base, { status: 'live' }).map((p) => p.name)).toEqual(['Passkeep'])
    expect(filterProjects(base, { status: 'all' })).toHaveLength(3)
  })

  it('filters by category', () => {
    expect(filterProjects(base, { category: 'tool' }).map((p) => p.name)).toEqual(['Passkeep'])
  })

  it('filters by query across name, tech, and description (case-insensitive)', () => {
    expect(filterProjects(base, { query: 'nuxt' }).map((p) => p.name)).toEqual(['API-Hub', 'CatchThemAll'])
    expect(filterProjects(base, { query: 'PASSKEEP' }).map((p) => p.name)).toEqual(['Passkeep'])
    expect(filterProjects(base, { query: 'firebase' }).map((p) => p.name)).toEqual(['Passkeep'])
  })

  it('combines status + category + query filters', () => {
    expect(filterProjects(base, { status: 'stale', category: 'web-app', query: 'api' })).toHaveLength(1)
  })

  it('returns an empty array when nothing matches', () => {
    expect(filterProjects(base, { query: 'zzz' })).toHaveLength(0)
  })

  it('does not mutate the input array', () => {
    const copy = [...base]
    filterProjects(base, { status: 'stale' })
    expect(base).toEqual(copy)
  })
})