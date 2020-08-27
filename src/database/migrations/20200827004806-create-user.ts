import { QueryInterface, DataTypes } from 'sequelize'
import User from '../../models/User'

export async function up (query: QueryInterface): Promise<void> {
  try {
    return query.createTable(User.tableName, {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      imageUrl: {
        type: DataTypes.STRING,
        allowNull: false
      },
      info: {
        type: DataTypes.JSONB,
        allowNull: true
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false
      }
    })
  } catch (e) {
    return Promise.reject(e)
  }
}

export async function down (query: QueryInterface): Promise<void> {
  try {
    return query.dropTable(User.tableName)
  } catch (e) {
    return Promise.reject(e)
  }
}
