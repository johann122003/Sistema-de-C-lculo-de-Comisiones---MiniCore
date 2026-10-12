import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Vendedor from './vendedor.js'

export default class Venta extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare vendedorId: number

  @column.date()
  declare fechaVenta: DateTime

  @column()
  declare monto: number

  @belongsTo(() => Vendedor)
  declare vendedor: BelongsTo<typeof Vendedor>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}