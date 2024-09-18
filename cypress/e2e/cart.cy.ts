describe('Cart Page Tests', () => {
    const username = 'standard_user';
    const password = 'secret_sauce';

    beforeEach(() => {
        cy.visit('http://localhost:3000/');
        cy.login(username, password);

        cy.url().should('include', '/inventory.html');
    });

    it('should add multiple items to the cart and verify they are listed on the cart page', () => {
        cy.get('.shopping_cart_link').should('be.visible');

        cy.addItemToCart('Sauce Labs Backpack');
        cy.addItemToCart('Sauce Labs Bike Light');

        cy.get('.shopping_cart_link').click();

        cy.get('.cart_item').should('have.length', 2);
        cy.contains('Sauce Labs Backpack').should('be.visible');
        cy.contains('Sauce Labs Bike Light').should('be.visible');
    });

    it('should remove an item from the cart and verify it is no longer listed', () => {
        cy.addItemToCart('Sauce Labs Backpack');

        cy.get('.shopping_cart_link').click();

        cy.contains('Sauce Labs Backpack').should('be.visible');

        cy.removeItemFromCart('Sauce Labs Backpack');

        cy.get('.cart_item').should('not.exist');
        cy.contains('Sauce Labs Backpack').should('not.exist');
    });

    it('should verify the cart badge reflects the correct number of items', () => {
        cy.addItemToCart('Sauce Labs Backpack');
        cy.addItemToCart('Sauce Labs Bike Light');

        cy.get('.shopping_cart_badge').should('contain', '2');

        cy.openCart();

        cy.removeItemFromCart('Sauce Labs Backpack');

        cy.get('.shopping_cart_badge').should('contain', '1');
    });

    it('should proceed to the checkout page from the cart page', () => {
        cy.addItemToCart('Sauce Labs Backpack');

        cy.openCart();

        cy.get('[data-test="checkout"]').click();

        cy.url().should('include', '/checkout-step-one.html');
    });

    it('should persist items in the cart between page navigations', () => {
        cy.addItemToCart('Sauce Labs Backpack');
        cy.addItemToCart('Sauce Labs Bike Light');

        cy.openCart();

        cy.get('.shopping_cart_link').click();

        cy.get('[data-test="continue-shopping"]').click();
        cy.get('.shopping_cart_badge').should('contain', '2');

        cy.openCart();

        cy.contains('Sauce Labs Backpack').should('be.visible');
        cy.contains('Sauce Labs Bike Light').should('be.visible');
    });
});