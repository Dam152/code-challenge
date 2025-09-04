describe('Pagination', () => {
  it('should navigate to next page on homepage', () => {
    cy.visit('/');
    cy.get('a').contains('Next').click();
    cy.url().should('include', 'page=2');
    cy.get('[data-testid="movie-card"]').should('exist');
  });

  it('should navigate to previous page on homepage', () => {
    cy.visit('/?page=2');
    cy.get('a').contains('Prev').click();
    cy.url().should('include', 'page=1');
    cy.get('[data-testid="movie-card"]').should('exist');
  });

  it('should disable prev button on first page', () => {
    cy.visit('/');
    cy.get('a').contains('Prev').should('have.class', 'pointer-events-none');
  });

  it('should show current page number', () => {
    cy.visit('/?page=2');
    cy.contains('2 /').should('be.visible');
  });

  it('should navigate pages in search results', () => {
    cy.visit('/search');
    cy.get('[data-testid="search-input"]').type('Rick');
    cy.wait(1000);

    cy.get('button')
      .contains('Next')
      .should('exist')
      .then(($btn) => {
        if (!$btn.hasClass('pointer-events-none')) {
          cy.wrap($btn).click();
          cy.contains('2 /').should('be.visible');
        }
      });
  });
});
