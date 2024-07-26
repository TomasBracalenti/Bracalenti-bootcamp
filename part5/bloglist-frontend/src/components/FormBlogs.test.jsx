import { render , screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import FormBlogs from './FormBlogs'
import { vi } from 'vitest'

test ('form calls the event handler it received as props', async() => {

    const createBlog = vi.fn()
    const user = userEvent.setup()

    render(<FormBlogs handleMessage={() => {}} updateBlogs={createBlog} />)

    const title = screen.getByLabelText('Title:')
    const author = screen.getByLabelText('Author:')
    const url = screen.getByLabelText('URL:')

    await user.type(title, 'testing of forms could be easier')
    await user.type(author, 'Maija')
    await user.type(url, 'www.google.com')

    await user.click(screen.getByText('create'))

}
)