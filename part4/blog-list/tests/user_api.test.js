const bcrypt = require('bcryptjs')
const User = require('../models/user')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const api = supertest(app)


describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('Fails with repeated username', async () => {    

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: '1234',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)      
  })

  test('Creating a user with no name and password', async () => {
    const newUser = {
      name: "fail"
    }
    await api.post('/api/users').expect(200)
  })
})

afterAll(() => {
    mongoose.connection.close()
  })