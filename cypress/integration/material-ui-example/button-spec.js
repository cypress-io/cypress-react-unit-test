import React from 'react'
import { mount } from 'cypress-react-unit-tests'
import Button from '@material-ui/core/Button'

it('renders a button', () => {
  mount(
    <Button variant="contained" color="primary">
      Hello World
    </Button>,
  )
})
