import { Interaction } from 'cypress/pages/interaction.page';

describe('Home', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('visits the home page', () => {
    cy.contains('Angular Advanced');
    cy.contains('Home');
  });

  it('should navigate to life cycle component', () => {
    cy.contains('Life Cycle Hooks');
    cy.get('[data-test-id="life-cycle"]');
    cy.byTestId('life-cycle').should('have.text', 'Life Cycle Hooks');
    cy.get('[data-test-id="life-cycle"]').click();
    cy.contains('This is the lifecycle parent component');

    cy.contains('Change Name').click();
    cy.contains('Vindya');

    cy.contains('Change Age').click();
    cy.contains('32');

    cy.contains('Change from Child').click();
    cy.contains('Lahiru');
  });
});

describe('Component Interaction', () => {
  let page: Interaction;
  beforeEach(() => {
    page = new Interaction();
    page.visit();
  });

  it('should change child var', () => {
    page.clickChild();
    cy.contains('changedChildVar');
  });

  it('should send message', () => {
    page.sendMessage();
    cy.contains('This is from child 1');
    page.sendMessage();
    cy.contains('This is from child 2');
  });
});
