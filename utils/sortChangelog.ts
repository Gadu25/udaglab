import type { ChangelogEntry } from '../types/project'

export function sortChangelogNewestFirst(entries: ChangelogEntry[]): ChangelogEntry[] {
  return [...entries].sort((a, b) => +new Date(b.date) - +new Date(a.date))
}