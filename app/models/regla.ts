import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Regla extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare porcentaje: number

  @column()
  declare montoMinimo: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}