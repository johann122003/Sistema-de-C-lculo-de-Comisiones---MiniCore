import vine from '@vinejs/vine'

// creamos la regla personalizada correctamente
const checkDateOrder = vine.createRule((value: any, field) => {
  // comparamos solo si ambas fechas están presentes
  if (value.startDate && value.endDate) {
    if (value.startDate > value.endDate) {
      field.report('La fecha de inicio no puede ser posterior a la fecha de fin', 'date_order', field)
    }
  }
})

// compilamos el validador aplicando la regla al objeto
export const commissionCalculateValidator = vine.compile(
  vine.object({
    startDate: vine.date({ formats: ['YYYY-MM-DD'] }),
    endDate: vine.date({ formats: ['YYYY-MM-DD'] }),
  }).use(checkDateOrder())
)