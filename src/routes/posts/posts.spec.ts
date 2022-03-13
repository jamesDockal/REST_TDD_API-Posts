import request from 'supertest'
import app from '../../config/app'

describe('Post Routes', () => {
  it('should return status 200', async () => {
    await request(app).get('/api/posts').expect(200)
  })
})
