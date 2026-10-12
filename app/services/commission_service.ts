import db from '@adonisjs/lucid/services/db'
import Regla from '#models/regla'

export default class CommissionService {
  async calculate(startDate: string, endDate: string) {
   
    const ventasAgrupadas = await db.from('ventas')
      .join('vendedors', 'ventas.vendedor_id', '=', 'vendedors.id')
      .where('fecha_venta', '>=', startDate)
      .where('fecha_venta', '<=', endDate)
      .select('vendedors.nombre as vendedor')
      .sum('ventas.monto as totalVendido')
      .groupBy('vendedors.id', 'vendedors.nombre')

  
    const reglas = await Regla.query().orderBy('montoMinimo', 'desc')

   
    const resultados = ventasAgrupadas.map((row) => {
      const total = Number(row.totalVendido)
      
    
      const reglaAplicable = reglas.find((r) => total >= Number(r.montoMinimo))
      
      const porcentaje = reglaAplicable ? Number(reglaAplicable.porcentaje) : 0
      const comision = total * porcentaje

      
      return {
        vendedor: row.vendedor,
        totalVendido: Number(total.toFixed(2)),
        porcentajeAplicado: porcentaje * 100,
        comisionCalculada: Number(comision.toFixed(2))
      }
    })

    return resultados
  }
}