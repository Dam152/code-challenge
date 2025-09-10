describe("Favorites functionality", () => {
  it("should show empty favorites page initially", () => {
    cy.visit("/en/favorites");
    cy.contains("No items in the favorites list.").should("be.visible");
  });

  it("should add a movie to favorites and verify toast message", () => {
    cy.visit("/en");
    cy.get('[data-testid="favorite-button"]').first().click();

    cy.get('[data-testid="toast"]')
      .should("be.visible")
      .and("contain.text", "added to favorites!");

    cy.visit("/en/favorites");
    cy.get('[data-testid="movie-card"]').should("exist");
  });

  it("should remove a movie from favorites and verify toast message", () => {
    cy.visit("/en");
    cy.get('[data-testid="favorite-button"]').first().click();

    cy.visit("/en/favorites");
    cy.get('[data-testid="favorite-button"]').first().click();

    cy.get('[data-testid="toast"]')
      .should("be.visible")
      .and("contain.text", "removed from favorites");

    cy.get('[data-testid="movie-card"]').should("not.exist");
    cy.contains("No items in the favorites list.").should("be.visible");
  });

  it("should persist favorites across page reloads", () => {
    cy.visit("/en");
    cy.get('[data-testid="favorite-button"]').first().click();

    cy.visit("/en/favorites");
    cy.get('[data-testid="movie-card"]').should("exist");
    cy.reload();
    cy.get('[data-testid="movie-card"]').should("exist");

    cy.get('[data-testid="favorite-button"]').first().click();
  });

  it("should auto-dismiss toast after 3 seconds", () => {
    cy.visit("/en");
    cy.get('[data-testid="favorite-button"]').first().click();

    cy.get('[data-testid="toast"]').should("be.visible");
    cy.wait(3500);
    cy.get('[data-testid="toast"]').should("not.exist");
  });

  it("should show correct favorite button states", () => {
    cy.visit("/en");
    const favoriteBtn = cy.get('[data-testid="favorite-button"]').first();

    favoriteBtn.should("not.have.class", "filled");
    favoriteBtn.click();
    favoriteBtn.should("have.class", "filled");

    cy.visit("/en/favorites");
    cy.get('[data-testid="favorite-button"]')
      .first()
      .should("have.class", "filled");
  });
});
