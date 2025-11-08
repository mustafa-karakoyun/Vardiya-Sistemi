Feature: Vardiya Application End-to-End Flow

  Scenario: Create and delete schedules and shifts
    Given I am on the main page
    Then I should see the heading "Vardiya Planları"

    # Create a new schedule
    When I create a new schedule named "Cypress Test Plan" for "2025-12-01" to "2025-12-31"
    Then I should see a schedule card for "Cypress Test Plan"

    # Navigate to the schedule's detail page
    When I view the shifts for "Cypress Test Plan"
    Then I should see the details for "Cypress Test Plan"

    # Add a new shift
    When I add a new shift named "Test Shift" from "2025-12-15T09:00" to "2025-12-15T17:00"
    Then I should see a shift named "Test Shift" in the list

    # Delete the shift
    When I delete the shift named "Test Shift"
    Then I should not see a shift named "Test Shift" in the list

    # Go back and delete the schedule
    When I go back to the main page
    And I delete the schedule named "Cypress Test Plan"
    Then I should not see a schedule card for "Cypress Test Plan"