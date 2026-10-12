import type { HttpContext } from '@adonisjs/core/http'
import CommissionService from '#services/commission_service'
import { commissionCalculateValidator } from '#start/validator'

export default class CommissionsController {
  // mostrar la página inicial GET
  async index({ inertia }: HttpContext) {
    return inertia.render('comisiones/index', { 
      resultados: [], 
      busqueda: null 
    })
  }

  // procesar el formulario POST
  async calculate({ request, inertia }: HttpContext) {
    // validar las fechas ingresadas
    const payload = await request.validateUsing(commissionCalculateValidator)
    
    // extraemos la fecha en formato YYYY-MM-DD del objeto Date de JS
    const startStr = payload.startDate.toISOString().substring(0, 10)
    const endStr = payload.endDate.toISOString().substring(0, 10)
    
    // llamar a nuestro servicio
    const service = new CommissionService()
    const resultados = await service.calculate(startStr, endStr)

    // devolver la vista con los resultados calculados
    return inertia.render('comisiones/index', { 
      resultados, 
      busqueda: { start: startStr, end: endStr } 
    })
  }
}