export {};

import {authorization} from './Authorization';

declare global {
    namespace Cypress {
        interface Chainable {
            login(username: string, password: string): Chainable<void>

            logout(): Chainable<void>

            addItemToCart(itemName: string): Chainable<void>

            removeItemFromCart(itemName: string): Chainable<void>

            openCart(): Chainable<void>
        }
    }
}

Cypress.Commands.add('login', (username, password) => {
    authorization.login(username, password);
});

Cypress.Commands.add('logout', () => {
    authorization.logout();
});

Cypress.Commands.add('addItemToCart', (itemName) => {
    cy.contains(itemName).parents('.inventory_item').find('.btn_inventory').click();
});

Cypress.Commands.add('removeItemFromCart', (itemName) => {
    cy.contains(itemName).parents('.cart_item').find('.btn_secondary').click();
});

Cypress.Commands.add('openCart', () => {
    cy.get('.shopping_cart_link').click();
});


  


