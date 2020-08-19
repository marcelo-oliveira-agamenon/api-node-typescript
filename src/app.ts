import express from 'express'
import cors from 'cors'
import pg from 'pg'

import Routes from './routes/index'

class App {
    public express
    public connection: pg.Client

    public constructor () {
      this.express = express()
      this.middleware()
      this.routes()
      this.connection = this.database()
    }

    private middleware (): void {
      this.express.use(express.json())
      this.express.use(cors())
    }

    private routes (): void {
      this.express.use(Routes)
    }

    private database () {
      const config = {
        host: process.env.HOST,
        user: process.env.USER,
        password: process.env.PASSWORD,
        database: process.env.DATABASE,
        port: parseInt(process.env.PORT)
      }
      const client = new pg.Client(config)
      client.connect(err => {
        if (err) {
          throw err
        } else {
          console.log('asds')
        }
      })
      return client
    }
}

export default new App().express
