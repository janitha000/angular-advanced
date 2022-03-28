export class Interaction {
  public visit(): void {
    cy.visit('/component-interaction');
  }

  public clickChild(): void {
    cy.contains('Change Child Var').click();
  }

  public sendMessage(): void {
    cy.contains('Send Message Child').click();
  }

  public getByTestId(id: string): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.byTestId(id);
  }
}
