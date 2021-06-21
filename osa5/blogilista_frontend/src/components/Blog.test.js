import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'
import blogService from '../services/blogs'
import BlogForm from '../components/BlogForm'


const blog = {
  title: 'Testaajan Opas',
  author: 'Testaaja-Pro',
  url:'www.test.fi',
  likes: '5',
  user: { username: 'testitaneli', name: 'Testi-Taneli' },
  id: '60cb87f5d6c9841a3f0bde54',

}
test('Renders only the title and author', () => {
  const component = render(
    <Blog blog={blog} />
  )

  expect(component.container).toHaveTextContent(
    'Testaajan Opas'
  )

  expect(component.container).toHaveTextContent(
    'Testaaja-Pro')

  expect(component.container).not.toHaveTextContent('5')
  expect(component.container).not.toHaveTextContent('www.test.fi')
})

test('After clicking the show-button, displays both the likes and the url', () => {
  const component = render(
    <Blog blog={blog} />
  )

  const button = component.getByText('show')
  fireEvent.click(button)
  expect(component.container).toHaveTextContent('www.test.fi')
  expect(component.container).toHaveTextContent('5')
})


test('Clicking the like-button twice calls the event handler twice.', () => {
  blogService.update = jest.fn()
  const component = render(<Blog blog={blog} blogService={blogService}/> )
  const showButton = component.getByText('show')
  fireEvent.click(showButton)
  const likeButton = component.getByText('like')
  fireEvent.click(likeButton)
  fireEvent.click(likeButton)
  expect(blogService.update).toHaveBeenCalledTimes(2)
})

test('Creates a new blog succesfully.', () => {

  const component = render(
    <BlogForm />
  )
  const author = component.container.querySelector('#author')
  const title = component.container.querySelector('#title')
  const url = component.container.querySelector('#url')

  expect(author).toBeDefined()
  expect(title).toBeDefined()
  expect(url).toBeDefined()

})




