import type { LinkStatus } from '../types/project'

export const useSiteStatuses = () => {
  const { data } = useFetch<Record<string, LinkStatus>>('/statuses.json', {
    default: () => ({}),
    ignoreResponseError: true,
  })
  return { statuses: data }
}