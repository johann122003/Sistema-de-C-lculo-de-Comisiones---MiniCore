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
      const johann = await Vendedor.create({ nombre: 'Johann Vasquez' })
      const sara = await Vendedor.create({ nombre: 'Sara Chiriboga' })
      const tony = await Vendedor.create({ nombre: 'Tony Llanos' })

      // Ventas de Junio 2026
      await Venta.createMany([
        //  suma 2100
        { vendedorId: johann.id, monto: 1000.00, fechaVenta: DateTime.fromISO('2026-06-10') },
        { vendedorId: johann.id, monto: 1100.00, fechaVenta: DateTime.fromISO('2026-06-15') },
        
        // suma 1100.50
        { vendedorId: sara.id, monto: 500.00, fechaVenta: DateTime.fromISO('2026-06-05') },
        { vendedorId: sara.id, monto: 600.50, fechaVenta: DateTime.fromISO('2026-06-20') },
        
        // suma 450
        { vendedorId: tony.id, monto: 450.00, fechaVenta: DateTime.fromISO('2026-06-25') },
      ])
    }
  }
}