import { render , screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Maija',
    url: 'www.google.com',
    likes: 5,
    user: {
        name: 'Maija'
    }
}

test ('only author and title', () => {

    const { container }  =render(<Blog blog={blog} handleDeleteBlog={() => {}} handleUpdateBlog={() => {}} />)

    expect(screen.getByText('Component testing is done with react-testing-library Maija')).toBeDefined()
    expect(container.querySelector('.urlClass')).toBeNull
    expect(container.querySelector('.likesClass')).toBeNull
    expect(container.querySelector('.titleClass')).toBeDefined()
})

test ('all details', async() => {
    const mockHandler = vi.fn()

    render(<Blog blog={blog} handleDeleteBlog={mockHandler} handleUpdateBlog={mockHandler} />)

    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    expect(screen.getByText('www.google.com')).toBeDefined()
    expect(screen.getByText('Likes 5')).toBeDefined()
}
)

test ('like button', async() => {
    const mockHandler = vi.fn()

    render(<Blog blog={blog} handleDeleteBlog={mockHandler} handleUpdateBlog={mockHandler} />)

    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    const likeButton = screen.getByText('like')
    await user.click(likeButton)
    await user.click(likeButton)

    expect(mockHandler.mock.calls).toHaveLength(2)
})

