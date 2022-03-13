import express from 'express'

import setupMiddlewares from './middleware'
import { postRoutes } from '../routes'

const app = express()

setupMiddlewares(app)

app.use('/api', postRoutes)

export default app
