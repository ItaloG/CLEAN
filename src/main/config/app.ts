import express from 'express'
import setupMiddlewares from './middlewares'
import setupApolloServer from './apollo-server'
import setupRoutes from './routes'
import setupSwagger from './swagger'

const app = express()
void setupApolloServer(app)
setupMiddlewares(app)
setupRoutes(app)
setupSwagger(app)
export default app
