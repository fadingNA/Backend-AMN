import app from './app'
import stoppable from 'stoppable'
import { logger } from './logger'

const port = process.env.PORT || 8080

const server = stoppable(
  app.listen(port, () => {
    logger.info({ port }, `Server started`)
    logger.debug('Debugging mode is on')
  }),
)

export default server
