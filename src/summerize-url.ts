import { Readability } from '@mozilla/readability'
import { encode } from 'gpt-3-encoder'
import { JSDOM } from 'jsdom'
import { Configuration, CreateCompletionRequest, OpenAIApi } from 'openai'
import pino from 'pino'
import { stripHtml } from 'string-strip-html'

import { config } from './config.js'

const logger = pino({
  base: undefined,
  level: config.LOG_LEVEL
})

const MODEL = 'text-davinci-003'

const configuration = new Configuration({
  apiKey: config.OPENAI_API_KEY
})
const openai = new OpenAIApi(configuration)

const getDocumentText = async (url: string) => {
  const response = await fetch(url)
  const documentText = await response.text()

  const document = new JSDOM(documentText, {
    url,
    pretendToBeVisual: false
  })
  const reader = new Readability(document.window.document)
  const parsedDocument = reader.parse()

  if (parsedDocument === null) {
    throw new Error('Could not parse document text')
  }

  return stripHtml(parsedDocument.content).result
}

const getPrompt = (contextText: string) => {
  const prompt = `Make a short and general a summary of this: ${contextText}`

  logger.debug({ promptTokens: encode(prompt).length }, 'Prompt tokens')

  return prompt
}

const getDefaults: Partial<CreateCompletionRequest> = {
  temperature: config.OPENAI_TEMPERATURE,
  max_tokens: config.OPENAI_MAX_TOKENS
}

const createCompletion = async (prompt: string, options: Partial<CreateCompletionRequest> = {}) => {
  const mergedOptions = {
    ...getDefaults,
    ...options,
    model: MODEL
  }

  logger.debug(mergedOptions, 'Completion options')

  const completion = await openai.createCompletion({
    ...mergedOptions,
    prompt
  })

  logger.debug(completion.data, 'Completion data')

  return completion
}

export const getSummaryByURL = async (url: string, options?: Partial<CreateCompletionRequest>) => {
  const documentText = await getDocumentText(url)
  const prompt = getPrompt(documentText)
  const completion = await createCompletion(prompt, options)

  return completion.data.choices[0].text
}
