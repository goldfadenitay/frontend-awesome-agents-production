import { runLLM } from '../../src/llm'
import { redditToolDefinition } from '../../src/tools/reddit'
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

runEval('reddit', {
  task: async (input) =>
    runLLM({
      messages: [
        {
          role: 'user',
          content: input,
        },
      ],
      tools: [redditToolDefinition],
    }),
  data: [
    {
      input: 'Find my something intreating on reddit',
      expected: createTooMessage(redditToolDefinition.name),
    },
    {
      input: 'Hey',
      expected: createTooMessage(redditToolDefinition.name),
    },
  ],
  scorers: [toolCallMatch],
})
