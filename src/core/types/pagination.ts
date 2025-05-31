export type PaginationParams<T = unknown> = {
  page: number
  limit?: number
} & T

export type PaginationResponse<T> = {
  data: T[]
  hasMore: boolean
  total: number
  limit: number
}
