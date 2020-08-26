import Sequelize from 'sequelize'
import { database as dbConfig } from '../database/config/database.json'

class Database {
    public connection: Sequelize.Sequelize

    constructor () {
      this.init()
    }

    init (): void {
      this.connection = new Sequelize.Sequelize(dbConfig)
    }
}

const database: Database = new Database()

export default database
