# Administrador de servicios

Pre entrega 1 de **BEI: Desarrollo avanzado de Backend**.

## Descripción

Proyecto Node.js con ES Modules que implementa la clase `ServiceManager` para gestionar los servicios de un sistema de turnos y reservas. Los servicios se guardan en un archivo JSON y la configuración se toma de variables de entorno con `dotenv`.

## Instalación

Requiere Node.js 18 o superior.

```bash
git clone https://github.com/Leanweimann/BEI---Backend.git
cd entrega1-BEI
npm install
```

## Variables de entorno

Crear un archivo `.env` en la raíz del proyecto, tomando como guía `.env.example`:

| Variable   | Descripción             | Ejemplo       |
| ---------- | ----------------------- | ------------- |
| `PORT`     | Puerto de la aplicación | `8080`        |
| `NODE_ENV` | Entorno de ejecución    | `development` |

Ambas son obligatorias. Si falta alguna, la aplicación no inicia y muestra un mensaje indicando cuál falta.

## Ejecución

```bash
npm start
```

Ejecuta `src/app.js`, que muestra por consola una demostración de todos los métodos de `ServiceManager`.

## Recurso `services`

Los servicios se guardan en `src/data/services.json`. Cada uno tiene esta forma:

| Campo         | Tipo      | Descripción                                   |
| ------------- | --------- | --------------------------------------------- |
| `id`          | `number`  | Identificador único, generado automáticamente |
| `name`        | `string`  | Nombre del servicio                           |
| `description` | `string`  | Descripción del servicio                      |
| `duration`    | `number`  | Duración en minutos                           |
| `price`       | `number`  | Precio del servicio                           |
| `category`    | `string`  | Categoría a la que pertenece                  |
| `available`   | `boolean` | Indica si se puede reservar                   |

```json
{
  "id": 1,
  "name": "Corte de pelo",
  "description": "Corte clásico o moderno con lavado incluido",
  "duration": 30,
  "price": 8000,
  "category": "peluquería",
  "available": true
}
```

## Uso de `ServiceManager`

Todos los métodos son asíncronos, por lo que se usan con `await`.

```js
import ServiceManager from './managers/ServiceManager.js';

const servicesPath = new URL('./data/services.json', import.meta.url);
const serviceManager = new ServiceManager(servicesPath);
```

### `getServices()`

Devuelve un array con todos los servicios.

```js
const services = await serviceManager.getServices();
```

### `getServiceById(id)`

Devuelve el servicio con ese id, o `null` si no existe.

```js
const service = await serviceManager.getServiceById(1);
const notFound = await serviceManager.getServiceById(999); // null
```

### `addService(serviceData)`

Agrega un servicio y lo devuelve con su `id` generado automáticamente. Los campos `name`, `description`, `duration`, `price`, `category` y `available` son obligatorios: si falta alguno, lanza un `Error` indicando cuáles. Si se envía un `id`, se ignora.

```js
const newService = await serviceManager.addService({
  name: 'Depilación',
  description: 'Depilación con cera de piernas completas',
  duration: 40,
  price: 15000,
  category: 'estética',
  available: true,
});
```

### `updateService(id, updatedData)`

Actualiza los campos indicados y devuelve el servicio actualizado, o `null` si no existe. El `id` no se puede modificar: si viene en `updatedData`, se descarta.

```js
const updated = await serviceManager.updateService(1, { price: 9000 });
```

### `deleteService(id)`

Elimina el servicio y lo devuelve, o `null` si no existe.

```js
const deleted = await serviceManager.deleteService(1);
```
