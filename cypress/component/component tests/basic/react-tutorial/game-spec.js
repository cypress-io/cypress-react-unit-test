/// <reference types="cypress" />
import Game, { Board } from './game.jsx'
import React from 'react'
import { mount } from 'cypress-react-unit-tests'
import './tic-tac-toe.css'

// for now need a constructor, otherwise getting "Weak map" key
const BoardWrap = ({ squares, onClick }) => (
  <div className="game">
    <div className="game-board">
      <Board squares={squares} onClick={onClick} />
    </div>
  </div>
)

beforeEach(() => {
  cy.viewport(400, 200)
})

it('renders empty Board', () => {
  const squares = Array(9).fill(null)
  const onClick = cy.stub()
  mount(<BoardWrap squares={squares} onClick={onClick} />)
  cy.get('.board-row')
    .eq(0)
    .find('.square')
    .eq(0)
    .click()
    .then(() => {
      expect(onClick).to.have.been.calledWith(0)
    })
})

it('renders Board with a few squares filled', () => {
  const squares = Array(9).fill(null)
  squares[0] = 'X'
  squares[1] = 'O'
  mount(<BoardWrap squares={squares} />)
  cy.get('.board-row')
    .eq(0)
    .find('.square')
    .eq(0)
    .should('have.text', 'X')
  cy.get('.board-row')
    .eq(0)
    .find('.square')
    .eq(1)
    .should('have.text', 'O')
})

it('plays the game', () => {
  mount(<Game />)
  cy.contains('.game-info', 'Next player: X').should('be.visible')
  cy.get('.board-row')
    .eq(0)
    .find('.square')
    .eq(0)
    .click()
  cy.get('.board-row')
    .eq(1)
    .find('.square')
    .eq(0)
    .click()

  cy.get('.board-row')
    .eq(0)
    .find('.square')
    .eq(1)
    .click()
  cy.get('.board-row')
    .eq(1)
    .find('.square')
    .eq(1)
    .click()

  // X finishes the first row
  cy.get('.board-row')
    .eq(0)
    .find('.square')
    .eq(2)
    .click()

  cy.contains('.game-info', 'Winner: X').should('be.visible')
  // history of moves
  cy.get('ol li')
    .should('have.length', 6)
    .first()
    .should('have.text', 'Go to game start')
    .click()
})
