import type { ToolFn } from '../../types'
import { z } from 'zod'
import { queryMovies } from '../rag/query'

export const movieSearchToolDefinition = {
  name: 'movieSearch',
  description:
    'Searches for movies and information about them, including title, year, genre, director, actors, rating, and description. Use this to answer questions about movies.',
  parameters: z.object({
    query: z
      .string()
      .describe('The query used for searching movies in a vector database'),
  }),
}

type Args = z.infer<typeof movieSearchToolDefinition.parameters>

export const movieSearchTool: ToolFn<Args> = async ({
  userMessage,
  toolArgs,
}) => {
  try {
    const results = await queryMovies({
      query: toolArgs.query,
      topK: 10,
    })

    const formattedResults = results.map((match) => {
      const { metadata, data } = match
      return { ...metadata, description: data }
    })

    return JSON.stringify(formattedResults, null, 2)
  } catch (error) {
    console.error(error)
    return 'Error: could not query the movie database'
  }
}
