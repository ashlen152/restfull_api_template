import express, { Application } from 'express'
import mongoose from 'mongoose'
import compression from 'compression'
import cors from 'cors'
import morgan from 'morgan'
import Controller from '@utils/interfaces/controller.interface'
import ErrorMiddlware from '@middleware/error.middleware'
import helmet from 'helmet'
import path from 'path'
import { MONGO_URL, MONGO_USER, MONGO_PASS } from './config'

class App {
  public express: Application
  public port: number

  constructor(controllers: Controller[], port: number) {
    this.express = express()
    this.port = port

    this.initialiseDatabaseConnection()
    this.initialiseMiddleware()
    this.initialiseControllers(controllers)
    this.initialiseErrorHandling()
  }

  private initialiseMiddleware(): void {
    this.express.use(helmet())
    this.express.use(cors())
    this.express.use(morgan('dev'))
    this.express.use(express.json())
    this.express.use(express.urlencoded({ extended: false }))
    this.express.use(compression())
  }

  private initialiseControllers(controllers: Controller[]): void {
    controllers.forEach((controller: Controller) => {
      this.express.use('/api', controller.router)
    })
  }

  private initialiseErrorHandling(): void {
    this.express.use(ErrorMiddlware)
  }

  private initialiseDatabaseConnection(): void {
    mongoose
      .connect(
        `mongodb://${MONGO_USER}:${MONGO_PASS}@${
          MONGO_URL ?? '127.0.0.1:27017'
        }`,
        {
          directConnection: true,
          serverSelectionTimeoutMS: 2000
          // tlsAllowInvalidHostnames: true,
          // tls: true,
          // tlsCAFile: path.join(`${__dirname}/CA.pem`),
          // appName: 'mongosh'
        }
      )
      .then(() => console.log('connected'))
      .catch(error => {
        console.log('coonnection failure', error)
        console.log(`${__dirname}/CA.pem`)
      })
  }

  public listen(): void {
    console.log(this.port)
    this.express.listen(this.port, () => {
      console.log(`App listening on port ${this.port}`)
    })
  }
}

export default App
