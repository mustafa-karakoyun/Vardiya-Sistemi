Feature: Vardiya Application

  Scenario: Create a new schedule
    Given I am on the schedules page
    When I fill in "name" with "Morning Shift Schedule"
    And I fill in "start_date" with "2025-01-01"
    And I fill in "end_date" with "2025-01-07"
    And I click "New Schedule"
    

  Scenario: View schedules
    Given I am on the schedules page
    Then I should see "Morning Shift Schedule"

  Scenario: Update an existing schedule
    Given I am on the schedules page
    When I click "Edit" for "Morning Shift Schedule"
    And I fill in "name" with "Updated Morning Shift Schedule"
    And I click "Save Schedule"


  Scenario: Delete a schedule
    Given I am on the schedules page



  Scenario: Create a new shift
    Given I am on the schedule details page for "Morning Shift Schedule"


  Scenario: Update an existing shift
    Given I am on the schedule details page for "Morning Shift Schedule"
 


  Scenario: Delete a shift
    Given I am on the schedule details page for "Morning Shift Schedule"


