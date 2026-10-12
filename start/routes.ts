
import router from '@adonisjs/core/services/router'



// importamos dinámicamente el controlador
const CommissionsController = () => import('#controllers/commissions_controller')

// ruta para ver el formulario
router.get('/comisiones', [CommissionsController, 'index'])

// ruta para recibir los datos y calcular
router.post('/comisiones/calcular', [CommissionsController, 'calculate'])

// redirigir la raíz a comisiones
router.get('/', async ({ response }) => {
  response.redirect('/comisiones')
})
