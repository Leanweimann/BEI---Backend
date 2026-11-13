import config from './config/env.config.js';
import ServiceManager from './managers/ServiceManager.js';

const servicesPath = new URL('./data/services.json', import.meta.url);
const serviceManager = new ServiceManager(servicesPath);

console.log(`App iniciada | entorno: ${config.nodeEnv} | puerto: ${config.port}`);

console.log('\n--- getServices() ---');
console.log(await serviceManager.getServices());

console.log('\n--- getServiceById(1) ---');
console.log(await serviceManager.getServiceById(1));

console.log('\n--- getServiceById(999) ---');
console.log(await serviceManager.getServiceById(999));

console.log('\n--- addService() ---');
const newService = await serviceManager.addService({
  name: 'Depilación',
  description: 'Depilación con cera de piernas completas',
  duration: 40,
  price: 15000,
  category: 'estética',
  available: true,
});
console.log(newService);

console.log('\n--- addService() incompleto ---');
try {
  await serviceManager.addService({ name: 'Sin datos' });
} catch (error) {
  console.log(`Rechazado: ${error.message}`);
}

console.log('\n--- updateService() ---');
console.log(await serviceManager.updateService(newService.id, { price: 16500, id: 999 }));

console.log('\n--- updateService(999) ---');
console.log(await serviceManager.updateService(999, { price: 1 }));

console.log('\n--- deleteService() ---');
console.log(await serviceManager.deleteService(newService.id));

console.log('\n--- deleteService(999) ---');
console.log(await serviceManager.deleteService(999));
