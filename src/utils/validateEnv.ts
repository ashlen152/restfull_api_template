import { cleanEnv, str, port } from 'envalid'

function validateEnv(): void {
  cleanEnv(process.env, {
    NODE_ENV: str({ choices: ['development', 'production'] }),
    MONGO_URL: str(),
    MONGO_PASS: str(),
    MONGO_USER: str(),
    PORT: port({ default: 3001 })
  })
}

export default validateEnv
