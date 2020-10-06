
import React from 'react'
import mount from 'cypress-react-unit-test'
import { MyCompentToTest } from './MyComponentToTest'

describe('I shall start opgave og gjoremal', () => {

    const cleanUp = ()=>  window._env = {}

    beforeEach(cleanUp)
    afterEach(cleanUp)
    
    it('should have contains text `Hello`', () => {
        
        window._env={
            REACT_APP_MY_URL_FROM_ENV: 'http://localhost3012'
        }

        mount(<MyCompentToTest />)
        
        cy.contains('youre name')
        
    })

})