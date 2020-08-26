import Sequelize, { Model } from 'sequelize'
import bcrypt from 'bcrypt'
import { V4Options as UUID, v4 } from 'uuid'

import db from '../database/index'

class User extends Model {
    public id!: UUID;
    public name!: string;
    public email!: string;
    public password!: string;
    public imageUrl!: string;
    public info!: JSON;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    public async checkPassword (password: string): Promise<boolean> {
      return bcrypt.compare(password, this.password)
    }
}

User.init({
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  imageUrl: {
    type: Sequelize.STRING,
    allowNull: false
  },
  info: {
    type: Sequelize.JSONB,
    allowNull: false
  }
}, {
  sequelize: db.connection,
  freezeTableName: true
})

User.addScope('withoutPassword', {
  attributes: {
    exclude: ['password']
  }
})

export default User
