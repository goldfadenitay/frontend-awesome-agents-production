import { runLLM } from '../../src/llm'
import { dadJokeToolDefinition } from '../../src/tools/dadJoke'
import { runEval } from '../evalTools'
import { toolCallMatch } from '../scorers'

const createTooMessage = (toolName: string) => ({
  role: 'assistant',
  tool_calls: [
    {
      type: 'function',
      function: { name: toolName },
    },
  ],
})

runEval('dadJoke', {
  task: async (input) =>
    runLLM({
      messages: [
        {
          role: 'user',
          content: input,
        },
      ],
      tools: [dadJokeToolDefinition],
    }),
  data: [
    {
      input: 'Tell me a funny data joke',
      expected: createTooMessage(dadJokeToolDefinition.name),
    },
  ],
  scorers: [toolCallMatch],
})
