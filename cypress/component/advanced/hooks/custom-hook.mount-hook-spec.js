/// <reference types="cypress" />
import React from 'react'
import { mountHook } from 'cypress-react-unit-test'
const { useCustomHook } = require('./custom-hook')
import { Provider } from 'react-redux'
import store from './store'

describe('custom hook that needs redux provider', () => {
  it.skip('mounted with wrapper', () => {
    mountHook(() => useCustomHook()).then(result => {
      console.log(result)
    })
  })
})
