describe("Search Functionality", () => {
  it("should perform a search with results", () => {
    cy.visit("/en/search");
    cy.get('[data-testid="search-input"]').type("Rick");
    cy.get('[data-testid="movie-card"]').should("exist");
  });

  it("should handle search with no results", () => {
    cy.visit("/en/search");
    cy.get('[data-testid="search-input"]').type("NonExistentCharacter123");

    cy.get('[data-testid="movie-card"]').should("not.exist");
    cy.contains("No results found").should("be.visible");
  });

  it("should handle empty search", () => {
    cy.visit("/en/search");
    cy.get('[data-testid="movie-card"]').should("exist");
  });
});
