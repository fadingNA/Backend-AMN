import { LoggerOptions } from 'pino'
export interface CustomLoggerOptions extends LoggerOptions {
  transport?: {
    target: string
    options: {
      colorize: boolean
      levelFirst: boolean
      messageFormat: string
      timestampKey: string
      translateTime: string
    }
  }
}
