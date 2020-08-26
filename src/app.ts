import express from 'express'
import cors from 'cors'

import Routes from './routes/index'

class App {
    public express

    public constructor () {
      this.express = express()
      this.middleware()
      this.routes()
    }

    private middleware (): void {
      this.express.use(express.json())
      this.express.use(cors())
    }

    private routes (): void {
      this.express.use(Routes)
    }
}

export default new App().express
