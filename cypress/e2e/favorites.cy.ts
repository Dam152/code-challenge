describe("Favorites functionality", () => {
  it("should show empty favorites page initially", () => {
    cy.visit("/favorites");
    cy.contains("Nessun elemento nella lista dei preferiti.").should(
      "be.visible",
    );
  });

  it("should add a movie to favorites and verify toast message", () => {
    cy.visit("/");
    cy.get('[data-testid="favorite-button"]').first().click();

    cy.get('[data-testid="toast"]')
      .should("be.visible")
      .and("contain.text", "aggiunto ai favoriti");

    cy.visit("/favorites");
    cy.get('[data-testid="movie-card"]').should("exist");
  });

  it("should remove a movie from favorites and verify toast message", () => {
    cy.visit("/");
    cy.get('[data-testid="favorite-button"]').first().click();

    cy.visit("/favorites");
    cy.get('[data-testid="favorite-button"]').first().click();

    cy.get('[data-testid="toast"]')
      .should("be.visible")
      .and("contain.text", "rimosso dai favoriti");

    cy.get('[data-testid="movie-card"]').should("not.exist");
    cy.contains("Nessun elemento nella lista dei preferiti.").should(
      "be.visible",
    );
  });

  it("should persist favorites across page reloads", () => {
    cy.visit("/");
    cy.get('[data-testid="favorite-button"]').first().click();

    cy.visit("/favorites");
    cy.get('[data-testid="movie-card"]').should("exist");
    cy.reload();
    cy.get('[data-testid="movie-card"]').should("exist");

    cy.get('[data-testid="favorite-button"]').first().click();
  });

  it("should auto-dismiss toast after 3 seconds", () => {
    cy.visit("/");
    cy.get('[data-testid="favorite-button"]').first().click();

    cy.get('[data-testid="toast"]').should("be.visible");
    cy.wait(3500);
    cy.get('[data-testid="toast"]').should("not.exist");
  });

  it("should show correct favorite button states", () => {
    cy.visit("/");
    const favoriteBtn = cy.get('[data-testid="favorite-button"]').first();

    favoriteBtn.should("not.have.class", "filled");
    favoriteBtn.click();
    favoriteBtn.should("have.class", "filled");

    cy.visit("/favorites");
    cy.get('[data-testid="favorite-button"]')
      .first()
      .should("have.class", "filled");
  });
});
