describe("Homepage", () => {
  it("should load and display search functionality", () => {
    cy.visit("/");
    cy.contains("MOVIES");
    cy.contains("Favorites");
    cy.get('[data-testid="movie-card"]').should("be.visible");
  });
});
