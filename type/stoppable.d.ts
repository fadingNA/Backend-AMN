import { Server as HttpServer } from 'http'

declare module 'stoppable' {
  import { Server } from 'http'

  function stoppable(server: Server): Server

  export = stoppable
}

declare module 'http' {
  interface Server {
    stop(callback?: (err?: Error, gracefully?: boolean) => void): void
  }
}
