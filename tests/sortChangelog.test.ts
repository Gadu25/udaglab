import { describe, it, expect } from 'vitest'
import { sortChangelogNewestFirst } from '../utils/sortChangelog'
import type { ChangelogEntry } from '../types/project'

const entries: ChangelogEntry[] = [
  { date: '2026-02-01', title: 'Added API-Hub', body: 'New entry.' },
  { date: '2026-01-15', title: 'Updated Passkeep', body: 'Polished UI.' },
  { date: '2026-03-01', title: 'CatchThemAll released', body: 'Beta.' },
]

describe('sortChangelogNewestFirst', () => {
  it('sorts entries newest-first by date', () => {
    expect(sortChangelogNewestFirst(entries).map((e) => e.title)).toEqual([
      'CatchThemAll released',
      'Added API-Hub',
      'Updated Passkeep',
    ])
  })

  it('does not mutate the input array', () => {
    const copy = [...entries]
    sortChangelogNewestFirst(entries)
    expect(entries).toEqual(copy)
  })
})