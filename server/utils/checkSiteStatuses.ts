import { classifyStatus } from '../../utils/classifyStatus'
import type { LinkStatus } from '../../types/project'

const TIMEOUT_MS = 5000
const REQUEST_HEADERS = { 'User-Agent': 'UdagLab-StatusBot/1.0' }

async function probe(url: string): Promise<boolean | null> {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS)
  try {
    let res = await fetch(url, { method: 'HEAD', redirect: 'follow', signal: controller.signal, headers: REQUEST_HEADERS })
    if (!res.ok) {
      res = await fetch(url, { method: 'GET', redirect: 'follow', signal: controller.signal, headers: REQUEST_HEADERS })
    }
    return res.ok
  } catch {
    return null
  } finally {
    clearTimeout(timeout)
  }
}

export async function checkSiteStatuses(urls: string[]): Promise<Record<string, LinkStatus>> {
  const result: Record<string, LinkStatus> = {}
  await Promise.all(
    urls.map(async (url) => {
      result[url] = classifyStatus(await probe(url))
    }),
  )
  return result
}