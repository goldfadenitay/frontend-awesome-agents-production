import { runLLM } from '../../src/llm'
import { generateImageToolDefinition } from '../../src/tools/generateImage'
import { dadJokeToolDefinition } from '../../src/tools/dadJoke'
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

runEval('allTools', {
  task: async (input) =>
    runLLM({
      messages: [
        {
          role: 'user',
          content: input,
        },
      ],
      tools: [
        generateImageToolDefinition,
        dadJokeToolDefinition,
        redditToolDefinition,
      ],
    }),
  data: [
    {
      input: 'Tell me a funny data joke',
      expected: createTooMessage(dadJokeToolDefinition.name),
    },
    {
      input: 'Take a photo of the mars',
      expected: createTooMessage(generateImageToolDefinition.name),
    },
    {
      input: 'What is the most upvote post on reddit',
      expected: createTooMessage(redditToolDefinition.name),
    },
  ],
  scorers: [toolCallMatch],
})
