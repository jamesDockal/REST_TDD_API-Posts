import express from 'express'

import { postRoutes } from '../routes'

const app = express()

app.use('/api', postRoutes)

export default app
