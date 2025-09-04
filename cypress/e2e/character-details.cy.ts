describe("Character Details", () => {
  it("should navigate to character detail from homepage", () => {
    cy.visit("/");
    cy.get('[data-testid="movie-card"]').first().click();
    cy.url().should("include", "/character/");
    cy.get("h1").should("exist");
  });

  it("should display character information", () => {
    cy.visit("/character/1");
    cy.get("h1").should("contain.text", "Rick Sanchez");
    cy.get("img").should("be.visible");
    cy.contains("Human").should("be.visible");
    cy.contains("Male").should("be.visible");
    cy.contains("Alive").should("be.visible");
    cy.contains("Origin").should("be.visible");
    cy.contains("Location").should("be.visible");
  });

  it("should allow adding character to favorites from detail page", () => {
    cy.visit("/character/1");
    cy.get('[data-testid="favorite-button"]').click();
    cy.get('[data-testid="toast"]')
      .should("be.visible")
      .and("contain.text", "aggiunto ai favoriti");
  });

  it("should handle invalid character ID", () => {
    cy.visit("/character/99999", { failOnStatusCode: false });
    cy.contains("404").should("be.visible");
  });

  it("should navigate back from character detail", () => {
    cy.visit("/character/1");
    cy.go("back");
    cy.url().should("not.include", "/character/");
  });
});
