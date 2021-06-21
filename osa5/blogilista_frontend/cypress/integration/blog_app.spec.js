describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Testi-Taneli',
      username: 'testitaneli',
      password: 'salaisuus'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('username')
    cy.contains('password')
    cy.contains('Log in to application')
  }
  )
  describe('1. Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('testitaneli')
      cy.get('#password').type('salaisuus')
      cy.get('#login-button').click()
      cy.contains('Testi-Taneli logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('testitaneli')
      cy.get('#password').type('wrongpassword')
      cy.get('#login-button').click()
      cy.contains('wrong username or password')
    })
  })
  describe('2. When logged in', function() {
    beforeEach(function() {
      cy.get('#username').type('testitaneli')
      cy.get('#password').type('salaisuus')
      cy.get('#login-button').click()
      cy.contains('Testi-Taneli logged in')
    })

    it('A blog can be created', function() {
      cy.contains('create new blog').click()
      cy.get('#title').type('a new test blog')
      cy.get('#author').type('A Well Known Author')
      cy.get('#url').type('www.test.fi')
      cy.get('#create-new-blog-button').click()
      cy.contains('a new test blog')
    })

  })
  describe('3. When logged in', function() {
    beforeEach(function() {
      cy.get('#username').type('testitaneli')
      cy.get('#password').type('salaisuus')
      cy.get('#login-button').click()
      cy.contains('Testi-Taneli logged in')

      cy.contains('create new blog').click()
      cy.get('#title').type('a new test blog')
      cy.get('#author').type('A Well Known Author')
      cy.get('#url').type('www.test.fi')
      cy.get('#create-new-blog-button').click()
      cy.contains('a new test blog')
    })
    it('The like-button works correctly', function(){
      cy.contains('show').click()
      cy.contains('likes: 0')
      cy.get('#blog-like-button').click()
      cy.contains('likes: 1')

    })
    it('The delete-button works correctly', function(){
      cy.contains('show').click()
      cy.get('#delete-blog-button').click()
      cy.contains('show').should('not.exist')
      cy.contains('www.test.fi').should('not.exist')

    })
  })

  describe('4. After creating two new blogs', function(){
    beforeEach(function() {
      cy.get('#username').type('testitaneli')
      cy.get('#password').type('salaisuus')
      cy.get('#login-button').click()
      cy.contains('Testi-Taneli logged in')

      cy.contains('create new blog').click()
      cy.get('#title').type('a new test blog')
      cy.get('#author').type('A Well Known Author')
      cy.get('#url').type('www.test.fi')
      cy.get('#create-new-blog-button').click()
      cy.contains('show').click()
      cy.get('#blog-like-button').click()


      cy.contains('create new blog').click()
      cy.get('#title').type('New blog 2')
      cy.get('#author').type('Guy')
      cy.get('#url').type('www.testikaksi.fi')
      cy.get('#create-new-blog-button').click()
      cy.wait(4000)

      cy.get('#main-div').contains('New blog 2').parent().find('button').click()
      cy.get('#main-div').contains('New blog 2').parent().find('button').contains('like').click()
      cy.wait(1000)
      cy.get('#main-div').contains('New blog 2').parent().find('button').contains('like').click().click()
    })
    it('The blogs are in the right order', function(){
      cy.get('#likes').should('contain','2')
    })

  })
})

