import fs from 'node:fs/promises';

const REQUIRED_FIELDS = ['name', 'description', 'duration', 'price', 'category', 'available'];

export default class ServiceManager {
  constructor(path) {
    this.path = path;
  }

  async #readFile() {
    const data = await fs.readFile(this.path, 'utf-8');
    return JSON.parse(data);
  }

  async #writeFile(services) {
    await fs.writeFile(this.path, JSON.stringify(services, null, 2));
  }

  #generateId(services) {
    const maxId = services.reduce((max, service) => Math.max(max, service.id), 0);
    return maxId + 1;
  }

  async getServices() {
    return this.#readFile();
  }

  async getServiceById(id) {
    const services = await this.#readFile();
    return services.find((service) => service.id === Number(id)) ?? null;
  }

  async addService(serviceData = {}) {
    const missingFields = REQUIRED_FIELDS.filter((field) => {
      const value = serviceData[field];
      return value === undefined || value === null || value === '';
    });

    if (missingFields.length > 0) {
      throw new Error(`Servicio incompleto. Faltan los campos: ${missingFields.join(', ')}`);
    }

    const services = await this.#readFile();

    const newService = {
      id: this.#generateId(services),
      name: serviceData.name,
      description: serviceData.description,
      duration: serviceData.duration,
      price: serviceData.price,
      category: serviceData.category,
      available: serviceData.available,
    };

    services.push(newService);
    await this.#writeFile(services);
    return newService;
  }

    async updateService(id, updatedData = {}) {
    const services = await this.#readFile();
    const index = services.findIndex((service) => service.id === Number(id));
    if (index === -1) return null;

    const { id: _ignoredId, ...changes } = updatedData;

    services[index] = { ...services[index], ...changes };
    await this.#writeFile(services);
    return services[index];
  }

    async deleteService(id) {
    const services = await this.#readFile();
    const index = services.findIndex((service) => service.id === Number(id));
    if (index === -1) return null;

    const [deletedService] = services.splice(index, 1);
    await this.#writeFile(services);
    return deletedService;
  }
}

