import { Request, Response } from 'express'
import externalAPI from '../services/externalData'

interface Post {
  userId: number
  id: number
  title: string
  body: string
}

interface APIResponse {
  data: Post[]
}

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

  async listByUserId (req: Request, res: Response): Promise<Response> {
    try {
      const userId = parseInt(req.params.user_id)
      if (!userId) {
        return res.status(400).json({
          error: 'Id bad formatted'
        })
      }

      const { data }: APIResponse = await externalAPI.get('/posts')

      const filteredPosts = data.filter((post) => post.userId === userId)
      if (!filteredPosts.length) {
        return res.status(404).json({
          error: 'No posts found by user'
        })
      }

      return res.status(200).json(filteredPosts)
    } catch (error) {
      return res.status(400).json({
        error: 'An error occurred to fetch posts'
      })
    }
  }
}
