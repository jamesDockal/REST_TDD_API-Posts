import { Request, Response } from 'express'
import externalAPI from '../services/externalData'
import mergeById from '../utils/mergeById'

interface Post {
  userId: number
  id: number
  title: string
  body: string
}

interface User {
  id: number
  name: string
  username: string
  email: string
  address: {
    street: string
    suite: string
    city: string
    zipcode: string
    geo: {
      lat: string
      lng: string
    }
  }
  phone: string
  website: string
  company: {
    name: string
    catchPhrase: string
    bs: string
  }
}

interface PostsResponse {
  data: Post[]
}

interface UsersResponse {
  data: User[]
}

export default class PostRoutesController {
  async listAllPosts (req: Request, res: Response): Promise<Response> {
    try {
      const { data: posts }: PostsResponse = await externalAPI.get('/posts')
      const { data: users }: UsersResponse = await externalAPI.get('/users')

      const formattedPosts = posts.map(({ userId, ...rest }) => ({
        ...rest,
        id: userId
      }))

      const concatedPosts = mergeById(formattedPosts, users, 'user')

      return res.status(200).json(concatedPosts)
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

      const { data: posts }: PostsResponse = await externalAPI.get('/posts')
      const { data: users }: UsersResponse = await externalAPI.get('/users')

      const filteredPosts = posts.filter((post) => post.userId === userId)
      if (!filteredPosts.length) {
        return res.status(404).json({
          error: 'No posts found by user'
        })
      }

      const concatedPosts = mergeById(filteredPosts, users, 'user')

      return res.status(200).json(concatedPosts)
    } catch (error) {
      return res.status(400).json({
        error: 'An error occurred to fetch posts'
      })
    }
  }
}
