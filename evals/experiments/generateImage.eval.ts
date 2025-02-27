import { runLLM } from '../../src/llm'
import { generateImageToolDefinition } from '../../src/tools/generateImage'
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

runEval('generateImage', {
  task: async (input) =>
    runLLM({
      messages: [
        {
          role: 'user',
          content: input,
        },
      ],
      tools: [generateImageToolDefinition],
    }),
  data: [
    {
      input: 'Generate an image of a sunset',
      expected: createTooMessage(generateImageToolDefinition.name),
    },
    {
      input: 'Take a photo of the sunset',
      expected: createTooMessage(generateImageToolDefinition.name),
    },
  ],
  scorers: [toolCallMatch],
})
