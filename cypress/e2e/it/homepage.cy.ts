describe("Homepage", () => {
  it("should load and display search functionality", () => {
    cy.visit("/");
    cy.contains("FILMS");
    cy.contains("Favoriti");
    cy.get('[data-testid="movie-card"]').should("be.visible");
  });
});
