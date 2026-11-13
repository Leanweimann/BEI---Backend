import dotenv from 'dotenv';

dotenv.config();

const REQUIRED_VARS = ['PORT', 'NODE_ENV'];

const missingVars = REQUIRED_VARS.filter((name) => {
  const value = process.env[name];
  return value === undefined || value.trim() === '';
});

if (missingVars.length > 0) {
  console.error(
    `ERROR FATAL: faltan variables de entorno requeridas: ${missingVars.join(', ')}.\n` +
      'Creá un archivo .env en la raíz del proyecto tomando como guía .env.example.'
  );
  process.exit(1);
}

const config = {
  port: Number(process.env.PORT),
  nodeEnv: process.env.NODE_ENV,
};

export default config;

