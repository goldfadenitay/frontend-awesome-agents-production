import type { Scorer } from 'autoevals'

export const toolCallMatch: Scorer<any, {}> = async ({
  input,
  output,
  expected,
}) => {
  const score =
    output.role === 'assistant' &&
    Array.isArray(output.tool_calls) &&
    output.tool_calls[0].function?.name == expected.tool_calls[0].function?.name

  return {
    name: 'toolCallMatch',
    score: score ? 1 : 0,
  }
}
