describe("Orders Test", () => {
  beforeEach(() => {
    cy.server();
    cy.route("**/api/orders").as("orders");

    cy.visit("/");
  });

  it("should load orders", function () {
    cy.log("Capture Api requests");

    cy.wait("@orders");
  });

  context("Creating orders", () => {
    beforeEach(() => {
      cy.route("**/api/items").as("items");

      cy.get("#button-new-order").click();
    });

    it("should find the new order button and go to new order page", function () {
      cy.location("pathname").should("equal", "/new");
    });

    it("should create a new order and go back to home page", function () {
      cy.wait("@items").then((req) => {
        const items = Cypress._.get(req, "response.body", []);
        items.forEach((item, index) => {
          cy.get(`#item-${index}`).type("1").should("have.value", "1");
        });
      });

      cy.route("PUT", "**/api/orders/new").as("createOrder");
      cy.get("#button-place-order").click();
      cy.wait("@createOrder");

      cy.location("pathname").should("equal", "/");

      cy.wait("@orders");
    });
  });
});
