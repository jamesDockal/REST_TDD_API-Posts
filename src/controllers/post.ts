import { Request, Response } from 'express'
import externalAPI from '../services/externalData'

export default class PostRoutesController {
  async listAllPosts (req: Request, res: Response): Promise<Response> {
    try {
      const { data } = await externalAPI.get('/posts')

      return res.status(200).json(data)
    } catch (error) {
      return res.status(400).json({
        error: 'An error occurred to fetch posts'
      })
    }
  }
}
