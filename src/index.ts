import 'dotenv/config'
import 'module-alias/register'
import validateEnv from '@/utils/validateEnv'
import App from './app'
import { PORT } from 'config'

validateEnv()

const app = new App([], Number(PORT))
