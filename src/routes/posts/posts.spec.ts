import request from 'supertest'
import app from '../../config/app'

interface Post {
  'userId': number
  'id': number
  'title': string
  'body': string
}

interface Response {
  body: Post[]
}

describe('Post Routes', () => {
  it('should return status 200', async () => {
    await request(app).get('/api/posts').expect(200)
  })

  it('should return an array as response', async () => {
    const { body: sut } = await request(app).get('/api/posts')

    expect(Array.isArray(sut)).toBeTruthy()
  })

  it('should post be in the right format', async () => {
    const { body: sut }: Response = await request(app).get('/api/posts')

    sut.forEach((post) => {
      expect(post).toHaveProperty('userId')
      expect(post).toHaveProperty('id')
      expect(post).toHaveProperty('title')
      expect(post).toHaveProperty('body')
    })
  })
})
