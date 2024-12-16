import axiosApiClient from '@/lib/apiClient'
import { useAuth } from '@clerk/nextjs'

export default function useFetch() {
  const { getToken } = useAuth()

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const authenticatedFetch = async (...args: any) => {
    return axiosApiClient(args, {
      headers: { Authorization: `Bearer ${await getToken()}` },
    })
  }

  return authenticatedFetch
}