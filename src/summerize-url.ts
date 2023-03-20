/* Using the OpenAI API to generate a summary of a given URL. */
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

/**
 * It takes a URL, fetches the HTML, parses it, and returns the text content
 * @param {string} url - The URL of the document to parse.
 * @returns A string of text from the url
 */
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

/**
 * It returns a prompt for the user to summarize a given context text
 * @param {string} contextText - The text that the model will use to generate the summary.
 * @returns A string
 */
const getPrompt = (contextText: string) => {
  const prompt = `Make a short and general a summary of this: ${contextText}`

  logger.debug({ promptTokens: encode(prompt).length }, 'Prompt tokens')

  return prompt
}

/* Setting the default values for the temperature and max_tokens parameters. */
const getDefaults: Partial<CreateCompletionRequest> = {
  temperature: config.OPENAI_TEMPERATURE,
  max_tokens: config.OPENAI_MAX_TOKENS
}

/**
 * It takes a prompt and some options, and returns a completion
 * @param {string} prompt - The prompt to complete.
 * @param options - Partial<CreateCompletionRequest> = {}
 * @returns A completion object
 */
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

/**
 * It takes a URL and returns a summary of the page
 * @param {string} url - The URL of the article you want to summarize
 * @param [options] - Partial<CreateCompletionRequest>
 * @returns The first choice of the completion.
 */
export const getSummaryByURL = async (url: string, options?: Partial<CreateCompletionRequest>) => {
  const documentText = await getDocumentText(url)
  const prompt = getPrompt(documentText)
  const completion = await createCompletion(prompt, options)

  return completion.data.choices[0].text
}
