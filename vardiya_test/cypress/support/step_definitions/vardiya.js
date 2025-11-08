import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

const FRONTEND_URL = "http://localhost:3001";

Given("I am on the main page", () => {
  cy.visit(FRONTEND_URL);
});

Then('I should see the heading {string}', (heading) => {
  cy.get('h1').should('contain', heading);
});

When('I create a new schedule named {string} for {string} to {string}', (name, startDate, endDate) => {
  cy.contains('button', 'Yeni Plan Oluştur').click();
  cy.get('.modal').should('be.visible');
  cy.get('.modal input[name="name"]').type(name);
  cy.get('.modal input[name="start_date"]').type(startDate);
  cy.get('.modal input[name="end_date"]').type(endDate);
  cy.get('.modal button[type="submit"]').click();
});

Then('I should see a schedule card for {string}', (name) => {
  cy.get('.card-title').contains(name).should('be.visible');
});

When('I view the shifts for {string}', (name) => {
  cy.get('.card-title').contains(name).parents('.card-body').find('a').contains('Vardiyaları Görüntüle').click();
});

Then('I should see the details for {string}', (name) => {
  cy.get('h1').should('contain', name);
});

When('I add a new shift named {string} from {string} to {string}', (name, startTime, endTime) => {
  cy.contains('button', 'Yeni Vardiya Ekle').click();
  cy.get('.modal').should('be.visible');
  cy.get('.modal input[name="name"]').type(name);
  cy.get('.modal input[name="start_time"]').type(startTime);
  cy.get('.modal input[name="end_time"]').type(endTime);
  cy.get('.modal button[type="submit"]').click();
});

Then('I should see a shift named {string} in the list', (name) => {
  cy.get('.list-group-item').contains(name).should('be.visible');
});

When('I delete the shift named {string}', (name) => {
  cy.get('.list-group-item').contains(name).parents('.list-group-item').within(() => {
    cy.get('button').contains('Sil').click();
  });
  cy.on('window:confirm', () => true);
});

Then('I should not see a shift named {string} in the list', (name) => {
  cy.contains('.list-group-item', name).should('not.exist');
});

When('I go back to the main page', () => {
  cy.get('a').contains('Bütün Planlara Geri Dön').click();
});

When('I delete the schedule named {string}', (name) => {
  cy.get('.card-title').contains(name).parents('.card-body').within(() => {
    cy.get('button').contains('Sil').click();
  });
  cy.on('window:confirm', () => true);
});

Then('I should not see a schedule card for {string}', (name) => {
  cy.contains('.card-title', name).should('not.exist');
});