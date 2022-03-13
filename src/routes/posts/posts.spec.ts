import request from 'supertest'
import app from '../../config/app'

interface Post {
  userId: number
  id: number
  title: string
  body: string
}

interface Response {
  body: Post[]
}

describe('Post Routes (List All) ', () => {
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

describe('Post Routes (List By User Id) ', () => {
  it('should return status 200', async () => {
    await request(app).get('/api/posts/1').expect(200)
  })

  it('should return status 400 if not provided a valid user id', async () => {
    const { status: sut } = await request(app).get('/api/posts/not-valid-id')

    expect(sut).toBe(400)
  })

  it('should return status 404 if provide a non existed user id', async () => {
    const { status: sut } = await request(app).get('/api/posts/9999')

    expect(sut).toBe(404)
  })

  it('should return an array as response', async () => {
    const { body: sut } = await request(app).get('/api/posts/1')

    expect(Array.isArray(sut)).toBeTruthy()
  })

  it('should post be in the right format', async () => {
    const { body: sut }: Response = await request(app).get('/api/posts/1')

    sut.forEach((post) => {
      expect(post).toHaveProperty('userId')
      expect(post).toHaveProperty('id')
      expect(post).toHaveProperty('title')
      expect(post).toHaveProperty('body')
    })
  })
})
