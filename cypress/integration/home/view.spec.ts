describe('Home Page', () => {
  it('should be able to render home page', () => {
    cy.visit('/');
    cy.get('h1').should('contain', 'Order Status');
  });
});
