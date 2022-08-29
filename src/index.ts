import 'dotenv/config'
import 'module-alias/register'
import { PORT } from './config'
import validateEnv from '@utils/validateEnv'
import App from './app'

validateEnv()

const app = new App([], Number(PORT))
app.listen()
