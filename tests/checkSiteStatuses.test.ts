import { afterEach, describe, it, expect, vi } from 'vitest'
import { checkSiteStatuses } from '../server/utils/checkSiteStatuses'

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('checkSiteStatuses', () => {
  it('returns up for a reachable url', async () => {
    vi.stubGlobal('fetch', vi.fn(async () => ({ ok: true })))
    const result = await checkSiteStatuses(['https://example.com'])
    expect(result).toEqual({ 'https://example.com': 'up' })
  })

  it('returns down for a responding but non-ok url', async () => {
    vi.stubGlobal('fetch', vi.fn(async () => ({ ok: false })))
    const result = await checkSiteStatuses(['https://example.com'])
    expect(result).toEqual({ 'https://example.com': 'down' })
  })

  it('returns unknown when fetch throws', async () => {
    vi.stubGlobal('fetch', vi.fn(async () => { throw new Error('network down') }))
    const result = await checkSiteStatuses(['https://example.com'])
    expect(result).toEqual({ 'https://example.com': 'unknown' })
  })

  it('keeps a result per url', async () => {
    const mock = vi.fn(async () => ({ ok: true }))
    vi.stubGlobal('fetch', mock)
    const result = await checkSiteStatuses(['https://a.com', 'https://b.com'])
    expect(Object.keys(result)).toHaveLength(2)
    expect(mock).toHaveBeenCalledTimes(2)
  })
})