// src/app.ts
import express, { Request, Response } from 'express'

import cors from 'cors'
import helmet from 'helmet'
import compression from 'compression'
import { author, version } from '../package.json'
import { logger } from './logger'
import pinoHttp from 'pino-http'

const pinoMiddleWare = pinoHttp({ logger })

const app = express()

app.use(pinoMiddleWare)

app.use(cors())
app.use(helmet())
app.use(compression())

app.get('/', (req: Request, res: Response) => {
  res.setHeader('Cache-Control', 'no-cache')

  res.status(200).json({
    status: 'Request is successful',
    author,
    version,
    githubUrl: 'https://github.com/fadingNA',
  })
})

app.use((req: Request, res: Response) => {
  res.status(404).json({
    status: 'error',
    error: {
      message: 'not found',
      code: 404,
    },
  })
})

app.use((err: Error, req: Request, res: Response, next: any) => {
  // We may already have an error response we can use, but if not,
  // use a generic `500` server error and message.
  const status = 500
  const message = err.message || 'unable to process request'

  // If this is a server error, log something so we can see what's going on.
  if (status > 499) {
    logger.error({ err }, `Error processing request`)
  }

  res.status(status).json({
    status: 'error',
    error: {
      message,
      code: status,
    },
  })
})

export default app
