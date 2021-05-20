describe("Blog", () => {
  it("has anchor tags", () => {
    cy.visit("http://localhost:8082/home");
    cy.get("#patient-search").click()
    cy.get("#patient-0").click()
    cy.get("#series-2").click()
    cy.get("#instance-0").click({force: true})
  });
});
