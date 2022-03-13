import { Router } from 'express'
import PostRoutesController from '../../controllers/post'

const router = Router()

const controller = new PostRoutesController()

router.get('/posts', controller.listAllPosts)

export default router
