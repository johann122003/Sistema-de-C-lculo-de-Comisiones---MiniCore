# Sistema de Cálculo de Comisiones - MiniCore

Aplicación web Full-Stack para el cálculo automático de comisiones de vendedores basado en reglas dinámicas por montos acumulados en un rango de fechas. Desarrollado como migración de un sistema legado a tecnologías modernas.

## 🎥 Video de Presentación
https://youtu.be/pwwva-SEx38

## 🌐 Enlace en Vivo (Producción)
https://sistema-de-calculo-de-comisiones-johann.onrender.com/comisiones

## 🚀 Stack Tecnológico
* **Backend:** AdonisJS 6 (TypeScript)
* **Frontend:** Vue 3 (Composition API) 
* **Comunicación:** Inertia.js (Sin necesidad de API REST ni CORS)
* **Base de Datos:** SQLite con Lucid ORM
* **Validación:** VineJS

## ☁️ Despliegue en Producción
El sistema se encuentra desplegado en Render como Web Service. Utiliza un comando de inicio personalizado para ejecutar migraciones y seeders automáticamente, garantizando la persistencia de datos de prueba en entornos de discos efímeros (plan gratuito de Render).

## 🛠️ Instalación y Ejecución Local

1. **Clonar el repositorio:**
   ```bash
   git clone [https://github.com/johann122003/Sistema-de-C-lculo-de-Comisiones---MiniCore.git](https://github.com/johann122003/Sistema-de-C-lculo-de-Comisiones---MiniCore.git)
   cd core-comisiones
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno:**
   Copiar el archivo `.env.example` a `.env` y generar la clave de la aplicación:
   ```bash
   cp .env.example .env
   node ace generate:key
   ```

4. **Preparar la Base de Datos:**
   Ejecutar las migraciones y poblar la base de datos con los registros de prueba (vendedores, reglas y ventas de junio 2026):
   ```bash
   node ace migration:run
   node ace db:seed
   ```

5. **Levantar el servidor de desarrollo:**
   ```bash
   npm run dev
   ```

6. **Acceder a la aplicación:**
   Abrir `http://localhost:3333` en tu navegador web.

## 🧪 Casos de Prueba Incluidos
Para probar el sistema (tanto en local como en producción), utilice los siguientes rangos de fechas:
* **Cálculo Exitoso:** `01/06/2026` al `30/06/2026` (Muestra los cálculos dinámicos de Johann, Sara y Tony).
* **Sin Resultados:** `01/05/2026` al `31/05/2026` (Muestra el manejo de estado vacío limpiando la tabla).
* **Validación de Error:** Fecha de inicio mayor a fecha de fin, por ejemplo Inicio `30/06/2026` y Fin `01/06/2026` (Muestra validación estricta de VineJS bloqueando la petición).
