export { }

it('should start app, and login to portal', () => {
    cy.visit('http://localhost:3000')
    cy.contains('youre name shall')
})