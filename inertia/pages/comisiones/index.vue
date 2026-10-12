<script setup lang="ts">
import { useForm } from '@inertiajs/vue3'

// Definimos las propiedades que recibimos desde el Controlador (AdonisJS)
const props = defineProps<{
  resultados: Array<{
    vendedor: string
    totalVendido: number
    porcentajeAplicado: number
    comisionCalculada: number
  }>
  busqueda: { start: string; end: string } | null
  errors: Record<string, string>
}>()

// Configuramos el formulario con Inertia
const form = useForm({
  startDate: props.busqueda?.start || '',
  endDate: props.busqueda?.end || ''
})

const submit = () => {
  form.post('/comisiones/calcular')
}
</script>

<template>
  <div class="min-h-screen bg-gray-900 text-white p-8">
    <div class="max-w-4xl mx-auto">
      <h1 class="text-3xl font-bold mb-6 text-blue-400">Cálculo de Comisiones</h1>

      <!-- Formulario -->
      <div class="bg-gray-800 p-6 rounded-lg shadow-lg mb-8">
        <form @submit.prevent="submit" class="flex flex-col md:flex-row gap-4 items-start md:items-end">
          <div class="flex-1 w-full">
            <label class="block text-sm font-medium text-gray-300 mb-1">Fecha de Inicio</label>
            <input 
              type="date" 
              v-model="form.startDate" 
              class="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white focus:outline-none focus:border-blue-500"
            />
            <!-- Mostrar error de validación -->
            <span v-if="form.errors.startDate" class="text-red-400 text-sm mt-1 block">{{ form.errors.startDate }}</span>
          </div>
          
          <div class="flex-1 w-full">
            <label class="block text-sm font-medium text-gray-300 mb-1">Fecha de Fin</label>
            <input 
              type="date" 
              v-model="form.endDate" 
              class="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white focus:outline-none focus:border-blue-500"
            />
            <!-- Mostrar errores de validación -->
            <span v-if="form.errors.endDate" class="text-red-400 text-sm mt-1 block">{{ form.errors.endDate }}</span>
            <span v-if="form.errors.date_order" class="text-red-400 text-sm mt-1 block">{{ form.errors.date_order }}</span>
          </div>

          <button 
            type="submit" 
            :disabled="form.processing"
            class="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-md transition-colors disabled:opacity-50 w-full md:w-auto mt-2 md:mt-0 h-[42px]"
          >
            Calcular Comisiones
          </button>
        </form>
      </div>

      <!-- Resultados -->
      <div v-if="busqueda" class="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <!-- Tabla con estilo oscuro y encabezado celeste -->
        <div v-if="resultados.length > 0" class="overflow-x-auto">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="bg-cyan-600 text-white">
                <th class="py-3 px-4 font-semibold">Vendedor</th>
                <th class="py-3 px-4 font-semibold">Total Vendido</th>
                <th class="py-3 px-4 font-semibold">Regla Aplicada</th>
                <th class="py-3 px-4 font-semibold">Comisión Calculada</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-700">
              <tr v-for="item in resultados" :key="item.vendedor" class="hover:bg-gray-700 transition-colors">
                <td class="py-3 px-4">{{ item.vendedor }}</td>
                <td class="py-3 px-4">${{ item.totalVendido.toFixed(2) }}</td>
                <td class="py-3 px-4">{{ item.porcentajeAplicado }}%</td>
                <td class="py-3 px-4 font-bold text-green-400">${{ item.comisionCalculada.toFixed(2) }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <!-- Mensaje cuando no hay ventas en el rango -->
        <div v-else class="p-8 text-center text-gray-400">
          <p class="text-lg">No se encontraron ventas en el rango de fechas seleccionado.</p>
        </div>
      </div>
    </div>
  </div>
</template>