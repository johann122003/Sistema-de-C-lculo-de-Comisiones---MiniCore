import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Regla from '#models/regla'
import Vendedor from '#models/vendedor'
import Venta from '#models/venta'
import { DateTime } from 'luxon'

export default class extends BaseSeeder {
  async run() {
    // 1. Insertar reglas si no existen
    const reglasCount = await Regla.query().count('* as total')
    if (Number(reglasCount[0].$extras.total) === 0) {
      await Regla.createMany([
        { porcentaje: 0.06, montoMinimo: 0.00 },
        { porcentaje: 0.08, montoMinimo: 500.00 },
        { porcentaje: 0.10, montoMinimo: 800.00 },
        { porcentaje: 0.15, montoMinimo: 1000.00 },
      ])
    }

    // 2. Insertar vendedores y ventas si no existen
    const vendedoresCount = await Vendedor.query().count('* as total')
    if (Number(vendedoresCount[0].$extras.total) === 0) {
      const maria = await Vendedor.create({ nombre: 'Maria Garcia' })
      const juan = await Vendedor.create({ nombre: 'Juan Perez' })
      const pedro = await Vendedor.create({ nombre: 'Pedro Lopez' })

      // Ventas de Junio 2025
      await Venta.createMany([
        // Maria suma 2100
        { vendedorId: maria.id, monto: 1000.00, fechaVenta: DateTime.fromISO('2025-06-10') },
        { vendedorId: maria.id, monto: 1100.00, fechaVenta: DateTime.fromISO('2025-06-15') },
        
        // Juan suma 1100.50
        { vendedorId: juan.id, monto: 500.00, fechaVenta: DateTime.fromISO('2025-06-05') },
        { vendedorId: juan.id, monto: 600.50, fechaVenta: DateTime.fromISO('2025-06-20') },
        
        // Pedro suma 450
        { vendedorId: pedro.id, monto: 450.00, fechaVenta: DateTime.fromISO('2025-06-25') },
      ])
    }
  }
}