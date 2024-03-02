// src/logger.ts
import pino, { LoggerOptions } from 'pino'
import dotenv from 'dotenv'
import { CustomLoggerOptions } from '../type/interface'

const options: CustomLoggerOptions = {
  level: process.env.LOG_LEVEL || 'info',
}

if (options.level === 'debug') {
  options.transport = {
    target: 'pino-pretty',
    options: {
      colorize: true,
      levelFirst: true,
      messageFormat: '{levelLabel} {msg}',
      timestampKey: 'time',
      translateTime: 'SYS:standard',
    },
  }
}

export const logger = pino(options)
