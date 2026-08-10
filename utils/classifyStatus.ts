import type { LinkStatus } from '../types/project'

export function classifyStatus(ok: boolean | null): LinkStatus {
  return ok === true ? 'up' : ok === false ? 'down' : 'unknown'
}