import { Request, Response } from 'express'

export default class PostRoutesController {
  listAllPosts (req: Request, res: Response): Response {
    return res.status(200).send('')
  }
}
