import { TOTAL_CARDS, CARDS_SHOW_AT_A_TIME, ANIMATION_TIME } from '../../../src/constants/game';

/// <reference types="../../support/commands" />

describe('The entire game flow', () => {
  // This is computed from the game constants
  const expectedInitialCardCount = TOTAL_CARDS - CARDS_SHOW_AT_A_TIME;

  // This is computed from the time defined for animations
  const timeToShowAllCards = ANIMATION_TIME * (expectedInitialCardCount / CARDS_SHOW_AT_A_TIME);

  before(() => {
    cy.visit('/');
  });

  it('all the game buttons and flow work as intended', () => {
    // Initially the card count shown sould be the expected value
    cy.get('[id="remaining-card-count"]').should('have.text', expectedInitialCardCount);

    // The user needs to see and press the deal button
    cy.get('#deal-btn').should('be.visible');

    cy.get('#deal-btn').click();

    // After the deal button is pressed the card remaining in the deck should change as the cards are dealt to the user
    cy.get('[id="remaining-card-count"]').should('not.have.text', expectedInitialCardCount);

    // Wait till the game is over
    cy.wait(timeToShowAllCards);

    // The user should see the play again button and can press on it
    cy.get('#play-again').should('be.visible');

    cy.get('#play-again').click();

    // Pressing play again should reset the game state
    cy.get('[id="remaining-card-count"]').should('have.text', expectedInitialCardCount);

    // The user should see the deal button and can press on it again
    cy.get('#deal-btn').should('be.visible');

    cy.get('#deal-btn').click();

    // Wait for one animation batch of the game and then reset the game by pressing the reset button
    cy.wait(ANIMATION_TIME);

    cy.get('#reset-btn').should('be.visible');

    cy.get('#reset-btn').click();

    // Reseting the game should get it in the initial state
    cy.get('[id="remaining-card-count"]').should('have.text', expectedInitialCardCount);

    cy.get('#reset-btn').should('be.visible');

    cy.get('#deal-btn').should('be.visible');
  });
});
