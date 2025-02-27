import { Index as UpstashIndex } from '@upstash/vector'

const index = new UpstashIndex({
  url: process.env.UPSTASH_VECTOR_REST_URL,
  token: process.env.UPSTASH_VECTOR_REST_TOKEN,
})

export const queryMovies = async ({
  query,
  filters,
  topK = 10,
}: {
  query: string
  filters?: any
  topK?: number
}) => {
  return index.query({
    data: query,
    topK: topK,
    includeMetadata: true,
    includeData: true,
  })
}
