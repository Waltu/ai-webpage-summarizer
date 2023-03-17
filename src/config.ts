import { JSONSchemaType } from 'ajv'
import { envSchema } from 'env-schema'

export interface Config {
  OPENAI_API_KEY: string
  LOG_LEVEL: string
  OPENAI_MAX_TOKENS: number
  OPENAI_TEMPERATURE: number
  URL?: string
}

const environmentVariablesSchema: JSONSchemaType<Config> = {
  type: 'object',
  required: ['OPENAI_API_KEY'],
  properties: {
    OPENAI_API_KEY: {
      type: 'string'
    },
    LOG_LEVEL: {
      type: 'string',
      default: 'info'
    },
    OPENAI_MAX_TOKENS: {
      type: 'number',
      default: 240
    },
    OPENAI_TEMPERATURE: {
      type: 'number',
      default: 0.5,
      minimum: 0,
      maximum: 2
    },
    URL: {
      type: 'string',
      nullable: true
    }
  }
}

export const config = envSchema<Config>({
  schema: environmentVariablesSchema,
  dotenv: false
})
