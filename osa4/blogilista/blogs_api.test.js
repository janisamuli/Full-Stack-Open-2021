const mongoose = require('mongoose')
const supertest = require('supertest')
const bcrypt = require('bcrypt')
const testHelper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')


beforeAll(async ()=> {
await User.deleteMany({})
const testUser = {
  username: 'testguy',
  name: 'Test-Man',
  password: 'salaisuus'

}

await api
.post('/api/users')
.send(testUser)
.expect('Content-Type', /application\/json/)

})


beforeEach(async () => {
    await Blog.deleteMany({})
    let blogObject = new Blog(testHelper.initialBlogs[0])
    await blogObject.save()
    blogObject = new Blog(testHelper.initialBlogs[1])
    await blogObject.save()
  })

describe('Test about the properties', () => {
 
test('blogs are returned as json', async () => {

  
    const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(testHelper.initialBlogs.length)
  })

  test('blogs have the correct id', async() => {
      const response = await api.get('/api/blogs')

      expect(response.body[0].id).toBeDefined()
  })
})

describe('Test that you can post.', () => {


 
test('The POST-method works correctly (adds one new post)', async () => {
  const testLogin = await api.post('/api/login')
                    .send({username:'testguy', password:'salaisuus'})
                    . expect('Content-Type', /application\/json/)

    const newBlog = {
        title: 'Testikirja',
    author: 'Testiäijä',
    url: 'testiurl',
    likes: 2222,

    }

    await api.post('/api/blogs')
    .send(newBlog)
    .set('Authorization',`bearer ${testLogin.body.token}` )
    .expect(200)
    .expect('Content-Type', /application\/json/)
    const blogsAtEnd = await testHelper.blogsInDb()
    
    expect(blogsAtEnd).toHaveLength(testHelper.initialBlogs.length + 1)
  
    const authors = blogsAtEnd.map(n => n.author)
    expect(authors).toContain('Testiäijä')

})

test('If the user forgets to add likes, the value is 0.',async() => {

  const testLogin = await api.post('/api/login')
                    .send({username:'testguy', password:'salaisuus'})
                    . expect('Content-Type', /application\/json/)

    const newBlog = {
        title: 'Testitykkääjä',
    author: 'Testitykkäilijä',
    url: 'testiurl'

    }

    await api.post('/api/blogs').send(newBlog)
    .set('Authorization',`bearer ${testLogin.body.token}` )
    .expect(200)
    .expect('Content-Type', /application\/json/)
    const end = await testHelper.blogsInDb()
    expect(end).toHaveLength(testHelper.initialBlogs.length + 1)
    expect(end[testHelper.initialBlogs.length].likes).toBe(0)
    
} )

test('no url or title', async() => {

  const testLogin = await api.post('/api/login')
                    .send({username:'testguy', password:'salaisuus'})
                    .expect('Content-Type', /application\/json/)

const newBlog = {
    likes:1
}

await api.post('/api/blogs')
.send(newBlog)
.set('Authorization',`bearer ${testLogin.body.token}` )
.expect(400)
const end = await testHelper.blogsInDb()
    expect(end).toHaveLength(testHelper.initialBlogs.length)

})


test('No token', async() => {

  const testLogin = await api.post('/api/login')
                    .send({username:'testguy', password:'salaisuus'})
                    .expect('Content-Type', /application\/json/)

const newBlog = {
  title: 'Tokentesti',
  author: 'Guy without token',
  url: 'testiurl',
  likes: 2222,
}

await api.post('/api/blogs')
.send(newBlog)
.expect(401)
const end = await testHelper.blogsInDb()
    expect(end).toHaveLength(testHelper.initialBlogs.length)

})


})

//

describe('when there is initially one user at db', () => {
    beforeEach(async () => {
      await User.deleteMany({})
  
      const passwordHash = await bcrypt.hash('sekret', 10)
      const user = new User({ username: 'root', passwordHash })
  
      await user.save()
    })
  
    test('creation succeeds with a fresh username', async () => {
      const usersAtStart = await testHelper.usersInDb()
  
      const newUser = {
        username: 'testikayttaja',
        name: 'Testi Testinen',
        password: 'secret',
      }
  
      await api
        .post('/api/users')
        .send(newUser)
        .expect(200)
        .expect('Content-Type', /application\/json/)
  
      const usersAtEnd = await testHelper.usersInDb()
      expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)
  
      const usernames = usersAtEnd.map(u => u.username)
      expect(usernames).toContain(newUser.username)
    })

    test('creation fails with proper statuscode and message if username already taken', async () => {
        const usersAtStart = await testHelper.usersInDb()
    
        const newUser = {
          username: 'root',
          name: 'Testiuser',
          password: 'salainen',
        }
    
        const result = await api
          .post('/api/users')
          .send(newUser)
          .expect(400)
          .expect('Content-Type', /application\/json/)
    
        expect(result.body.error).toContain('`username` to be unique')
    
        const usersAtEnd = await testHelper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
      })

      test('creation fails with proper statuscode and message if password is too short. ', async() => {

      const usersAtStart = await testHelper.usersInDb()
      const newUser = {
        username: 'testitaneli',
        name: 'Testi-Taneli',
        password: 'tt'
      }

      const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)
    
      expect(result.body.error).toContain('too short')

      const usersAtEnd = await testHelper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)

      })

      test('creation fails with proper statuscode and message if username is too short. ', async() => {

        const usersAtStart = await testHelper.usersInDb()
        const newUser = {
          username: 'JJ',
          name: 'Jaska-Jantunen',
          password: 'jaska'
        }
  
        const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)
      
        expect(result.body.error).toContain('is shorter than')
  
        const usersAtEnd = await testHelper.usersInDb()
          expect(usersAtEnd).toHaveLength(usersAtStart.length)
  
        })


        
  })



  afterAll(() => {
    mongoose.connection.close()
  })
