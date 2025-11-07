import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

// Common Steps
When('I fill in {string} with {string}', (field, value) => {
  // Handle special case for edit form - check if edit_name exists
  cy.get('body').then(($body) => {
    const editField = $body.find('[data-cy="edit_name"]');
    if (field === 'name' && editField.length > 0 && editField.is(':visible')) {
      // If we're in edit mode, use edit_name
      cy.get('[data-cy="edit_name"]').clear().type(value);
    } else {
      // Otherwise use the regular field
      cy.get(`[data-cy="${field}"]`).then(($elements) => {
        if ($elements.length > 1) {
          // If multiple found, use the visible one or the first one
          cy.get(`[data-cy="${field}"]:visible`).first().clear().type(value);
        } else {
          cy.get(`[data-cy="${field}"]`).clear().type(value);
        }
      });
    }
  });
});

When('I click {string}', (buttonText) => {
  // Handle form submit buttons - try multiple approaches
  // Special handling for form submit buttons like "New Schedule" and "Add Shift"
  if (buttonText === 'New Schedule' || buttonText === 'Add Shift') {
    // For form submit buttons, find the form and submit it directly
    // First try to find and click the button
    cy.get('form').first().within(() => {
      cy.get('button[type="submit"]').should('contain', buttonText).click({ force: true });
    });
  } else {
    // For other buttons, try normal approach
    cy.contains('button', buttonText, { timeout: 5000 }).should('be.visible').click();
  }
});

Then("I should see {string}", (text) => {
  cy.contains(text, { timeout: 10000 }).should("be.visible");
});

// New Steps for Schedules and Shifts
Given('I am on the schedules page', () => {
  cy.visit('/schedules');
  cy.wait(1000); // Wait for data to load
});

Given('I am on the schedule details page for {string}', (scheduleName) => {
  // First, visit the schedules page to find the schedule
  cy.visit('/schedules');
  cy.wait(2000); // Wait for data to load
  
  // Find the schedule link by name (partial match since link contains name and dates)
  // The link text format is: "ScheduleName (start_date to end_date)"
  // Try to find link that contains the schedule name
  cy.get('a').contains(scheduleName, { timeout: 10000 }).should('be.visible').then(($link) => {
    const href = $link.attr('href');
    if (href && href.includes('/schedules/')) {
      const scheduleId = href.split('/schedules/').pop().split('/')[0];
      cy.visit(`/schedules/${scheduleId}`);
      cy.wait(2000); // Wait for data to load
    } else {
      throw new Error(`Could not find schedule link for: ${scheduleName}. Found href: ${href}`);
    }
  });
});

When('I click {string} for {string}', (buttonText, itemName) => {
  // Frontend uses <ul> and <li>, not tables
  // Find the li that contains the item name (partial match)
  // Handle confirmation dialog for delete buttons - MUST stub BEFORE clicking
  if (buttonText === 'Delete') {
    cy.window().then((win) => {
      cy.stub(win, 'confirm').returns(true);
    });
    // Wait a bit to ensure stub is set
    cy.wait(100);
  }
  cy.contains('li', itemName).within(() => {
    cy.contains('button', buttonText).click();
  });
});

When('I confirm the deletion', () => {
  // This step is called AFTER clicking delete, but the stub should already be set
  // If not already stubbed, set it now (though it should have been set in the click step)
  cy.window().then((win) => {
    if (!win.confirm.restore) {
      cy.stub(win, 'confirm').returns(true);
    }
  });
  // Wait a moment for any pending confirmations
  cy.wait(200);
});

Then('I should not see {string}', (text) => {
  cy.contains(text).should('not.exist');
});
